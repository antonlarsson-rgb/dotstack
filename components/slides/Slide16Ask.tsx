"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SlideShell } from "@/components/ui/SlideShell";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const budget = [
  { name: "Tech co-founder (6 mo)", value: 270000, color: "#1e40af" },
  { name: "First Stackie (6 mo)", value: 210000, color: "#15803d" },
  { name: "Customer SaaS float", value: 200000, color: "#b45309" },
  { name: "Infrastructure & AI", value: 120000, color: "#7c3aed" },
  { name: "Marketing & acquisition", value: 100000, color: "#525252" },
  { name: "Buffer & factoring fees", value: 100000, color: "#b8b8b8" },
];

export function Slide16Ask() {
  return (
    <SlideShell id="slide-13">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="max-w-[860px]"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>The ask</Eyebrow>
        </motion.div>

        <motion.h1
          className="font-sans text-[40px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.1]"
          variants={fadeUp}
        >
          1 MSEK to go from prototype to company.
        </motion.h1>

        <motion.p
          className="mt-5 text-[17px] text-[var(--text-secondary)] leading-[1.55] max-w-[580px]"
          variants={fadeUp}
        >
          The product works. Two test customers are committed. The model is
          clear. This is what the investment goes toward.
        </motion.p>

        <motion.div className="mt-8 grid grid-cols-2 gap-8" variants={fadeUp}>
          {/* Budget chart */}
          <div>
            <h3 className="text-[14px] font-medium text-[var(--text)] mb-4">How the 1M SEK is allocated</h3>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budget}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {budget.map((b, i) => (
                      <Cell key={i} fill={b.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${Number(value).toLocaleString("sv-SE")} SEK`, ""]}
                    contentStyle={{ fontSize: 12, border: "1px solid var(--border)", borderRadius: 6 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
              {budget.map((b) => (
                <div key={b.name} className="flex items-center gap-2 text-[12px]">
                  <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: b.color }} />
                  <span className="text-[var(--text-secondary)]">{b.name}</span>
                  <span className="font-mono tabular-nums text-[var(--text-muted)] ml-auto">{(b.value / 1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </div>

          {/* What Pinecone gets */}
          <div className="space-y-5">
            <div className="border border-[var(--border)] rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="font-mono text-[28px] font-medium text-[var(--accent-blue)] leading-none">1M</span>
                <div>
                  <h3 className="text-[15px] font-medium text-[var(--text)]">Investment</h3>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-[1.45] mt-1">
                    Hire technical co-founder and first Stackie. Take
                    over customer SaaS spend (we float the cost during
                    net-60 period). Build core integrations. Start
                    cancelling subscriptions month 2.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-[var(--border)] rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="font-mono text-[28px] font-medium text-[var(--accent-blue)] leading-none">12</span>
                <div>
                  <h3 className="text-[15px] font-medium text-[var(--text)]">Months of support</h3>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-[1.45] mt-1">
                    Co-founder recruitment. AI infrastructure advisory.
                    Nordic SMB go-to-market support. Operational scaling help.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-subtle)] border border-[var(--border)] rounded-lg p-4">
              <p className="text-[13px] text-[var(--text-secondary)] leading-[1.5]">
                <span className="font-medium text-[var(--text)]">Month 12 target:</span>{" "}
                12-15 paying customers. 1M+ SEK MRR. Gross margin above 70%
                on mature customers. ARR run-rate 12-15M SEK. Series A data ready.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SlideShell>
  );
}
