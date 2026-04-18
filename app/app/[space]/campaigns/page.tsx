"use client";

import { useParams } from "next/navigation";
import { getCampaignsBySpace } from "@/lib/app/mockData";
import { formatSek } from "@/lib/utils/formatSek";
import { useAppContext } from "@/lib/app/AppContext";

const platformColors: Record<string, string> = {
  meta: "bg-[#e6f0ff] text-[#1d4ed8]",
  google: "bg-[#e6ffe6] text-[#15803d]",
  tiktok: "bg-[#f4f4f2] text-[#525252]",
};

const statusColors: Record<string, string> = {
  active: "bg-[#e6ffe6] text-[#15803d]",
  paused: "bg-[#fffbeb] text-[#b45309]",
  ended: "bg-[#f4f4f2] text-[#525252]",
};

export default function CampaignsPage() {
  const params = useParams();
  const spaceId = params.space as string;
  const campaignList = getCampaignsBySpace(spaceId);
  const { setSelectedItem } = useAppContext();

  if (campaignList.length === 0) {
    return <div className="p-8 text-[var(--app-text-tertiary)]">No campaigns for this Space.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-[17px] font-medium text-[var(--app-text)] mb-6">Campaigns</h1>

      <div className="space-y-3">
        {campaignList.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedItem({ type: "Campaign", id: c.id, label: c.name })}
            className="border border-[var(--app-border)] rounded-lg p-5 hover:bg-[var(--app-hover)] cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${platformColors[c.platform]}`}>
                  {c.platform}
                </span>
                <span className="text-[15px] font-medium text-[var(--app-text)]">{c.name}</span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${statusColors[c.status]}`}>
                {c.status}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-4 mb-3">
              <div>
                <span className="text-[11px] text-[var(--app-text-tertiary)] block">Budget</span>
                <span className="font-mono text-[14px] tabular-nums text-[var(--app-text)]">
                  {formatSek(c.budget, { compact: true })}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[var(--app-text-tertiary)] block">Spent</span>
                <span className="font-mono text-[14px] tabular-nums text-[var(--app-text)]">
                  {formatSek(c.spent, { compact: true })}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[var(--app-text-tertiary)] block">ROAS</span>
                <span className="font-mono text-[14px] tabular-nums text-[var(--app-text)]">
                  {c.metrics.roas}x
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[var(--app-text-tertiary)] block">CPA</span>
                <span className="font-mono text-[14px] tabular-nums text-[var(--app-text)]">
                  {c.metrics.cpa} SEK
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[var(--app-text-tertiary)] block">CTR</span>
                <span className="font-mono text-[14px] tabular-nums text-[var(--app-text)]">
                  {c.metrics.ctr}%
                </span>
              </div>
            </div>

            {/* Budget progress */}
            <div className="h-1.5 bg-[var(--app-bg)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--accent-blue)]"
                style={{ width: `${Math.min((c.spent / c.budget) * 100, 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-[var(--app-text-muted)] mt-1 block">
              {Math.round((c.spent / c.budget) * 100)}% of budget used
            </span>

            {/* Alerts */}
            {c.alerts.length > 0 && (
              <div className="mt-3 space-y-1">
                {c.alerts.map((a, i) => (
                  <div
                    key={i}
                    className={`text-[12px] px-2 py-1 rounded ${
                      a.type === "warning" ? "bg-[#fffbeb] text-[#b45309]" : "bg-[#eff6ff] text-[#1d4ed8]"
                    }`}
                  >
                    {a.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
