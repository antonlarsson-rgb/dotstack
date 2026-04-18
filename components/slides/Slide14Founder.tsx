"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SlideShell } from "@/components/ui/SlideShell";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const timeline = [
  { year: "2014", title: "First company, age 19", desc: "Sold websites to local businesses in Sundsvall. Learned to sell technical services to non-technical people." },
  { year: "2016", title: "N1CE, Spikeball", desc: "Early part of N1CE (alcohol popsicles). Ran Swedish Spikeball import. Real companies, real revenue." },
  { year: "2019", title: "Construction staffing", desc: "Self-funded staffing platform. Reached 23 MSEK revenue. Went bankrupt 2022. Expensive, formative lesson." },
  { year: "2023", title: "Stellar, Head of Performance", desc: "Deliberately went agency-side. Stellar grew from 50 toward 100 MSEK. Rebuilt operator muscles." },
  { year: "2026", title: ".stack", desc: "Two years hearing the same problem. Built the product. Two customers committed. Ready for the next step." },
];

export function Slide14Founder() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <SlideShell id="slide-2">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="max-w-[860px]"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>The founder</Eyebrow>
        </motion.div>

        {/* Photo + intro */}
        <motion.div className="flex gap-8 items-start mb-10" variants={fadeUp}>
          <div className="w-[140px] h-[140px] rounded-2xl overflow-hidden flex-shrink-0 border border-[var(--border)]">
            <Image
              src="/anton.jpg"
              alt="Anton Larsson"
              width={280}
              height={280}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
          <div className="min-w-0">
            <h1 className="font-sans text-[32px] font-medium tracking-[-0.02em] text-[var(--text)] leading-[1.15]">
              Anton Larsson
            </h1>
            <p className="text-[15px] text-[var(--text-tertiary)] mt-1">
              Head of Performance, Stellar · Sweden
            </p>
            <p className="text-[15px] text-[var(--text-secondary)] mt-3 leading-[1.55] max-w-[520px]">
              12 years of building companies. Background in B2B customer
              acquisition, performance marketing, sales, and operations.
              Enough technical understanding to build an MVP with AI tools,
              enough self-awareness to know I need a technical co-founder
              for what comes next. I&apos;ve made expensive mistakes and
              learned from every one.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div className="grid grid-cols-2 gap-x-8 gap-y-0" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <div className="space-y-0">
            {timeline.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.year}
                variants={fadeUp}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`flex gap-4 border-l-2 pl-4 py-3 transition-colors ${hoveredIdx === i ? "border-[var(--border-strong)]" : "border-[var(--border)]"}`}
              >
                <span className="font-mono text-[12px] text-[var(--text-muted)] tabular-nums w-9 flex-shrink-0">{t.year}</span>
                <div className="min-w-0">
                  <h3 className="text-[14px] font-medium text-[var(--text)]">{t.title}</h3>
                  <p className="text-[12px] text-[var(--text-secondary)] leading-[1.45] mt-0.5">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="space-y-0">
            {timeline.slice(3).map((t, i) => {
              const isLast = i === 1;
              const realIdx = i + 3;
              return (
                <motion.div
                  key={t.year}
                  variants={fadeUp}
                  onMouseEnter={() => setHoveredIdx(realIdx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`flex gap-4 border-l-2 pl-4 py-3 transition-colors ${isLast ? "border-[var(--accent-blue)]" : hoveredIdx === realIdx ? "border-[var(--border-strong)]" : "border-[var(--border)]"}`}
                >
                  <span className="font-mono text-[12px] text-[var(--text-muted)] tabular-nums w-9 flex-shrink-0">{t.year}</span>
                  <div className="min-w-0">
                    <h3 className={`text-[14px] font-medium ${isLast ? "text-[var(--accent-blue)]" : "text-[var(--text)]"}`}>{t.title}</h3>
                    <p className="text-[12px] text-[var(--text-secondary)] leading-[1.45] mt-0.5">{t.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Strengths / gaps */}
        <motion.div className="grid grid-cols-2 gap-4 mt-6" variants={fadeUp}>
          <div className="border border-[var(--border)] rounded-lg p-4">
            <h3 className="text-[12px] font-medium text-[var(--accent-green)] mb-2">What I bring</h3>
            <ul className="space-y-1 text-[13px] text-[var(--text-secondary)] leading-[1.4]">
              <li>B2B customer acquisition and sales</li>
              <li>Performance marketing and operations</li>
              <li>Direct daily access to target customers</li>
              <li>Technical foundation, built this MVP with AI</li>
            </ul>
          </div>
          <div className="border border-[var(--border)] rounded-lg p-4">
            <h3 className="text-[12px] font-medium text-[var(--accent-amber)] mb-2">What I need</h3>
            <ul className="space-y-1 text-[13px] text-[var(--text-secondary)] leading-[1.4]">
              <li>Technical co-founder (candidate in discussion)</li>
              <li>Network in AI infrastructure and SaaS</li>
              <li>Operational support scaling B2B</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </SlideShell>
  );
}
