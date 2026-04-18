"use client";

import { useParams, useRouter } from "next/navigation";
import { Calendar, FolderOpen, LayoutGrid, BarChart3, Inbox, User, Plus, Store } from "lucide-react";
import { spaces, accentColors } from "@/lib/app/mockData";

const crossSpaceModules = [
  { icon: Calendar, label: "Calendar", href: "/app/brand-factory/calendar" },
  { icon: FolderOpen, label: "Files", href: "/app/brand-factory/files" },
  { icon: LayoutGrid, label: "Projects", href: "/app/brand-factory/projects" },
  { icon: BarChart3, label: "Reports", href: "/app/brand-factory/reports" },
];

const personalModules = [
  { icon: User, label: "My Work", href: "/app/today" },
  { icon: Inbox, label: "Inbox", href: "/app/inbox" },
];

export function NavigationRail() {
  const params = useParams();
  const router = useRouter();
  const activeSpace = params.space as string | undefined;

  return (
    <div className="w-16 flex-shrink-0 border-r border-[var(--app-border)] bg-[var(--app-bg)] flex flex-col items-center py-3 gap-1">
      {/* Spaces */}
      <div className="flex flex-col items-center gap-1.5 pb-3 border-b border-[var(--app-border)] w-full px-2">
        {spaces.map((space) => {
          const isActive = activeSpace === space.id;
          const colors = accentColors[space.accent];
          return (
            <div key={space.id} className="relative group">
              <button
                onClick={() => router.push(`/app/${space.id}`)}
                className="relative w-11 h-11 rounded-[10px] flex items-center justify-center text-[13px] font-medium transition-all duration-[120ms]"
                style={{
                  backgroundColor: isActive ? colors.fg : "var(--app-hover)",
                  color: isActive ? "white" : "var(--app-text-secondary)",
                }}
              >
                {space.initial}
                {isActive && (
                  <div
                    className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                    style={{ backgroundColor: colors.fg }}
                  />
                )}
              </button>
              {/* Tooltip */}
              <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-[var(--app-text)] text-white text-[12px] px-2.5 py-1.5 rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50">
                {space.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cross-space */}
      <div className="flex flex-col items-center gap-1 py-3 border-b border-[var(--app-border)] w-full px-2">
        {crossSpaceModules.map((mod) => (
          <button
            key={mod.label}
            onClick={() => router.push(mod.href)}
            className="w-11 h-11 rounded-[10px] flex items-center justify-center text-[var(--app-text-tertiary)] hover:bg-[var(--app-hover)] hover:text-[var(--app-text-secondary)] transition-colors duration-[120ms]"
            title={mod.label}
          >
            <mod.icon size={20} strokeWidth={1.5} />
          </button>
        ))}
      </div>

      {/* Personal */}
      <div className="flex flex-col items-center gap-1 py-3 border-b border-[var(--app-border)] w-full px-2">
        {personalModules.map((mod) => (
          <button
            key={mod.label}
            onClick={() => router.push(mod.href)}
            className="w-11 h-11 rounded-[10px] flex items-center justify-center text-[var(--app-text-tertiary)] hover:bg-[var(--app-hover)] hover:text-[var(--app-text-secondary)] transition-colors duration-[120ms]"
            title={mod.label}
          >
            <mod.icon size={20} strokeWidth={1.5} />
          </button>
        ))}
      </div>

      {/* Store + Add */}
      <div className="flex flex-col items-center gap-1 py-3 w-full px-2">
        <button
          onClick={() => router.push("/app/store")}
          className="w-11 h-11 rounded-[10px] flex items-center justify-center text-[var(--app-text-tertiary)] hover:bg-[var(--app-hover)] hover:text-[var(--app-text-secondary)] transition-colors duration-[120ms]"
          title="App Store"
        >
          <Store size={20} strokeWidth={1.5} />
        </button>
        <button
          className="w-11 h-11 rounded-[10px] flex items-center justify-center text-[var(--app-text-muted)] hover:bg-[var(--app-hover)] transition-colors duration-[120ms]"
          title="Add Space (coming soon)"
        >
          <Plus size={20} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
