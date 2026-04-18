"use client";

import { useParams } from "next/navigation";
import { getSpaceById } from "@/lib/app/mockData";
import { Plus, Image } from "lucide-react";

const mockBriefs = [
  { id: "br-1", title: "Back-to-school hero banner", status: "in-progress", deadline: "Apr 25" },
  { id: "br-2", title: "TikTok UGC creative concepts", status: "draft", deadline: "May 1" },
  { id: "br-3", title: "Spring collection product shots", status: "completed", deadline: "Apr 15" },
  { id: "br-4", title: "Instagram Stories templates", status: "completed", deadline: "Apr 10" },
];

const mockGenerated = Array.from({ length: 12 }, (_, i) => ({
  id: `gen-${i}`,
  prompt: ["Lifestyle product photography", "Minimalist banner layout", "UGC-style video thumbnail", "Colorful summer campaign visual"][i % 4],
  style: ["photographic", "minimal", "organic", "vibrant"][i % 4],
}));

export default function CreativePage() {
  const params = useParams();
  const spaceId = params.space as string;
  const space = getSpaceById(spaceId);

  if (!space?.modulesEnabled.includes("creative")) {
    return <div className="p-8 text-[var(--app-text-tertiary)]">Creative module is not enabled for this Space.</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[17px] font-medium text-[var(--app-text)]">Creative</h1>
        <button className="flex items-center gap-1.5 text-[13px] bg-[var(--accent)] text-white px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
          <Plus size={14} strokeWidth={1.5} />
          New brief
        </button>
      </div>

      {/* Briefs */}
      <h2 className="text-[15px] font-medium text-[var(--app-text)] mb-3">Briefs</h2>
      <div className="space-y-2 mb-8">
        {mockBriefs.map((b) => (
          <div key={b.id} className="flex items-center gap-4 border border-[var(--app-border)] rounded-lg px-4 py-3 hover:bg-[var(--app-hover)] cursor-pointer transition-colors">
            <span className="text-[14px] text-[var(--app-text)] flex-1">{b.title}</span>
            <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
              b.status === "completed" ? "bg-[#e6ffe6] text-[#15803d]" :
              b.status === "in-progress" ? "bg-[#fffbeb] text-[#b45309]" :
              "bg-[#f4f4f2] text-[#525252]"
            }`}>
              {b.status}
            </span>
            <span className="text-[12px] text-[var(--app-text-muted)]">{b.deadline}</span>
          </div>
        ))}
      </div>

      {/* Generated */}
      <h2 className="text-[15px] font-medium text-[var(--app-text)] mb-3">Generated assets</h2>
      <div className="grid grid-cols-4 gap-3">
        {mockGenerated.map((g) => (
          <div key={g.id} className="border border-[var(--app-border)] rounded-lg overflow-hidden hover:shadow-[0_1px_4px_rgba(0,0,0,0.06)] cursor-pointer transition-shadow">
            <div className="aspect-square bg-gradient-to-br from-[var(--app-bg)] to-[var(--app-hover)] flex items-center justify-center">
              <Image size={24} strokeWidth={1} className="text-[var(--app-text-muted)]" />
            </div>
            <div className="p-2">
              <p className="text-[11px] text-[var(--app-text-secondary)] truncate">{g.prompt}</p>
              <p className="text-[10px] text-[var(--app-text-muted)]">{g.style}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
