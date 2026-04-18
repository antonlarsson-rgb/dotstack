"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SlideShell } from "@/components/ui/SlideShell";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const pillars = [
  {
    num: "01",
    title: "We pay your SaaS bills",
    short: "One invoice, 10% lower, from day one.",
    detail: ".stack takes over every subscription. We pay the vendors directly. The customer gets one invoice from us, 10% lower than what they pay today. First invoice at net-60, giving two months of extra cashflow during the transition. No contract lock-in. Change your plan whenever you want.",
  },
  {
    num: "02",
    title: "A Stackie in your corner",
    short: "A real person who works to lower your costs.",
    detail: "Every customer gets a dedicated Stackie, one person who manages 10 clients. The Stackie's job: find waste, replace tools, ensure nothing breaks, and make sure the customer always has access to the latest functionality. Not a chatbot. A colleague.",
  },
  {
    num: "03",
    title: "Never miss a feature",
    short: "Always up to date. Zero admin.",
    detail: "New AI models, new agents, new integrations: the customer gets them automatically. No upgrades to manage, no renewals to negotiate, no downgrades to figure out. .stack is always the latest version. The Stackie flags what's relevant.",
  },
  {
    num: "04",
    title: "50% cost reduction, together",
    short: "A shared plan with accountability.",
    detail: "The Stackie and customer build a concrete cost-reduction plan. As .stack replaces SaaS APIs with purpose-built backends, costs fall. The target is 50% reduction within 12 months. The customer operates exactly like before, often better, paying half as much.",
  },
];

export function Slide04Solution() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <SlideShell id="slide-5">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="max-w-[940px]"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>How it works</Eyebrow>
        </motion.div>

        <motion.h1
          className="font-sans text-[40px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.1] mb-3"
          variants={fadeUp}
        >
          The model
        </motion.h1>

        <motion.p
          className="text-[17px] text-[var(--text-secondary)] leading-[1.55] mb-8 max-w-[620px]"
          variants={fadeUp}
        >
          We take over the customer&apos;s software. They stop managing
          subscriptions, upgrades, and cancellations. They just work. We handle
          everything else, together with their Stackie.
        </motion.p>

        <motion.div
          className="grid grid-cols-2 gap-3"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {pillars.map((p) => {
            const isExpanded = expanded === p.num;
            return (
              <motion.div
                key={p.num}
                variants={fadeUp}
                onClick={() => setExpanded(isExpanded ? null : p.num)}
                className={`border rounded-lg p-5 cursor-pointer transition-all duration-200 ${
                  isExpanded
                    ? "border-[var(--accent)] bg-[var(--bg-subtle)]"
                    : "border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[13px] text-[var(--text-tertiary)] mt-0.5">{p.num}</span>
                  <div className="min-w-0">
                    <h3 className="font-sans text-[16px] font-medium text-[var(--text)] leading-[1.2]">{p.title}</h3>
                    <p className="text-[13px] text-[var(--text-secondary)] leading-[1.45] mt-1">{p.short}</p>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="text-[12px] text-[var(--text-tertiary)] leading-[1.55] mt-2 overflow-hidden"
                        >
                          {p.detail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </SlideShell>
  );
}
