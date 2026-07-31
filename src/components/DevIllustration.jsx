import { motion, useReducedMotion } from "framer-motion";
import { FaReact, FaJava, FaDocker } from "react-icons/fa6";
import { SiSpringboot, SiMysql } from "react-icons/si";

const orbitIcons = [
  { Icon: FaReact, color: "#4fd1c5", size: 320, duration: 22, delay: 0 },
  { Icon: SiSpringboot, color: "#7c6ff0", size: 320, duration: 26, delay: -6, reverse: true },
  { Icon: FaJava, color: "#f0af6f", size: 230, duration: 18, delay: -3 },
  { Icon: SiMysql, color: "#6fa8f0", size: 230, duration: 20, delay: -10, reverse: true },
  { Icon: FaDocker, color: "#7fe3d9", size: 150, duration: 15, delay: -1 },
];

const codeLines = [60, 85, 40, 70, 50, 30];

/**
 * An abstract "workstation" in place of a personal photo: a glass
 * code window at the center with animated lines, orbited by the
 * technologies Venom actually builds with. Entirely hand-built SVG
 * and CSS/Framer Motion — no external image assets.
 */
export default function DevIllustration() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto flex h-[340px] w-full max-w-[420px] items-center justify-center sm:h-[420px]">
      {/* Orbit rings + icons */}
      {orbitIcons.map(({ Icon, color, size, duration, delay, reverse }, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-white/5"
          style={{ width: size, height: size }}
        >
          <motion.div
            className="absolute inset-0"
            animate={prefersReducedMotion ? undefined : { rotate: reverse ? -360 : 360 }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration, repeat: Infinity, ease: "linear", delay }
            }
          >
            <span
              className="glass absolute -top-4 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full"
              style={{ color }}
            >
              <Icon aria-hidden="true" className="text-lg" />
            </span>
          </motion.div>
        </div>
      ))}

      {/* Central code window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="glass relative z-10 w-56 rounded-2xl p-4 sm:w-64"
      >
        <div className="flex items-center gap-1.5 border-b border-white/5 pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ef7f6f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f0c96f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#6fd47f]" />
          <span className="route-label ml-auto text-faint">App.jsx</span>
        </div>
        <div className="mt-3 space-y-2.5">
          {codeLines.map((width, i) => (
            <motion.div
              key={i}
              initial={{ width: 0 }}
              animate={{ width: `${width}%` }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: "easeOut" }}
              className="h-2 rounded-full"
              style={{
                background:
                  i % 3 === 0
                    ? "linear-gradient(90deg, var(--color-cyan), var(--color-cyan-soft))"
                    : i % 3 === 1
                      ? "linear-gradient(90deg, var(--color-violet), var(--color-violet-soft))"
                      : "var(--color-border)",
              }}
            />
          ))}
        </div>
        <span
          aria-hidden="true"
          className="mt-1 inline-block h-4 w-1.5 animate-caret bg-cyan-soft align-middle"
        />
      </motion.div>

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-cyan/10 to-violet/10 blur-3xl"
      />
    </div>
  );
}
