export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend",
    route: "/skills/frontend",
    skills: [
      { name: "React", level: 90, icon: "FaReact" },
      { name: "JavaScript", level: 88, icon: "SiJavascript" },
      { name: "HTML5", level: 95, icon: "FaHtml5" },
      { name: "CSS3", level: 90, icon: "FaCss3Alt" },
      { name: "Tailwind CSS", level: 92, icon: "SiTailwindcss" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    route: "/skills/backend",
    skills: [
      { name: "Java", level: 88, icon: "FaJava" },
      { name: "Spring Boot", level: 90, icon: "SiSpringboot" },
      { name: "Spring Security", level: 82, icon: "SiSpringsecurity" },
      { name: "REST API", level: 92, icon: "TbApi" },
      { name: "JWT Authentication", level: 85, icon: "FaLock" },
      { name: "Hibernate", level: 80, icon: "SiHibernate" },
      { name: "JPA", level: 80, icon: "FaLayerGroup" },
    ],
  },
  {
    id: "database",
    title: "Database",
    route: "/skills/database",
    skills: [{ name: "MySQL", level: 88, icon: "SiMysql" }],
  },
  {
    id: "tools",
    title: "Tools",
    route: "/skills/tools",
    skills: [
      { name: "Git", level: 90, icon: "FaGitAlt" },
      { name: "GitHub", level: 90, icon: "FaGithub" },
      { name: "Postman", level: 88, icon: "SiPostman" },
      { name: "Docker", level: 78, icon: "FaDocker" },
      { name: "Maven", level: 82, icon: "SiApachemaven" },
      { name: "IntelliJ IDEA", level: 90, icon: "SiIntellijidea" },
      { name: "VS Code", level: 92, icon: "VscVscode" },
    ],
  },
];
