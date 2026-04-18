"use client";

import { useState, useEffect, useRef } from "react";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";
import { stellarDemo } from "@/lib/data/demoData";

const { agentConversation } = stellarDemo;

export function Slide09DemoAgent() {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const startDemo = () => {
    setVisibleMessages(0);
    setStreamingText("");
    setIsStreaming(false);
    setHasStarted(true);
    streamMessages(0);
  };

  const streamMessages = (index: number) => {
    if (index >= agentConversation.length) return;

    const msg = agentConversation[index];
    if (msg.role === "user") {
      setVisibleMessages(index + 1);
      setTimeout(() => streamMessages(index + 1), 800);
    } else {
      setIsStreaming(true);
      setStreamingText("");
      const text = msg.content;
      let charIndex = 0;

      const interval = setInterval(() => {
        charIndex += 3;
        if (charIndex >= text.length) {
          setStreamingText(text);
          setIsStreaming(false);
          setVisibleMessages(index + 1);
          clearInterval(interval);
          setTimeout(() => streamMessages(index + 1), 1200);
        } else {
          setStreamingText(text.slice(0, charIndex));
        }
      }, 16);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [visibleMessages, streamingText]);

  return (
    <div id="slide-9">
      <section className="slide flex flex-col h-screen bg-white">
        <div className="bg-[var(--bg-subtle)] border-b border-[var(--border)] px-4 py-2 text-center text-[13px] text-[var(--text-tertiary)]">
          <span className="font-mono">.stack</span> AI Agent demo
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-0">
          <div className="w-full max-w-[680px] flex flex-col h-full max-h-[600px]">
            {/* Chat area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 pb-4">
              {!hasStarted && (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-mono text-[13px]">
                    .s
                  </div>
                  <p className="text-[15px] text-[var(--text-tertiary)]">
                    Watch the agent work across Stellar&apos;s stack
                  </p>
                  <button
                    onClick={startDemo}
                    className="px-4 py-2 bg-[var(--accent)] text-white text-[14px] rounded-md hover:opacity-90 transition-opacity"
                  >
                    Play demo
                  </button>
                </div>
              )}

              {hasStarted &&
                agentConversation.slice(0, visibleMessages).map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-mono text-[11px] flex-shrink-0 mt-1">
                        .s
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] text-[14px] leading-[1.6] whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-[var(--bg-muted)] text-[var(--text)] px-4 py-3 rounded-2xl rounded-br-sm"
                          : "text-[var(--text-secondary)]"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

              {isStreaming && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-mono text-[11px] flex-shrink-0 mt-1">
                    .s
                  </div>
                  <div className="text-[14px] text-[var(--text-secondary)] leading-[1.6] whitespace-pre-wrap">
                    {streamingText}
                    <BlinkingCursor />
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            {hasStarted && visibleMessages >= agentConversation.length && !isStreaming && (
              <div className="flex gap-2 py-3 border-t border-[var(--border)]">
                {["Send", "Edit", "Regenerate", "Cancel"].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => {
                      // Demo toast - just a brief visual indication
                    }}
                    className={`text-[13px] px-3 py-1.5 rounded-md transition-colors duration-[180ms] ${
                      btn === "Send"
                        ? "bg-[var(--accent)] text-white"
                        : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--hover-bg)]"
                    }`}
                  >
                    {btn}
                  </button>
                ))}
                <button
                  onClick={startDemo}
                  className="text-[13px] px-3 py-1.5 rounded-md border border-[var(--border)] text-[var(--text-tertiary)] hover:bg-[var(--hover-bg)] transition-colors duration-[180ms] ml-auto"
                >
                  Restart demo
                </button>
              </div>
            )}

            <p className="font-mono text-[13px] text-[var(--text-tertiary)] mt-3 text-center">
              The agent has live context across every tool in Stellar&apos;s
              stack. It can search, draft, take action, and generate reports. All
              from one place.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
