"use client";

import { accentColors } from "@/lib/app/mockData";

const focusCards = [
  {
    title: "Brand Factory renewal decision due",
    description: "Mikaela and Karl are ready to discuss. Your performance summary is prepared. Consider drafting a formal proposal today.",
    accent: "amber" as const,
    actions: ["Draft proposal", "View thread"],
  },
  {
    title: "Weekly performance report ready for review",
    description: "Week 16 report for Brand Factory is in draft. Spring campaign ROAS at 3.4x, TikTok paused at 0.4% CTR.",
    accent: "blue" as const,
    actions: ["Review", "Send to client"],
  },
  {
    title: "Svenska Spel compliance audit in 10 days",
    description: "Sara is gathering documentation. Targeting parameters exported. Campaign docs and creative archive still need review.",
    accent: "amber" as const,
    actions: ["Check progress", "Snooze"],
  },
  {
    title: "All-hands meeting tomorrow at 10:00",
    description: "You're presenting Q2 progress. Sara has the agenda. Your slides need the latest pipeline data.",
    accent: "purple" as const,
    actions: ["Prepare", "View agenda"],
  },
];

const otherItems = [
  "Marcus will have TikTok audience analysis by EOD",
  "Erik preparing design task for Senior Designer interviews",
  "Spring campaign assets going live tomorrow at 06:00",
  "Office move lease signed, IT planning next",
];

export default function TodayPage() {
  return (
    <div className="p-6 max-w-[800px] mx-auto">
      <div className="mb-8">
        <h1 className="text-[24px] font-medium text-[var(--app-text)]">Good morning, Anton</h1>
        <p className="text-[15px] text-[var(--app-text-secondary)] mt-1">
          Friday, April 18. You have {focusCards.length} items to handle today, 2 are time-sensitive.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {focusCards.map((card, i) => {
          const colors = accentColors[card.accent];
          return (
            <div
              key={i}
              className="border border-[var(--app-border)] rounded-lg p-6"
              style={{ borderLeftWidth: 4, borderLeftColor: colors.fg }}
            >
              <h2 className="text-[16px] font-medium text-[var(--app-text)] mb-2">{card.title}</h2>
              <p className="text-[14px] text-[var(--app-text-secondary)] leading-[1.55] mb-4">{card.description}</p>
              <div className="flex gap-2">
                {card.actions.map((action, j) => (
                  <button
                    key={j}
                    className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
                      j === 0
                        ? "bg-[var(--accent)] text-white hover:opacity-90"
                        : "border border-[var(--app-border)] text-[var(--app-text-secondary)] hover:bg-[var(--app-hover)]"
                    }`}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h2 className="text-[15px] font-medium text-[var(--app-text)] mb-3">Other things happening today</h2>
        <div className="space-y-2">
          {otherItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-[13px] text-[var(--app-text-secondary)] px-3 py-2 bg-[var(--app-bg)] rounded-md border border-[var(--app-border)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--app-text-muted)]" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
