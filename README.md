# Venom — Full Stack Developer Portfolio

A modern, dark-mode-first portfolio built with React 19, Vite, Tailwind CSS v4, Framer Motion and React Router. Every section opens with an "API route" eyebrow (`GET /about · 200 OK`) — a small signature that ties the whole site back to the REST APIs Venom actually builds.

## Tech stack

- **React 19** + **Vite** — app shell & build tooling
- **Tailwind CSS v4** (`@tailwindcss/vite`) — styling, theme tokens live in `src/index.css`
- **Framer Motion** — page-load, scroll-reveal, hover and tilt animations
- **React Icons** — `fa6`, `si`, `tb`, `vsc` icon sets
- **React Router** — single home route + a styled 404
- **@emailjs/browser** — contact form delivery, no backend required

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build → dist/
npm run preview   # preview the production build locally
```

## Making it yours

All personal content lives in `src/data/`, so you shouldn't need to touch components to update text:

| File | Controls |
| --- | --- |
| `src/data/profile.js` | Name, title, bio, typing-effect roles, resume URL, email, location, "About" highlight cards |
| `src/data/nav.js` | Navbar items and their route-style labels |
| `src/data/skills.js` | Skill categories, proficiency percentages, icons |
| `src/data/projects.js` | Project cards — name, description, tech tags, GitHub/live links |
| `src/data/experience.js` | Experience timeline entries |
| `src/data/achievements.js` | Fallback stat numbers shown before/instead of live API data |

### GitHub & LeetCode usernames

- GitHub username: `src/components/GithubCard.jsx` → `GITHUB_USERNAME`
- LeetCode username: `src/components/LeetCodeCard.jsx` → `LEETCODE_USERNAME`

GitHub stats are fetched live from GitHub's public REST API (no auth needed). LeetCode has no official public API, so stats come from a best-effort community proxy (`leetcode-stats-api`) and gracefully fall back to just showing the profile link if that proxy is ever down.

### Contact form (EmailJS)

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. Create an Email Service and an Email Template with `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}` variables.
3. Fill in `src/utils/emailConfig.js` with your Service ID, Template ID and Public Key.

Until configured, submitting the form shows a friendly fallback message instead of silently failing.

### Resume

Drop your PDF into `public/resume.pdf` — the navbar and hero "Download Resume" buttons already point at `/resume.pdf`.

### Social links & email

Update `src/data/profile.js` (`socials`, `email`) — these feed the navbar, hero, footer and contact section automatically.

### SEO

- Meta tags, Open Graph and Twitter card tags are in `index.html`. Update the URLs once you have a real domain.
- Add a real `public/og-image.png` (1200×630) for link previews — a placeholder path is already wired up.
- `public/robots.txt` and `public/sitemap.xml` are included; update the domain in both.

## Project structure

```
src/
  components/   # reusable UI: buttons, cards, nav, cursor, particles, icons...
  sections/     # one file per page section (Hero, About, Skills, ...)
  hooks/        # typing effect, scrollspy, counters, GitHub/LeetCode fetchers
  data/         # all editable content
  utils/        # scroll helper, EmailJS config
```

## Accessibility & performance notes

- Respects `prefers-reduced-motion` globally (see `src/index.css` and individual components).
- Visible focus rings, skip-to-content link, semantic headings.
- Vendor and animation libraries are split into separate chunks for caching (`vite.config.js`).
"# Portfolio" 
