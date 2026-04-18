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
    title: "AI builds faster than humans buy.",
    body: "AI coding tools reached $1B ARR in 6 months. Custom software in hours, not months. Replacing SaaS is now economically viable.",
  },
  {
    title: "Integration is solved.",
    body: "MCP gives AI agents a standard way to connect to any business system. One protocol, every tool. No custom glue code.",
  },
  {
    title: "The buyer is ready.",
    body: "285B USD wiped off software stocks in 48 hours (Feb 2026). CFOs want to spend less, not more. We show up with that answer.",
  },
];

export function Slide03WhyNow() {
  return (
    <SlideShell id="slide-3">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="max-w-[860px]"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>Why now</Eyebrow>
        </motion.div>

        <motion.h1
          className="font-sans text-[40px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.1]"
          variants={fadeUp}
        >
          Per-seat SaaS is ending.
          <br />
          <span className="text-[var(--text-tertiary)]">The replacement hasn&apos;t been built.</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-[17px] text-[var(--text-secondary)] leading-[1.55] max-w-[600px]"
          variants={fadeUp}
        >
          Gartner predicts 35% of point-product SaaS replaced by agents by 2030.
          Enterprise has Sierra, Harvey, Decagon. SMBs, 99% of companies, have nothing.
          That&apos;s the gap.
        </motion.p>

        <motion.div
          className="mt-10 grid grid-cols-3 gap-6"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {reasons.map((r) => (
            <motion.div
              key={r.title}
              className="border border-[var(--border)] rounded-lg p-5"
              variants={fadeUp}
            >
              <h3 className="font-sans text-[16px] font-medium text-[var(--text)] mb-2 leading-[1.3]">
                {r.title}
              </h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.55]">
                {r.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SlideShell>
  );
}
