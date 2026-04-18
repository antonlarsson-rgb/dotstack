"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getChatChannelsBySpace, getChatMessagesByChannel, getPersonById } from "@/lib/app/mockData";
import { Hash, Send } from "lucide-react";

export default function ChatPage() {
  const params = useParams();
  const spaceId = params.space as string;
  const channels = getChatChannelsBySpace(spaceId);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const channel = channels[selectedIdx];
  const messages = channel ? getChatMessagesByChannel(channel.id) : [];

  return (
    <div className="flex h-full">
      {/* Channel list */}
      <div className="w-[220px] border-r border-[var(--app-border)] flex flex-col">
        <div className="px-4 py-3 border-b border-[var(--app-border)]">
          <h1 className="text-[15px] font-medium text-[var(--app-text)]">Chat</h1>
        </div>
        <div className="flex-1 overflow-y-auto py-1">
          {channels.map((ch, i) => (
            <button
              key={ch.id}
              onClick={() => setSelectedIdx(i)}
              className={`w-full text-left px-4 py-2 flex items-center gap-2 transition-colors ${
                selectedIdx === i ? "bg-[var(--app-selected)]" : "hover:bg-[var(--app-hover)]"
              }`}
            >
              <Hash size={14} strokeWidth={1.5} className="text-[var(--app-text-tertiary)] flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[13px] truncate ${selectedIdx === i ? "font-medium text-[var(--app-text)]" : "text-[var(--app-text-secondary)]"}`}>
                    {ch.name}
                  </span>
                  {ch.unread > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[var(--accent-blue)] text-white text-[10px] flex items-center justify-center flex-shrink-0">
                      {ch.unread}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[var(--app-text-muted)] truncate">{ch.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col min-w-0">
        {channel && (
          <>
            <div className="px-6 py-3 border-b border-[var(--app-border)] flex items-center gap-2">
              <Hash size={16} strokeWidth={1.5} className="text-[var(--app-text-tertiary)]" />
              <span className="text-[15px] font-medium text-[var(--app-text)]">{channel.name}</span>
              <span className="text-[12px] text-[var(--app-text-muted)]">
                {channel.participants.length} members
              </span>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.map((msg) => {
                const person = getPersonById(msg.from);
                const time = new Date(msg.timestamp);
                return (
                  <div key={msg.id} className="flex gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-[var(--app-hover)] flex items-center justify-center text-[12px] font-medium text-[var(--app-text-secondary)] flex-shrink-0 mt-0.5">
                      {person?.avatar || "?"}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2 mb-0.5">
                        <span className="text-[13px] font-medium text-[var(--app-text)]">{person?.name || msg.from}</span>
                        <span className="font-mono text-[11px] text-[var(--app-text-muted)] tabular-nums">
                          {time.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-[14px] text-[var(--app-text-secondary)] leading-[1.55]">{msg.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div className="px-6 py-4 border-t border-[var(--app-border)]">
              <div className="flex items-center gap-2 border border-[var(--app-border)] rounded-lg px-4 py-2.5">
                <input
                  type="text"
                  placeholder={`Message #${channel.name}`}
                  className="flex-1 text-[14px] bg-transparent outline-none placeholder:text-[var(--app-text-muted)]"
                />
                <button className="p-1 rounded-md hover:bg-[var(--app-hover)] text-[var(--app-text-tertiary)]">
                  <Send size={16} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
