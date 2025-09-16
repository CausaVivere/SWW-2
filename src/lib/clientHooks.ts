"use client";
import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const isBrowser = typeof window !== "undefined";

  const read = (): T => {
    if (!isBrowser) return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw != null ? (JSON.parse(raw) as T) : initialValue;
    } catch (err) {
      console.error("useLocalStorage read error:", err);
      return initialValue;
    }
  };

  const [stored, setStored] = useState<T>(initialValue);

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      let next: T;
      if (typeof value === "function") {
        next = (value as (prev: T) => T)(stored);
      } else {
        next = value;
      }
      setStored(next);
      if (isBrowser) {
        const storable = next ?? null;
        window.localStorage.setItem(key, JSON.stringify(storable));
      }
    } catch (err) {
      console.error("useLocalStorage write error:", err);
    }
  };

  useEffect(() => {
    setStored(read());
  }, [key]);

  return [stored, setValue];
}
