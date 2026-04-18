"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SlideShell } from "@/components/ui/SlideShell";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";
import { formatSek } from "@/lib/utils/formatSek";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const stats = [
  { number: "87", label: "SaaS tools at the average SMB", source: "Zylo SaaS Index" },
  { number: "34%", label: "of those licenses go unused", source: "Zylo SaaS Index" },
  { number: "9,643 USD", label: "annual SaaS spend per employee", source: "CloudNuro 2026" },
];

const fears = [
  {
    problem: "Paying for what you don't use",
    detail: "Teams sign up for tools, use 30% of the features, and the subscription runs forever. Nobody has an overview.",
  },
  {
    problem: "Afraid to cancel anything",
    detail: "What if someone needs that feature? What if we lose data? So companies keep paying, just in case.",
  },
  {
    problem: "Upgrades, downgrades, renewals",
    detail: "Every tool has its own pricing page, its own renewal date, its own negotiation. Managing subscriptions is a full-time job nobody signed up for.",
  },
  {
    problem: "AI feels like yet another layer",
    detail: "Every vendor adds AI features. None of them talk to each other. It's more complexity, not less.",
  },
];

export function Slide02Observation() {
  const [employees, setEmployees] = useState(50);

  return (
    <SlideShell id="slide-3">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="max-w-[920px]"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>The problem</Eyebrow>
        </motion.div>

        <motion.h1
          className="font-sans text-[40px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.1]"
          variants={fadeUp}
        >
          Companies pay for 87 tools.
          <br />
          <span className="text-[var(--text-tertiary)]">They use a third of the features. They&apos;re afraid to cancel any of them.</span>
        </motion.h1>

        {/* Stats */}
        <motion.div
          className="mt-8 grid grid-cols-3 divide-x divide-[var(--border)]"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {stats.map((s) => (
            <motion.div key={s.number} className="px-5 first:pl-0 last:pr-0" variants={fadeUp}>
              <span className="font-mono text-[28px] font-medium text-[var(--text)] tabular-nums">{s.number}</span>
              <p className="text-[12px] text-[var(--text-tertiary)] mt-1 leading-[1.4]">{s.label}</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5 italic">{s.source}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Fear grid */}
        <motion.div
          className="mt-8 grid grid-cols-2 gap-3"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {fears.map((f) => (
            <motion.div
              key={f.problem}
              className="border border-[var(--border)] rounded-lg p-4"
              variants={fadeUp}
            >
              <h3 className="text-[14px] font-medium text-[var(--text)] mb-1">{f.problem}</h3>
              <p className="text-[13px] text-[var(--text-secondary)] leading-[1.45]">{f.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive + .stack answer */}
        <motion.div className="mt-6 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-lg px-5 py-4" variants={fadeUp}>
          <p className="text-[15px] text-[var(--text-secondary)] leading-[1.55]">
            A company with{" "}
            <span className="inline-flex items-center gap-2 mx-1">
              <input type="range" min={10} max={100} value={employees} onChange={(e) => setEmployees(Number(e.target.value))} className="w-20 accent-[var(--accent)]" />
              <span className="font-mono text-[15px] font-medium text-[var(--text)] tabular-nums min-w-[24px]">{employees}</span>
            </span>{" "}
            employees pays roughly{" "}
            <span className="font-mono font-medium text-[var(--text)] tabular-nums">{formatSek(employees * 800)}</span>
            <BlinkingCursor />{" "}per month on software. With <span className="font-mono">.stack</span>, they
            stop worrying about which tools to keep, which to cancel, or what
            they&apos;re missing. One platform, always up to date, always the
            right set of features.
          </p>
        </motion.div>
      </motion.div>
    </SlideShell>
  );
}
