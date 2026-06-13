// Xeno FDE — AI-Native Mini CRM: correlated seed.
// Philosophy: seed BACKWARDS from the cohorts we want to demo so segments and
// analytics tell a coherent story. Derived fields (totalSpend, orderCount,
// avgOrderValue, first/lastOrderAt) are computed from real orders — never random.
// CommunicationEvent rows are the append-only source of truth for the funnel.

import { PrismaPg } from "@prisma/adapter-pg";
import { faker } from "@faker-js/faker";

import { PrismaClient } from "../src/generated/prisma/client.ts";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
faker.seed(20260611); // reproducible data

// ---------------------------------------------------------------------------
// Reference data (Indian D2C retail)
// ---------------------------------------------------------------------------
const FIRST_NAMES = [
  "Aarav", "Vivaan", "Aditya", "Ishaan", "Diya", "Ananya", "Saanvi", "Aadhya",
  "Kabir", "Reyansh", "Myra", "Anaya", "Vihaan", "Arjun", "Sai", "Kiara",
  "Riya", "Aanya", "Ayaan", "Krishna", "Ira", "Advik", "Pari", "Navya",
  "Rohan", "Meera", "Tara", "Dev", "Nikhil", "Priya", "Kavya", "Rahul",
  "Sneha", "Amit", "Pooja", "Varun", "Isha", "Yash", "Tanvi", "Aryan",
];
const LAST_NAMES = [
  "Sharma", "Verma", "Patel", "Gupta", "Reddy", "Nair", "Iyer", "Mehta",
  "Singh", "Kapoor", "Joshi", "Rao", "Malhotra", "Chopra", "Bose", "Das",
  "Banerjee", "Pillai", "Shetty", "Desai",
];
const CITIES = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata",
  "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Chandigarh", "Indore", "Kochi",
];
const PRODUCTS = [
  { name: "Oversized Cotton Tee", price: 1299, tag: "fashion" },
  { name: "Single-Origin Coffee Beans 250g", price: 749, tag: "coffee-lover" },
  { name: "Vitamin C Serum", price: 1899, tag: "skincare" },
  { name: "Linen Summer Shirt", price: 2499, tag: "fashion" },
  { name: "Cold Brew Concentrate", price: 599, tag: "coffee-lover" },
  { name: "Hydrating Face Mist", price: 899, tag: "skincare" },
  { name: "Denim Jacket", price: 3999, tag: "fashion" },
  { name: "Espresso Roast 500g", price: 1199, tag: "coffee-lover" },
  { name: "Matte Lipstick", price: 699, tag: "skincare" },
  { name: "Cashmere Scarf", price: 4599, tag: "fashion" },
  { name: "Ceramic Pour-Over Kit", price: 2299, tag: "coffee-lover" },
  { name: "Retinol Night Cream", price: 2199, tag: "skincare" },
];
const CHANNELS = ["whatsapp", "sms", "email", "rcs"];

// Per-channel engagement rates — DIFFER by channel so analytics are interesting
// and the "channel affinity" explainability signal is real.
const CHANNEL_RATES = {
  whatsapp: { delivered: 0.95, open: 0.62, read: 0.85, click: 0.30, convert: 0.16 },
  rcs:      { delivered: 0.93, open: 0.55, read: 0.80, click: 0.26, convert: 0.14 },
  sms:      { delivered: 0.98, open: 0.45, read: 0.70, click: 0.20, convert: 0.10 },
  email:    { delivered: 0.97, open: 0.38, read: 0.65, click: 0.18, convert: 0.09 },
};

// Status ordering rank — used to derive Communication.status (never regress).
const RANK = { queued: 0, sent: 1, delivered: 2, opened: 3, read: 4, clicked: 5, converted: 6, failed: 1 };

// Cohort plan (sums to 500). Each cohort constrains order recency/volume so the
// derived lifecycleStage is consistent with the data.
const COHORTS = [
  { stage: "vip",     count: 25,  orders: [10, 25], recencyDays: [1, 25],   aov: [2500, 5000] },
  { stage: "dormant", count: 50,  orders: [3, 10],  recencyDays: [95, 180], aov: [1500, 3500] },
  { stage: "at_risk", count: 80,  orders: [3, 8],   recencyDays: [46, 75],  aov: [900, 2200] },
  { stage: "active",  count: 200, orders: [4, 12],  recencyDays: [2, 40],   aov: [800, 2000] },
  { stage: "new",     count: 145, orders: [1, 1],   recencyDays: [1, 30],   aov: [600, 2500] },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const ri = (min, max) => faker.number.int({ min, max });
const pick = (arr) => arr[ri(0, arr.length - 1)];
const daysAgo = (d) => new Date(Date.now() - d * 86400000);
const round2 = (n) => Math.round(n * 100) / 100;

function buildItems(targetAov) {
  // Pick 1-3 products that roughly hit the target average order value.
  const count = ri(1, 3);
  const items = [];
  let total = 0;
  for (let i = 0; i < count; i++) {
    const p = pick(PRODUCTS);
    const qty = ri(1, 2);
    items.push({ name: p.name, qty, price: p.price, tag: p.tag });
    total += p.price * qty;
  }
  return { items, total };
}

// ---------------------------------------------------------------------------
// 1. Customers + Orders (derived fields computed from real orders)
// ---------------------------------------------------------------------------
async function seedCustomersAndOrders() {
  const customers = [];
  const orders = [];
  let n = 0;

  for (const cohort of COHORTS) {
    for (let i = 0; i < cohort.count; i++) {
      n++;
      const id = `cust_${String(n).padStart(3, "0")}`;
      const first = pick(FIRST_NAMES);
      const last = pick(LAST_NAMES);
      const name = `${first} ${last}`;
      const email = `${first}.${last}.${n}`.toLowerCase() + "@gmail.com";

      const orderCount = ri(cohort.orders[0], cohort.orders[1]);
      const lastDays = ri(cohort.recencyDays[0], cohort.recencyDays[1]);
      // first order is older than last; scale with order volume
      const firstDays = lastDays + ri(30, 30 + orderCount * 45);

      const tagCounts = {};
      let totalSpend = 0;
      const custOrders = [];
      for (let o = 0; o < orderCount; o++) {
        const { items, total } = buildItems(ri(cohort.aov[0], cohort.aov[1]));
        totalSpend += total;
        for (const it of items) tagCounts[it.tag] = (tagCounts[it.tag] || 0) + 1;
        // spread order dates between firstDays and lastDays
        const placedDays = orderCount === 1
          ? lastDays
          : Math.round(firstDays - ((firstDays - lastDays) * o) / (orderCount - 1));
        custOrders.push({
          id: `ord_${id}_${o}`,
          customerId: id,
          amount: round2(total),
          items,
          channel: pick(["whatsapp", "email", "direct", "sms"]),
          placedAt: daysAgo(placedDays),
        });
      }

      const avgOrderValue = round2(totalSpend / orderCount);
      // Trust the intentional cohort stage. Recency + order volume (set per
      // cohort) define the lifecycle; spend correlates but doesn't override it.
      const stage = cohort.stage;

      // Affinity tags from purchase mix + a couple behavioural tags.
      const tags = new Set();
      const topTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0];
      if (topTag) tags.add(topTag[0]);
      if (totalSpend > 15000) tags.add("high-aov");
      if (orderCount >= 3) tags.add("repeat-buyer");
      if (faker.datatype.boolean(0.3)) tags.add("discount-seeker");
      if (faker.datatype.boolean(0.4)) tags.add("newsletter");

      customers.push({
        id, name, email,
        phone: `+9198${ri(10000000, 99999999)}`,
        city: pick(CITIES),
        totalSpend: round2(totalSpend),
        orderCount,
        avgOrderValue,
        firstOrderAt: daysAgo(firstDays),
        lastOrderAt: daysAgo(lastDays),
        lifecycleStage: stage,
        tags: [...tags],
      });
      orders.push(...custOrders);
    }
  }

  await prisma.customer.createMany({ data: customers });
  // Orders carry JSON items; createMany handles it.
  await prisma.order.createMany({ data: orders });
  return { customers, orders };
}

// ---------------------------------------------------------------------------
// 2. Segments (stable IDs matching the frontend predicate map; RuleTree JSON)
// ---------------------------------------------------------------------------
async function seedSegments(customers) {
  const countBy = (fn) => customers.filter(fn).length;
  const segments = [
    { id: "seg_vip", name: "VIP Loyalists", description: "Top spenders with high lifetime value",
      rulesText: "lifecycleStage = vip", createdBy: "marketer",
      rulesJson: { op: "AND", conditions: [{ field: "lifecycleStage", operator: "==", value: "vip" }] },
      customerCount: countBy((c) => c.lifecycleStage === "vip") },
    { id: "seg_dormant_hv", name: "Dormant High-Value", description: "High spenders who lapsed 90+ days",
      rulesText: "totalSpend > 10000 AND dormant", createdBy: "ai",
      aiReason: "These customers spent well above average but lapsed. Win-back odds are highest within 30 days.",
      rulesJson: { op: "AND", conditions: [{ field: "totalSpend", operator: ">", value: 10000 }, { field: "lifecycleStage", operator: "==", value: "dormant" }] },
      customerCount: countBy((c) => c.totalSpend > 10000 && c.lifecycleStage === "dormant") },
    { id: "seg_new", name: "First-Time Buyers", description: "Customers with exactly one order",
      rulesText: "orderCount = 1", createdBy: "marketer",
      rulesJson: { op: "AND", conditions: [{ field: "orderCount", operator: "==", value: 1 }] },
      customerCount: countBy((c) => c.lifecycleStage === "new") },
    { id: "seg_at_risk", name: "At-Risk Regulars", description: "Active buyers slowing down (46-75 days)",
      rulesText: "lifecycleStage = at_risk", createdBy: "ai",
      aiReason: "Order cadence dropped vs baseline. A timely nudge prevents churn.",
      rulesJson: { op: "AND", conditions: [{ field: "lifecycleStage", operator: "==", value: "at_risk" }] },
      customerCount: countBy((c) => c.lifecycleStage === "at_risk") },
    { id: "seg_coffee", name: "Coffee Enthusiasts", description: "Customers tagged coffee-lover",
      rulesText: "tags contains coffee-lover", createdBy: "marketer",
      rulesJson: { op: "AND", conditions: [{ field: "tags", operator: "in", value: "coffee-lover" }] },
      customerCount: countBy((c) => c.tags.includes("coffee-lover")) },
    { id: "seg_skincare", name: "Skincare Fans", description: "Customers tagged skincare",
      rulesText: "tags contains skincare", createdBy: "marketer",
      rulesJson: { op: "AND", conditions: [{ field: "tags", operator: "in", value: "skincare" }] },
      customerCount: countBy((c) => c.tags.includes("skincare")) },
    { id: "seg_discount", name: "Discount Seekers", description: "Price-sensitive shoppers",
      rulesText: "tags contains discount-seeker", createdBy: "ai",
      aiReason: "These respond far better to % off than to free shipping. Use bold discount framing.",
      rulesJson: { op: "AND", conditions: [{ field: "tags", operator: "in", value: "discount-seeker" }] },
      customerCount: countBy((c) => c.tags.includes("discount-seeker")) },
    { id: "seg_active", name: "Active Repeat Buyers", description: "Engaged customers ordering regularly",
      rulesText: "lifecycleStage = active", createdBy: "marketer",
      rulesJson: { op: "AND", conditions: [{ field: "lifecycleStage", operator: "==", value: "active" }] },
      customerCount: countBy((c) => c.lifecycleStage === "active") },
  ];
  await prisma.segment.createMany({ data: segments });
  return segments;
}

// ---------------------------------------------------------------------------
// 3. Campaigns + Communications + CommunicationEvents (the spine)
// ---------------------------------------------------------------------------
const SEGMENT_PREDICATES = {
  seg_vip: (c) => c.lifecycleStage === "vip",
  seg_dormant_hv: (c) => c.totalSpend > 10000 && c.lifecycleStage === "dormant",
  seg_new: (c) => c.lifecycleStage === "new",
  seg_at_risk: (c) => c.lifecycleStage === "at_risk",
  seg_coffee: (c) => c.tags.includes("coffee-lover"),
  seg_skincare: (c) => c.tags.includes("skincare"),
  seg_discount: (c) => c.tags.includes("discount-seeker"),
  seg_active: (c) => c.lifecycleStage === "active",
};

const GOALS = [
  "Win back dormant high-value customers", "Drive repeat purchases this month",
  "Promote new coffee roast launch", "Reactivate at-risk regulars",
  "Reward VIPs with early access", "Convert first-time buyers to repeat",
  "Clear summer fashion inventory", "Push skincare bundle offer",
  "Flash sale for discount seekers", "Re-engage app users",
];

// Build a realistic, sometimes-incomplete event chain for one communication.
function buildEventChain(channel, baseDate) {
  const r = CHANNEL_RATES[channel];
  const events = [];
  let t = new Date(baseDate);
  const step = (mins) => { t = new Date(t.getTime() + mins * 60000); return new Date(t); };

  events.push({ status: "queued", attempt: 1, occurredAt: new Date(t) });
  events.push({ status: "sent", attempt: 1, occurredAt: step(ri(1, 5)) });

  // delivery branch
  if (!faker.datatype.boolean(r.delivered)) {
    const attempt = ri(1, 3);
    events.push({ status: "failed", attempt, occurredAt: step(ri(2, 30)) });
    return events; // terminal
  }
  events.push({ status: "delivered", attempt: 1, occurredAt: step(ri(2, 20)) });

  if (!faker.datatype.boolean(r.open)) return events;
  events.push({ status: "opened", attempt: 1, occurredAt: step(ri(5, 240)) });

  if (faker.datatype.boolean(r.read)) {
    events.push({ status: "read", attempt: 1, occurredAt: step(ri(1, 60)) });
  }
  if (!faker.datatype.boolean(r.click)) return events;
  events.push({ status: "clicked", attempt: 1, occurredAt: step(ri(1, 120)) });

  if (!faker.datatype.boolean(r.convert)) return events;
  const attributedAmount = ri(900, 4200);
  events.push({ status: "converted", attempt: 1, attributedAmount, occurredAt: step(ri(5, 360)) });
  return events;
}

function deriveStatus(events) {
  let top = "queued";
  let maxAttempt = 1;
  let lastAt = events[0].occurredAt;
  for (const e of events) {
    if (RANK[e.status] > RANK[top] || e.status === "failed") {
      if (e.status === "failed") top = "failed";
      else if (RANK[e.status] > RANK[top]) top = e.status;
    }
    if (e.attempt > maxAttempt) maxAttempt = e.attempt;
    if (e.occurredAt > lastAt) lastAt = e.occurredAt;
  }
  return { status: top, retries: maxAttempt - 1, lastEventAt: lastAt };
}

async function seedCampaigns(customers, segments) {
  const statusesPool = ["completed", "completed", "completed", "completed", "sending", "scheduled", "draft", "failed"];
  const campaignRows = [];
  const commRows = [];
  const eventRows = [];

  for (let i = 0; i < 20; i++) {
    const seg = segments[i % segments.length];
    const channel = i < 4 ? CHANNELS[i] : pick(CHANNELS); // ensure all channels appear
    const status = i === 0 ? "completed" : pick(statusesPool);
    const pred = SEGMENT_PREDICATES[seg.id] || (() => false);
    const audience = customers.filter(pred);
    const audienceSize = audience.length || ri(15, 40);
    const createdDays = ri(2, 80);
    const sentDays = ri(1, Math.max(1, createdDays - 1));
    const campaignId = `camp_${String(i + 1).padStart(3, "0")}`;

    campaignRows.push({
      id: campaignId,
      name: `${GOALS[i % GOALS.length]} — ${channel.toUpperCase()}`,
      goal: GOALS[i % GOALS.length],
      segmentId: seg.id,
      channel,
      message: channel === "email"
        ? "Hi {{name}}, we miss you! Here's 15% off your next order. Explore what's new."
        : "Hey {{name}} 👋 We saved your favourites! Tap to grab 15% off before it's gone.",
      status,
      audienceSize,
      sentAt: (status === "completed" || status === "sending") ? daysAgo(sentDays) : null,
      predictionJson: {
        expectedDeliveryRate: CHANNEL_RATES[channel].delivered,
        expectedOpenRate: CHANNEL_RATES[channel].open,
        expectedClickRate: round2(CHANNEL_RATES[channel].open * CHANNEL_RATES[channel].click),
        expectedConversionRate: round2(CHANNEL_RATES[channel].open * CHANNEL_RATES[channel].click * CHANNEL_RATES[channel].convert),
        expectedRevenueMin: audienceSize * 120,
        expectedRevenueMax: audienceSize * 520,
        confidence: audienceSize > 60 ? "high" : audienceSize > 25 ? "medium" : "low",
        rationale: "Grounded in historical per-channel engagement rates for comparable segments.",
      },
      createdAt: daysAgo(createdDays),
    });

    // Only completed/sending campaigns produce communications + events.
    if (status !== "completed" && status !== "sending") continue;

    const recipients = audience.length ? audience : customers.slice(0, audienceSize);
    recipients.forEach((cust, idx) => {
      const commId = `comm_${campaignId}_${idx}`;
      const events = buildEventChain(channel, daysAgo(sentDays));
      const derived = deriveStatus(events);
      commRows.push({
        id: commId,
        campaignId,
        customerId: cust.id,
        channel,
        status: derived.status,
        retries: derived.retries,
        lastEventAt: derived.lastEventAt,
      });
      events.forEach((e, ei) => {
        eventRows.push({
          id: `evt_${commId}_${ei}`,
          communicationId: commId,
          status: e.status,
          attempt: e.attempt,
          attributedAmount: e.attributedAmount ?? null,
          occurredAt: e.occurredAt,
        });
      });
    });
  }

  await prisma.campaign.createMany({ data: campaignRows });
  // Batch the spine inserts to keep network round trips low.
  const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
  for (const batch of chunk(commRows, 500)) await prisma.communication.createMany({ data: batch });
  for (const batch of chunk(eventRows, 1000)) await prisma.communicationEvent.createMany({ data: batch });
  return { totalComms: commRows.length, totalEvents: eventRows.length };
}

// ---------------------------------------------------------------------------
// Orchestrator
// ---------------------------------------------------------------------------
async function main() {
  console.log("Clearing existing data...");
  await prisma.communicationEvent.deleteMany();
  await prisma.communication.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.segment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();

  console.log("Seeding customers + orders...");
  const { customers, orders } = await seedCustomersAndOrders();
  console.log(`  ${customers.length} customers, ${orders.length} orders`);

  console.log("Seeding segments...");
  const segments = await seedSegments(customers);
  console.log(`  ${segments.length} segments`);

  console.log("Seeding campaigns + communications + events (this writes the spine)...");
  const { totalComms, totalEvents } = await seedCampaigns(customers, segments);
  console.log(`  ${totalComms} communications, ${totalEvents} events`);

  // Distribution report
  const dist = {};
  for (const c of customers) dist[c.lifecycleStage] = (dist[c.lifecycleStage] || 0) + 1;
  console.log("Lifecycle distribution:", dist);
  console.log("Done.");
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(async () => { await prisma.$disconnect(); });
