import { motion, useReducedMotion } from "framer-motion";
import { FaArrowDown, FaDownload } from "react-icons/fa6";
import { profile } from "../data/profile";
import { useTypingEffect } from "../hooks/useTypingEffect";
import { scrollToSection } from "../utils/scrollTo";
import GradientBlobs from "../components/GradientBlobs";
import ParticleField from "../components/ParticleField";
import StatusBadge from "../components/StatusBadge";
import SocialIcons from "../components/SocialIcons";
import Button from "../components/Button";
import DevIllustration from "../components/DevIllustration";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const role = useTypingEffect(profile.roles, { reducedMotion: prefersReducedMotion });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <GradientBlobs />
      <ParticleField className="opacity-70" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 lg:order-1"
        >
          <StatusBadge label={profile.status} />

          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
            Hello, I&rsquo;m <span className="text-gradient">{profile.name}</span>
          </h1>

          <p className="mt-4 font-display text-xl text-muted sm:text-2xl">
            {profile.title}
          </p>

          <div className="mt-3 flex h-8 items-center route-label text-lg text-cyan-soft">
            <span aria-hidden="true">&gt;_&nbsp;</span>
            <span aria-live="polite">{role}</span>
            <span aria-hidden="true" className="ml-1 inline-block h-5 w-[2px] animate-caret bg-cyan-soft" />
          </div>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
            {profile.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={profile.resumeUrl} download icon={FaDownload}>
              Download Resume
            </Button>
            <Button
              variant="secondary"
              as="button"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
            </Button>
          </div>

          <SocialIcons className="mt-9" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="order-1 lg:order-2"
        >
          <DevIllustration />
        </motion.div>
      </div>

      <button
        onClick={() => scrollToSection("about")}
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint sm:flex"
      >
        <span className="route-label">scroll</span>
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <FaArrowDown aria-hidden="true" />
        </motion.span>
      </button>
    </section>
  );
}
