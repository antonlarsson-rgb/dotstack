"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getContactsBySpace, getCompaniesBySpace, getDealsBySpace, getInteractionsByContact, crmCompanies, type DealStage } from "@/lib/app/mockData";
import { formatSek } from "@/lib/utils/formatSek";
import { Phone, Mail, Building2, Plus } from "lucide-react";

const dealStages: DealStage[] = ["lead", "qualified", "proposal", "negotiation", "closed-won", "closed-lost"];
const stageLabels: Record<DealStage, string> = {
  lead: "Lead", qualified: "Qualified", proposal: "Proposal",
  negotiation: "Negotiation", "closed-won": "Won", "closed-lost": "Lost",
};

const interactionTypeIcons: Record<string, string> = {
  call: "📞", email: "✉️", meeting: "🤝", note: "📝",
};

type Tab = "contacts" | "deals" | "companies";

export default function CrmPage() {
  const params = useParams();
  const spaceId = params.space as string;
  const contacts = getContactsBySpace(spaceId);
  const companies = getCompaniesBySpace(spaceId);
  const deals = getDealsBySpace(spaceId);

  const [tab, setTab] = useState<Tab>("contacts");
  const [selectedContactIdx, setSelectedContactIdx] = useState(0);
  const [selectedDealIdx, setSelectedDealIdx] = useState(0);
  const [selectedCompanyIdx, setSelectedCompanyIdx] = useState(0);

  const selectedContact = contacts[selectedContactIdx];
  const contactInteractions = selectedContact ? getInteractionsByContact(selectedContact.id) : [];
  const selectedDeal = deals[selectedDealIdx];
  const selectedCompany = companies[selectedCompanyIdx];

  const pipelineValue = deals.filter((d) => d.stage !== "closed-lost").reduce((sum, d) => sum + d.value * d.probability / 100, 0);

  return (
    <div className="flex h-full">
      {/* Left panel */}
      <div className="w-[360px] border-r border-[var(--app-border)] flex flex-col">
        {/* Tabs */}
        <div className="flex items-center gap-1 px-4 py-3 border-b border-[var(--app-border)]">
          {(["contacts", "deals", "companies"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-md text-[13px] transition-colors ${
                tab === t ? "bg-[var(--app-selected)] font-medium text-[var(--app-text)]" : "text-[var(--app-text-tertiary)] hover:bg-[var(--app-hover)]"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
          <div className="ml-auto">
            <button className="p-1.5 rounded-md hover:bg-[var(--app-hover)] text-[var(--app-text-tertiary)]">
              <Plus size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Pipeline summary for deals */}
        {tab === "deals" && (
          <div className="px-4 py-3 border-b border-[var(--app-border)] bg-[var(--app-bg)]">
            <span className="text-[11px] text-[var(--app-text-tertiary)]">Weighted pipeline</span>
            <div className="font-mono text-[20px] font-medium tabular-nums text-[var(--app-text)]">
              {formatSek(pipelineValue)}
            </div>
          </div>
        )}

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {tab === "contacts" && contacts.map((c, i) => {
            const company = crmCompanies.find((co) => co.id === c.companyId);
            return (
              <div
                key={c.id}
                onClick={() => setSelectedContactIdx(i)}
                className={`px-4 py-3 border-b border-[var(--app-border)] cursor-pointer transition-colors ${
                  selectedContactIdx === i ? "bg-[var(--app-selected)]" : "hover:bg-[var(--app-hover)]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[var(--app-hover)] flex items-center justify-center text-[12px] font-medium text-[var(--app-text-secondary)]">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-[var(--app-text)] truncate">{c.name}</p>
                    <p className="text-[12px] text-[var(--app-text-tertiary)]">{c.role}{company ? ` · ${company.name}` : ""}</p>
                  </div>
                  <span className="text-[11px] text-[var(--app-text-muted)] ml-auto">{c.lastInteraction}</span>
                </div>
              </div>
            );
          })}

          {tab === "deals" && deals.map((d, i) => (
            <div
              key={d.id}
              onClick={() => setSelectedDealIdx(i)}
              className={`px-4 py-3 border-b border-[var(--app-border)] cursor-pointer transition-colors ${
                selectedDealIdx === i ? "bg-[var(--app-selected)]" : "hover:bg-[var(--app-hover)]"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-[14px] font-medium text-[var(--app-text)]">{d.title}</p>
                <span className="font-mono text-[13px] tabular-nums text-[var(--app-text)]">
                  {d.value > 0 ? formatSek(d.value, { compact: true }) : "Internal"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-[var(--app-bg)] text-[var(--app-text-tertiary)] font-medium">
                  {stageLabels[d.stage]}
                </span>
                <span className="text-[11px] text-[var(--app-text-muted)]">{d.probability}% probability</span>
              </div>
            </div>
          ))}

          {tab === "companies" && companies.map((c, i) => (
            <div
              key={c.id}
              onClick={() => setSelectedCompanyIdx(i)}
              className={`px-4 py-3 border-b border-[var(--app-border)] cursor-pointer transition-colors ${
                selectedCompanyIdx === i ? "bg-[var(--app-selected)]" : "hover:bg-[var(--app-hover)]"
              }`}
            >
              <p className="text-[14px] font-medium text-[var(--app-text)]">{c.name}</p>
              <p className="text-[12px] text-[var(--app-text-tertiary)]">{c.industry} · {c.size}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right detail panel */}
      <div className="flex-1 overflow-y-auto p-6">
        {tab === "contacts" && selectedContact && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-[var(--app-hover)] flex items-center justify-center text-[20px] font-medium text-[var(--app-text-secondary)]">
                {selectedContact.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h2 className="text-[20px] font-medium text-[var(--app-text)]">{selectedContact.name}</h2>
                <p className="text-[14px] text-[var(--app-text-secondary)]">{selectedContact.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-[13px] text-[var(--app-text-secondary)]">
                <Mail size={14} strokeWidth={1.5} className="text-[var(--app-text-tertiary)]" />
                {selectedContact.email}
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[var(--app-text-secondary)]">
                <Phone size={14} strokeWidth={1.5} className="text-[var(--app-text-tertiary)]" />
                {selectedContact.phone}
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[var(--app-text-secondary)]">
                <Building2 size={14} strokeWidth={1.5} className="text-[var(--app-text-tertiary)]" />
                {crmCompanies.find((c) => c.id === selectedContact.companyId)?.name}
              </div>
            </div>

            <h3 className="text-[15px] font-medium text-[var(--app-text)] mb-4">Interaction history</h3>
            <div className="space-y-3">
              {contactInteractions.map((int) => (
                <div key={int.id} className="flex gap-3 border-l-2 border-[var(--app-border)] pl-4 py-1">
                  <span className="text-[14px]">{interactionTypeIcons[int.type]}</span>
                  <div>
                    <p className="text-[13px] text-[var(--app-text-secondary)]">{int.summary}</p>
                    <p className="text-[11px] text-[var(--app-text-muted)] mt-0.5">{int.date} · {int.type}</p>
                  </div>
                </div>
              ))}
              {contactInteractions.length === 0 && (
                <p className="text-[13px] text-[var(--app-text-muted)]">No interactions recorded.</p>
              )}
            </div>
          </div>
        )}

        {tab === "deals" && selectedDeal && (
          <div>
            <h2 className="text-[20px] font-medium text-[var(--app-text)] mb-2">{selectedDeal.title}</h2>
            {selectedDeal.value > 0 && (
              <p className="font-mono text-[28px] font-medium tabular-nums text-[var(--app-text)] mb-6">
                {formatSek(selectedDeal.value)}
              </p>
            )}

            {/* Pipeline stage indicator */}
            <div className="flex items-center gap-1 mb-8">
              {dealStages.filter((s) => s !== "closed-lost").map((stage, i) => {
                const stageIdx = dealStages.indexOf(selectedDeal.stage);
                const thisIdx = dealStages.indexOf(stage);
                const isActive = thisIdx <= stageIdx && selectedDeal.stage !== "closed-lost";
                return (
                  <div key={stage} className="flex items-center gap-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium ${
                      isActive ? "bg-[var(--accent-blue)] text-white" : "bg-[var(--app-hover)] text-[var(--app-text-muted)]"
                    }`}>
                      {i + 1}
                    </div>
                    {i < 4 && <div className={`w-8 h-0.5 ${isActive ? "bg-[var(--accent-blue)]" : "bg-[var(--app-border)]"}`} />}
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[var(--app-border)] rounded-lg p-4">
                <span className="text-[12px] text-[var(--app-text-tertiary)]">Stage</span>
                <p className="text-[14px] font-medium text-[var(--app-text)] mt-1">{stageLabels[selectedDeal.stage]}</p>
              </div>
              <div className="border border-[var(--app-border)] rounded-lg p-4">
                <span className="text-[12px] text-[var(--app-text-tertiary)]">Probability</span>
                <p className="font-mono text-[14px] font-medium text-[var(--app-text)] mt-1">{selectedDeal.probability}%</p>
              </div>
              <div className="border border-[var(--app-border)] rounded-lg p-4">
                <span className="text-[12px] text-[var(--app-text-tertiary)]">Close date</span>
                <p className="text-[14px] text-[var(--app-text)] mt-1">{selectedDeal.closeDate}</p>
              </div>
              <div className="border border-[var(--app-border)] rounded-lg p-4">
                <span className="text-[12px] text-[var(--app-text-tertiary)]">Weighted value</span>
                <p className="font-mono text-[14px] font-medium text-[var(--app-text)] mt-1">
                  {selectedDeal.value > 0 ? formatSek(selectedDeal.value * selectedDeal.probability / 100) : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}

        {tab === "companies" && selectedCompany && (
          <div>
            <h2 className="text-[20px] font-medium text-[var(--app-text)] mb-2">{selectedCompany.name}</h2>
            <p className="text-[14px] text-[var(--app-text-secondary)] mb-6">{selectedCompany.industry} · {selectedCompany.size}</p>
            <div className="text-[13px] text-[var(--app-text-secondary)] mb-6">{selectedCompany.website}</div>

            <h3 className="text-[15px] font-medium text-[var(--app-text)] mb-3">Contacts</h3>
            <div className="space-y-2 mb-6">
              {contacts.filter((c) => c.companyId === selectedCompany.id).map((c) => (
                <div key={c.id} className="flex items-center gap-2 px-3 py-2 bg-[var(--app-bg)] rounded-md border border-[var(--app-border)]">
                  <div className="w-6 h-6 rounded-full bg-[var(--app-hover)] flex items-center justify-center text-[10px] font-medium">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-[13px] text-[var(--app-text)]">{c.name}</span>
                  <span className="text-[12px] text-[var(--app-text-tertiary)]">{c.role}</span>
                </div>
              ))}
            </div>

            <h3 className="text-[15px] font-medium text-[var(--app-text)] mb-3">Deals</h3>
            <div className="space-y-2">
              {deals.filter((d) => d.companyId === selectedCompany.id).map((d) => (
                <div key={d.id} className="flex items-center justify-between px-3 py-2 bg-[var(--app-bg)] rounded-md border border-[var(--app-border)]">
                  <span className="text-[13px] text-[var(--app-text)]">{d.title}</span>
                  <span className="font-mono text-[13px] tabular-nums">{d.value > 0 ? formatSek(d.value, { compact: true }) : "Internal"}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
