// Accounts for the sticky navbar's height so anchored sections
// don't end up hidden underneath it.
export const NAVBAR_OFFSET = 76;

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}
