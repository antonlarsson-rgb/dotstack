"use client";

import { motion } from "framer-motion";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function Slide17Contact() {
  return (
    <section
      id="slide-14"
      className="slide flex items-center justify-center px-16 py-24"
    >
      <motion.div
        className="flex flex-col items-center text-center max-w-[600px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.h1
          className="font-mono text-[56px] font-medium tracking-[-0.025em] text-[var(--text)]"
          variants={fadeUp}
        >
          .stack
        </motion.h1>

        <motion.p
          className="text-[21px] text-[var(--text-secondary)] mt-4 leading-[1.4]"
          variants={fadeUp}
        >
          The AI infrastructure layer that replaces SMBs&apos; entire SaaS stack.
        </motion.p>

        <motion.div className="mt-10 space-y-2 text-[15px]" variants={fadeUp}>
          <p>
            <a
              href="mailto:anton.larsson@wearestellar.se"
              className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors duration-[180ms]"
            >
              anton.larsson@wearestellar.se
            </a>
          </p>
          <p>
            <a
              href="https://linkedin.com/in/anton-larsson-23aa574a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors duration-[180ms]"
            >
              linkedin.com/in/anton-larsson-23aa574a
            </a>
          </p>
        </motion.div>

        <motion.p className="font-mono text-[13px] text-[var(--text-muted)] mt-14" variants={fadeUp}>
          This pitch and the product were built with AI.
          <br />
          That&apos;s the point. This is what&apos;s possible now.
          <BlinkingCursor />
        </motion.p>
      </motion.div>
    </section>
  );
}
