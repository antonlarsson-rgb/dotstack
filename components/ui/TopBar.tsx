"use client";

export function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 pointer-events-none">
      <span className="font-mono text-[15px] font-medium text-[var(--text)] pointer-events-auto">
        .stack
      </span>
      <div className="flex items-center gap-3 pointer-events-auto">
        <span className="font-serif text-[13px] text-[var(--text-tertiary)] italic">
          Pinecone Ventures Buildathon · AI Infrastructure
        </span>
      </div>
    </div>
  );
}
