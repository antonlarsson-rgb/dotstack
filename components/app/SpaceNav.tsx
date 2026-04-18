"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { getSpaceById, accentColors } from "@/lib/app/mockData";
import {
  LayoutDashboard,
  MessageSquare,
  MessagesSquare,
  Users,
  FolderOpen,
  KanbanSquare,
  GanttChart,
  Calendar,
  BarChart3,
  Megaphone,
  CreditCard,
  Palette,
} from "lucide-react";

const moduleIcons: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  dashboard: LayoutDashboard,
  conversations: MessageSquare,
  chat: MessagesSquare,
  crm: Users,
  files: FolderOpen,
  projects: KanbanSquare,
  timeline: GanttChart,
  calendar: Calendar,
  reports: BarChart3,
  campaigns: Megaphone,
  finance: CreditCard,
  creative: Palette,
};

const moduleLabels: Record<string, string> = {
  dashboard: "Dashboard",
  conversations: "Conversations",
  chat: "Chat",
  crm: "CRM",
  files: "Files",
  projects: "Projects",
  timeline: "Timeline",
  calendar: "Calendar",
  reports: "Reports",
  campaigns: "Campaigns",
  finance: "Finance",
  creative: "Creative",
};

export function SpaceNav() {
  const params = useParams();
  const pathname = usePathname();
  const spaceId = params.space as string;
  const space = getSpaceById(spaceId);
  if (!space) return null;

  const colors = accentColors[space.accent];

  // Determine active module from pathname
  const segments = pathname.split("/");
  const activeModule = segments[3] || "dashboard";

  return (
    <div className="flex items-center gap-1 px-6 py-2 border-b border-[var(--app-border)] bg-[var(--app-surface)]">
      {space.modulesEnabled.map((mod) => {
        const Icon = moduleIcons[mod] || LayoutDashboard;
        const label = moduleLabels[mod] || mod;
        const isActive = activeModule === mod || (mod === "dashboard" && activeModule === spaceId);
        const href = mod === "dashboard" ? `/app/${spaceId}` : `/app/${spaceId}/${mod}`;

        return (
          <Link
            key={mod}
            href={href}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] transition-colors duration-[120ms] ${
              isActive
                ? "font-medium"
                : "text-[var(--app-text-tertiary)] hover:text-[var(--app-text-secondary)] hover:bg-[var(--app-hover)]"
            }`}
            style={isActive ? { color: colors.fg, backgroundColor: colors.bg } : undefined}
          >
            <Icon size={14} strokeWidth={1.5} />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
