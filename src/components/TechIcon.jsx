import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJava,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaLayerGroup,
  FaLock,
  FaCode,
} from "react-icons/fa6";
import {
  SiJavascript,
  SiTailwindcss,
  SiSpringboot,
  SiSpringsecurity,
  SiHibernate,
  SiMysql,
  SiPostman,
  SiApachemaven,
  SiIntellijidea,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

const registry = {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJava,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaLayerGroup,
  FaLock,
  FaCode,
  SiJavascript,
  SiTailwindcss,
  SiSpringboot,
  SiSpringsecurity,
  SiHibernate,
  SiMysql,
  SiPostman,
  SiApachemaven,
  SiIntellijidea,
  TbApi,
  VscVscode,
};

export default function TechIcon({ name, className = "" }) {
  const Icon = registry[name] ?? FaCode;
  return <Icon aria-hidden="true" className={className} />;
}
