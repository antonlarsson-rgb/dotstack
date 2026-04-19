"use client";

import { motion } from "framer-motion";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";
import { Mail } from "lucide-react";

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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
          className="font-mono text-[36px] md:text-[56px] font-medium tracking-[-0.025em] text-[var(--text)]"
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

        <motion.div className="mt-10 flex items-center gap-4" variants={fadeUp}>
          <a
            href="mailto:anton.larsson@wearestellar.se"
            className="flex items-center gap-2 text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors duration-[180ms]"
          >
            <Mail size={18} strokeWidth={1.5} />
            anton.larsson@wearestellar.se
          </a>
          <a
            href="https://www.linkedin.com/in/anton-larsson-23aa574a/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors duration-[180ms]"
          >
            <LinkedInIcon size={18} />
            LinkedIn
          </a>
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
