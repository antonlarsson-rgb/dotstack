export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <div className="w-10 h-px bg-[var(--text-tertiary)]" />
      <span className="font-serif text-[17px] text-[var(--text-tertiary)] italic">
        {children}
      </span>
    </div>
  );
}
