"use client";

import { DemoAppShell } from "@/components/ui/DemoAppShell";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";
import { stellarDemo } from "@/lib/data/demoData";
import { formatSek } from "@/lib/utils/formatSek";

const { metrics, activity } = stellarDemo;

const statCards = [
  { label: "Monthly savings", value: formatSek(metrics.monthlySavings), change: "+4% vs last month" },
  { label: "Tools replaced", value: `${metrics.toolsReplaced} of ${metrics.toolsTotal}`, change: "2 more this month" },
  { label: "Active AI workflows", value: `${metrics.activeWorkflows}`, change: "12 running now" },
  { label: "Documents processed", value: `${metrics.documentsThisWeek}`, change: "this week" },
];

const aiPrompts = [
  "Summarize this week's client activity",
  "Draft a Q2 revenue recap for the team",
  "Show me our most expensive SaaS tools",
];

export function Slide06DemoDashboard() {
  return (
    <div id="slide-6">
      <DemoAppShell activeNav="Dashboard">
        <div className="max-w-[960px]">
          <h1 className="text-[32px] font-normal text-[var(--text)]">
            Good morning, Anton
          </h1>
          <p className="text-[15px] text-[var(--text-tertiary)] mt-1">
            Friday, April 18
          </p>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            {statCards.map((s) => (
              <div
                key={s.label}
                className="border border-[var(--border)] rounded-lg p-5"
              >
                <span className="text-[13px] text-[var(--text-tertiary)]">
                  {s.label}
                </span>
                <div className="font-mono text-[28px] font-medium tabular-nums text-[var(--text)] mt-1">
                  {s.value}
                </div>
                <span className="text-[12px] text-[var(--text-muted)]">
                  {s.change}
                </span>
              </div>
            ))}
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-2 gap-8 mt-8">
            {/* Activity */}
            <div>
              <h2 className="text-[15px] font-medium text-[var(--text)] mb-4">
                Recent activity
              </h2>
              <div className="space-y-3">
                {activity.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-[14px]"
                  >
                    <span className="text-[var(--text-muted)] min-w-[72px] text-[12px] mt-0.5">
                      {a.time}
                    </span>
                    <span className="text-[var(--text-secondary)]">
                      {a.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant */}
            <div>
              <h2 className="text-[15px] font-medium text-[var(--text)] mb-4">
                AI Assistant
              </h2>
              <div className="space-y-2 mb-4">
                {aiPrompts.map((p) => (
                  <div
                    key={p}
                    className="text-[14px] text-[var(--accent-blue)] bg-[var(--bg-subtle)] px-3 py-2 rounded-md cursor-pointer hover:bg-[var(--bg-muted)] transition-colors duration-[180ms]"
                  >
                    &ldquo;{p}&rdquo;
                  </div>
                ))}
              </div>
              <div className="flex items-center border border-[var(--border)] rounded-md px-3 py-2.5">
                <span className="text-[14px] text-[var(--text-muted)] flex-1">
                  Ask .stack anything
                </span>
                <BlinkingCursor />
              </div>
            </div>
          </div>
        </div>
      </DemoAppShell>
    </div>
  );
}
