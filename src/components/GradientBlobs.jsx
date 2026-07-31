/**
 * Soft, slow-drifting gradient blobs used behind hero-style sections.
 * Purely decorative — hidden from assistive tech and disabled visually
 * (via the global reduced-motion rule in index.css) when requested.
 */
export default function GradientBlobs({ className = "" }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-cyan/25 blur-[110px] animate-blob" />
      <div
        className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-violet/25 blur-[130px] animate-blob"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan/10 blur-[100px] animate-blob"
        style={{ animationDelay: "-11s" }}
      />
    </div>
  );
}
