"use client";

export function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 md:py-5 pointer-events-none bg-white/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
      <span className="font-mono text-[14px] md:text-[15px] font-medium text-[var(--text)] pointer-events-auto">
        .stack
      </span>
      <div className="flex items-center gap-3 pointer-events-auto">
        <span className="font-serif text-[11px] md:text-[13px] text-[var(--text-tertiary)] italic">
          <span className="hidden sm:inline">Pinecone Ventures </span>Buildathon · AI Infrastructure
        </span>
      </div>
    </div>
  );
}
