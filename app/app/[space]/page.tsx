"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getSpaceById, pulseBriefings, accentColors, getConversationsBySpace, getProjectsBySpace, getCampaignsBySpace, getInvoicesBySpace, getEventsBySpace } from "@/lib/app/mockData";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";

export default function SpaceDashboard() {
  const params = useParams();
  const spaceId = params.space as string;
  const space = getSpaceById(spaceId);
  const briefing = pulseBriefings[spaceId] || "";

  const [displayedText, setDisplayedText] = useState("");
  const [isStreaming, setIsStreaming] = useState(true);

  // Simulate streaming briefing
  useEffect(() => {
    setDisplayedText("");
    setIsStreaming(true);
    let i = 0;
    const interval = setInterval(() => {
      i += 4;
      if (i >= briefing.length) {
        setDisplayedText(briefing);
        setIsStreaming(false);
        clearInterval(interval);
      } else {
        setDisplayedText(briefing.slice(0, i));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [spaceId, briefing]);

  if (!space) return <div className="p-8">Space not found.</div>;

  const colors = accentColors[space.accent];
  const conversations = getConversationsBySpace(spaceId);
  const projects = getProjectsBySpace(spaceId);
  const campaigns = getCampaignsBySpace(spaceId);
  const invoicesData = getInvoicesBySpace(spaceId);
  const events = getEventsBySpace(spaceId);

  const unreadCount = conversations.filter((c) => c.unread).length;
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const overdueInvoices = invoicesData.filter((i) => i.status === "overdue").length;
  const upcomingEvents = events.length;

  const stats = [
    { label: "Active projects", value: String(activeProjects), sub: `${projects.length} total` },
    { label: "Open conversations", value: String(conversations.length), sub: unreadCount > 0 ? `${unreadCount} unread` : "all read" },
    { label: "Upcoming events", value: String(upcomingEvents), sub: "next 7 days" },
    { label: "Active campaigns", value: String(activeCampaigns), sub: campaigns.length > 0 ? `${campaigns.length} total` : "n/a" },
    { label: "Invoices pending", value: String(invoicesData.filter((i) => i.status === "sent").length), sub: overdueInvoices > 0 ? `${overdueInvoices} overdue` : "none overdue" },
    { label: "Team members", value: String(new Set(projects.flatMap((p) => p.team)).size), sub: "on this Space" },
  ];

  // Recent activity from conversations
  const recentActivity = conversations
    .slice(0, 6)
    .map((c) => ({
      text: c.subject,
      time: c.lastActivity,
      unread: c.unread,
    }));

  // Needs attention items
  const needsAttention = [
    ...invoicesData.filter((i) => i.status === "sent").map((i) => `Invoice ${i.number} due ${i.dueDate}`),
    ...conversations.filter((c) => c.unread).map((c) => `Unread: ${c.subject}`),
    ...projects.flatMap((p) => p.tasks.filter((t) => t.status === "in-progress" && t.deadline).map((t) => `Due soon: ${t.title}`)),
  ].slice(0, 5);

  return (
    <div className="p-6 max-w-[960px]">
      {/* Briefing */}
      <div className="mb-8">
        <h1 className="text-[24px] font-medium text-[var(--app-text)] mb-4">
          {space.name}
        </h1>
        <div className="text-[15px] text-[var(--app-text-secondary)] leading-[1.65] bg-[var(--app-bg)] border border-[var(--app-border)] rounded-lg p-5">
          {displayedText}
          {isStreaming && <BlinkingCursor />}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="border border-[var(--app-border)] rounded-lg p-4">
            <span className="text-[12px] text-[var(--app-text-tertiary)]">{s.label}</span>
            <div className="font-mono text-[24px] font-medium tabular-nums text-[var(--app-text)] mt-1">
              {s.value}
            </div>
            <span className="text-[12px] text-[var(--app-text-muted)]">{s.sub}</span>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-6">
        {/* Needs attention */}
        <div>
          <h2 className="text-[15px] font-medium text-[var(--app-text)] mb-3">Needs attention</h2>
          <div className="space-y-2">
            {needsAttention.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[13px] text-[var(--app-text-secondary)] bg-[var(--app-bg)] px-3 py-2 rounded-md border border-[var(--app-border)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-amber)] flex-shrink-0" />
                {item}
              </div>
            ))}
            {needsAttention.length === 0 && (
              <p className="text-[13px] text-[var(--app-text-muted)]">Nothing urgent right now.</p>
            )}
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <h2 className="text-[15px] font-medium text-[var(--app-text)] mb-3">Recent activity</h2>
          <div className="space-y-2">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-[13px] bg-[var(--app-bg)] px-3 py-2 rounded-md border border-[var(--app-border)]"
              >
                <span className={`${item.unread ? "font-medium text-[var(--app-text)]" : "text-[var(--app-text-secondary)]"}`}>
                  {item.text}
                </span>
                <span className="text-[12px] text-[var(--app-text-muted)] ml-3 flex-shrink-0">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
