import { useEffect, useState } from "react";

/**
 * Pulls public profile stats from GitHub's REST API (no auth required,
 * CORS-enabled, so this works directly from the browser). If the
 * request fails for any reason — offline, rate-limited, blocked — the
 * caller should fall back to showing just the profile link.
 */
export function useGithubStats(username) {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    if (!username) return;
    let cancelled = false;
    const controller = new AbortController();

    async function run() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
            signal: controller.signal,
          }),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API request failed");

        const user = await userRes.json();
        const repos = await reposRes.json();

        if (cancelled) return;

        setState({
          status: "success",
          data: {
            followers: user.followers ?? 0,
            publicRepos: user.public_repos ?? (Array.isArray(repos) ? repos.length : 0),
            avatarUrl: user.avatar_url ?? null,
            bio: user.bio ?? null,
            pinned: Array.isArray(repos)
              ? [...repos]
                  .sort((a, b) => b.stargazers_count - a.stargazers_count)
                  .slice(0, 4)
                  .map((r) => ({
                    name: r.name,
                    description: r.description,
                    stars: r.stargazers_count,
                    url: r.html_url,
                    language: r.language,
                  }))
              : [],
          },
        });
      } catch (err) {
        if (!cancelled) {
          console.warn("GitHub stats unavailable:", err.message);
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
