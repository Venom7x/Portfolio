export default function StatusBadge({ label = "Available for work" }) {
  return (
    <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 route-label text-ink/80">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-cyan" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
      </span>
      {label}
    </span>
  );
}
