import { motion } from "framer-motion";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "btn-glow bg-gradient-to-r from-cyan to-violet text-bg font-semibold hover:brightness-110",
  secondary: "glass text-ink hover:border-cyan-soft/50 hover:text-cyan-soft",
  ghost: "text-muted hover:text-ink",
};

const MotionA = motion.create("a");
const MotionButton = motion.create("button");

/**
 * Polymorphic button: renders an <a> when `href` is provided, a
 * <button> by default, or any custom component (e.g. React Router's
 * `Link`) passed via `as`. No extra wrapper element, so width/layout
 * classes passed via `className` behave as expected.
 */
export default function Button({
  as,
  href,
  variant = "primary",
  icon: Icon,
  iconPosition = "left",
  className = "",
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`;
  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon aria-hidden="true" className="text-base" />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon aria-hidden="true" className="text-base" />}
    </>
  );

  const isExternal = href && href.startsWith("http");

  let MotionComponent;
  if (typeof as === "string" || as === undefined) {
    const tag = as ?? (href ? "a" : "button");
    MotionComponent = tag === "a" ? MotionA : MotionButton;
  } else {
    // Custom component (e.g. react-router-dom's Link) — wrap once per
    // render is fine here since Button instances are static per usage.
    MotionComponent = motion.create(as);
  }

  return (
    <MotionComponent
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={classes}
      {...props}
    >
      {content}
    </MotionComponent>
  );
}
