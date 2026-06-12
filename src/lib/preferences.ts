import { useEffect, useState } from "react";
import { migrateLocalStorage } from "./storage-migration";

const KEY = "fable-show-evidence";
const EVENT = "fable-show-evidence-change";

function read(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "true";
}

export function setShowEvidencePref(value: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, String(value));
  window.dispatchEvent(new CustomEvent(EVENT));
}

/** Global "Show evidence" preference, synced across components and tabs. */
export function useShowEvidencePref(): [boolean, (v: boolean) => void] {
  const [value, setValue] = useState(false);

  useEffect(() => {
    migrateLocalStorage();
    setValue(read());
    const handler = () => setValue(read());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return [value, setShowEvidencePref];
}
