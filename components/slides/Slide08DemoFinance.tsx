"use client";

import { DemoAppShell } from "@/components/ui/DemoAppShell";
import { stellarDemo } from "@/lib/data/demoData";
import { formatSek } from "@/lib/utils/formatSek";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const { finance } = stellarDemo;

const costData = [
  { month: "Nov", cost: 100000 },
  { month: "Dec", cost: 95000 },
  { month: "Jan", cost: 88000 },
  { month: "Feb", cost: 80000 },
  { month: "Mar", cost: 73000 },
  { month: "Apr", cost: 67650 },
];

const financeCards = [
  { label: "Revenue this month", value: formatSek(finance.revenueThisMonth, { compact: true }), change: "+8% vs last month" },
  { label: "Expenses this month", value: formatSek(finance.expensesThisMonth, { compact: true }), change: "-3% vs last month" },
  { label: "SaaS costs", value: formatSek(finance.saasCosts), change: "-32% via .stack" },
];

export function Slide08DemoFinance() {
  return (
    <div id="slide-8">
      <DemoAppShell activeNav="Finance">
        <div className="max-w-[960px]">
          {/* Top cards */}
          <div className="grid grid-cols-3 gap-4">
            {financeCards.map((c) => (
              <div
                key={c.label}
                className="border border-[var(--border)] rounded-lg p-5"
              >
                <span className="text-[13px] text-[var(--text-tertiary)]">
                  {c.label}
                </span>
                <div className="font-mono text-[28px] font-medium tabular-nums text-[var(--text)] mt-1">
                  {c.value}
                </div>
                <span className="text-[12px] text-[var(--accent-green)]">
                  {c.change}
                </span>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="mt-8 h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costData}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "var(--text-tertiary)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "var(--text-tertiary)" }}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value) => [formatSek(Number(value)), "SaaS cost"]}
                  contentStyle={{
                    fontSize: 13,
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke="var(--accent-green)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Replaced tools table */}
          <div className="mt-8">
            <h2 className="text-[15px] font-medium text-[var(--text)] mb-4">
              Subscriptions replaced or optimized
            </h2>
            <div className="border border-[var(--border)] rounded-lg overflow-hidden">
              <table className="w-full text-[14px]">
                <thead>
                  <tr className="bg-[var(--bg-subtle)] text-[var(--text-tertiary)] text-[12px]">
                    <th className="text-left px-4 py-2 font-medium">Tool</th>
                    <th className="text-left px-4 py-2 font-medium">Before</th>
                    <th className="text-left px-4 py-2 font-medium">After</th>
                    <th className="text-right px-4 py-2 font-medium">
                      Saving/month
                    </th>
                    <th className="text-left px-4 py-2 font-medium">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {finance.replacedTools.map((t) => (
                    <tr
                      key={t.name}
                      className="border-t border-[var(--border)]"
                    >
                      <td className="px-4 py-2.5 font-medium text-[var(--text)]">
                        {t.name}
                      </td>
                      <td className="px-4 py-2.5 text-[var(--text-secondary)]">
                        {t.before}
                      </td>
                      <td className="px-4 py-2.5 text-[var(--text-secondary)]">
                        {t.after}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums text-[var(--accent-green)]">
                        {formatSek(t.saving)}
                      </td>
                      <td className="px-4 py-2.5 text-[var(--text-tertiary)] text-[13px]">
                        {t.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-6 text-[13px] text-[var(--text-tertiary)]">
            Fortnox stays. It&apos;s the regulated backend of record. We replace
            the UX layer and keep the deterministic systems.
          </p>
        </div>
      </DemoAppShell>
    </div>
  );
}
