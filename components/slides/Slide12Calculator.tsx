"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SlideShell } from "@/components/ui/SlideShell";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";
import { formatSek } from "@/lib/utils/formatSek";
import { useSlideContext } from "@/lib/context/SlideContext";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function Slide12Calculator() {
  const { setAgentOpen } = useSlideContext();
  const [employees, setEmployees] = useState(25);
  const [saasSpend, setSaasSpend] = useState(50000);
  const [tools, setTools] = useState(25);

  const results = useMemo(() => {
    const monthlySavings = Math.max(saasSpend * 0.25, 5000);
    const annualSavings = monthlySavings * 12;
    const toolsConsolidated = Math.max(tools - 5, 0);
    const timeToHalf = Math.round(14 + (100 - employees) * 0.3);
    return { monthlySavings, annualSavings, toolsConsolidated, timeToHalf };
  }, [employees, saasSpend, tools]);

  return (
    <SlideShell id="slide-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>Estimate</Eyebrow>
        </motion.div>

        <motion.h1
          className="font-sans text-[40px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.1] mb-12"
          variants={fadeUp}
        >
          What would <span className="font-mono">.stack</span> save your
          company?
        </motion.h1>

        <motion.div className="grid grid-cols-2 gap-16" variants={fadeUp}>
          {/* Inputs */}
          <div className="space-y-8">
            <div>
              <label className="text-[14px] text-[var(--text-tertiary)] block mb-3">
                Number of employees
              </label>
              <input
                type="range"
                min={5}
                max={100}
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
              <span className="font-mono text-[14px] text-[var(--text)] tabular-nums">
                {employees}
              </span>
            </div>
            <div>
              <label className="text-[14px] text-[var(--text-tertiary)] block mb-3">
                Estimated monthly SaaS spend (SEK)
              </label>
              <input
                type="number"
                min={5000}
                max={500000}
                step={5000}
                value={saasSpend}
                onChange={(e) =>
                  setSaasSpend(Math.max(5000, Number(e.target.value)))
                }
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-md font-mono text-[15px] tabular-nums bg-white focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
              />
            </div>
            <div>
              <label className="text-[14px] text-[var(--text-tertiary)] block mb-3">
                Number of SaaS tools in use
              </label>
              <input
                type="range"
                min={5}
                max={50}
                value={tools}
                onChange={(e) => setTools(Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
              <span className="font-mono text-[14px] text-[var(--text)] tabular-nums">
                {tools}
              </span>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-8">
            <div>
              <span className="text-[13px] text-[var(--text-tertiary)] block mb-1">
                Monthly savings
              </span>
              <span className="font-mono text-[32px] font-medium tabular-nums text-[var(--accent-green)]">
                {formatSek(results.monthlySavings)}
              </span>
              <BlinkingCursor />
            </div>
            <div>
              <span className="text-[13px] text-[var(--text-tertiary)] block mb-1">
                Annual savings
              </span>
              <span className="font-mono text-[24px] font-medium tabular-nums text-[var(--text)]">
                {formatSek(results.annualSavings)}
              </span>
              <BlinkingCursor />
            </div>
            <div>
              <span className="text-[13px] text-[var(--text-tertiary)] block mb-1">
                Tools consolidated into .stack
              </span>
              <span className="font-mono text-[24px] font-medium tabular-nums text-[var(--text)]">
                {results.toolsConsolidated}
              </span>
              <BlinkingCursor />
            </div>
            <div>
              <span className="text-[13px] text-[var(--text-tertiary)] block mb-1">
                Estimated time to reach 50% savings
              </span>
              <span className="font-mono text-[24px] font-medium tabular-nums text-[var(--text)]">
                {results.timeToHalf} months
              </span>
              <BlinkingCursor />
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-12" variants={fadeUp}>
          <button
            onClick={() => setAgentOpen(true)}
            className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors duration-[180ms] border-b border-[var(--border)] pb-px"
          >
            Want to see what your specific stack would look like in .stack?
            Request a stack audit →
          </button>
        </motion.div>
      </motion.div>
    </SlideShell>
  );
}
