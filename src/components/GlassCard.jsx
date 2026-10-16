import { motion } from "framer-motion";

export default function GlassCard({
  as: Tag = "div",
  hover = false,
  className = "",
  children,
  ...props
}) {
  const Component = motion.create(Tag);
  return (
    <Component
      className={`glass rounded-2xl ${className}`}
      whileHover={hover ? { y: -6, borderColor: "rgba(127,227,217,0.35)" } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      {...props}
    >
      {children}
    </Component>
  );
}
