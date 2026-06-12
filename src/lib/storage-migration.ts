/**
 * One-time, idempotent migration of legacy `nexus-*` localStorage keys to the
 * current `fable-*` keys (renamed when the product was rebranded to Fable).
 *
 * Safe to call from multiple places and on every load — the in-memory `done`
 * guard ensures the real work runs at most once per session, and the per-key
 * logic is a no-op once values have already been migrated.
 *
 * Can be removed a release or two after rollout, once active users have loaded
 * the app at least once.
 */
const MIGRATIONS: Record<string, string> = {
  "nexus-theme": "fable-theme",
  "nexus-show-evidence": "fable-show-evidence",
};

let done = false;

export function migrateLocalStorage(): void {
  if (done || typeof window === "undefined") return;
  done = true;

  try {
    for (const [oldKey, newKey] of Object.entries(MIGRATIONS)) {
      const oldVal = localStorage.getItem(oldKey);
      // Only copy when the user hasn't already set the new key, so we never
      // clobber a fresh preference with a stale one.
      if (oldVal !== null && localStorage.getItem(newKey) === null) {
        localStorage.setItem(newKey, oldVal);
      }
      localStorage.removeItem(oldKey);
    }
  } catch {
    // localStorage can throw (private mode, quota). Migration is best-effort.
  }
}
