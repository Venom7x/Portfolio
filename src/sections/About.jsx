import { motion } from "framer-motion";
import { FaReact, FaLock, FaMobileScreen, FaPuzzlePiece } from "react-icons/fa6";
import { SiSpringboot, SiMysql } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { profile, highlights } from "../data/profile";
import SectionHeading from "../components/SectionHeading";
import GlassCard from "../components/GlassCard";

const iconMap = {
  React: FaReact,
  "Spring Boot": SiSpringboot,
  "REST APIs": TbApi,
  Authentication: FaLock,
  MySQL: SiMysql,
  "Responsive Design": FaMobileScreen,
  "Problem Solving": FaPuzzlePiece,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          method="GET"
          path="/about"
          status={200}
          title="A developer who ships both halves of the stack"
          description="I'm a Full Stack Developer specializing in React, Spring Boot, and MySQL. I enjoy building scalable, clean, and responsive web applications with modern technologies — staying focused on speed, security and usability while I keep learning."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {highlights.map((h) => {
            const Icon = iconMap[h.title] ?? FaReact;
            return (
              <motion.div key={h.title} variants={item}>
                <GlassCard hover className="h-full p-6">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/15 to-violet/15 text-cyan-soft">
                    <Icon aria-hidden="true" className="text-lg" />
                  </span>
                  <h3 className="font-display text-base font-semibold text-ink">{h.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{h.detail}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mt-10 route-label flex flex-wrap items-center gap-2 text-faint"
        >
          <span className="text-cyan-soft">const</span>
          <span>location</span>
          <span>=</span>
          <span className="text-violet-soft">&quot;{profile.location}&quot;</span>
        </motion.div>
      </div>
    </section>
  );
}
