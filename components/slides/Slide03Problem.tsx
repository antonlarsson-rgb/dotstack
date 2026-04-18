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
  {
    number: "9,643 USD",
    label: "average annual SaaS spend per employee, 2026",
    source: "CloudNuro SaaS Statistics 2026",
  },
  {
    number: "87",
    label: "distinct SaaS applications at the average SMB",
    source: "Zylo SaaS Index",
  },
  {
    number: "34%",
    label: "percentage of those licenses that are unused or underused",
    source: "Zylo SaaS Index",
  },
];

export function Slide03Problem() {
  const [employees, setEmployees] = useState(50);

  return (
    <SlideShell id="slide-3">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="max-w-[900px]"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>By the numbers</Eyebrow>
        </motion.div>

        <motion.h1
          className="font-sans text-[48px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.1]"
          variants={fadeUp}
        >
          A 50-person company spends 100,000 SEK a month on software.
        </motion.h1>

        <motion.div
          className="mt-14 grid grid-cols-3 divide-x divide-[var(--border)]"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {stats.map((s) => (
            <motion.div key={s.number} className="px-8 first:pl-0 last:pr-0" variants={fadeUp}>
              <span className="font-mono text-[36px] font-medium text-[var(--text)] tabular-nums">
                {s.number}
              </span>
              <p className="text-[14px] text-[var(--text-tertiary)] mt-2 leading-[1.5]">
                {s.label}
              </p>
              <p className="text-[12px] text-[var(--text-muted)] mt-1 italic">
                {s.source}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-16" variants={fadeUp}>
          <p className="text-[19px] text-[var(--text-secondary)] leading-[1.55]">
            If your company has{" "}
            <span className="inline-flex items-center gap-3 mx-1">
              <input
                type="range"
                min={10}
                max={100}
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-32 accent-[var(--accent)]"
              />
              <span className="font-mono text-[19px] font-medium text-[var(--text)] tabular-nums min-w-[32px]">
                {employees}
              </span>
            </span>{" "}
            employees, you&apos;re likely paying{" "}
            <span className="font-mono font-medium text-[var(--text)] tabular-nums">
              {formatSek(employees * 800)}
            </span>
            <BlinkingCursor />
            {" "}per month on software.
          </p>
        </motion.div>
      </motion.div>
    </SlideShell>
  );
}
