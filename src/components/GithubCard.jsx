import { FaGithub, FaCodeBranch, FaUsers, FaStar, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { socials } from "../data/profile";
import GlassCard from "./GlassCard";
import Button from "./Button";

export const GITHUB_USERNAME = "Venom7x";

export default function GithubCard({ status, data }) {
  return (
    <GlassCard className="flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/15 to-violet/15 text-cyan-soft">
          <FaGithub aria-hidden="true" className="text-xl" />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">GitHub</h3>
          <p className="route-label text-faint">@{GITHUB_USERNAME}</p>
        </div>
      </div>

      {status === "loading" && (
        <div className="mt-6 space-y-3" aria-label="Loading GitHub stats">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-4 w-full animate-pulse rounded-full bg-surface-hi" />
          ))}
        </div>
      )}

      {status === "success" && data && (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="glass rounded-xl p-4 text-center">
              <p className="flex items-center justify-center gap-1.5 font-display text-2xl font-semibold text-ink">
                <FaCodeBranch aria-hidden="true" className="text-sm text-cyan-soft" />
                {data.publicRepos}
              </p>
              <p className="mt-1 text-xs text-muted">Repositories</p>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <p className="flex items-center justify-center gap-1.5 font-display text-2xl font-semibold text-ink">
                <FaUsers aria-hidden="true" className="text-sm text-violet-soft" />
                {data.followers}
              </p>
              <p className="mt-1 text-xs text-muted">Followers</p>
            </div>
          </div>

          {data.pinned.length > 0 && (
            <ul className="mt-5 space-y-2">
              {data.pinned.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm transition-colors hover:text-cyan-soft"
                  >
                    <span className="truncate font-medium text-ink">{repo.name}</span>
                    <span className="flex shrink-0 items-center gap-1 text-xs text-muted">
                      <FaStar aria-hidden="true" className="text-yellow-400/80" />
                      {repo.stars}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {status === "error" && (
        <p className="mt-6 text-sm text-muted">
          Live GitHub stats aren&rsquo;t available right now — check out the full profile instead.
        </p>
      )}

      <div className="mt-auto pt-6">
        <Button href={socials.github} variant="secondary" icon={FaArrowUpRightFromSquare} iconPosition="right" className="w-full justify-center">
          View GitHub Profile
        </Button>
      </div>
    </GlassCard>
  );
}
