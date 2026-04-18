"use client";

export function StatusStrip() {
  return (
    <div className="h-7 flex-shrink-0 border-t border-[var(--app-border)] bg-[var(--app-bg)] flex items-center justify-between px-5 text-[12px] text-[var(--app-text-tertiary)]">
      <div className="flex items-center gap-3">
        <span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-red)] mr-1" />
          2 overdue
        </span>
        <span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-amber)] mr-1" />
          6 today
        </span>
        <span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--app-text-muted)] mr-1" />
          14 this week
        </span>
      </div>
      <div />
      <div className="flex items-center gap-3 font-mono text-[11px]">
        <span>⌘K Actions</span>
        <span>⌘N New</span>
      </div>
    </div>
  );
}
