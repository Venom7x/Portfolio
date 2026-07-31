import { motion, useReducedMotion } from "framer-motion";
import { SiLeetcode } from "react-icons/si";
import { FaTrophy, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { socials } from "../data/profile";
import GlassCard from "./GlassCard";
import Button from "./Button";

export const LEETCODE_USERNAME = "Escanor7DS";

const difficultyColor = {
  Easy: "var(--color-cyan-soft)",
  Medium: "#f0af6f",
  Hard: "#ef7f6f",
};

export default function LeetCodeCard({ status, data }) {
  const prefersReducedMotion = useReducedMotion();

  const breakdown = data
    ? [
        { label: "Easy", value: data.easySolved },
        { label: "Medium", value: data.mediumSolved },
        { label: "Hard", value: data.hardSolved },
      ]
    : [];

  const maxValue = Math.max(1, ...breakdown.map((b) => b.value ?? 0));

  return (
    <GlassCard className="flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/15 to-violet/15 text-violet-soft">
          <SiLeetcode aria-hidden="true" className="text-xl" />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">LeetCode</h3>
          <p className="route-label text-faint">@{LEETCODE_USERNAME}</p>
        </div>

        {/* Small ambient coding glyph */}
        <motion.span
          aria-hidden="true"
          animate={prefersReducedMotion ? undefined : { rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="route-label ml-auto text-2xl text-faint"
        >
          {"{ }"}
        </motion.span>
      </div>

      {status === "loading" && (
        <div className="mt-6 space-y-3" aria-label="Loading LeetCode stats">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-4 w-full animate-pulse rounded-full bg-surface-hi" />
          ))}
        </div>
      )}

      {status === "success" && data && (
        <>
          <div className="mt-6 glass rounded-xl p-4 text-center">
            <p className="font-display text-3xl font-semibold text-gradient">{data.totalSolved}</p>
            <p className="mt-1 text-xs text-muted">Problems Solved</p>
          </div>

          <div className="mt-5 space-y-3">
            {breakdown.map((b) => (
              <div key={b.label}>
                <div className="mb-1 flex justify-between text-xs text-muted">
                  <span>{b.label}</span>
                  <span>{b.value ?? "—"}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hi">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((b.value ?? 0) / maxValue) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: difficultyColor[b.label] }}
                  />
                </div>
              </div>
            ))}
          </div>

          {data.ranking && (
            <p className="route-label mt-4 text-faint">rank #{data.ranking.toLocaleString()}</p>
          )}
        </>
      )}

      {/* Contest card — the public API this site queries doesn't expose
          contest rating, so this stays an honest call-to-action rather
          than a fabricated number. */}
      <div className="mt-5 glass flex items-center gap-3 rounded-xl p-4">
        <FaTrophy aria-hidden="true" className="text-lg text-yellow-400/80" />
        <div className="flex-1">
          <p className="text-sm font-medium text-ink">Contest history</p>
          <p className="text-xs text-muted">View rating & rank on the full profile</p>
        </div>
      </div>

      {status === "error" && (
        <p className="mt-6 text-sm text-muted">
          Live LeetCode stats aren&rsquo;t available right now — the profile has the full picture.
        </p>
      )}

      <div className="mt-auto pt-6">
        <Button href={socials.leetcode} variant="secondary" icon={FaArrowUpRightFromSquare} iconPosition="right" className="w-full justify-center">
          View LeetCode Profile
        </Button>
      </div>
    </GlassCard>
  );
}
