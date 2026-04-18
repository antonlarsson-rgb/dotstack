"use client";

import { useState } from "react";
import { storeApps, allCategories, categoryLabels, categoryDescriptions, getAppsByCategory, type AppCategory, type StoreApp } from "@/lib/app/appStore";
import { Check, Plus, Search, Star, ArrowRight } from "lucide-react";

// Simulate installed apps (the built-in ones)
const installedModuleIds = new Set([
  "conversations", "chat", "projects", "files", "calendar", "timeline",
  "campaigns", "crm", "finance", "creative", "reports",
]);

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState<AppCategory | "all" | "installed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [justInstalled, setJustInstalled] = useState<Set<string>>(new Set());

  const filteredApps = storeApps.filter((app) => {
    if (activeCategory === "installed") {
      return app.builtIn && app.moduleId && installedModuleIds.has(app.moduleId);
    }
    if (activeCategory !== "all" && app.category !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        app.name.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q) ||
        app.replaces.some((r) => r.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const isInstalled = (app: StoreApp) =>
    (app.builtIn && app.moduleId && installedModuleIds.has(app.moduleId)) || justInstalled.has(app.id);

  const handleInstall = (appId: string) => {
    setJustInstalled((prev) => new Set(prev).add(appId));
  };

  const installedCount = storeApps.filter((a) => isInstalled(a)).length;
  const totalSaasReplaced = new Set(storeApps.filter((a) => isInstalled(a)).flatMap((a) => a.replaces)).size;

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-[240px] border-r border-[var(--app-border)] flex flex-col flex-shrink-0">
        <div className="px-5 py-4 border-b border-[var(--app-border)]">
          <h1 className="text-[17px] font-medium text-[var(--app-text)]">App Store</h1>
          <p className="text-[12px] text-[var(--app-text-tertiary)] mt-1">
            {installedCount} installed · replaces {totalSaasReplaced} tools
          </p>
        </div>

        <div className="px-3 py-3 border-b border-[var(--app-border)]">
          <div className="flex items-center gap-2 bg-[var(--app-bg)] border border-[var(--app-border)] rounded-md px-2.5 py-1.5">
            <Search size={13} strokeWidth={1.5} className="text-[var(--app-text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setActiveCategory("all"); }}
              placeholder="Search apps or tools..."
              className="flex-1 text-[13px] bg-transparent outline-none placeholder:text-[var(--app-text-muted)]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2 px-2">
          <button
            onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
            className={`w-full text-left px-3 py-1.5 rounded-md text-[13px] mb-0.5 transition-colors ${
              activeCategory === "all" ? "bg-[var(--app-selected)] font-medium text-[var(--app-text)]" : "text-[var(--app-text-secondary)] hover:bg-[var(--app-hover)]"
            }`}
          >
            All apps
          </button>
          <button
            onClick={() => { setActiveCategory("installed"); setSearchQuery(""); }}
            className={`w-full text-left px-3 py-1.5 rounded-md text-[13px] mb-2 transition-colors ${
              activeCategory === "installed" ? "bg-[var(--app-selected)] font-medium text-[var(--app-text)]" : "text-[var(--app-text-secondary)] hover:bg-[var(--app-hover)]"
            }`}
          >
            Installed
          </button>

          <div className="h-px bg-[var(--app-border)] mb-2" />

          {allCategories.map((cat) => {
            const count = getAppsByCategory(cat).length;
            return (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setSearchQuery(""); }}
                className={`w-full text-left px-3 py-1.5 rounded-md text-[13px] mb-0.5 flex items-center justify-between transition-colors ${
                  activeCategory === cat ? "bg-[var(--app-selected)] font-medium text-[var(--app-text)]" : "text-[var(--app-text-secondary)] hover:bg-[var(--app-hover)]"
                }`}
              >
                <span>{categoryLabels[cat]}</span>
                <span className="text-[11px] text-[var(--app-text-muted)] font-mono tabular-nums">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeCategory !== "all" && activeCategory !== "installed" && (
          <div className="mb-6">
            <h2 className="text-[20px] font-medium text-[var(--app-text)]">{categoryLabels[activeCategory]}</h2>
            <p className="text-[14px] text-[var(--app-text-secondary)] mt-1">{categoryDescriptions[activeCategory]}</p>
          </div>
        )}

        {activeCategory === "all" && !searchQuery && (
          <div className="mb-6">
            <h2 className="text-[20px] font-medium text-[var(--app-text)]">All apps</h2>
            <p className="text-[14px] text-[var(--app-text-secondary)] mt-1">
              Everything your company needs. One platform, one invoice, one login.
            </p>
          </div>
        )}

        {activeCategory === "installed" && (
          <div className="mb-6">
            <h2 className="text-[20px] font-medium text-[var(--app-text)]">Installed apps</h2>
            <p className="text-[14px] text-[var(--app-text-secondary)] mt-1">
              Apps currently active in your .stack workspace.
            </p>
          </div>
        )}

        {searchQuery && (
          <div className="mb-6">
            <p className="text-[14px] text-[var(--app-text-secondary)]">
              {filteredApps.length} result{filteredApps.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
            </p>
          </div>
        )}

        {/* App grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredApps.map((app) => {
            const installed = isInstalled(app);
            return (
              <div
                key={app.id}
                className="border border-[var(--app-border)] rounded-lg p-5 hover:shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-[16px] ${
                      installed ? "bg-[var(--accent-blue)] text-white" : "bg-[var(--app-bg)] text-[var(--app-text-tertiary)] border border-[var(--app-border)]"
                    }`}>
                      {app.name.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-[14px] font-medium text-[var(--app-text)]">{app.name}</h3>
                        {app.popular && <Star size={12} strokeWidth={1.5} className="text-[var(--accent-amber)]" fill="var(--accent-amber)" />}
                      </div>
                      <span className="text-[11px] text-[var(--app-text-tertiary)]">{categoryLabels[app.category]}</span>
                    </div>
                  </div>

                  {installed ? (
                    <span className="flex items-center gap-1 text-[12px] text-[var(--accent-green)] font-medium px-2 py-1 bg-[#e6ffe6] rounded-md">
                      <Check size={12} strokeWidth={2} /> Installed
                    </span>
                  ) : (
                    <button
                      onClick={() => handleInstall(app.id)}
                      className="flex items-center gap-1 text-[12px] text-[var(--app-text-secondary)] font-medium px-2.5 py-1 border border-[var(--app-border)] rounded-md hover:bg-[var(--app-hover)] transition-colors"
                    >
                      <Plus size={12} strokeWidth={1.5} /> Add
                    </button>
                  )}
                </div>

                <p className="text-[13px] text-[var(--app-text-secondary)] leading-[1.5] mb-3">
                  {app.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {app.replaces.slice(0, 3).map((tool) => (
                      <span key={tool} className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--app-bg)] text-[var(--app-text-muted)] border border-[var(--app-border)]">
                        replaces {tool}
                      </span>
                    ))}
                    {app.replaces.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5 text-[var(--app-text-muted)]">
                        +{app.replaces.length - 3} more
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-medium ${app.pricing === "included" ? "text-[var(--accent-green)]" : "text-[var(--accent-amber)]"}`}>
                    {app.pricing === "included" ? "Included" : "Add-on"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredApps.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[15px] text-[var(--app-text-tertiary)]">No apps match your search.</p>
            <p className="text-[13px] text-[var(--app-text-muted)] mt-1">Try a different term or browse categories.</p>
          </div>
        )}
      </div>
    </div>
  );
}
