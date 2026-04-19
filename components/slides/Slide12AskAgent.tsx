"use client";

import { motion } from "framer-motion";
import { useSlideContext } from "@/lib/context/SlideContext";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const prompts = [
  { text: "What's the unit economics?", desc: "Understand the margin model" },
  { text: "How does the AI agent work technically?", desc: "Architecture and MCP" },
  { text: "What happens if customers churn?", desc: "Retention and risk" },
  { text: "Why should Pinecone invest?", desc: "The case for .stack" },
  { text: "What's the competitive landscape?", desc: "Who else is doing this" },
  { text: "How did you build this?", desc: "AI coding tools and speed" },
];

export function Slide12AskAgent() {
  const { setAgentOpen } = useSlideContext();

  return (
    <section id="slide-12" className="slide flex items-center justify-center px-16 py-24">
      <motion.div
        className="flex flex-col items-center text-center max-w-[720px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-mono text-[20px] font-medium mb-6"
          variants={fadeUp}
        >
          .s
        </motion.div>

        <motion.h1
          className="font-sans text-[28px] md:text-[40px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.15]"
          variants={fadeUp}
        >
          Don&apos;t take my word for it.
          <br />
          Ask the AI.
        </motion.h1>

        <motion.p
          className="text-[17px] text-[var(--text-secondary)] mt-4 leading-[1.5] max-w-[500px]"
          variants={fadeUp}
        >
          The .stack assistant knows every number in this pitch, the product
          architecture, the economics, and the competitive landscape. It answers
          like I would.
        </motion.p>

        {/* Prompt cards */}
        <motion.div
          className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {prompts.map((p) => (
            <motion.button
              key={p.text}
              variants={fadeUp}
              onClick={() => setAgentOpen(true)}
              className="text-left border border-[var(--border)] rounded-lg p-4 hover:bg-[var(--bg-subtle)] hover:border-[var(--border-strong)] transition-all duration-[180ms] group"
            >
              <span className="text-[14px] font-medium text-[var(--text)] group-hover:text-[var(--accent-blue)] transition-colors">
                {p.text}
              </span>
              <span className="text-[12px] text-[var(--text-muted)] block mt-1">{p.desc}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.button
          onClick={() => setAgentOpen(true)}
          className="mt-8 flex items-center gap-3 bg-[var(--accent)] text-white px-8 py-3 rounded-lg text-[15px] font-medium hover:opacity-90 transition-opacity"
          variants={fadeUp}
        >
          <span>Open the assistant</span>
          <BlinkingCursor />
        </motion.button>

        <motion.p className="text-[13px] text-[var(--text-muted)] mt-4" variants={fadeUp}>
          Powered by Claude Sonnet. Streams responses in real-time.
        </motion.p>
      </motion.div>
    </section>
  );
}
