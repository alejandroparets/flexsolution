import { useEffect } from "react";

const KEY = "fx_tracked";

export function useTrackVisit() {
  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, "1");
    const BASE = import.meta.env.BASE_URL ?? "/";
    fetch(`${BASE}api/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: window.location.pathname }),
    }).catch(() => {});
  }, []);
}
