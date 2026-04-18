"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SlideShell } from "@/components/ui/SlideShell";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const reasons = [
  {
    title: "AI can now build software faster than humans buy it.",
    body: "Claude Code reached 1 billion dollars in annual revenue in six months. Custom applications can be generated and deployed in hours, not months. That changes the economics of replacing SaaS entirely.",
  },
  {
    title: "MCP solves the integration problem.",
    body: "Anthropic's Model Context Protocol creates a standard for AI agents to connect to business systems securely. One protocol, every tool. No custom glue code per integration.",
  },
  {
    title: "CFOs are actively looking for alternatives.",
    body: "The SaaS repricing event was a signal. Companies want to spend less on software, not more. The buyer is ready. The infrastructure to serve them hasn't existed until now.",
  },
];

export function Slide15WhyNow() {
  return (
    <SlideShell id="slide-15">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>Timing</Eyebrow>
        </motion.div>

        <motion.h1
          className="font-sans text-[40px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.1] mb-14"
          variants={fadeUp}
        >
          This couldn&apos;t have been built 12 months ago.
        </motion.h1>

        <motion.div
          className="grid grid-cols-3 gap-10"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {reasons.map((r) => (
            <motion.div key={r.title} variants={fadeUp}>
              <h3 className="font-sans text-[18px] font-medium text-[var(--text)] mb-3 leading-[1.3]">
                {r.title}
              </h3>
              <p className="text-[15px] text-[var(--text-secondary)] leading-[1.6]">
                {r.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SlideShell>
  );
}
