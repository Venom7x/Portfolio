import { motion } from "framer-motion";
import TechIcon from "./TechIcon";

export default function TimelineItem({ item, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="relative pl-10 sm:pl-14"
    >
      {/* Rail */}
      {!isLast && (
        <span className="absolute left-[7px] top-6 h-full w-px bg-gradient-to-b from-cyan/50 to-transparent sm:left-[11px]" />
      )}
      <span
        className={`absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full sm:h-6 sm:w-6 ${
          item.current ? "bg-gradient-to-r from-cyan to-violet" : "bg-surface-hi border border-border"
        }`}
      >
        {item.current && <span className="h-1.5 w-1.5 rounded-full bg-bg" />}
      </span>

      <div className="glass rounded-2xl p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="font-display text-xl font-semibold text-ink">{item.role}</h3>
          {item.current && (
            <span className="route-label rounded-full bg-cyan/10 px-2.5 py-0.5 text-cyan-soft">current</span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted">
          {item.org} · <span className="route-label text-faint">{item.period}</span>
        </p>

        <ul className="mt-4 space-y-2">
          {item.points.map((point) => (
            <li key={point} className="flex gap-2 text-sm leading-relaxed text-muted">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-soft" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.tech.map((tech) => (
            <span
              key={tech}
              className="route-label flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-muted"
            >
              <TechIcon name={techToIcon[tech]} />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Best-effort icon lookup for free-form tech tags used in experience data.
const techToIcon = {
  React: "FaReact",
  "Spring Boot": "SiSpringboot",
  MySQL: "SiMysql",
  "REST APIs": "TbApi",
  Authentication: "FaLock",
  Docker: "FaDocker",
};
