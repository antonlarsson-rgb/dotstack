"use client";

import { useParams } from "next/navigation";
import { getEventsBySpace, getPersonById, accentColors, getSpaceById } from "@/lib/app/mockData";

const hours = Array.from({ length: 12 }, (_, i) => i + 7); // 07:00 - 18:00

export default function CalendarPage() {
  const params = useParams();
  const spaceId = params.space as string;
  const events = getEventsBySpace(spaceId);
  const space = getSpaceById(spaceId);
  const colors = space ? accentColors[space.accent] : accentColors.blue;

  // Group events by day of week (Mon-Fri of current week)
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const weekDates = ["Apr 21", "Apr 22", "Apr 23", "Apr 24", "Apr 25"];

  const getEventsForDay = (dateStr: string) =>
    events.filter((e) => {
      const d = new Date(e.date);
      return `${d.toLocaleDateString("en-US", { month: "short" })} ${d.getDate()}` === dateStr;
    });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[17px] font-medium text-[var(--app-text)]">Calendar</h1>
        <div className="flex items-center gap-2">
          <span className="text-[14px] text-[var(--app-text-secondary)]">Week 17, April 2026</span>
        </div>
      </div>

      <div className="border border-[var(--app-border)] rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[64px_repeat(5,1fr)] border-b border-[var(--app-border)]">
          <div className="p-2" />
          {weekDays.map((day, i) => (
            <div key={day} className="p-3 border-l border-[var(--app-border)] text-center">
              <span className="text-[12px] text-[var(--app-text-tertiary)]">{day}</span>
              <span className="block text-[14px] font-medium text-[var(--app-text)]">{weekDates[i].split(" ")[1]}</span>
            </div>
          ))}
        </div>

        {/* Time grid */}
        <div className="relative">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-[64px_repeat(5,1fr)] h-16 border-b border-[var(--app-border)] last:border-b-0">
              <div className="flex items-start justify-end pr-2 pt-1">
                <span className="text-[11px] text-[var(--app-text-muted)] font-mono tabular-nums">
                  {String(hour).padStart(2, "0")}:00
                </span>
              </div>
              {weekDates.map((dateStr) => (
                <div key={dateStr} className="border-l border-[var(--app-border)] relative">
                  {getEventsForDay(dateStr)
                    .filter((e) => parseInt(e.startTime) === hour)
                    .map((event) => {
                      const startH = parseInt(event.startTime);
                      const endH = parseInt(event.endTime);
                      const duration = Math.max(endH - startH, 1);
                      return (
                        <div
                          key={event.id}
                          className="absolute inset-x-1 rounded-md px-2 py-1 text-[11px] overflow-hidden z-10"
                          style={{
                            backgroundColor: colors.bg,
                            borderLeft: `3px solid ${colors.fg}`,
                            height: `${duration * 64 - 4}px`,
                            top: 2,
                          }}
                        >
                          <span className="font-medium block truncate" style={{ color: colors.fg }}>
                            {event.title}
                          </span>
                          <span className="text-[10px] text-[var(--app-text-tertiary)]">
                            {event.startTime} - {event.endTime}
                          </span>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
