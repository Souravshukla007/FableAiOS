# Channel Service (separate, stubbed)

A standalone process that simulates a messaging provider (WhatsApp/SMS/Email/RCS). It is intentionally **separate** from the CRM to demonstrate asynchronous, callback-driven communication tracking across a process boundary.

## Flow

```
CRM  ──POST /send/batch──▶  Channel Service
                                  │  simulates lifecycle with jittered timers
                                  ▼
CRM  ◀──POST /api/receipts──  async callbacks (queued, sent, delivered, failed,
                              opened, read, clicked, converted)
```

## What it demonstrates

- **Async callbacks**: each state transition is a separate `POST` to the CRM receipt API.
- **Out-of-order delivery**: independent jittered timers mean events can arrive out of order — the CRM's receipt handler derives status by rank and never regresses.
- **Retries + failures**: failed sends retry with backoff (incrementing `attempt`); some permanently fail.
- **Per-channel rates**: WhatsApp/RCS/SMS/Email have different open/click/convert rates, so analytics differ by channel.

## Run

```bash
cd channel-service
npm start            # listens on http://localhost:8787
```

## Env

| Var | Default | Meaning |
|-----|---------|---------|
| `PORT` | `8787` | Listen port |
| `SIMULATION_SPEED` | `6` | Higher = faster demo (scales all delays) |
| `FAILURE_RATE` | per-channel | Override delivery failure rate (0–1) |
| `MAX_RETRIES` | `2` | Retry attempts before permanent failure |

## Endpoints

- `POST /send` / `POST /send/batch` — accept one or many `{ communicationId, recipient, channel, message, callbackUrl }`; responds `202`, then emits async callbacks.
- `GET /health` — `{ ok, sent, callbacks, speed }`.
