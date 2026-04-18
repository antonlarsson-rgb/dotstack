"use client";

import { motion } from "framer-motion";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function Slide05LiveProduct() {
  return (
    <section id="slide-13" className="slide flex items-center justify-center px-12 py-12">
      <motion.div
        className="flex flex-col items-center w-full max-w-[900px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div className="text-center mb-6" variants={fadeUp}>
          <span className="font-serif text-[14px] text-[var(--text-tertiary)] italic block mb-2">The product</span>
          <h1 className="font-sans text-[36px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.1]">
            A working MVP. Not a mockup.
          </h1>
          <p className="text-[16px] text-[var(--text-secondary)] mt-3 max-w-[500px] mx-auto leading-[1.5]">
            CRM, projects, chat, finance, campaigns, timeline, AI agent,
            and a 42-app store. Built with AI. Running live.
          </p>
        </motion.div>

        {/* Browser chrome with scaled iframe */}
        <motion.div
          className="w-full border border-[var(--border)] rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
          variants={fadeUp}
        >
          {/* Title bar */}
          <div className="bg-[var(--bg-muted)] border-b border-[var(--border)] px-4 py-2.5 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white border border-[var(--border)] rounded-md px-4 py-1 text-[11px] text-[var(--text-muted)] font-mono">
                dotstack-five.vercel.app/app
              </div>
            </div>
          </div>

          {/* Scaled iframe container */}
          <div className="relative bg-white overflow-hidden" style={{ height: "420px" }}>
            <div
              className="absolute top-0 left-0 origin-top-left pointer-events-none"
              style={{
                width: "1440px",
                height: "900px",
                transform: "scale(0.625)",
              }}
            >
              <iframe
                src="/app/brand-factory"
                className="w-full h-full border-0"
                title=".stack product preview"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        <motion.div className="flex items-center gap-4 mt-5" variants={fadeUp}>
          <a
            href="/app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-medium bg-[var(--accent)] text-white px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            Open the full app →
          </a>
          <a
            href="/app/store"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-medium border border-[var(--border)] text-[var(--text-secondary)] px-6 py-2.5 rounded-md hover:bg-[var(--hover-bg)] transition-colors"
          >
            Browse App Store
          </a>
        </motion.div>

        <motion.p className="text-[13px] text-[var(--text-muted)] mt-3" variants={fadeUp}>
          Open the app to explore every module
          <BlinkingCursor />
        </motion.p>
      </motion.div>
    </section>
  );
}
