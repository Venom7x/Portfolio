import { FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";
import TiltCard from "./TiltCard";

/**
 * Projects use a hand-drawn abstract "browser window" preview instead
 * of a screenshot placeholder — swap the <ProjectPreview> markup for a
 * real <img> once you have screenshots.
 */
function ProjectPreview({ name, accent }) {
  const [from, to] = accent;
  const initials = name
    .split(/(?=[A-Z])/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="relative h-44 overflow-hidden rounded-t-2xl border-b border-border">
      <div
        className="absolute inset-0 opacity-90"
        style={{ background: `linear-gradient(135deg, ${from}33, ${to}22)` }}
      />
      <div className="absolute inset-0 flex flex-col">
        <div className="flex items-center gap-1.5 border-b border-white/5 bg-black/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="route-label ml-2 text-faint">localhost:3000</span>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <span
            className="font-display text-4xl font-bold"
            style={{ color: from, textShadow: `0 0 40px ${from}55` }}
          >
            {initials}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project }) {
  return (
    <TiltCard className="flex h-full flex-col overflow-hidden">
      <ProjectPreview name={project.name} accent={project.accent} />

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-ink">{project.name}</h3>
        <p className="route-label mt-1 text-cyan-soft">{project.tagline}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-cyan-soft"
          >
            <FaGithub aria-hidden="true" />
            Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-4 py-2 text-sm font-semibold text-bg hover:brightness-110"
          >
            <FaArrowUpRightFromSquare aria-hidden="true" />
            Live
          </a>
        </div>
      </div>
    </TiltCard>
  );
}
