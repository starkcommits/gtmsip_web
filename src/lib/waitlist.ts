import { useState, useEffect } from "react";
import { trackEvent } from "./analytics";

export interface WaitlistEntry {
  id?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  organization: string;
  joinedAt: string;
  spotNumber: number;
}

const STORAGE_COUNT_KEY = "gtmsip_waitlist_count_v2";
const STORAGE_ENTRIES_KEY = "gtmsip_waitlist_entries_v2";
const DEFAULT_INITIAL_COUNT = 0;
export const MAX_WAITLIST_SPOTS = 100;

// Singleton cache to deduplicate simultaneous network calls across components
let activeFetchPromise: Promise<number | null> | null = null;
let cachedServerCount: number | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60000; // 60 seconds

export function getWaitlistCount(): number {
  if (typeof window === "undefined") return DEFAULT_INITIAL_COUNT;
  try {
    const rawEntries = localStorage.getItem(STORAGE_ENTRIES_KEY);
    if (rawEntries) {
      const parsed = JSON.parse(rawEntries);
      if (Array.isArray(parsed)) return Math.min(parsed.length, MAX_WAITLIST_SPOTS);
    }
    const raw = localStorage.getItem(STORAGE_COUNT_KEY);
    if (raw) {
      const parsed = parseInt(raw, 10);
      if (!isNaN(parsed) && parsed >= 0) return Math.min(parsed, MAX_WAITLIST_SPOTS);
    }
  } catch {
    /* storage unavailable */
  }
  return DEFAULT_INITIAL_COUNT;
}

/**
 * Deduplicated server fetcher.
 * Guarantees only 1 network call occurs even if multiple components mount simultaneously.
 */
export function fetchServerWaitlistCount(): Promise<number | null> {
  const now = Date.now();
  if (cachedServerCount !== null && now - lastFetchTime < CACHE_TTL_MS) {
    return Promise.resolve(cachedServerCount);
  }

  if (activeFetchPromise) {
    return activeFetchPromise;
  }

  activeFetchPromise = fetch("/api/waitlist")
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (Array.isArray(data)) {
        const count = Math.min(data.length, MAX_WAITLIST_SPOTS);
        cachedServerCount = count;
        lastFetchTime = Date.now();
        try {
          localStorage.setItem(STORAGE_COUNT_KEY, count.toString());
          localStorage.setItem(STORAGE_ENTRIES_KEY, JSON.stringify(data));
        } catch {}
        return count;
      }
      return null;
    })
    .catch(() => null)
    .finally(() => {
      activeFetchPromise = null;
    });

  return activeFetchPromise;
}

export async function saveWaitlistEntry(data: {
  fullName: string;
  phoneNumber: string;
  email: string;
  organization: string;
}): Promise<{ spotNumber: number }> {
  const currentCount = getWaitlistCount();
  const nextSpot = Math.min(currentCount + 1, MAX_WAITLIST_SPOTS);

  const localEntry: WaitlistEntry = {
    id: `lead_${Date.now()}`,
    ...data,
    joinedAt: new Date().toISOString(),
    spotNumber: nextSpot,
  };

  // 1. Immediately persist locally
  try {
    const existingRaw = localStorage.getItem(STORAGE_ENTRIES_KEY);
    const entries: WaitlistEntry[] = existingRaw ? JSON.parse(existingRaw) : [];
    entries.push(localEntry);
    localStorage.setItem(STORAGE_ENTRIES_KEY, JSON.stringify(entries));
    localStorage.setItem(STORAGE_COUNT_KEY, entries.length.toString());
    cachedServerCount = entries.length;
    lastFetchTime = Date.now();
  } catch {
    /* storage unavailable */
  }

  // Track lead conversion in Google Analytics & Tag Manager
  trackEvent("generate_lead", {
    spot_number: nextSpot,
    organization: data.organization,
  });

  // 2. Persist to server JSON store
  try {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.spotNumber) {
        cachedServerCount = json.count;
        window.dispatchEvent(
          new CustomEvent("gtmsip-waitlist-updated", { detail: { count: json.count } }),
        );
        return { spotNumber: json.spotNumber };
      }
    }
  } catch {
    /* offline fallback */
  }

  window.dispatchEvent(
    new CustomEvent("gtmsip-waitlist-updated", { detail: { count: nextSpot } }),
  );
  return { spotNumber: nextSpot };
}

/** React hook for synchronized count across all components */
export function useWaitlistCount() {
  const [count, setCount] = useState<number>(getWaitlistCount);

  useEffect(() => {
    fetchServerWaitlistCount().then((serverCount) => {
      if (typeof serverCount === "number") {
        setCount(serverCount);
      }
    });

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ count: number }>;
      if (typeof customEvent.detail?.count === "number") {
        setCount(customEvent.detail.count);
      } else {
        setCount(getWaitlistCount());
      }
    };

    window.addEventListener("gtmsip-waitlist-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("gtmsip-waitlist-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return { count, total: MAX_WAITLIST_SPOTS, remaining: Math.max(0, MAX_WAITLIST_SPOTS - count) };
}

/** Export stored waitlist as downloadable CSV for Google Sheets / Excel */
export function exportWaitlistCSV() {
  try {
    const raw = localStorage.getItem(STORAGE_ENTRIES_KEY);
    const entries: WaitlistEntry[] = raw ? JSON.parse(raw) : [];
    if (!entries.length) {
      alert("No waitlist entries recorded yet.");
      return;
    }
    const headers = [
      "Spot Number",
      "Full Name",
      "Phone Number",
      "Work Email",
      "Organization",
      "Joined Date",
    ];
    const rows = entries.map((e) => [
      e.spotNumber,
      `"${e.fullName.replace(/"/g, '""')}"`,
      `"${e.phoneNumber.replace(/"/g, '""')}"`,
      `"${e.email.replace(/"/g, '""')}"`,
      `"${e.organization.replace(/"/g, '""')}"`,
      e.joinedAt,
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `gtmsip_waitlist_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error("Export error:", err);
  }
}

/** Global Modal State Dispatcher */
export function openWaitlistModal() {
  if (typeof window !== "undefined") {
    trackEvent("click_waitlist_button");
    window.dispatchEvent(new CustomEvent("gtmsip-open-waitlist-modal"));
  }
}

export function useWaitlistModalListener(onOpen: () => void) {
  useEffect(() => {
    const handler = () => onOpen();
    window.addEventListener("gtmsip-open-waitlist-modal", handler);
    return () => window.removeEventListener("gtmsip-open-waitlist-modal", handler);
  }, [onOpen]);
}
