"use client";

import { motion } from "framer-motion";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function Slide01Hero() {
  return (
    <section
      id="slide-1"
      className="slide flex items-center justify-center px-16 py-24"
    >
      <motion.div
        className="flex flex-col items-center text-center max-w-[780px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div className="flex items-center gap-3 mb-8" variants={fadeUp}>
          <span className="text-[12px] font-mono tracking-[0.08em] text-[var(--text-muted)] uppercase">
            Pinecone Ventures Buildathon
          </span>
          <span className="text-[var(--text-muted)]">/</span>
          <span className="text-[12px] font-medium tracking-[0.08em] text-[var(--accent-blue)] uppercase">
            AI Infrastructure
          </span>
        </motion.div>

        <motion.h1
          className="font-mono text-[80px] font-medium tracking-[-0.025em] text-[var(--text)]"
          variants={fadeUp}
        >
          .stack
        </motion.h1>

        <motion.p
          className="font-sans text-[32px] font-medium text-[var(--text)] leading-[1.2] mt-6 tracking-[-0.015em]"
          variants={fadeUp}
        >
          The AI operating system that replaces
          <br />
          your company&apos;s entire SaaS stack.
        </motion.p>

        <motion.p
          className="text-[19px] text-[var(--text-secondary)] leading-[1.4] mt-6 max-w-[600px]"
          variants={fadeUp}
        >
          One invoice. One dashboard. One AI agent that works across
          every tool. 10% cheaper from day one, half the cost within a year.
        </motion.p>

        <motion.p className="font-mono text-[13px] text-[var(--text-muted)] mt-14" variants={fadeUp}>
          Built by Anton Larsson · Sweden
          <BlinkingCursor />
        </motion.p>
      </motion.div>
    </section>
  );
}
