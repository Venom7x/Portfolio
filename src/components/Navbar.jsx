import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaXmark, FaDownload } from "react-icons/fa6";
import { navItems } from "../data/nav";
import { profile } from "../data/profile";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToSection } from "../utils/scrollTo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(navItems.map((item) => item.id));
  const activeItem = navItems.find((item) => item.id === activeId) ?? navItems[0];

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleNavClick(id) {
    setMenuOpen(false);
    scrollToSection(id);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-all duration-300 ${
        scrolled ? "glass border-b border-border/60" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          className="font-display text-lg font-semibold text-ink"
        >
          <span className="text-cyan-soft">&lt;</span>
          {profile.name}
          <span className="text-violet-soft">/&gt;</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeId === item.id ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {activeId === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-surface-hi"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <span className="route-label hidden xl:inline-flex items-center gap-1.5">
            <span className={activeItem.method === "POST" ? "text-violet-soft" : "text-cyan-soft"}>
              {activeItem.method}
            </span>
            {activeItem.path}
          </span>
          <a
            href={profile.resumeUrl}
            download
            className="btn-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-4 py-2 text-sm font-semibold text-bg hover:brightness-110"
          >
            <FaDownload aria-hidden="true" />
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="glass flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
        >
          {menuOpen ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="glass overflow-hidden border-t border-border/60 lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`route-label flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium ${
                      activeId === item.id ? "bg-surface-hi text-ink" : "text-muted"
                    }`}
                  >
                    <span className="font-body">{item.label}</span>
                    <span className={item.method === "POST" ? "text-violet-soft" : "text-cyan-soft"}>
                      {item.path}
                    </span>
                  </button>
                </li>
              ))}
              <a
                href={profile.resumeUrl}
                download
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-4 py-3 text-sm font-semibold text-bg"
              >
                <FaDownload aria-hidden="true" />
                Download Resume
              </a>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
