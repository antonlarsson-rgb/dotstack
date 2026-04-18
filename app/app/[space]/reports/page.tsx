"use client";

import { useParams } from "next/navigation";
import { getReportsBySpace } from "@/lib/app/mockData";
import { FileText, Plus } from "lucide-react";

const statusColors: Record<string, string> = {
  draft: "bg-[#fffbeb] text-[#b45309]",
  published: "bg-[#e6ffe6] text-[#15803d]",
  scheduled: "bg-[#e6f0ff] text-[#1d4ed8]",
};

export default function ReportsPage() {
  const params = useParams();
  const spaceId = params.space as string;
  const reportList = getReportsBySpace(spaceId);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[17px] font-medium text-[var(--app-text)]">Reports</h1>
        <button className="flex items-center gap-1.5 text-[13px] bg-[var(--accent)] text-white px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
          <Plus size={14} strokeWidth={1.5} />
          New report
        </button>
      </div>

      <div className="space-y-2">
        {reportList.map((r) => (
          <div
            key={r.id}
            className="flex items-center gap-4 border border-[var(--app-border)] rounded-lg px-5 py-4 hover:bg-[var(--app-hover)] cursor-pointer transition-colors"
          >
            <FileText size={18} strokeWidth={1.5} className="text-[var(--app-text-tertiary)] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-[var(--app-text)]">{r.title}</p>
              <p className="text-[12px] text-[var(--app-text-tertiary)]">{r.type} · {r.dateRange}</p>
            </div>
            <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${statusColors[r.status]}`}>
              {r.status}
            </span>
            <span className="text-[12px] text-[var(--app-text-muted)]">{r.lastUpdated}</span>
          </div>
        ))}
        {reportList.length === 0 && (
          <p className="text-[13px] text-[var(--app-text-tertiary)]">No reports yet.</p>
        )}
      </div>
    </div>
  );
}
