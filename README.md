# 🎯 Fable: AI-Native Mini CRM

[![TanStack Start](https://img.shields.io/badge/TanStack_Start-1.16-FF4154?style=flat-square&logo=react)](https://tanstack.com/start)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.19-2D3748?style=flat-square&logo=prisma)](https://prisma.io/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-2.5_Flash-orange?style=flat-square&logo=google)](https://ai.google.dev/)
[![Zod](https://img.shields.io/badge/Zod-Validated-3E67B1?style=flat-square)](https://zod.dev/)

A production-style, AI-native Mini CRM that helps D2C brands decide **who to talk to, what to say, and where to say it**. It ingests customers & orders, builds segments, generates AI-grounded campaign recommendations, dispatches messages through a **separate Channel Service**, and tracks performance via an asynchronous, callback-driven event pipeline. Built as a single full-stack **TanStack Start** application, with an event-sourced communication model as its system-design backbone.

---

## ⚡ Recruiter Fast-Track (30-Second Summary)

If you are a Recruiter, Hiring Manager, or SDE Interviewer evaluating the technical depth of this project, here is what makes it stand out immediately:

*   **Event-Sourced Communication Spine**: An append-only `CommunicationEvent` table is the single source of truth. `Communication.status` is *derived* from the max-rank of its events, making the receipt pipeline **idempotent** (`unique(communicationId, status, attempt)`) and **ordering-safe** — out-of-order and duplicate provider callbacks can never corrupt state.
*   **True Separate Channel Service**: A standalone, zero-dependency Node service simulates a real messaging provider — emitting the full delivery lifecycle as **asynchronous callbacks**, with retries/backoff, permanent failures, and per-channel engagement rates. The CRM↔Channel↔CRM loop is the core system-design signal.
*   **Honestly Grounded AI**: Every number the AI surfaces (audience size, avg spend, channel rates, predictions) is a **real SQL aggregate**. Google Gemini writes only *language* (copy, narration) and degrades gracefully to grounded templates on any failure. Predictions are an explicit heuristic over historical per-channel rates — never a fabricated figure.
*   **Co-located CRM, Isolated Provider**: The CRM API lives in the same TanStack Start app (server routes + Nitro) to minimise moving parts; only the provider is a separate process, because the cross-process async callback is the part worth demonstrating.
*   **Correlated Seed Data**: 500 customers seeded *backwards from demo cohorts* (VIP, dormant, at-risk…) so segments and analytics tell a coherent, queryable story — quality over raw volume.

---

## 📂 Direct Code Navigation (Key Implementation Anchors)

Skip the folders and jump straight into the production code implementation of key features:

| Feature | Key Logic File | Role / Purpose |
| :--- | :--- | :--- |
| **📡 Receipt Callback Sink** | [`src/routes/api/receipts.ts`](./src/routes/api/receipts.ts) | Idempotent, ordering-safe ingestion of async provider callbacks; auto-completes campaigns. |
| **🛰️ Channel Service** | [`channel-service/server.mjs`](./channel-service/server.mjs) | Separate provider simulator: lifecycle, out-of-order emits, retries, failures. |
| **🗄️ Event Spine Schema** | [`prisma/schema.prisma`](./prisma/schema.prisma) | The `CommunicationEvent` append-only source of truth. |
| **🚀 Launch Orchestration** | [`src/lib/server/launch.server.ts`](./src/lib/server/launch.server.ts) | Resolves audience, creates comms, dispatches a batch to the Channel Service. |
| **🤖 Grounded AI Layer** | [`src/lib/server/ai.server.ts`](./src/lib/server/ai.server.ts) | Heuristic prediction, recommendation, analysis & post-mortem over real data. |
| **🧠 Resilient Gemini Client** | [`src/lib/server/gemini.server.ts`](./src/lib/server/gemini.server.ts) | Timeout + defensive JSON parsing + graceful template fallback. |
| **📊 Analytics Aggregation** | [`src/lib/server/analytics.server.ts`](./src/lib/server/analytics.server.ts) | KPIs, funnels, channel & revenue aggregates over the event spine. |
| **🔎 Rules & Explainability** | [`src/lib/server/compute.ts`](./src/lib/server/compute.ts) | Segment rule evaluation + "Why this audience" signal computation. |
| **🌱 Correlated Seed** | [`prisma/seed.mjs`](./prisma/seed.mjs) | Cohort-driven data generation (Indian D2C context). |

---

## 📌 Problem Statement

A D2C / retail brand (fashion, coffee, beauty) has thousands of shoppers and purchase history, but struggles to **intelligently reach them**. Generic "20% OFF everything" blasts ignore behaviour, waste channel budget, and erode trust.

Marketers face three key problems:
1. **Who to target**: Audiences are buried in raw customer/order data. Manually carving out "dormant high-value" or "at-risk regulars" cohorts is slow and error-prone.
2. **What to say & where**: Choosing the message and the right channel (WhatsApp / SMS / Email / RCS) per audience is guesswork without engagement data.
3. **Did it work**: Tracking the funnel — sent → delivered → opened → clicked → converted — and attributing revenue across an unreliable, asynchronous delivery layer is genuinely hard (volume, ordering, retries, failures).

**The AI Marketing Command Center** solves this with an opinionated, AI-native workflow: state a goal ("re-engage dormant high-value customers"), and the system recommends a **grounded audience**, explains *why* (real aggregates), drafts the **message**, recommends the **channel**, predicts outcomes with an honest heuristic, dispatches via a **separate Channel Service**, and tracks the funnel through an **idempotent, ordering-safe event pipeline**.

---

## ✨ Key Features

### 📥 Data & Segmentation
*   **Customer & Order Ingestion**: 500 correlated customers and ~3,000 orders with derived fields (`totalSpend`, `orderCount`, `avgOrderValue`, recency, `lifecycleStage`) computed from real orders — never random.
*   **Structured Segment Builder**: Compose rules (`totalSpend > 15000 AND lastOrderDays > 90`) with a live audience preview counted against the real dataset.
*   **AI Natural-Language Segments**: Describe an audience in plain English ("high value customers who haven't ordered in 90 days") and the system derives equivalent structured rules + a live customer count.

### 🧠 AI Copilot
*   **Goal → Recommendation**: A marketer states a goal; the Copilot returns a grounded **audience**, **channel**, **message**, and **prediction** end-to-end.
*   **"Why This Audience?" Explainability**: Every recommendation is backed by real signals — `AVG(totalSpend)`, mean recency, channel affinity %, dominant lifecycle — each traceable to a SQL aggregate.
*   **Honest Campaign Prediction**: Expected delivery/open/click/conversion and a revenue range, computed as a heuristic over **historical per-channel rates × segment AOV**, with a confidence label. Explicitly labelled as not a trained model.
*   **Post-Mortem & Next Action**: After a campaign, a grounded analysis of what worked plus one concrete next action (e.g. "48-hour follow-up to clickers who didn't buy").

### 📡 Channel Service & Callbacks
*   **Separate Provider Simulator**: A standalone process that accepts `POST /send/batch` and simulates `queued → sent → delivered/failed → opened → read → clicked → converted`.
*   **Asynchronous, Out-of-Order Callbacks**: Each transition is an independent, jittered callback into the CRM — deliberately arriving out of order to prove the pipeline's resilience.
*   **Retries & Failures**: Failed sends retry with backoff (incrementing `attempt`); some permanently fail. Per-channel rates make analytics realistic.

### 📊 Analytics & Attribution
*   **Live Funnel & KPIs**: Dashboard and Channel Monitor fill in real time as callbacks arrive; deltas are grounded in event/order timestamps (last 30d vs prior 30d).
*   **Channel Comparison & Revenue**: Per-channel sent/delivered/opened/clicked plus attributed revenue, aggregated from the event spine.
*   **Revenue & Engagement Trends**: Weekly revenue and daily engagement bucketed directly from `CommunicationEvent` timestamps.

### 🛡️ System-Design Guarantees
*   **Idempotency**: A unique `(communicationId, status, attempt)` constraint turns duplicate callbacks into no-ops.
*   **Ordering Safety**: Status is derived by rank and never regresses, regardless of callback arrival order.
*   **Attribution Integrity**: `converted` callbacks carry `attributedAmount`, summed into campaign revenue from source events.

---

## 🏗️ System Architecture

The CRM is a single full-stack TanStack Start app; only the Channel Service is a separate process. Here is the architectural pipeline:

```mermaid
graph TD
    User([Marketer]) -->|Interacts| UI["TanStack Start UI — Dashboard, Copilot, Campaigns, Analytics"]

    subgraph CRM [TanStack Start App - CRM Core]
        UI -->|fetch /api| ClientAPI["src/lib/api.ts"]
        ClientAPI -->|Customers and Segments| DataAPI["Server Routes: customers, segments"]
        ClientAPI -->|Goal| AiAPI["AI Routes: ai/recommend, ai/explain, ai/segment"]
        ClientAPI -->|Launch| LaunchAPI["POST /api/campaigns/:id/launch"]
        ClientAPI -->|Funnel and KPIs| AnalyticsAPI["GET /api/analytics/*"]
        ReceiptAPI["POST /api/receipts — idempotent, ordering-safe"]
    end

    subgraph DB [Persistence]
        DataAPI --> PG[(PostgreSQL - Neon)]
        AnalyticsAPI --> PG
        LaunchAPI -->|create queued comms| PG
        ReceiptAPI -->|append events, derive status| PG
    end

    subgraph Channel [SEPARATE Channel Service - Node process]
        Sim["Provider Simulator — lifecycle, retries, failures"]
    end

    subgraph Services [External]
        AiAPI -->|language only| Gemini["Google Gemini API"]
    end

    LaunchAPI -->|POST /send/batch| Sim
    Sim -->|async callbacks: delivered, opened, ...| ReceiptAPI

    classDef client fill:#FF8C00,stroke:#d35400,stroke-width:2px,color:#fff;
    classDef api fill:#4A90E2,stroke:#2980b9,stroke-width:2px,color:#fff;
    classDef db fill:#2ECC71,stroke:#27ae60,stroke-width:2px,color:#fff;
    classDef ext fill:#9B59B6,stroke:#8e44ad,stroke-width:2px,color:#fff;

    class User,UI,ClientAPI client;
    class DataAPI,AiAPI,LaunchAPI,AnalyticsAPI,ReceiptAPI,Sim api;
    class PG db;
    class Gemini ext;
```

---

## 💻 Tech Stack

| Technology | Category | Usage / Context |
| :--- | :--- | :--- |
| **TanStack Start 1.16** | Full-Stack Framework | Isomorphic app: UI pages + file-based server API routes (Nitro) |
| **React 19.2** | Frontend UI | Component hierarchy, interactive states, TanStack Query data fetching |
| **Tailwind CSS 4** | CSS Styling | Utility-first responsive design, light/dark theming |
| **TypeScript 5.9** | Programming Language | End-to-end type safety across client, server routes, and shared types |
| **PostgreSQL (Neon)** | Relational Database | Serverless hosting, ACID storage, the event-sourced spine |
| **Prisma ORM 6.19** | Database ORM | Type-safe queries, migrations, relational indices |
| **Google Gemini 2.5 Flash** | Artificial Intelligence | Message copy & post-mortem narration (language only, grounded fallback) |
| **Zod 3** | Validation | Strict validation of inbound callback payloads on `/api/receipts` |
| **Node (zero-dep) + Faker** | Channel Service & Seeding | Standalone provider simulator; correlated Indian D2C seed data |

---

## 🗃️ Database Design

The schema is built around an event-sourced communication model. `CommunicationEvent` is append-only and the source of truth; `Communication.status` is derived from it.

```
                  ┌──────────────────────┐
                  │       Customer       │
                  └──────────┬───────────┘
                             │ (1)
              ┌──────────────┼───────────────┐
              │ (N)          │ (N)           │
      ┌───────▼───────┐ ┌────▼──────────┐    │
      │     Order     │ │ Communication │    │
      └───────────────┘ └───────┬───────┘    │
                                 │ (N)        │
                         ┌───────▼──────────┐ │
                         │CommunicationEvent│ │  ← append-only SPINE
                         └──────────────────┘ │   (queued, sent, delivered,
                                              │    failed, opened, read,
      ┌───────────────┐    ┌──────────────┐   │    clicked, converted)
      │    Segment    │───▶│   Campaign   │───┘ (1→N)
      └───────────────┘(1) └──────┬───────┘
                            (N)    │ (1→N)
                                   ▼
                            Communication[]
```

### Key Models Explained:
*   **Customer**: Primary entity with derived analytics fields (`totalSpend`, `orderCount`, `avgOrderValue`, `firstOrderAt`, `lastOrderAt`) and a `lifecycleStage` enum (`new`, `active`, `at_risk`, `dormant`, `vip`). Indexed on stage, spend, and recency.
*   **Order**: Line items stored as JSON (`[{ name, qty, price }]`); drives all derived customer fields.
*   **Segment**: Stores both a human-readable `rulesText` and a structured `rulesJson` RuleTree shared by the manual and AI paths, plus an optional `aiReason`.
*   **Campaign**: Goal, target segment, channel, message, status enum, and a `predictionJson` (grounded heuristic). Stats are derived from its communications at read time.
*   **Communication**: One per recipient. `status` is **derived** (max-rank of its events) and never stored authoritatively; tracks `retries` and `lastEventAt`.
*   **CommunicationEvent** *(the spine)*: Append-only rows `{ status, attempt, attributedAmount?, occurredAt }` with a `@@unique([communicationId, status, attempt])` constraint guaranteeing idempotency.

---

## 🔁 Callback & Event Pipeline

The receipt pipeline is the system-design heart. Provider callbacks arrive asynchronously and possibly out of order; the CRM ingests them safely:

```
[Channel Service] ──async callback──► POST /api/receipts
                                            │
                              ┌─────────────┴──────────────┐
                              ▼                            ▼
                  [Idempotent insert]            [Validate payload (Zod)]
                  unique(commId,status,attempt)
                              │
                  [Recompute derived status by RANK]
                  queued<sent<delivered<opened<read<clicked<converted
                              │  (never regress; failed = terminal)
                              ▼
                  [Update Communication + auto-complete Campaign]
```

### Guarantees:
1.  **Idempotency**: Duplicate callbacks hit the unique constraint (`P2002`) and become silent no-ops.
2.  **Ordering Safety**: A late `sent` arriving after `opened` cannot downgrade status — the derived status is the maximum rank across all stored events.
3.  **Attribution**: `converted` callbacks carry `attributedAmount`, summed into campaign revenue from the source events.
4.  **Auto-Completion**: Once no communication remains `queued`/`sent`, the campaign flips to `completed`; engagement events continue to be counted from the spine.

---

## 🤖 AI Pipeline

The AI does **language**; the database does **facts**. Subjective copy and narration flow through a resilient pipeline:

```
Goal / Stats (real SQL aggregates) ──► Prompt Construction
                                              │
┌──────────────────────────────────────────────┘
▼
Google Gemini (gemini-2.5-flash) ──► Defensive Parse ──► [success?] ──► AI copy
        │                                                    │
        └──────────── timeout / 4xx / malformed ─────────────┴──► Grounded Template Fallback
```

### Processing Steps:
1.  **Facts First**: Audience, avg spend, recency, channel affinity, and historical per-channel rates are computed from Postgres before any model call.
2.  **Grounded Prediction**: `expectedConversions = size × deliveryRate × convRate`; revenue range = `conversions × AOV × [0.7, 1.3]`. The rationale cites the exact historical basis — *not* a trained model.
3.  **Language via Gemini**: The model writes only the message copy and the post-mortem narration, using `{{name}}` personalisation and the real numbers passed in.
4.  **Resilience**: An 8s timeout, fenced-JSON stripping, and try/catch ensure any failure (including a denied key) degrades cleanly to grounded templates — the product never breaks on the AI path.

---

## 🛰️ Channel Service Architecture

A direct, server-to-server send with asynchronous callbacks, modelled on a real messaging provider but fully stubbed:

```
Marketer            CRM (TanStack)            Channel Service           CRM /api/receipts
   │                     │                          │                         │
   │──[Launch]──────────>│                          │                         │
   │                     │──create queued comms     │                         │
   │                     │──[POST /send/batch]──────>│                         │
   │                     │<──[202 accepted]──────────│                         │
   │                     │                          │  simulate lifecycle      │
   │                     │                          │──[delivered]────────────>│
   │                     │                          │──[opened]  (out of────-─>│
   │                     │                          │──[sent]     order!)─────>│
   │                     │                          │──[failed→retry→sent]────>│
   │                     │                          │──[clicked]──────────────>│
   │                     │                          │──[converted +₹]─────────>│
   ▼                     ▼                          ▼                         ▼
```

### Derivation & Idempotency Logic (CRM side):
Status is recomputed from the full event set on every callback, so order never matters:
```ts
const RANK = { queued:0, sent:1, delivered:2, opened:3, read:4, clicked:5, converted:6, failed:1 };

// idempotent insert — duplicates violate the unique constraint and are ignored
try { await prisma.communicationEvent.create({ data: { communicationId, status, attempt, occurredAt } }); }
catch (e) { if (e.code !== "P2002") throw e; }

// derive status by max rank; delivered+ always wins, never regresses
const top = successfulEvents.reduce((a, e) => RANK[e.status] > RANK[a] ? e.status : a, "queued");
```

---

## 🌱 Data Seeding Strategy

Data is generated **backwards from the cohorts we want to demo**, so segments and analytics are coherent and queryable — not random noise.

```
                500 Customers (correlated cohorts)
 ┌───────────────────────────────────────────────────────────┐
 │  vip      ×25   spend↑↑  recent      orders 10–25           │
 │  active   ×200  spend↑   recent      orders 4–12            │
 │  at_risk  ×80   spend→   46–75 days  orders 3–8             │
 │  dormant  ×50   spend↑   95–180 days orders 3–10            │
 │  new      ×145  spend↓   recent      orders 1               │
 └───────────────────────────────────────────────────────────┘
        │ derived fields computed from real orders
        ▼
 ~3,000 Orders · 8 Segments · 20 Campaigns · ~4,000 CommunicationEvents
        │ per-channel engagement rates differ (WhatsApp 62% → Email 38%)
        ▼
 Realistic funnels, channel analytics, and attributable revenue
```

### Seeding Strengths:
*   **Correlated, not random**: `lifecycleStage` is assigned by intent; recency and order volume make spend and funnels coherent.
*   **Indian D2C context**: Indian names & cities, ₹ amounts, and fashion/coffee/skincare product baskets via Faker.
*   **Differentiated channels**: Engagement rates vary by channel so the "channel affinity" signal and analytics are real.
*   **Reproducible**: A fixed Faker seed (`npm run db:seed`) yields a deterministic, demo-ready dataset.

---

## 📂 Project Structure

```text
nexusAiOS/
├── channel-service/            # SEPARATE messaging-provider simulator (own process)
│   ├── server.mjs              # Zero-dep Node: lifecycle, retries, async callbacks
│   ├── package.json            # Standalone start script
│   └── README.md               # Service docs & env
├── prisma/
│   ├── schema.prisma           # Data model incl. CommunicationEvent spine
│   ├── migrations/             # SQL migration history
│   └── seed.mjs                # Correlated cohort seed (Indian D2C)
├── src/
│   ├── routes/                 # TanStack Start pages + API routes
│   │   ├── api/                # CRM REST API (server routes)
│   │   │   ├── customers*.ts   # list, detail, orders, insight, explanation
│   │   │   ├── segments*.ts    # list/create, preview
│   │   │   ├── campaigns*.ts   # list/create, detail, launch, analysis, postmortem
│   │   │   ├── ai.*.ts         # recommend, explain, segment
│   │   │   ├── analytics.*.ts  # overview, channels, lifecycle, revenue, engagement
│   │   │   ├── communications.ts
│   │   │   └── receipts.ts     # ◀ idempotent, ordering-safe callback sink
│   │   ├── dashboard / customers / segments / copilot / campaigns / analytics / channel
│   │   └── __root.tsx          # Root layout
│   └── lib/
│       ├── api.ts              # Client API layer (fetches /api/*)
│       ├── types.ts            # Shared TypeScript types
│       ├── db.server.ts        # Prisma client singleton
│       └── server/             # Server-only logic
│           ├── store.server.ts     # Postgres → typed store loader (cached)
│           ├── compute.ts          # Rule evaluation + explainability signals
│           ├── analytics.server.ts # KPIs, funnels, channel/revenue aggregates
│           ├── ai.server.ts        # Grounded prediction, recommend, analysis
│           ├── gemini.server.ts    # Resilient Gemini wrapper (fallback)
│           └── launch.server.ts    # Campaign launch → Channel Service dispatch
├── .env.example                # CRM environment template
├── package.json                # Scripts: dev, build, db:seed, db:migrate
└── README.md                   # You are here
```

---

## 🛠️ Installation & Setup

Follow these steps to run the AI Marketing Command Center locally:

### 1. Prerequisites
Ensure you have the following installed:
*   Node.js (v18.0.0 or higher)
*   A PostgreSQL instance (local or a serverless Neon account)

### 2. Clone Repository
```bash
git clone <your-repo-url>
cd nexusAiOS
```

### 3. Install Core Dependencies
```bash
npm install
```

### 4. Database Initialization
Apply migrations and seed the correlated dataset:
```bash
npx prisma migrate deploy     # or: npx prisma migrate dev
npm run db:seed               # 500 customers, ~3k orders, 20 campaigns, event spine
```

### 5. Launch Both Processes
The CRM and the Channel Service are separate — run them in two terminals:
```bash
# Terminal 1 — CRM + UI
npm run dev                   # http://localhost:8080

# Terminal 2 — Channel Service (provider simulator)
cd channel-service && npm start   # http://localhost:8787
```
Open [http://localhost:8080](http://localhost:8080), launch a campaign from **Copilot** or **Campaigns → New**, then watch **Channel Monitor** and **Analytics** fill in real time.

### 6. Production Build
```bash
npm run build                 # builds client + SSR bundles
```

---

## 📄 Environment Variables

Create a `.env` file in your root folder (see `.env.example`) and set the following keys:

```env
# ─── CRM (TanStack Start app) ───────────────────────────────
# Hosted Postgres (Neon/Supabase/Railway). Required.
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Google Gemini (server-only). Optional — falls back to grounded templates.
# Get a key (starts "AIza...") at https://aistudio.google.com/apikey
GEMINI_API_KEY="AIzaSyxxxxxxxxxxxxxxxx"
# GEMINI_MODEL="gemini-2.5-flash"

# Channel Service wiring
CHANNEL_SERVICE_URL="http://localhost:8787"
CRM_RECEIPT_URL="http://localhost:8080/api/receipts"

# ─── Channel Service (channel-service/.env) ─────────────────
# PORT="8787"
# SIMULATION_SPEED="6"     # higher = faster demo
# FAILURE_RATE="0.08"      # optional override (0-1)
# MAX_RETRIES="2"
```

---

## 📸 Screenshots Section

Here is a visual overview of the key interfaces:

| AI Copilot & Recommendation | Channel Monitor (Live Callbacks) |
| :---: | :---: |
| ![Copilot Mockup](https://via.placeholder.com/600x350/0F172A/F97316?text=AI+Copilot)<br>Goal → grounded audience, channel, message & prediction with reasoning. | ![Channel Monitor](https://via.placeholder.com/600x350/0F172A/22D3EE?text=Channel+Monitor)<br>Real-time funnel filling as async provider callbacks arrive. |

| Analytics & Attribution | Segments & Explainability |
| :---: | :---: |
| ![Analytics](https://via.placeholder.com/600x350/0F172A/34D399?text=Analytics)<br>Per-channel funnels, weekly revenue, and engagement trends from the event spine. | ![Segments](https://via.placeholder.com/600x350/0F172A/A78BFA?text=Why+This+Audience)<br>Rule builder + "Why this audience?" signals traced to SQL aggregates. |

---

## 🔮 Future Improvements

- [ ] **Durable Queue for Callbacks**: Replace the in-process timers with SQS/Kafka + a worker pool and a dead-letter queue for permanently failed sends.
- [ ] **Trained Prediction Model**: Swap the heuristic for a model trained on historical campaign outcomes, with feature importance surfaced in the UI.
- [ ] **Real AI Feedback Loop**: Persist campaign outcomes and feed them back into `/ai/recommend` so future recommendations measurably shift — genuine "learning", not post-hoc narration.
- [ ] **Multi-Touch Attribution**: Windowed, multi-touch revenue attribution across campaigns instead of last-touch on `converted`.
- [ ] **Pluggable Provider Adapters**: Abstract the Channel Service behind an adapter interface so a real WhatsApp/SMS provider can drop in without touching the CRM.
- [ ] **Materialised Analytics Views**: Pre-aggregate funnels into materialised views for instant dashboards at scale.

---

## 🎖️ Why This Project Matters (Recruiter Corner)

This is not a typical CRUD CRM; it is a **system-design-first, AI-native engineering solution** built around the hardest part of the problem:

1.  **Event-Sourced, Resilient Pipeline**: The append-only `CommunicationEvent` spine with derived status makes the async callback loop idempotent and ordering-safe — the exact "volume, ordering, retries, failures" challenge the brief calls out, solved with a single well-chosen data model.
2.  **Genuinely Distributed Boundary**: A separate Channel Service demonstrates real asynchronous, cross-process communication tracking — not a fake in-app stub — while keeping the CRM cohesive in one deployable app.
3.  **Honest, Defensible AI**: Every surfaced number is a real SQL aggregate; Gemini is confined to language with a graceful fallback; predictions are labelled heuristics. Nothing here collapses under "where does that number come from?"
4.  **Production Instincts at Internship Scope**: Validation (Zod), idempotency constraints, derived-state integrity, correlated seed data, type-safe end-to-end contracts, and a clean client↔server seam — scoped appropriately, with explicit "at scale I'd do X" tradeoffs.

---
*Built with 🧡 by engineers for marketers—an AI teammate that helps you think clearly, decide confidently, and act quickly.*
