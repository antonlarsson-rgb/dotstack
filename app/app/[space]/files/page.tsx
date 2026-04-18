"use client";

import { useParams } from "next/navigation";
import { getFilesBySpace } from "@/lib/app/mockData";
import { useAppContext } from "@/lib/app/AppContext";
import { FileText, Image, Table, Presentation, Folder, Plus } from "lucide-react";

const typeIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  pdf: FileText, docx: FileText, xlsx: Table, pptx: Presentation,
  png: Image, jpg: Image, folder: Folder, figma: FileText,
};

const typeColors: Record<string, string> = {
  pdf: "text-[#b91c1c]", docx: "text-[#1d4ed8]", xlsx: "text-[#15803d]",
  pptx: "text-[#b45309]", png: "text-[#7c3aed]", jpg: "text-[#7c3aed]",
  folder: "text-[var(--app-text-tertiary)]", figma: "text-[#525252]",
};

export default function FilesPage() {
  const params = useParams();
  const spaceId = params.space as string;
  const fileList = getFilesBySpace(spaceId);
  const { setSelectedItem } = useAppContext();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[17px] font-medium text-[var(--app-text)]">Files</h1>
        <button className="flex items-center gap-1.5 text-[13px] bg-[var(--accent)] text-white px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity">
          <Plus size={14} strokeWidth={1.5} />
          New
        </button>
      </div>

      <div className="border border-[var(--app-border)] rounded-lg overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-[var(--app-bg)] text-[var(--app-text-tertiary)] text-[12px]">
              <th className="text-left px-4 py-2.5 font-medium">Name</th>
              <th className="text-left px-4 py-2.5 font-medium w-24">Size</th>
              <th className="text-left px-4 py-2.5 font-medium w-28">Modified</th>
              <th className="text-left px-4 py-2.5 font-medium">Tags</th>
            </tr>
          </thead>
          <tbody>
            {fileList.map((f) => {
              const Icon = typeIcons[f.type] || FileText;
              const color = typeColors[f.type] || "text-[var(--app-text-tertiary)]";
              return (
                <tr
                  key={f.id}
                  onClick={() => setSelectedItem({ type: "File", id: f.id, label: f.name })}
                  className="border-t border-[var(--app-border)] hover:bg-[var(--app-hover)] cursor-pointer transition-colors"
                >
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} className={color} />
                      <span className="text-[var(--app-text)]">{f.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-[var(--app-text-tertiary)] font-mono tabular-nums text-[12px]">{f.size}</td>
                  <td className="px-4 py-2.5 text-[var(--app-text-tertiary)]">{f.lastModified}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-1 flex-wrap">
                      {f.tags.map((tag) => (
                        <span key={tag} className="text-[11px] bg-[var(--app-bg)] text-[var(--app-text-tertiary)] px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
