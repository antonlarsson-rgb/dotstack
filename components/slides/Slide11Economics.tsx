"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SlideShell } from "@/components/ui/SlideShell";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";
import { formatSek } from "@/lib/utils/formatSek";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  Tooltip,
} from "recharts";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

function computeEconomics(
  employees: number,
  saasSpend: number,
  months: number
) {
  const customerPrice = saasSpend * 0.7;
  const data = [];

  for (let m = 1; m <= months; m++) {
    // SaaS cost decreases over time as we replace tools
    const replacementProgress = Math.min(m / 24, 1);
    const saasCost = saasSpend * (0.75 - 0.6 * replacementProgress);
    const margin = customerPrice - saasCost;
    data.push({
      month: m,
      saasCost: Math.round(saasCost),
      margin: Math.round(Math.max(margin, 0)),
      loss: Math.round(Math.min(margin, 0)),
    });
  }

  const month1Margin = data[0].margin + data[0].loss;
  const lastMargin = data[data.length - 1].margin + data[data.length - 1].loss;
  const breakEven = data.findIndex((d) => d.margin + d.loss >= 0) + 1;

  return { data, customerPrice, month1Margin, lastMargin, breakEven };
}

export function Slide11Economics() {
  const [employees, setEmployees] = useState(50);
  const [saasSpend, setSaasSpend] = useState(100000);
  const [months, setMonths] = useState(24);

  const { data, customerPrice, month1Margin, lastMargin, breakEven } =
    useMemo(
      () => computeEconomics(employees, saasSpend, months),
      [employees, saasSpend, months]
    );

  return (
    <SlideShell id="slide-11">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>Unit economics</Eyebrow>
        </motion.div>

        <motion.h1
          className="font-sans text-[40px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.1]"
          variants={fadeUp}
        >
          The longer a customer stays, the better the margin.
        </motion.h1>

        <motion.p
          className="mt-6 text-[17px] text-[var(--text-secondary)] leading-[1.55] max-w-[640px]"
          variants={fadeUp}
        >
          Month 1, we are a SaaS consolidator. Low margin, sometimes negative.
          As we replace per-seat tools with{" "}
          <span className="font-mono">.stack</span> applications, our costs fall
          while the customer&apos;s price stays flat.
        </motion.p>

        {/* Sliders */}
        <motion.div className="mt-10 grid grid-cols-3 gap-8" variants={fadeUp}>
          <div>
            <label className="text-[13px] text-[var(--text-tertiary)] block mb-2">
              Customer size
            </label>
            <input
              type="range"
              min={10}
              max={100}
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            <span className="font-mono text-[14px] text-[var(--text)] tabular-nums">
              {employees} employees
            </span>
          </div>
          <div>
            <label className="text-[13px] text-[var(--text-tertiary)] block mb-2">
              Current monthly SaaS spend (SEK)
            </label>
            <input
              type="range"
              min={20000}
              max={500000}
              step={5000}
              value={saasSpend}
              onChange={(e) => setSaasSpend(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            <span className="font-mono text-[14px] text-[var(--text)] tabular-nums">
              {formatSek(saasSpend)}
            </span>
          </div>
          <div>
            <label className="text-[13px] text-[var(--text-tertiary)] block mb-2">
              Time horizon
            </label>
            <input
              type="range"
              min={12}
              max={36}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            <span className="font-mono text-[14px] text-[var(--text)] tabular-nums">
              {months} months
            </span>
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div className="mt-10 h-[280px]" variants={fadeUp}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} stackOffset="sign">
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "var(--text-tertiary)" }}
                interval={Math.floor(months / 8)}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "var(--text-tertiary)" }}
                tickFormatter={(v: number) =>
                  `${(v / 1000).toFixed(0)}k`
                }
              />
              <Tooltip
                formatter={(value, name) => [
                  formatSek(Number(value)),
                  name === "saasCost"
                    ? "SaaS vendor cost"
                    : name === "margin"
                      ? ".stack margin"
                      : "Loss",
                ]}
                labelFormatter={(l) => `Month ${l}`}
                contentStyle={{
                  fontSize: 13,
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                }}
              />
              <Bar
                dataKey="saasCost"
                stackId="a"
                fill="#a3a3a3"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="margin"
                stackId="a"
                fill="var(--accent-green)"
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey="loss"
                stackId="a"
                fill="var(--accent-red)"
                radius={[0, 0, 2, 2]}
              />
              <ReferenceLine
                y={customerPrice}
                stroke="var(--text)"
                strokeDasharray="6 4"
                strokeWidth={1}
                label={{
                  value: `Customer price: ${formatSek(customerPrice)}`,
                  position: "right",
                  fontSize: 12,
                  fill: "var(--text-tertiary)",
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Live numbers */}
        <motion.div className="mt-8 grid grid-cols-3 gap-8" variants={fadeUp}>
          <div>
            <span className="text-[13px] text-[var(--text-tertiary)] block mb-1">
              Month 1 margin
            </span>
            <span
              className={`font-mono text-[32px] font-medium tabular-nums ${
                month1Margin >= 0
                  ? "text-[var(--accent-green)]"
                  : "text-[var(--accent-red)]"
              }`}
            >
              {formatSek(month1Margin)}
            </span>
            <BlinkingCursor />
          </div>
          <div>
            <span className="text-[13px] text-[var(--text-tertiary)] block mb-1">
              Month {months} margin
            </span>
            <span className="font-mono text-[32px] font-medium tabular-nums text-[var(--accent-green)]">
              {formatSek(lastMargin)}
            </span>
            <BlinkingCursor />
          </div>
          <div>
            <span className="text-[13px] text-[var(--text-tertiary)] block mb-1">
              Break-even month
            </span>
            <span className="font-mono text-[32px] font-medium tabular-nums text-[var(--text)]">
              {breakEven || "N/A"}
            </span>
            <BlinkingCursor />
          </div>
        </motion.div>

        <motion.p
          className="mt-10 text-[15px] text-[var(--text-tertiary)] leading-[1.55] max-w-[700px]"
          variants={fadeUp}
        >
          A 50-person customer at 70,000 SEK/month becomes 55,000 SEK of monthly
          margin by month 24. Customer stays below their original SaaS spend the
          entire time. Their cost stops rising. Ours stops existing.
        </motion.p>
      </motion.div>
    </SlideShell>
  );
}
