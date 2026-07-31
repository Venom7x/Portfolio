import { motion } from "framer-motion";
import TechIcon from "./TechIcon";

export default function SkillBar({ name, level, icon }) {
  return (
    <div className="group">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2.5 text-sm font-medium text-ink">
          <TechIcon name={icon} className="text-lg text-cyan-soft transition-transform duration-300 group-hover:scale-110" />
          {name}
        </span>
        <span className="route-label text-faint">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-hi">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="h-full rounded-full bg-gradient-to-r from-cyan to-violet"
        />
      </div>
    </div>
  );
}
