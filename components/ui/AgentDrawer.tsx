"use client";

import { useState, useRef, useEffect } from "react";
import { X, ArrowUp } from "lucide-react";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";
import { useSlideContext } from "@/lib/context/SlideContext";
import { slideContexts } from "@/lib/data/slideContexts";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedPrompts = [
  "What's the unit economics?",
  "Why solo founder?",
  "What happens if customers churn?",
  "How does the AI agent work technically?",
];

export function AgentDrawer() {
  const { agentOpen, setAgentOpen, currentSlide } = useSlideContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (agentOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [agentOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streamingText]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);
    setStreamingText("");
    setError(false);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          slideContext: slideContexts[currentSlide] || "",
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
                // skip unparseable
              }
            }
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fullText },
      ]);
    } catch {
      setError(true);
    } finally {
      setIsStreaming(false);
      setStreamingText("");
    }
  };

  if (!agentOpen) return null;

  return (
    <div className="fixed inset-0 md:inset-y-0 md:left-auto md:right-0 w-full md:w-[420px] bg-white border-l border-[var(--border)] z-[60] flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
        <div>
          <span className="text-[15px] font-medium text-[var(--text)]">
            .stack assistant
          </span>
          <p className="text-[13px] text-[var(--text-tertiary)]">
            Briefed on this pitch. Ask anything.
          </p>
        </div>
        <button
          onClick={() => setAgentOpen(false)}
          className="p-1 rounded-md hover:bg-[var(--hover-bg)] transition-colors duration-[180ms]"
          aria-label="Close agent"
        >
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.length === 0 && !isStreaming && (
          <div className="space-y-2 mt-4">
            {suggestedPrompts.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                className="block w-full text-left text-[14px] text-[var(--text-secondary)] bg-[var(--bg-subtle)] px-3 py-2.5 rounded-lg hover:bg-[var(--bg-muted)] transition-colors duration-[180ms]"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-mono text-[10px] flex-shrink-0 mt-0.5">
                .s
              </div>
            )}
            <div
              className={`max-w-[85%] text-[14px] leading-[1.6] whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-[var(--bg-muted)] text-[var(--text)] px-3.5 py-2.5 rounded-2xl rounded-br-sm"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isStreaming && (
          <div className="flex gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-mono text-[10px] flex-shrink-0 mt-0.5">
              .s
            </div>
            <div className="text-[14px] text-[var(--text-secondary)] leading-[1.6] whitespace-pre-wrap">
              {streamingText}
              <BlinkingCursor />
            </div>
          </div>
        )}

        {error && (
          <p className="text-[14px] text-[var(--text-tertiary)]">
            The assistant is unavailable right now. Anton reads every message
            sent to anton.larsson@wearestellar.se, so feel free to email directly.
          </p>
        )}
      </div>

      {/* Input */}
      <div className="px-5 py-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-2 border border-[var(--border)] rounded-lg px-3 py-2">
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
            placeholder="Ask about the pitch"
            disabled={isStreaming}
            className="flex-1 text-[14px] bg-transparent outline-none placeholder:text-[var(--text-muted)]"
          />
          {!input && !isStreaming && <BlinkingCursor />}
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isStreaming}
            className="p-1 rounded-md hover:bg-[var(--hover-bg)] disabled:opacity-30 transition-colors duration-[180ms]"
            aria-label="Send message"
          >
            <ArrowUp size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function AgentButton() {
  const { setAgentOpen, agentOpen } = useSlideContext();

  if (agentOpen) return null;

  return (
    <button
      onClick={() => setAgentOpen(true)}
      className="fixed bottom-4 right-4 md:bottom-5 md:right-8 z-50 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-mono text-[12px] md:text-[13px] font-medium shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:opacity-90 transition-opacity duration-[180ms]"
      aria-label="Open .stack assistant"
    >
      .s
    </button>
  );
}
