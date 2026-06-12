// Server-only Gemini wrapper. The AI does LANGUAGE only (message copy, narration);
// all facts/numbers come from the database. Every call is defensive: on missing
// key, timeout, malformed output, or any error it returns null so callers fall
// back to grounded templates. We never let raw LLM output drive control flow.

import process from "node:process";
import { GoogleGenAI } from "@google/genai";

const TIMEOUT_MS = 8000;

function client(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}
function model(): string {
  return process.env.GEMINI_MODEL || "gemini-2.5-flash";
}

function withTimeout<T>(p: Promise<T>): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, rej) => setTimeout(() => rej(new Error("gemini timeout")), TIMEOUT_MS)),
  ]);
}

export async function geminiText(prompt: string): Promise<string | null> {
  const ai = client();
  if (!ai) return null;
  try {
    const res = await withTimeout(ai.models.generateContent({ model: model(), contents: prompt }));
    const text = (res as { text?: string }).text;
    return text && text.trim() ? text.trim() : null;
  } catch (e) {
    console.warn("[gemini] text generation failed, using fallback:", (e as Error).message);
    return null;
  }
}

// Ask for strict JSON and parse defensively (strips ``` fences). Returns null on
// any parse/shape failure so the caller can fall back.
export async function geminiJSON<T = unknown>(prompt: string): Promise<T | null> {
  const raw = await geminiText(prompt + "\n\nRespond with ONLY valid minified JSON, no markdown, no prose.");
  if (!raw) return null;
  try {
    const cleaned = raw.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    return JSON.parse(cleaned) as T;
  } catch {
    return null;
  }
}

export function geminiEnabled(): boolean {
  return !!process.env.GEMINI_API_KEY;
}
