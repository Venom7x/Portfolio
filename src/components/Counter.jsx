import { useReducedMotion } from "framer-motion";
import { useCounterOnView } from "../hooks/useCounterOnView";

export default function Counter({ target, suffix = "", label }) {
  const prefersReducedMotion = useReducedMotion();
  const [ref, value] = useCounterOnView(target, { reducedMotion: prefersReducedMotion });

  return (
    <div ref={ref} className="glass rounded-2xl px-6 py-8 text-center">
      <p className="font-display text-4xl font-semibold text-gradient sm:text-5xl">
        {value}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  );
}
