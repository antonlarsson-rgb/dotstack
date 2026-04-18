"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SlideShell } from "@/components/ui/SlideShell";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const milestones = [
  { done: true, text: "Working MVP: CRM, projects, chat, finance, campaigns, AI agent" },
  { done: true, text: "42-app App Store covering 12 SaaS categories" },
  { done: true, text: "Built entirely with AI in weeks, not months" },
  { done: true, text: "2 test customers committed: Stellar (50p agency) + Swedish retailer (150+ stores)" },
  { done: false, text: "15 warm leads from Stellar's existing client network" },
  { done: false, text: "Technical co-founder candidate in early conversations" },
];

export function Slide13Traction() {
  return (
    <SlideShell id="slide-9">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="max-w-[740px]"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>Where we are</Eyebrow>
        </motion.div>

        <motion.h1
          className="font-sans text-[40px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.1]"
          variants={fadeUp}
        >
          Not a slide deck. A working product with customers.
        </motion.h1>

        <motion.p
          className="mt-6 text-[17px] text-[var(--text-secondary)] leading-[1.55] max-w-[600px]"
          variants={fadeUp}
        >
          Two test customers are ready to go live. Stellar, where I work, runs
          100k SEK/month in SaaS. A Swedish retail brand with 150+ stores is
          customer two. Both are committed at full price from launch.
        </motion.p>

        <motion.div
          className="mt-8 space-y-2.5"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {milestones.map((m) => (
            <motion.div key={m.text} className="flex items-start gap-3" variants={fadeUp}>
              <span
                className={`w-5 h-5 rounded-full border flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5 ${
                  m.done
                    ? "border-[var(--accent-green)] text-[var(--accent-green)] bg-[#f0fdf4]"
                    : "border-[var(--border-strong)] text-[var(--text-muted)]"
                }`}
              >
                {m.done ? "✓" : ""}
              </span>
              <span className="text-[14px] text-[var(--text-secondary)] leading-[1.45]">{m.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-lg p-5"
          variants={fadeUp}
        >
          <p className="text-[14px] text-[var(--text-secondary)] leading-[1.55]">
            <span className="font-medium text-[var(--text)]">Why Stackies (humans)?</span>{" "}
            Because the rest of .stack is as much AI as possible. The platform,
            the agent, the app generation, all automated. But someone needs to
            hold the customer&apos;s hand, help them choose the right path, and
            actively work to lower their costs. That&apos;s the Stackie. One
            human per ten customers. High touch where it matters, AI everywhere else.
          </p>
        </motion.div>
      </motion.div>
    </SlideShell>
  );
}
