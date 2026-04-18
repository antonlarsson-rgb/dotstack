"use client";

import { useState, useRef, useEffect } from "react";
import { PanelRightClose, PanelRightOpen, Trash2, ArrowUp } from "lucide-react";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";
import { useAppContext } from "@/lib/app/AppContext";
import { useParams } from "next/navigation";
import { getSpaceById } from "@/lib/app/mockData";
import { slideContexts } from "@/lib/data/slideContexts";

export function ContextRail() {
  const { contextRailOpen, setContextRailOpen, agentMessages, setAgentMessages, selectedItem } = useAppContext();
  const params = useParams();
  const spaceId = params.space as string | undefined;
  const space = spaceId ? getSpaceById(spaceId) : null;

  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [agentMessages, streamingText]);

  const suggestedPrompts = space
    ? [
        `Summarize ${space.name}'s recent activity`,
        "What should I prioritize today?",
        "Draft a weekly update",
      ]
    : ["What should I prioritize today?", "Show me overdue items", "Draft a summary"];

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;
    const userMsg = { role: "user" as const, content: text.trim() };
    const newMessages = [...agentMessages, userMsg];
    setAgentMessages(newMessages);
    setInput("");
    setIsStreaming(true);
    setStreamingText("");

    try {
      const contextDesc = selectedItem
        ? `${space?.name || "Unknown"} > ${selectedItem.type} > ${selectedItem.label}`
        : `${space?.name || "Home"} > Dashboard`;

      const res = await fetch("/api/app/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          context: contextDesc,
          spaceId: spaceId || "",
        }),
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  fullText += parsed.text;
                  setStreamingText(fullText);
                }
              } catch {
                // skip
              }
            }
          }
        }
      }

      setAgentMessages((prev) => [...prev, { role: "assistant", content: fullText }]);
    } catch {
      setAgentMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Try again." }]);
    } finally {
      setIsStreaming(false);
      setStreamingText("");
    }
  };

  if (!contextRailOpen) {
    return (
      <div className="w-12 flex-shrink-0 border-l border-[var(--app-border)] bg-[var(--app-bg)] flex flex-col items-center pt-3">
        <button
          onClick={() => setContextRailOpen(true)}
          className="p-2 rounded-md hover:bg-[var(--app-hover)] text-[var(--app-text-tertiary)]"
          title="Open context rail"
        >
          <PanelRightOpen size={16} strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-[360px] flex-shrink-0 border-l border-[var(--app-border)] bg-[var(--app-surface)] flex flex-col">
      {/* Context metadata */}
      <div className="p-4 border-b border-[var(--app-border)] flex items-center justify-between">
        <span className="text-[13px] font-medium text-[var(--app-text-tertiary)] uppercase tracking-[0.05em]">
          Context
        </span>
        <button
          onClick={() => setContextRailOpen(false)}
          className="p-1 rounded-md hover:bg-[var(--app-hover)] text-[var(--app-text-tertiary)]"
        >
          <PanelRightClose size={14} strokeWidth={1.5} />
        </button>
      </div>

      {/* Metadata section */}
      <div className="p-4 border-b border-[var(--app-border)] min-h-[120px]">
        {selectedItem ? (
          <div>
            <span className="text-[12px] text-[var(--app-text-tertiary)] uppercase tracking-[0.05em]">{selectedItem.type}</span>
            <p className="text-[14px] font-medium text-[var(--app-text)] mt-1">{selectedItem.label}</p>
          </div>
        ) : space ? (
          <div className="space-y-2">
            <p className="text-[14px] font-medium text-[var(--app-text)]">{space.name}</p>
            <p className="text-[13px] text-[var(--app-text-secondary)]">{space.description}</p>
          </div>
        ) : (
          <p className="text-[13px] text-[var(--app-text-tertiary)]">Select an item to see details.</p>
        )}
      </div>

      {/* Agent section */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--app-border)]">
        <span className="text-[11px] font-medium text-[var(--app-text-tertiary)] uppercase tracking-[0.08em]">
          Assistant
        </span>
        {agentMessages.length > 0 && (
          <button
            onClick={() => setAgentMessages([])}
            className="p-1 rounded-md hover:bg-[var(--app-hover)] text-[var(--app-text-muted)]"
            title="Clear conversation"
          >
            <Trash2 size={12} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {agentMessages.length === 0 && !isStreaming && (
          <div className="space-y-1.5 mt-2">
            {suggestedPrompts.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="block w-full text-left text-[13px] text-[var(--app-text-secondary)] bg-[var(--app-bg)] px-3 py-2 rounded-lg hover:bg-[var(--app-hover)] transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {agentMessages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-5 h-5 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-mono text-[9px] flex-shrink-0 mt-0.5">
                .s
              </div>
            )}
            <div
              className={`max-w-[85%] text-[13px] leading-[1.55] whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-[var(--app-hover)] text-[var(--app-text)] px-3 py-2 rounded-xl rounded-br-sm"
                  : "text-[var(--app-text-secondary)]"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isStreaming && (
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-mono text-[9px] flex-shrink-0 mt-0.5">
              .s
            </div>
            <div className="text-[13px] text-[var(--app-text-secondary)] leading-[1.55] whitespace-pre-wrap">
              {streamingText}
              <BlinkingCursor />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[var(--app-border)]">
        <div className="flex items-center gap-2 border border-[var(--app-border)] rounded-lg px-3 py-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder={`Ask about ${space?.name || "anything"}...`}
            disabled={isStreaming}
            className="flex-1 text-[13px] bg-transparent outline-none placeholder:text-[var(--app-text-muted)]"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isStreaming}
            className="p-1 rounded-md hover:bg-[var(--app-hover)] disabled:opacity-30"
          >
            <ArrowUp size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
