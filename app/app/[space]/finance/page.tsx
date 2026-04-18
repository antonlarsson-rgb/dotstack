"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getInvoicesBySpace, getTimeEntriesBySpace, getProjectsBySpace, getSpaceSettings, getTimeEntriesByProject, getPersonById } from "@/lib/app/mockData";
import { formatSek } from "@/lib/utils/formatSek";
import { Settings } from "lucide-react";

const statusColors: Record<string, string> = {
  draft: "bg-[#f4f4f2] text-[#525252]",
  sent: "bg-[#fffbeb] text-[#b45309]",
  paid: "bg-[#e6ffe6] text-[#15803d]",
  overdue: "bg-[#fee2e2] text-[#b91c1c]",
};

export default function FinancePage() {
  const params = useParams();
  const spaceId = params.space as string;
  const invoiceList = getInvoicesBySpace(spaceId);
  const allTimeEntries = getTimeEntriesBySpace(spaceId);
  const projectList = getProjectsBySpace(spaceId);
  const settings = getSpaceSettings(spaceId);

  const [hourlyRate, setHourlyRate] = useState(settings?.hourlyRate || 0);
  const [editingRate, setEditingRate] = useState(false);

  const totalPending = invoiceList.filter((i) => i.status === "sent").reduce((sum, i) => sum + i.amount, 0);
  const totalPaid = invoiceList.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.amount, 0);

  const totalMinutes = allTimeEntries.reduce((sum, te) => sum + te.minutes, 0);
  const totalHours = totalMinutes / 60;
  const totalRevenue = totalHours * hourlyRate;

  // Per-project economics
  const projectEconomics = projectList.map((p) => {
    const entries = getTimeEntriesByProject(p.id);
    const mins = entries.reduce((sum, te) => sum + te.minutes, 0);
    const hours = mins / 60;
    const cost = hours * hourlyRate;
    const utilization = p.budgetHours > 0 ? Math.round((hours / p.budgetHours) * 100) : 0;
    return { project: p, hours, cost, utilization };
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[17px] font-medium text-[var(--app-text)]">Finance</h1>
        {/* Hourly rate setting */}
        <div className="flex items-center gap-2 text-[13px]">
          <Settings size={14} strokeWidth={1.5} className="text-[var(--app-text-tertiary)]" />
          <span className="text-[var(--app-text-tertiary)]">Hourly rate:</span>
          {editingRate ? (
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-20 px-2 py-1 border border-[var(--app-border)] rounded text-[13px] font-mono tabular-nums"
                autoFocus
              />
              <span className="text-[var(--app-text-muted)]">SEK/h</span>
              <button
                onClick={() => setEditingRate(false)}
                className="px-2 py-1 text-[12px] bg-[var(--accent)] text-white rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingRate(true)}
              className="font-mono tabular-nums text-[var(--app-text)] hover:underline"
            >
              {hourlyRate > 0 ? `${hourlyRate.toLocaleString("sv-SE")} SEK/h` : "Not set"}
            </button>
          )}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="border border-[var(--app-border)] rounded-lg p-4">
          <span className="text-[12px] text-[var(--app-text-tertiary)]">Pending invoices</span>
          <div className="font-mono text-[24px] font-medium tabular-nums text-[var(--accent-amber)] mt-1">
            {formatSek(totalPending)}
          </div>
        </div>
        <div className="border border-[var(--app-border)] rounded-lg p-4">
          <span className="text-[12px] text-[var(--app-text-tertiary)]">Paid this quarter</span>
          <div className="font-mono text-[24px] font-medium tabular-nums text-[var(--accent-green)] mt-1">
            {formatSek(totalPaid)}
          </div>
        </div>
        <div className="border border-[var(--app-border)] rounded-lg p-4">
          <span className="text-[12px] text-[var(--app-text-tertiary)]">Hours logged</span>
          <div className="font-mono text-[24px] font-medium tabular-nums text-[var(--app-text)] mt-1">
            {totalHours.toFixed(1)}h
          </div>
        </div>
        {hourlyRate > 0 && (
          <div className="border border-[var(--app-border)] rounded-lg p-4">
            <span className="text-[12px] text-[var(--app-text-tertiary)]">Revenue from hours</span>
            <div className="font-mono text-[24px] font-medium tabular-nums text-[var(--accent-blue)] mt-1">
              {formatSek(totalRevenue, { compact: true })}
            </div>
          </div>
        )}
      </div>

      {/* Project economics */}
      <h2 className="text-[15px] font-medium text-[var(--app-text)] mb-4">Project economics</h2>
      <div className="border border-[var(--app-border)] rounded-lg overflow-hidden mb-8">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-[var(--app-bg)] text-[var(--app-text-tertiary)] text-[12px]">
              <th className="text-left px-4 py-2.5 font-medium">Project</th>
              <th className="text-right px-4 py-2.5 font-medium">Hours</th>
              <th className="text-right px-4 py-2.5 font-medium">Budget</th>
              {hourlyRate > 0 && <th className="text-right px-4 py-2.5 font-medium">Cost</th>}
              <th className="text-left px-4 py-2.5 font-medium w-48">Utilization</th>
            </tr>
          </thead>
          <tbody>
            {projectEconomics.map(({ project, hours, cost, utilization }) => (
              <tr key={project.id} className="border-t border-[var(--app-border)] hover:bg-[var(--app-hover)]">
                <td className="px-4 py-3">
                  <span className="text-[var(--app-text)]">{project.title}</span>
                  <span className="block text-[11px] text-[var(--app-text-muted)]">
                    {getPersonById(project.assignee)?.name}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono tabular-nums text-[var(--app-text)]">
                  {hours.toFixed(1)}h
                </td>
                <td className="px-4 py-3 text-right font-mono tabular-nums text-[var(--app-text-tertiary)]">
                  {project.budgetHours}h
                </td>
                {hourlyRate > 0 && (
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-[var(--app-text)]">
                    {formatSek(cost, { compact: true })}
                  </td>
                )}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-[var(--app-bg)] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${utilization > 90 ? "bg-[var(--accent-red)]" : utilization > 70 ? "bg-[var(--accent-amber)]" : "bg-[var(--accent-green)]"}`}
                        style={{ width: `${Math.min(utilization, 100)}%` }}
                      />
                    </div>
                    <span className="font-mono text-[11px] tabular-nums text-[var(--app-text-tertiary)] w-10 text-right">
                      {utilization}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoices */}
      <h2 className="text-[15px] font-medium text-[var(--app-text)] mb-4">Invoices</h2>
      <div className="border border-[var(--app-border)] rounded-lg overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-[var(--app-bg)] text-[var(--app-text-tertiary)] text-[12px]">
              <th className="text-left px-4 py-2.5 font-medium">Invoice</th>
              <th className="text-left px-4 py-2.5 font-medium">Recipient</th>
              <th className="text-right px-4 py-2.5 font-medium">Amount</th>
              <th className="text-left px-4 py-2.5 font-medium">Status</th>
              <th className="text-left px-4 py-2.5 font-medium">Due date</th>
            </tr>
          </thead>
          <tbody>
            {invoiceList.map((inv) => (
              <tr key={inv.id} className="border-t border-[var(--app-border)] hover:bg-[var(--app-hover)] cursor-pointer">
                <td className="px-4 py-3 font-mono text-[var(--app-text)]">{inv.number}</td>
                <td className="px-4 py-3 text-[var(--app-text-secondary)]">{inv.recipient}</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums text-[var(--app-text)]">{formatSek(inv.amount)}</td>
                <td className="px-4 py-3">
                  <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${statusColors[inv.status]}`}>{inv.status}</span>
                </td>
                <td className="px-4 py-3 text-[var(--app-text-tertiary)]">{inv.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
