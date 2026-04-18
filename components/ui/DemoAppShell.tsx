"use client";

import { Search, Bell } from "lucide-react";

const navItems = [
  "Dashboard",
  "Inbox",
  "Documents",
  "Finance",
  "Projects",
  "People",
  "Settings",
];

interface DemoAppShellProps {
  activeNav: string;
  children: React.ReactNode;
}

export function DemoAppShell({ activeNav, children }: DemoAppShellProps) {
  return (
    <section className="slide flex flex-col h-screen bg-white">
      {/* Demo banner */}
      <div className="bg-[var(--bg-subtle)] border-b border-[var(--border)] px-4 py-2 text-center text-[13px] text-[var(--text-tertiary)]">
        You are viewing Stellar&apos;s <span className="font-mono">.stack</span>
        . They are a 50-person Swedish digital agency. All data below is
        representative.
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[14px] font-medium">.stack</span>
          <span className="text-[13px] text-[var(--text-tertiary)] bg-[var(--bg-muted)] px-2.5 py-0.5 rounded-full">
            Stellar
          </span>
        </div>
        <div className="flex-1 max-w-md mx-8">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-muted)] rounded-md">
            <Search size={14} strokeWidth={1.5} className="text-[var(--text-tertiary)]" />
            <span className="text-[13px] text-[var(--text-muted)]">
              Search anything across Stellar&apos;s stack
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Bell size={16} strokeWidth={1.5} className="text-[var(--text-tertiary)]" />
          <div className="w-7 h-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-[12px] font-medium">
            A
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-[200px] border-r border-[var(--border)] py-4 px-3 flex-shrink-0">
          {navItems.map((item) => (
            <div
              key={item}
              className={`px-3 py-1.5 rounded-md text-[14px] mb-0.5 ${
                item === activeNav
                  ? "bg-[var(--bg-muted)] text-[var(--text)] font-medium"
                  : "text-[var(--text-secondary)] hover:bg-[var(--hover-bg)]"
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </div>
    </section>
  );
}
