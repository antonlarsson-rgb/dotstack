"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SlideShell } from "@/components/ui/SlideShell";
import { BlinkingCursor } from "@/components/ui/BlinkingCursor";
import { formatSek } from "@/lib/utils/formatSek";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

interface Params {
  customers: number;
  avgSpend: number;
  months: number;
  customersPerStackie: number;
  stackieSalary: number;
  marketingBudget: number;
}

function compute(p: Params) {
  const data = [];
  const founderSalary = 2 * 45000;
  const officeMisc = 15000;
  const infraBase = 8000;

  let cumulativeCashflow = 1000000; // Starting with 1M SEK investment

  for (let m = 1; m <= p.months; m++) {
    // Customer ramp: start at 2, ramp to target
    const rampPct = Math.min(m / (p.months * 0.65), 1);
    const activeCustomers = Math.max(2, Math.round(2 + (p.customers - 2) * rampPct));

    // New customers this month (for cashflow: we pay their SaaS upfront, invoice net-60)
    const prevCustomers = m === 1 ? 0 : Math.max(2, Math.round(2 + (p.customers - 2) * Math.min((m - 1) / (p.months * 0.65), 1)));
    const newCustomers = activeCustomers - prevCustomers;

    // Stackies scale with customers
    const stackies = Math.max(1, Math.ceil(activeCustomers / p.customersPerStackie));
    const stackieCost = stackies * p.stackieSalary;

    // --- Revenue model ---
    // Month 1 per customer: we take over at full spend, invoice at full (net-60, 1.8% factoring fee)
    // Month 2+: invoice at 10% discount (90% of original spend)
    // The customer saves 10% immediately, and more over time as we optimize
    // By month 12 per customer, they pay ~50% of original (our target)
    // But we invoice at a fixed rate that drops gradually:
    // Month 1: 100% (but delayed 60 days), Month 2: 90%, then stable at 90%
    // The savings for the customer come as we renegotiate their rate based on actual cost reduction

    // For simplicity: all customers pay 90% of their original spend from month 2 onwards
    // (month 1 customers pay 100% but with 60-day delay)
    const revenuePerCustomer = p.avgSpend * 0.90;
    const revenue = activeCustomers * revenuePerCustomer;

    // --- Vendor cost model ---
    // We cancel 20% of subscriptions per month per customer
    // Starting at 100% of original spend, dropping ~20% each month
    // Floor at 15% (API tokens, essential backends like Fortnox, Google Workspace)
    // Formula: max(15%, 100% - 20% * monthsAsCustomer)
    // Since customers join at different times, we use average tenure
    const avgTenure = Math.min(m, 6); // caps contribution since early customers dominate
    const vendorPctOfOriginal = Math.max(0.15, 1.0 - 0.20 * avgTenure);
    const vendorCost = activeCustomers * p.avgSpend * vendorPctOfOriginal;

    // Factoring cost: 1.8% on all invoiced revenue (net-60 financing)
    const factoringCost = revenue * 0.018;

    // AI/infra scales
    const aiCost = infraBase + activeCustomers * 800;

    // Total opex
    const totalOpex = founderSalary + stackieCost + officeMisc + aiCost + p.marketingBudget + factoringCost;

    // Gross margin = revenue - vendor cost
    const grossMargin = revenue - vendorCost;

    // EBITDA = gross margin - opex
    const ebitda = grossMargin - totalOpex;

    // Cashflow: we pay vendors immediately, collect after 60 days
    // Simplification: from month 3 onward, revenue collected = revenue from 2 months ago
    const collectedRevenue = m >= 3 ? data[m - 3]?.revenue || 0 : 0;
    const monthlyCashflow = collectedRevenue - vendorCost - totalOpex + factoringCost; // factoring means we DO get paid (minus fee)
    // Actually with factoring we get cash immediately minus 1.8%, so:
    const cashIn = revenue * (1 - 0.018); // factored: we get 98.2% now
    const cashOut = vendorCost + founderSalary + stackieCost + officeMisc + aiCost + p.marketingBudget;
    const netCashflow = cashIn - cashOut;
    cumulativeCashflow += netCashflow;

    data.push({
      month: m,
      revenue: Math.round(revenue),
      vendorCost: Math.round(vendorCost),
      grossMargin: Math.round(grossMargin),
      opex: Math.round(totalOpex),
      ebitda: Math.round(ebitda),
      cashflow: Math.round(netCashflow),
      cumulativeCashflow: Math.round(cumulativeCashflow),
      customers: activeCustomers,
      stackies,
      vendorPct: Math.round(vendorPctOfOriginal * 100),
    });
  }

  const last = data[data.length - 1];
  const gm = last.revenue > 0 ? Math.round((last.grossMargin / last.revenue) * 100) : 0;
  const arr = last.revenue * 12;
  const annualEbitda = last.ebitda * 12;
  const valuation = arr * 8;
  const breakEven = data.findIndex((d) => d.ebitda > 0) + 1;
  const cashBreakEven = data.findIndex((d, i) => i > 0 && d.cashflow > 0) + 1;

  return { data, last, gm, arr, annualEbitda, valuation, breakEven, cashBreakEven };
}

export function Slide08CompanyFinancials() {
  const [customers, setCustomers] = useState(15);
  const [avgSpend, setAvgSpend] = useState(80000);
  const [months, setMonths] = useState(24);
  const [customersPerStackie, setCustomersPerStackie] = useState(10);
  const [stackieSalary, setStackieSalary] = useState(35000);
  const [marketingBudget, setMarketingBudget] = useState(20000);
  const [showCashflow, setShowCashflow] = useState(false);

  const { data, last, gm, arr, annualEbitda, valuation, breakEven, cashBreakEven } = useMemo(
    () => compute({ customers, avgSpend, months, customersPerStackie, stackieSalary, marketingBudget }),
    [customers, avgSpend, months, customersPerStackie, stackieSalary, marketingBudget]
  );

  return (
    <SlideShell id="slide-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
        className="max-w-[980px]"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>Company economics</Eyebrow>
        </motion.div>

        <motion.h1
          className="font-sans text-[32px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.1]"
          variants={fadeUp}
        >
          Drag the sliders. See what .stack becomes.
        </motion.h1>

        <motion.p className="text-[13px] text-[var(--text-tertiary)] mt-1.5 max-w-[640px]" variants={fadeUp}>
          We take over customer SaaS spend immediately, invoice at net-60 (1.8% factoring fee),
          cancel ~20% of subscriptions per month. By month 6, vendor cost is at floor (~15% for API tokens and essential backends).
          Customer invoiced at 10% discount from month 2.
        </motion.p>

        {/* Sliders */}
        <motion.div className="mt-4 grid grid-cols-3 gap-x-5 gap-y-2.5" variants={fadeUp}>
          <div>
            <label className="text-[11px] text-[var(--text-tertiary)] block mb-1">Customers at month {months}</label>
            <input type="range" min={2} max={50} value={customers} onChange={(e) => setCustomers(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
            <span className="font-mono text-[12px] text-[var(--text)] tabular-nums">{customers} companies</span>
          </div>
          <div>
            <label className="text-[11px] text-[var(--text-tertiary)] block mb-1">Avg SaaS spend / customer</label>
            <input type="range" min={20000} max={300000} step={5000} value={avgSpend} onChange={(e) => setAvgSpend(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
            <span className="font-mono text-[12px] text-[var(--text)] tabular-nums">{formatSek(avgSpend)}</span>
          </div>
          <div>
            <label className="text-[11px] text-[var(--text-tertiary)] block mb-1">Time horizon</label>
            <input type="range" min={12} max={36} value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
            <span className="font-mono text-[12px] text-[var(--text)] tabular-nums">{months} months</span>
          </div>
          <div>
            <label className="text-[11px] text-[var(--text-tertiary)] block mb-1">Customers per Stackie</label>
            <input type="range" min={5} max={20} value={customersPerStackie} onChange={(e) => setCustomersPerStackie(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
            <span className="font-mono text-[12px] text-[var(--text)] tabular-nums">{customersPerStackie} clients each</span>
          </div>
          <div>
            <label className="text-[11px] text-[var(--text-tertiary)] block mb-1">Stackie total cost / month</label>
            <input type="range" min={25000} max={55000} step={1000} value={stackieSalary} onChange={(e) => setStackieSalary(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
            <span className="font-mono text-[12px] text-[var(--text)] tabular-nums">{formatSek(stackieSalary)}</span>
          </div>
          <div>
            <label className="text-[11px] text-[var(--text-tertiary)] block mb-1">Marketing / month</label>
            <input type="range" min={0} max={100000} step={5000} value={marketingBudget} onChange={(e) => setMarketingBudget(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
            <span className="font-mono text-[12px] text-[var(--text)] tabular-nums">{formatSek(marketingBudget)}</span>
          </div>
        </motion.div>

        {/* Chart toggle */}
        <motion.div className="mt-3 flex items-center gap-2" variants={fadeUp}>
          <button
            onClick={() => setShowCashflow(false)}
            className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${!showCashflow ? "bg-[var(--accent)] text-white" : "text-[var(--text-tertiary)] border border-[var(--border)]"}`}
          >
            P&L
          </button>
          <button
            onClick={() => setShowCashflow(true)}
            className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${showCashflow ? "bg-[var(--accent)] text-white" : "text-[var(--text-tertiary)] border border-[var(--border)]"}`}
          >
            Cashflow
          </button>
        </motion.div>

        {/* Chart */}
        <motion.div className="mt-2 h-[170px]" variants={fadeUp}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revG2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="eG2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-green)" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="var(--accent-green)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="cfG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--text-tertiary)" }} interval={Math.max(1, Math.floor(months / 8))} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "var(--text-tertiary)" }} tickFormatter={(v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : `${(v / 1000).toFixed(0)}k`} width={48} />
              <Tooltip
                formatter={(value, name) => [
                  formatSek(Number(value)),
                  name === "revenue" ? "Revenue/mo" : name === "ebitda" ? "EBITDA/mo" : name === "vendorCost" ? "Vendor cost/mo" : name === "opex" ? "Opex/mo (salaries+infra+mkt)" : name === "cumulativeCashflow" ? "Cash balance" : name === "cashflow" ? "Net cashflow/mo" : String(name),
                ]}
                labelFormatter={(l) => `Month ${l}`}
                contentStyle={{ fontSize: 11, border: "1px solid var(--border)", borderRadius: 6 }}
              />
              {!showCashflow ? (
                <>
                  <Area type="monotone" dataKey="revenue" stroke="var(--accent-blue)" strokeWidth={2} fill="url(#revG2)" />
                  <Area type="monotone" dataKey="opex" stroke="var(--accent-red)" strokeWidth={1.5} fill="none" strokeDasharray="3 3" />
                  <Area type="monotone" dataKey="vendorCost" stroke="var(--text-muted)" strokeWidth={1} fill="none" strokeDasharray="6 3" />
                  <Area type="monotone" dataKey="ebitda" stroke="var(--accent-green)" strokeWidth={2} fill="url(#eG2)" />
                  {breakEven > 0 && <ReferenceLine x={breakEven} stroke="var(--accent-green)" strokeDasharray="3 3" strokeWidth={1} />}
                </>
              ) : (
                <>
                  <Area type="monotone" dataKey="cumulativeCashflow" stroke="var(--accent-blue)" strokeWidth={2} fill="url(#cfG)" />
                  <Area type="monotone" dataKey="cashflow" stroke="var(--accent-green)" strokeWidth={1.5} fill="none" />
                  <ReferenceLine y={0} stroke="var(--text-muted)" strokeDasharray="3 3" />
                </>
              )}
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Key numbers */}
        <motion.div className="mt-2.5 grid grid-cols-4 gap-2" variants={fadeUp}>
          <div className="border border-[var(--border)] rounded-lg p-2">
            <span className="text-[10px] text-[var(--text-tertiary)] block">MRR (month {months})</span>
            <span className="font-mono text-[16px] font-medium tabular-nums text-[var(--accent-blue)]">
              {formatSek(last.revenue, { compact: true })}
            </span>
            <BlinkingCursor />
          </div>
          <div className="border border-[var(--border)] rounded-lg p-2">
            <span className="text-[10px] text-[var(--text-tertiary)] block">ARR</span>
            <span className="font-mono text-[16px] font-medium tabular-nums text-[var(--text)]">
              {formatSek(arr, { compact: true })}
            </span>
          </div>
          <div className="border border-[var(--border)] rounded-lg p-2">
            <span className="text-[10px] text-[var(--text-tertiary)] block">Gross margin</span>
            <span className="font-mono text-[16px] font-medium tabular-nums text-[var(--text)]">{gm}%</span>
          </div>
          <div className="border border-[var(--border)] rounded-lg p-2">
            <span className="text-[10px] text-[var(--text-tertiary)] block">Opex/mo (incl {last.stackies} Stackies)</span>
            <span className="font-mono text-[16px] font-medium tabular-nums text-[var(--accent-red)]">
              {formatSek(last.opex, { compact: true })}
            </span>
          </div>
        </motion.div>
        <motion.div className="mt-2 grid grid-cols-4 gap-2" variants={fadeUp}>
          <div className="border border-[var(--border)] rounded-lg p-2">
            <span className="text-[10px] text-[var(--text-tertiary)] block">Monthly EBITDA</span>
            <span className={`font-mono text-[16px] font-medium tabular-nums ${last.ebitda >= 0 ? "text-[var(--accent-green)]" : "text-[var(--accent-red)]"}`}>
              {formatSek(last.ebitda, { compact: true })}
            </span>
          </div>
          <div className="border border-[var(--accent-blue)] bg-[#eff6ff] rounded-lg p-2">
            <span className="text-[10px] text-[var(--accent-blue)] block font-medium">Valuation (8x ARR)</span>
            <span className="font-mono text-[16px] font-medium tabular-nums text-[var(--accent-blue)]">
              {formatSek(valuation, { compact: true })}
            </span>
            <BlinkingCursor />
          </div>
          <div className="border border-[var(--border)] rounded-lg p-2">
            <span className="text-[10px] text-[var(--text-tertiary)] block">Cash balance M{months}</span>
            <span className={`font-mono text-[16px] font-medium tabular-nums ${last.cumulativeCashflow >= 0 ? "text-[var(--accent-green)]" : "text-[var(--accent-red)]"}`}>
              {formatSek(last.cumulativeCashflow, { compact: true })}
            </span>
          </div>
          <div className="border border-[var(--border)] rounded-lg p-2">
            <span className="text-[10px] text-[var(--text-tertiary)] block">Break-even</span>
            <span className="font-mono text-[16px] font-medium tabular-nums text-[var(--text)]">
              Month {breakEven || "N/A"}
            </span>
          </div>
        </motion.div>

        <motion.p className="mt-2 text-[10px] text-[var(--text-muted)] max-w-[720px]" variants={fadeUp}>
          Customer pays 90% of original (10% discount from day one). Vendor cost drops ~20%/month (floor 15% for API tokens + essential backends).
          Factoring: 1.8% fee on invoiced amount for net-60 terms. Fixed: 2 founders × 45k + 15k office + 8k infra + 800 SEK/customer.
          1M SEK starting capital included in cashflow.
        </motion.p>
      </motion.div>
    </SlideShell>
  );
}
