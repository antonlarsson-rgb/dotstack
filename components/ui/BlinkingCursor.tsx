"use client";

export function BlinkingCursor() {
  return (
    <span
      aria-hidden="true"
      className="inline-block w-[2px] h-[1em] bg-[var(--accent-blue)] align-middle ml-[2px]"
      style={{ animation: "blink 1.2s infinite" }}
    />
  );
}
