import { motion } from "framer-motion";
import { stats, statFallbacks } from "../data/achievements";
import { useGithubStats } from "../hooks/useGithubStats";
import { useLeetCodeStats } from "../hooks/useLeetCodeStats";
import SectionHeading from "../components/SectionHeading";
import Counter from "../components/Counter";
import GithubCard, { GITHUB_USERNAME } from "../components/GithubCard";
import LeetCodeCard, { LEETCODE_USERNAME } from "../components/LeetCodeCard";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Achievements() {
  const github = useGithubStats(GITHUB_USERNAME);
  const leetcode = useLeetCodeStats(LEETCODE_USERNAME);

  const liveValues = {
    problemsSolved: leetcode.data?.totalSolved ?? statFallbacks.problemsSolved,
    githubRepos: github.data?.publicRepos ?? statFallbacks.githubRepos,
    projectsBuilt: statFallbacks.projectsBuilt,
    technologiesLearned: statFallbacks.technologiesLearned,
  };

  return (
    <section id="achievements" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          method="GET"
          path="/stats"
          status={200}
          title="Achievements & coding journey"
          description="A quick pulse-check on the numbers — pulled live from GitHub and LeetCode where possible, with sensible fallbacks otherwise."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div key={s.id} variants={item}>
              <Counter target={liveValues[s.id]} suffix={s.suffix} label={s.label} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GithubCard status={github.status} data={github.data} />
          <LeetCodeCard status={leetcode.status} data={leetcode.data} />
        </div>
      </div>
    </section>
  );
}
