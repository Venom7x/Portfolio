import { profile } from "../data/profile";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-bg-soft">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-10 sm:px-8 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold text-ink">
            <span className="text-cyan-soft">&lt;</span>
            {profile.name}
            <span className="text-violet-soft">/&gt;</span>
          </p>
          <p className="route-label mt-1 text-faint">200 OK · built with React</p>
        </div>

        <SocialIcons />

        <p className="text-center text-sm text-muted md:text-right">
          © {year} {profile.name}. Made with ❤️ using React.
        </p>
      </div>
    </footer>
  );
}
