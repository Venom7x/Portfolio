import { motion } from "framer-motion";
import { skillGroups } from "../data/skills";
import SectionHeading from "../components/SectionHeading";
import GlassCard from "../components/GlassCard";
import SkillBar from "../components/SkillBar";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  return (
    <section id="skills" className="relative bg-bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          method="GET"
          path="/skills"
          status={200}
          title="What I build with"
          description="A practical toolkit assembled around one goal: ship secure, maintainable full-stack applications — not just individual technologies collected for their own sake."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.id} variants={item}>
              <GlassCard hover className="h-full p-6 sm:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-ink">{group.title}</h3>
                  <span className="route-label text-faint">{group.route}</span>
                </div>
                <div className="space-y-5">
                  {group.skills.map((skill) => (
                    <SkillBar key={skill.name} {...skill} />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
