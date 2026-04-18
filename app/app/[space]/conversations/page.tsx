"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getConversationsBySpace, getPersonById } from "@/lib/app/mockData";
import { useAppContext } from "@/lib/app/AppContext";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";

const sourceColors: Record<string, string> = {
  email: "bg-[#e6f0ff] text-[#1d4ed8]",
  slack: "bg-[#f0e6ff] text-[#7c3aed]",
  meeting: "bg-[#e6ffe6] text-[#15803d]",
  internal: "bg-[#f4f4f2] text-[#525252]",
};

export default function ConversationsPage() {
  const params = useParams();
  const spaceId = params.space as string;
  const conversations = getConversationsBySpace(spaceId);
  const [selected, setSelected] = useState(0);
  const { setSelectedItem } = useAppContext();

  const conv = conversations[selected];

  const handleSelect = (idx: number) => {
    setSelected(idx);
    const c = conversations[idx];
    setSelectedItem({ type: "Conversation", id: c.id, label: c.subject });
  };

  if (conversations.length === 0) {
    return <div className="p-8 text-[var(--app-text-tertiary)]">No conversations yet.</div>;
  }

  return (
    <div className="flex h-full">
      {/* List */}
      <div className="w-[340px] border-r border-[var(--app-border)] overflow-y-auto">
        <div className="px-4 py-3 border-b border-[var(--app-border)]">
          <h1 className="text-[17px] font-medium text-[var(--app-text)]">Conversations</h1>
        </div>
        {conversations.map((c, i) => (
          <div
            key={c.id}
            onClick={() => handleSelect(i)}
            className={`px-4 py-3 border-b border-[var(--app-border)] cursor-pointer transition-colors ${
              selected === i ? "bg-[var(--app-selected)]" : "hover:bg-[var(--app-hover)]"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${sourceColors[c.source] || ""}`}>
                {c.source}
              </span>
              {c.unread && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)]" />}
              <span className="text-[11px] text-[var(--app-text-muted)] ml-auto">{c.lastActivity}</span>
            </div>
            <p className={`text-[14px] leading-tight ${c.unread ? "font-medium text-[var(--app-text)]" : "text-[var(--app-text-secondary)]"}`}>
              {c.subject}
            </p>
            <p className="text-[12px] text-[var(--app-text-tertiary)] mt-1 truncate">
              {c.participants.map((p) => getPersonById(p)?.name.split(" ")[0]).join(", ")}
            </p>
          </div>
        ))}
      </div>

      {/* Thread */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-6 py-3 border-b border-[var(--app-border)]">
          <h2 className="text-[15px] font-medium text-[var(--app-text)]">{conv.subject}</h2>
          <p className="text-[12px] text-[var(--app-text-tertiary)] mt-0.5">
            {conv.participants.map((p) => getPersonById(p)?.name).join(", ")}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {conv.messages.map((msg, i) => {
            const person = getPersonById(msg.from);
            return (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--app-hover)] flex items-center justify-center text-[12px] font-medium text-[var(--app-text-secondary)] flex-shrink-0">
                  {person?.avatar || "?"}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px] font-medium text-[var(--app-text)]">{person?.name}</span>
                    <span className="font-mono text-[11px] text-[var(--app-text-muted)]">[{msg.source}]</span>
                    <span className="text-[11px] text-[var(--app-text-muted)]">
                      {new Date(msg.timestamp).toLocaleDateString("en-SE", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-[14px] text-[var(--app-text-secondary)] leading-[1.6] whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply */}
        <div className="px-6 py-4 border-t border-[var(--app-border)]">
          <div className="border border-[var(--app-border)] rounded-lg p-3">
            <textarea
              placeholder="Write a reply..."
              rows={2}
              className="w-full text-[14px] bg-transparent outline-none resize-none placeholder:text-[var(--app-text-muted)]"
            />
            <div className="flex items-center justify-between mt-2">
              <button className="text-[13px] text-[var(--accent-blue)] hover:underline">
                Draft with .stack
              </button>
              <button className="text-[13px] bg-[var(--accent)] text-white px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
