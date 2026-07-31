import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { socials } from "../data/profile";

const links = [
  { href: socials.github, label: "GitHub", Icon: FaGithub },
  { href: socials.leetcode, label: "LeetCode", Icon: SiLeetcode },
  { href: socials.linkedin, label: "LinkedIn", Icon: FaLinkedin },
  { href: socials.email, label: "Email", Icon: FaEnvelope },
];

export default function SocialIcons({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={label}
          className="glass flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:text-cyan-soft hover:border-cyan-soft/40"
        >
          <Icon aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
