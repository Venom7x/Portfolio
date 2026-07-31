// Each nav item doubles as the "endpoint" shown in the route eyebrow
// above its section — the site's running joke that a full-stack dev's
// portfolio is, itself, just a set of well-documented routes.
export const navItems = [
  { id: "home", label: "Home", method: "GET", path: "/", status: 200 },
  { id: "about", label: "About", method: "GET", path: "/about", status: 200 },
  { id: "skills", label: "Skills", method: "GET", path: "/skills", status: 200 },
  { id: "projects", label: "Projects", method: "GET", path: "/projects", status: 200 },
  { id: "experience", label: "Experience", method: "GET", path: "/experience", status: 200 },
  { id: "achievements", label: "Achievements", method: "GET", path: "/stats", status: 200 },
  { id: "contact", label: "Contact", method: "POST", path: "/contact", status: 201 },
];
