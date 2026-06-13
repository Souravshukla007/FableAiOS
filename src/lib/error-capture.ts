// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
  // Always log immediately so the real stack reaches Vercel's runtime logs,
  // even if the request handler never gets a chance to consume it.
  console.error("[error-capture]", error);
}

// Browser/web runtimes (and some edge runtimes) expose addEventListener.
if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

// Node serverless (Vercel functions) has no addEventListener — the browser
// listeners above never fire there. Hook the Node process events instead so
// uncaught SSR throws are captured and logged with their real stack.
const proc = (globalThis as { process?: NodeJS.Process }).process;
if (proc && typeof proc.on === "function") {
  proc.on("uncaughtException", (error) => record(error));
  proc.on("unhandledRejection", (reason) => record(reason));
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
