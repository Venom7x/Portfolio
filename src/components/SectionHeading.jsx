import { motion } from "framer-motion";

const methodColor = {
  GET: "text-cyan-soft",
  POST: "text-violet-soft",
};

/**
 * Every section opens with a small "request line" — method, path and
 * status — before the human-readable title. It's the throughline that
 * ties the whole site back to what Venom actually builds: documented,
 * predictable REST endpoints.
 */
export default function SectionHeading({
  method = "GET",
  path,
  status = 200,
  title,
  description,
  align = "left",
}) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} max-w-2xl`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5 }}
        className="route-label flex items-center gap-2 mb-4"
      >
        <span className={methodColor[method] ?? "text-cyan-soft"}>{method}</span>
        <span>{path}</span>
        <span className="text-faint">·</span>
        <span className="text-faint">{status} {status < 300 ? "OK" : ""}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="text-3xl sm:text-4xl font-semibold text-ink"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-4 text-muted leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
