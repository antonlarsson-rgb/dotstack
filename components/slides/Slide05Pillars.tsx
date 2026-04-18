"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SlideShell } from "@/components/ui/SlideShell";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const pillars = [
  {
    num: "01",
    title: "One invoice",
    body: "We take over every software subscription your company pays. One invoice from us each month, 20 to 30% lower than what you pay today.",
  },
  {
    num: "02",
    title: "Halve the cost, not the function",
    body: "Over 24 months, we replace the most expensive per-seat tools with custom applications built for your workflow. Your cost keeps falling. Your functionality gets better, not worse.",
  },
  {
    num: "03",
    title: "Never leave .stack",
    body: "Everything is in one dashboard. Email, messaging, documents, CRM, projects, finance. One login, one interface, zero context-switching.",
  },
  {
    num: "04",
    title: "An AI that takes action",
    body: "Not just chat. The .stack agent reads from your systems, drafts responses, moves tasks forward, and generates reports, with full context across every tool in your stack.",
  },
];

export function Slide05Pillars() {
  return (
    <SlideShell id="slide-5">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>What .stack does</Eyebrow>
        </motion.div>

        <motion.h1
          className="font-sans text-[48px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.1] mb-16"
          variants={fadeUp}
        >
          Four things, done well.
        </motion.h1>

        <motion.div
          className="grid grid-cols-4 gap-12"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {pillars.map((p) => (
            <motion.div key={p.num} variants={fadeUp}>
              <span className="font-mono text-[14px] text-[var(--text-tertiary)]">
                {p.num}
              </span>
              <h3 className="font-sans text-[20px] font-medium text-[var(--text)] mt-3 mb-4">
                {p.title}
              </h3>
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.6]">
                {p.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SlideShell>
  );
}
