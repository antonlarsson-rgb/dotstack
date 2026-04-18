"use client";

import { useParams } from "next/navigation";
import { getProjectsBySpace, getSpaceById, accentColors } from "@/lib/app/mockData";

// Timeline spans from March 1 to August 31, 2026
const TIMELINE_START = new Date("2026-03-01");
const TIMELINE_END = new Date("2026-08-31");
const TOTAL_DAYS = Math.ceil((TIMELINE_END.getTime() - TIMELINE_START.getTime()) / (1000 * 60 * 60 * 24));
const TODAY = new Date("2026-04-18");

const months = [
  { label: "Mar", start: "2026-03-01", days: 31 },
  { label: "Apr", start: "2026-04-01", days: 30 },
  { label: "May", start: "2026-05-01", days: 31 },
  { label: "Jun", start: "2026-06-01", days: 30 },
  { label: "Jul", start: "2026-07-01", days: 31 },
  { label: "Aug", start: "2026-08-01", days: 31 },
];

function dayOffset(dateStr: string) {
  const d = new Date(dateStr);
  return Math.max(0, Math.ceil((d.getTime() - TIMELINE_START.getTime()) / (1000 * 60 * 60 * 24)));
}

function dayWidth(startStr: string, endStr: string) {
  return Math.max(dayOffset(endStr) - dayOffset(startStr), 1);
}

const todayOffset = dayOffset("2026-04-18");

export default function TimelinePage() {
  const params = useParams();
  const spaceId = params.space as string;
  const projectList = getProjectsBySpace(spaceId);
  const space = getSpaceById(spaceId);
  const colors = space ? accentColors[space.accent] : accentColors.blue;

  const phaseOpacity: Record<string, number> = {
    completed: 1,
    active: 0.7,
    upcoming: 0.3,
  };

  return (
    <div className="p-6">
      <h1 className="text-[17px] font-medium text-[var(--app-text)] mb-6">Timeline</h1>

      <div className="border border-[var(--app-border)] rounded-lg overflow-x-auto">
        <div style={{ minWidth: `${TOTAL_DAYS * 4 + 200}px` }}>
          {/* Month headers */}
          <div className="flex border-b border-[var(--app-border)]">
            <div className="w-[200px] flex-shrink-0 px-4 py-2 text-[12px] text-[var(--app-text-tertiary)] font-medium">
              Project
            </div>
            <div className="flex-1 flex relative">
              {months.map((m) => {
                const left = dayOffset(m.start);
                return (
                  <div
                    key={m.label}
                    className="border-l border-[var(--app-border)] px-2 py-2 text-[12px] text-[var(--app-text-tertiary)] font-medium"
                    style={{ width: `${m.days * 4}px` }}
                  >
                    {m.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Project rows */}
          {projectList.map((project) => (
            <div key={project.id} className="flex border-b border-[var(--app-border)] last:border-b-0 hover:bg-[var(--app-hover)] transition-colors">
              <div className="w-[200px] flex-shrink-0 px-4 py-3 border-r border-[var(--app-border)]">
                <p className="text-[13px] font-medium text-[var(--app-text)] truncate">{project.title}</p>
                <p className="text-[11px] text-[var(--app-text-muted)]">{project.deadline}</p>
              </div>
              <div className="flex-1 relative py-2" style={{ height: "56px" }}>
                {/* Phase bars */}
                {project.phases.map((phase) => {
                  const left = dayOffset(phase.startDate) * 4;
                  const width = dayWidth(phase.startDate, phase.endDate) * 4;
                  return (
                    <div
                      key={phase.id}
                      className="absolute top-2 h-8 rounded-md flex items-center px-2 overflow-hidden"
                      style={{
                        left: `${left}px`,
                        width: `${width}px`,
                        backgroundColor: colors.fg,
                        opacity: phaseOpacity[phase.status] || 0.3,
                      }}
                      title={`${phase.title}: ${phase.startDate} → ${phase.endDate}`}
                    >
                      <span className="text-[10px] text-white font-medium truncate">
                        {phase.title}
                      </span>
                    </div>
                  );
                })}

                {/* Deadline diamond */}
                <div
                  className="absolute top-3.5 w-3 h-3 rotate-45 border-2 bg-white"
                  style={{
                    left: `${dayOffset(project.deadline) * 4 - 6}px`,
                    borderColor: colors.fg,
                  }}
                  title={`Deadline: ${project.deadline}`}
                />

                {/* Today line */}
                <div
                  className="absolute top-0 bottom-0 w-px bg-[var(--accent-red)]"
                  style={{ left: `${todayOffset * 4}px` }}
                />
              </div>
            </div>
          ))}

          {/* Today line in header area */}
          <div className="h-0 relative">
            <div
              className="absolute bottom-0 w-px bg-[var(--accent-red)]"
              style={{ left: `${200 + todayOffset * 4}px`, height: "100vh" }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-4 text-[11px] text-[var(--app-text-tertiary)]">
        <span className="flex items-center gap-1.5">
          <div className="w-4 h-2 rounded-sm" style={{ backgroundColor: colors.fg, opacity: 1 }} /> Completed
        </span>
        <span className="flex items-center gap-1.5">
          <div className="w-4 h-2 rounded-sm" style={{ backgroundColor: colors.fg, opacity: 0.7 }} /> Active
        </span>
        <span className="flex items-center gap-1.5">
          <div className="w-4 h-2 rounded-sm" style={{ backgroundColor: colors.fg, opacity: 0.3 }} /> Upcoming
        </span>
        <span className="flex items-center gap-1.5">
          <div className="w-3 h-3 rotate-45 border-2 bg-white" style={{ borderColor: colors.fg }} />
          Deadline
        </span>
        <span className="flex items-center gap-1.5">
          <div className="w-px h-3 bg-[var(--accent-red)]" /> Today
        </span>
      </div>
    </div>
  );
}
