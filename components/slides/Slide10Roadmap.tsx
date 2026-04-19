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

const quarters = [
  {
    id: "q1",
    label: "Month 1-3",
    title: "Onboard and prove",
    color: "#1e40af",
    summary: "Two customers live. Cancel first subscriptions. Validate the model.",
    months: [
      { month: "Month 1", items: [
        "Onboard Stellar (customer 1): take over all SaaS subscriptions",
        "Map every tool, user, and contract renewal date",
        "First invoice at net-60 (factored at 1.8%)",
        "Begin subscription audits: identify unused licenses immediately",
      ]},
      { month: "Month 2", items: [
        "First cancellations: ~20% of Stellar's SaaS spend removed",
        "Onboard retail brand (customer 2): same process",
        "Invoice customer 1 at 10% discount (90% of original spend)",
        "Hire technical co-founder from Pinecone network",
      ]},
      { month: "Month 3", items: [
        "Stellar vendor cost down ~40% from original",
        "Build first .stack replacement modules (CRM, project management)",
        "Positive gross margin on customer 1",
        "First Stackie hire starts training",
      ]},
    ],
  },
  {
    id: "q2",
    label: "Month 4-6",
    title: "Margin and pipeline",
    color: "#15803d",
    summary: "Gross margin growing. 3-5 new customers from warm leads. First Stackie active.",
    months: [
      { month: "Month 4", items: [
        "First Stackie manages both existing customers",
        "Vendor cost at ~30% for early customers",
        "Begin outreach to 15 warm leads from Stellar network",
        "Be selective: ideal customers are 20-80 employees, 50-150k SEK/mo SaaS spend",
      ]},
      { month: "Month 5", items: [
        "3-5 new customers onboarded",
        "Each new customer = immediate revenue (their full SaaS spend flows through .stack)",
        "Net-60 invoicing as acquisition tool: two months extra cashflow for new customers",
        "Build Fortnox and Google Workspace integrations",
      ]},
      { month: "Month 6", items: [
        "5-8 total customers",
        "Early customers at ~20% vendor cost (mostly API tokens)",
        "Monthly revenue: 400-600k SEK",
        "Gross margin above 60% on mature customers",
      ]},
    ],
  },
  {
    id: "q3",
    label: "Month 7-9",
    title: "Scale the playbook",
    color: "#b45309",
    summary: "Proven model. Hire second Stackie. Revenue above 800k SEK/month.",
    months: [
      { month: "Month 7", items: [
        "Hire second Stackie (first one at 8-10 customers)",
        "Playbook documented: onboarding process, cancellation checklist, customer success metrics",
        "Begin replacing HubSpot/Monday with .stack modules at scale",
      ]},
      { month: "Month 8", items: [
        "8-12 total customers",
        "Monthly revenue: 700k-1M SEK",
        "Average vendor cost across portfolio: ~25%",
        "Customer retention: 100% target, zero churn",
      ]},
      { month: "Month 9", items: [
        "First customer hits 50% total cost reduction target",
        "Case study ready for marketing",
        "Begin testing outbound acquisition beyond warm leads",
      ]},
    ],
  },
  {
    id: "q4",
    label: "Month 10-12",
    title: "Series A ready",
    color: "#7c3aed",
    summary: "12+ customers. Proven unit economics. Data for Series A.",
    months: [
      { month: "Month 10", items: [
        "12-15 paying customers",
        "Monthly revenue: 1M+ SEK",
        "Gross margin above 70% on mature customers",
      ]},
      { month: "Month 11", items: [
        "Prepare data room: 10 months of real revenue, margin, retention data",
        "Begin Series A conversations with Nordic and European VCs",
        "Team: 2 founders + 2-3 Stackies + 1 engineer",
      ]},
      { month: "Month 12", items: [
        "ARR run-rate: 12-15M SEK",
        "Clear path to profitability or Series A close",
        "Model validated: high revenue day one, margin grows, customers stay",
      ]},
    ],
  },
];

export function Slide10Roadmap() {
  const [expanded, setExpanded] = useState<string | null>("q1");

  return (
    <SlideShell id="slide-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>Launch plan</Eyebrow>
        </motion.div>

        <motion.h1
          className="font-sans text-[26px] md:text-[36px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.15] mb-6 md:mb-8"
          variants={fadeUp}
        >
          12 months from investment to Series A.
        </motion.h1>

        {/* Timeline bar */}
        <motion.div className="flex gap-1 mb-6" variants={fadeUp}>
          {quarters.map((q) => (
            <button key={q.id} className="flex-1" onClick={() => setExpanded(expanded === q.id ? null : q.id)}>
              <div className="h-2 rounded-full transition-opacity" style={{ backgroundColor: q.color, opacity: expanded === q.id ? 1 : 0.3 }} />
              <span className="text-[11px] text-[var(--text-muted)] mt-1 block font-mono">{q.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Quarter cards */}
        <motion.div className="space-y-2" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          {quarters.map((q) => {
            const isExpanded = expanded === q.id;
            return (
              <motion.div
                key={q.id}
                variants={fadeUp}
                onClick={() => setExpanded(isExpanded ? null : q.id)}
                className={`border rounded-lg cursor-pointer transition-all duration-200 ${
                  isExpanded ? "border-l-4 bg-[var(--bg-subtle)]" : "border-[var(--border)] hover:bg-[var(--bg-subtle)]"
                }`}
                style={isExpanded ? { borderLeftColor: q.color } : undefined}
              >
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[12px] text-[var(--text-tertiary)]">{q.label}</span>
                    <h3 className="text-[15px] font-medium text-[var(--text)]">{q.title}</h3>
                  </div>
                  <span className="text-[12px] text-[var(--text-secondary)] max-w-[360px] text-right">{q.summary}</span>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 border-t border-[var(--border)] pt-3">
                        {q.months.map((m) => (
                          <div key={m.month}>
                            <span className="text-[12px] font-medium text-[var(--text)] block mb-1.5">{m.month}</span>
                            <ul className="space-y-1">
                              {m.items.map((item, i) => (
                                <li key={i} className="text-[11px] text-[var(--text-secondary)] leading-[1.4] flex gap-1.5">
                                  <span className="text-[var(--text-muted)] mt-0.5 flex-shrink-0">·</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </SlideShell>
  );
}
