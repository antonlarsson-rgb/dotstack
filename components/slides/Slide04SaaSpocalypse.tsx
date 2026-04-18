"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SlideShell } from "@/components/ui/SlideShell";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function Slide04SaaSpocalypse() {
  return (
    <SlideShell id="slide-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="max-w-[800px]"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>Why AI Infrastructure</Eyebrow>
        </motion.div>

        <motion.h1
          className="font-sans text-[48px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.1]"
          variants={fadeUp}
        >
          Per-seat SaaS is ending.
          <br />
          <span className="text-[var(--text-tertiary)]">The replacement layer hasn&apos;t been built yet.</span>
        </motion.h1>

        <motion.div
          className="mt-10 text-[19px] text-[var(--text-secondary)] leading-[1.55] space-y-5"
          variants={fadeUp}
        >
          <p>
            In February 2026, investors wiped 285 billion dollars off software
            stocks in 48 hours. Gartner predicts 35% of point-product SaaS will
            be replaced by AI agents by 2030. Microsoft&apos;s CEO has said SaaS
            applications will collapse in the agent era.
          </p>
          <p>
            Enterprise companies get Sierra, Harvey, Decagon. They have the
            budgets and the teams to build custom AI solutions.
          </p>
          <p>
            SMBs, which are 99% of companies, have nothing.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 border border-[var(--border)] rounded-lg p-6 bg-[var(--bg-subtle)]"
          variants={fadeUp}
        >
          <p className="text-[17px] font-medium text-[var(--text)]">
            <span className="font-mono">.stack</span> is the AI infrastructure
            layer for SMBs. It sits between the user and their software, replaces
            the tools AI is already better at, and keeps the deterministic systems
            (accounting, identity, compliance) connected via API.
          </p>
        </motion.div>
      </motion.div>
    </SlideShell>
  );
}
