"use client";

import { useParams, useRouter } from "next/navigation";
import { Bell, ChevronDown, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { spaces, accentColors, getSpaceById } from "@/lib/app/mockData";

export function AppTopBar() {
  const params = useParams();
  const router = useRouter();
  const activeSpaceId = params.space as string | undefined;
  const space = activeSpaceId ? getSpaceById(activeSpaceId) : null;
  const [spaceDropdownOpen, setSpaceDropdownOpen] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="h-[52px] flex-shrink-0 border-b border-[var(--app-border)] bg-[var(--app-surface)] flex items-center px-5 gap-4">
      {/* Left: wordmark + space selector */}
      <div className="flex items-center gap-3 min-w-[200px]">
        <span className="font-mono text-[14px] font-medium">
          <span style={{ color: space ? accentColors[space.accent].fg : "var(--app-text)" }}>.</span>
          <span className="text-[var(--app-text)]">stack</span>
        </span>
        <span className="text-[var(--app-text-muted)]">/</span>
        {space && (
          <div className="relative">
            <button
              onClick={() => setSpaceDropdownOpen(!spaceDropdownOpen)}
              className="flex items-center gap-1.5 text-[14px] font-medium text-[var(--app-text)] hover:bg-[var(--app-hover)] px-2 py-1 rounded-md transition-colors"
            >
              {space.name}
              <ChevronDown size={14} strokeWidth={1.5} className="text-[var(--app-text-tertiary)]" />
            </button>
            {spaceDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setSpaceDropdownOpen(false)} />
                <div className="absolute top-full left-0 mt-1 bg-white border border-[var(--app-border)] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)] py-1 z-50 min-w-[200px]">
                  {spaces.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        router.push(`/app/${s.id}`);
                        setSpaceDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-[14px] hover:bg-[var(--app-hover)] flex items-center gap-2.5 transition-colors"
                    >
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-medium text-white"
                        style={{ backgroundColor: accentColors[s.accent].fg }}
                      >
                        {s.initial}
                      </div>
                      <span className={s.id === activeSpaceId ? "font-medium" : ""}>{s.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Center: universal input */}
      <div className="flex-1 flex justify-center">
        <div className={`relative w-full max-w-[680px] transition-all duration-200 ${inputFocused ? "scale-[1.01]" : ""}`}>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[var(--app-text-muted)]">
            <Search size={14} strokeWidth={1.5} />
            {!inputFocused && (
              <span className="text-[12px] border border-[var(--app-border)] rounded px-1 py-0.5 font-mono">
                ⌘K
              </span>
            )}
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask or search, or type / for commands"
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            className="w-full bg-[var(--app-bg)] border border-[var(--app-border)] rounded-lg pl-16 pr-4 py-2 text-[14px] placeholder:text-[var(--app-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Right: notifications + avatar */}
      <div className="flex items-center gap-3 min-w-[80px] justify-end">
        <button className="relative p-2 rounded-md hover:bg-[var(--app-hover)] transition-colors">
          <Bell size={16} strokeWidth={1.5} className="text-[var(--app-text-secondary)]" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--accent-red)]" />
        </button>
        <div className="w-7 h-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-[12px] font-medium">
          A
        </div>
      </div>
    </div>
  );
}
