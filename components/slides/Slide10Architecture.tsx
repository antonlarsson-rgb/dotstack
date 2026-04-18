"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SlideShell } from "@/components/ui/SlideShell";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const layers = [
  { num: "4", label: "The .stack interface", desc: "what the user sees", type: "ai" },
  { num: "3", label: "AI agent + unified search + actions", desc: "the intelligence layer", type: "ai" },
  { num: "2", label: ".stack micro-applications", desc: "custom-built per customer, replaces SaaS", type: "ai" },
  { num: "1", label: "Deterministic backends", desc: "Fortnox, Google Workspace, banks", type: "keep" },
];

export function Slide10Architecture() {
  return (
    <SlideShell id="slide-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="max-w-[800px]"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>AI Infrastructure</Eyebrow>
        </motion.div>

        <motion.h1
          className="font-sans text-[40px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.1]"
          variants={fadeUp}
        >
          A new layer between the user and their software.
        </motion.h1>

        <motion.p
          className="mt-6 text-[17px] text-[var(--text-secondary)] leading-[1.55]"
          variants={fadeUp}
        >
          Regulated and deterministic systems stay. Fortnox for accounting,
          Microsoft 365 for identity. Everything else: the project tools, the
          CRM, the communication, the reporting, gets rebuilt as AI-native
          applications tailored to each customer.
        </motion.p>

        <motion.div
          className="mt-10 space-y-0"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {layers.map((layer) => (
            <motion.div
              key={layer.num}
              className={`border border-[var(--border)] px-6 py-4 first:rounded-t-lg last:rounded-b-lg -mt-px ${
                layer.type === "ai" ? "bg-[var(--bg-subtle)]" : ""
              }`}
              variants={fadeUp}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[13px] text-[var(--text-tertiary)] w-16">
                  Layer {layer.num}
                </span>
                <span className="text-[15px] text-[var(--text)] font-medium">
                  {layer.label}
                </span>
                <span className="text-[13px] text-[var(--text-tertiary)]">
                  {layer.desc}
                </span>
                {layer.type === "ai" && (
                  <span className="ml-auto text-[11px] font-mono text-[var(--accent-blue)] bg-[#eff6ff] px-2 py-0.5 rounded">
                    .stack
                  </span>
                )}
                {layer.type === "keep" && (
                  <span className="ml-auto text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-muted)] px-2 py-0.5 rounded">
                    kept
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-8 text-[15px] text-[var(--text-tertiary)]"
          variants={fadeUp}
        >
          42 apps in the .stack App Store today. Each one replaces a specific
          SaaS product. The AI agent works across all of them.
        </motion.p>
      </motion.div>
    </SlideShell>
  );
}
