import { useEffect, useState } from "react";

/**
 * LeetCode has no official public API, and its site does not send
 * CORS headers, so a browser can't fetch it directly. This hook makes
 * a best-effort call to a well-known community proxy
 * (leetcode-stats-api) and quietly falls back to `status: "error"`
 * on any failure — the Achievements/LeetCode sections should always
 * render the profile link in that case rather than an empty state.
 *
 * Swap the endpoint below for your own proxy if this one is ever
 * unavailable.
 */
export function useLeetCodeStats(username) {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    if (!username) return;
    let cancelled = false;
    const controller = new AbortController();

    async function run() {
      try {
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("LeetCode proxy request failed");

        const json = await res.json();
        if (json.status !== "success" && json.status !== "success ") {
          // Some deployments omit `status`; only bail if it's explicitly an error.
          if (json.status === "error") throw new Error("LeetCode proxy returned an error");
        }

        if (cancelled) return;
        setState({
          status: "success",
          data: {
            totalSolved: json.totalSolved ?? null,
            easySolved: json.easySolved ?? null,
            mediumSolved: json.mediumSolved ?? null,
            hardSolved: json.hardSolved ?? null,
            ranking: json.ranking ?? null,
            acceptanceRate: json.acceptanceRate ?? null,
          },
        });
      } catch (err) {
        if (!cancelled) {
          console.warn("LeetCode stats unavailable:", err.message);
          setState({ status: "error", data: null });
        }
      }
    }

    run();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [username]);

  return state;
}
