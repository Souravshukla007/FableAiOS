// ───────────────────────────────────────────────────────────────────────────
// CHANNEL SERVICE — a SEPARATE process that simulates a messaging provider.
//
// It does NOT deliver anything real. The CRM calls POST /send (or /send/batch);
// this service simulates the delivery lifecycle and ASYNCHRONOUSLY calls back
// into the CRM's receipt API for each state transition. It deliberately:
//   • emits events OUT OF ORDER sometimes (independent jittered timers),
//   • RETRIES failed sends with backoff (incrementing `attempt`),
//   • lets some sends PERMANENTLY fail,
//   • uses per-channel engagement rates so analytics differ by channel.
//
// Zero dependencies — Node's built-in http + global fetch. Run: node server.mjs
// ───────────────────────────────────────────────────────────────────────────
import http from "node:http";
import process from "node:process";

const PORT = Number(process.env.PORT || 8787);
const SPEED = Number(process.env.SIMULATION_SPEED || 6); // higher = faster demo
const FAILURE_RATE = process.env.FAILURE_RATE ? Number(process.env.FAILURE_RATE) : null;
const MAX_RETRIES = Number(process.env.MAX_RETRIES || 2);

// Per-channel funnel probabilities (mirror the seed so live data stays coherent).
const RATES = {
  whatsapp: { delivered: 0.95, open: 0.62, read: 0.85, click: 0.30, convert: 0.16 },
  rcs:      { delivered: 0.93, open: 0.55, read: 0.80, click: 0.26, convert: 0.14 },
  sms:      { delivered: 0.98, open: 0.45, read: 0.70, click: 0.20, convert: 0.10 },
  email:    { delivered: 0.97, open: 0.38, read: 0.65, click: 0.18, convert: 0.09 },
};

const unit = () => 700 / SPEED; // base ms per stage
const rnd = (a, b) => a + Math.random() * (b - a);
const chance = (p) => Math.random() < p;

let sent = 0, callbacks = 0;

// Fire one callback to the CRM receipt API (fire-and-forget, tolerant of errors).
async function emit(callbackUrl, payload) {
  callbacks++;
  try {
    await fetch(callbackUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    // The provider doesn't crash if the CRM is briefly unreachable.
    console.warn(`[channel] callback failed for ${payload.communicationId} (${payload.status}): ${e.message}`);
  }
}

// Schedule a single event at `delayMs` from now. Independent timers mean the
// CRM sometimes receives events out of order — exactly what we want to test.
function schedule(callbackUrl, communicationId, status, delayMs, extra = {}) {
  setTimeout(() => {
    emit(callbackUrl, {
      communicationId,
      status,
      at: new Date().toISOString(),
      attempt: extra.attempt ?? 1,
      ...(extra.meta ? { meta: extra.meta } : {}),
    });
  }, Math.max(0, delayMs));
}

// Simulate the full lifecycle for one message.
function simulate(msg) {
  const { communicationId, channel, callbackUrl } = msg;
  const r = RATES[channel] || RATES.email;
  const u = unit();
  const jitter = () => rnd(0, 0.8 * u); // adds reordering between adjacent events
  let t = rnd(0.3, 1.0) * u;

  // queued -> sent (with retry/backoff on failure)
  schedule(callbackUrl, communicationId, "queued", t * 0.2);
  const deliveredRate = FAILURE_RATE !== null ? 1 - FAILURE_RATE : r.delivered;

  let attempt = 1;
  let delivered = chance(deliveredRate);
  // Retry loop: each failed attempt emits failed(attempt) then backs off.
  while (!delivered && attempt <= MAX_RETRIES) {
    schedule(callbackUrl, communicationId, "sent", t, { attempt });
    schedule(callbackUrl, communicationId, "failed", t + rnd(0.3, 0.8) * u, { attempt, meta: { reason: "temporary_failure" } });
    t += rnd(1.2, 2.0) * u; // backoff
    attempt++;
    delivered = chance(0.6); // retries have a decent chance to succeed
  }

  schedule(callbackUrl, communicationId, "sent", t, { attempt });
  if (!delivered) {
    // Permanent failure after exhausting retries.
    schedule(callbackUrl, communicationId, "failed", t + rnd(0.3, 0.8) * u, { attempt, meta: { reason: "permanent_failure" } });
    return;
  }

  schedule(callbackUrl, communicationId, "delivered", t + rnd(0.4, 1.0) * u + jitter(), { attempt });

  if (!chance(r.open)) return;
  let ot = t + rnd(1.5, 3.5) * u;
  schedule(callbackUrl, communicationId, "opened", ot + jitter(), { attempt });

  if (chance(r.read)) schedule(callbackUrl, communicationId, "read", ot + rnd(0.5, 1.2) * u + jitter(), { attempt });

  if (!chance(r.click)) return;
  const ct = ot + rnd(1.0, 2.5) * u;
  schedule(callbackUrl, communicationId, "clicked", ct + jitter(), { attempt });

  if (!chance(r.convert)) return;
  const attributedAmount = Math.round(rnd(900, 4200));
  schedule(callbackUrl, communicationId, "converted", ct + rnd(1.5, 4.0) * u + jitter(), {
    attempt, meta: { attributedAmount },
  });
}

function accept(messages) {
  let n = 0;
  for (const m of messages) {
    if (!m || !m.communicationId || !m.channel || !m.callbackUrl) continue;
    sent++; n++;
    simulate(m);
  }
  return n;
}

const server = http.createServer((req, res) => {
  const json = (code, body) => {
    res.writeHead(code, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
    res.end(JSON.stringify(body));
  };

  if (req.method === "GET" && req.url === "/health") {
    return json(200, { ok: true, sent, callbacks, speed: SPEED });
  }

  if (req.method === "POST" && (req.url === "/send" || req.url === "/send/batch")) {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      let body;
      try { body = JSON.parse(raw || "null"); } catch { return json(400, { error: "invalid JSON" }); }
      if (body == null) return json(400, { error: "empty body" });
      const messages = Array.isArray(body) ? body : [body];
      const accepted = accept(messages);
      json(202, { accepted, communicationIds: messages.map((m) => m?.communicationId).filter(Boolean) });
    });
    return;
  }

  json(404, { error: "not found" });
});

server.listen(PORT, () => {
  console.log(`[channel] simulator listening on http://localhost:${PORT}  (speed=${SPEED}x, maxRetries=${MAX_RETRIES})`);
});
