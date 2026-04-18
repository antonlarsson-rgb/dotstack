"use client";

import { conversations, getSpaceById, getPersonById, accentColors } from "@/lib/app/mockData";
import { useRouter } from "next/navigation";

export default function InboxPage() {
  const router = useRouter();

  // Gather all unread/recent items across spaces
  const allConversations = [...conversations]
    .sort((a, b) => (a.unread === b.unread ? 0 : a.unread ? -1 : 1));

  return (
    <div className="p-6 max-w-[800px] mx-auto">
      <h1 className="text-[24px] font-medium text-[var(--app-text)] mb-6">Inbox</h1>

      <div className="space-y-1">
        {allConversations.map((c) => {
          const space = getSpaceById(c.spaceId);
          const colors = space ? accentColors[space.accent] : accentColors.blue;
          const lastMsg = c.messages[c.messages.length - 1];
          const sender = getPersonById(lastMsg.from);

          return (
            <div
              key={c.id}
              onClick={() => router.push(`/app/${c.spaceId}/conversations`)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                c.unread ? "bg-[var(--app-bg)]" : "hover:bg-[var(--app-hover)]"
              }`}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: c.unread ? colors.fg : "transparent" }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium" style={{ color: colors.fg }}>
                    {space?.name}
                  </span>
                  <span className={`text-[13px] ${c.unread ? "font-medium text-[var(--app-text)]" : "text-[var(--app-text-secondary)]"}`}>
                    {c.subject}
                  </span>
                </div>
                <p className="text-[12px] text-[var(--app-text-tertiary)] truncate mt-0.5">
                  {sender?.name}: {lastMsg.content.slice(0, 80)}...
                </p>
              </div>
              <span className="text-[11px] text-[var(--app-text-muted)] flex-shrink-0">{c.lastActivity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
