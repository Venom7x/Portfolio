import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * A small dot + trailing ring that follows the pointer. Only mounts on
 * devices with a fine pointer (mouse/trackpad) — never on touch — and
 * bows out entirely when reduced motion is preferred.
 */
export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 30 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFinePointer && !prefersReducedMotion);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    function handleMove(e) {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target;
      setHoveringInteractive(Boolean(target.closest("a, button, input, textarea, [role='button']")));
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <motion.div
        style={{ x, y }}
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-soft"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hoveringInteractive ? 44 : 28,
          height: hoveringInteractive ? 44 : 28,
          opacity: hoveringInteractive ? 0.9 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-soft/70"
      />
    </div>
  );
}
