"use client";

import { useState } from "react";
import { DemoAppShell } from "@/components/ui/DemoAppShell";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";
import { stellarDemo } from "@/lib/data/demoData";

const { inbox } = stellarDemo;

const sourceColors: Record<string, string> = {
  slack: "bg-[#f0e6ff] text-[#7c3aed]",
  email: "bg-[#e6f0ff] text-[#1d4ed8]",
  hubspot: "bg-[#fff0e6] text-[#b45309]",
  fortnox: "bg-[#e6ffe6] text-[#15803d]",
  notion: "bg-[#f4f4f2] text-[#525252]",
  clickup: "bg-[#ffe6f0] text-[#b91c1c]",
};

export function Slide07DemoInbox() {
  const [selected, setSelected] = useState(1);

  return (
    <div id="slide-7">
      <DemoAppShell activeNav="Inbox">
        <div className="flex gap-0 -m-8 h-full">
          {/* Inbox list */}
          <div className="w-[420px] border-r border-[var(--border)] overflow-y-auto">
            {inbox.map((item, i) => (
              <div
                key={i}
                onClick={() => setSelected(i)}
                className={`px-5 py-4 border-b border-[var(--border)] cursor-pointer transition-colors duration-[180ms] ${
                  selected === i ? "bg-[var(--bg-subtle)]" : "hover:bg-[var(--hover-bg)]"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${
                      sourceColors[item.source] || "bg-[var(--bg-muted)] text-[var(--text-tertiary)]"
                    }`}
                  >
                    {item.source}
                  </span>
                  <span className="text-[13px] font-medium text-[var(--text)]">
                    {item.from}
                  </span>
                  <span className="text-[12px] text-[var(--text-muted)] ml-auto">
                    {item.time}
                  </span>
                </div>
                <p className="text-[13px] text-[var(--text-secondary)] line-clamp-2">
                  {item.preview}
                </p>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${
                  sourceColors[inbox[selected].source] || ""
                }`}
              >
                {inbox[selected].source}
              </span>
              <span className="text-[14px] font-medium text-[var(--text)]">
                {inbox[selected].from}
              </span>
            </div>

            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.6] mt-2">
              {inbox[selected].preview}
            </p>

            <div className="mt-auto pt-6">
              <div className="border border-[var(--border)] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <button className="text-[13px] bg-[var(--accent)] text-white px-3 py-1 rounded-md">
                    Draft with .stack
                  </button>
                </div>
                <div className="flex items-center text-[14px] text-[var(--text-muted)]">
                  <span>Write a reply...</span>
                  <BlinkingCursor />
                </div>
              </div>
            </div>

            <p className="mt-4 text-[13px] text-[var(--text-tertiary)]">
              All these live in one view. Slack, email, HubSpot, Fortnox,
              Notion, ClickUp. Replaced with a single unified layer.
            </p>
          </div>
        </div>
      </DemoAppShell>
    </div>
  );
}
