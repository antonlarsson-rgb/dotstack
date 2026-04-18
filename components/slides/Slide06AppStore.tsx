"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SlideShell } from "@/components/ui/SlideShell";
import { storeApps, allCategories, categoryLabels, type AppCategory } from "@/lib/app/appStore";
import { Check, Star } from "lucide-react";

const installedIds = new Set(["conversations", "chat", "projects", "files", "calendar", "timeline", "campaigns", "crm", "finance", "creative", "reports"]);

const featuredCategories: (AppCategory | "all")[] = ["all", "communication", "productivity", "marketing", "sales", "finance", "hr", "analytics", "operations", "support"];

export function Slide06AppStore() {
  const [filter, setFilter] = useState<AppCategory | "all">("all");

  const filtered = filter === "all"
    ? storeApps.slice(0, 16)
    : storeApps.filter((a) => a.category === filter).slice(0, 16);

  return (
    <SlideShell id="slide-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}>
          <Eyebrow>The App Store</Eyebrow>
        </motion.div>

        <motion.div className="flex items-end justify-between mb-6" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}>
          <div>
            <h1 className="font-sans text-[40px] font-medium tracking-[-0.025em] text-[var(--text)] leading-[1.1]">
              42 apps. Each one replaces a SaaS product.
            </h1>
            <p className="text-[17px] text-[var(--text-secondary)] mt-2">
              The customer never goes to another vendor. Everything is inside <span className="font-mono">.stack</span>.
            </p>
          </div>
          <a
            href="/app/store"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-[var(--accent-blue)] hover:underline flex-shrink-0"
          >
            Browse full store →
          </a>
        </motion.div>

        {/* Category tabs */}
        <motion.div className="flex gap-1 mb-5 flex-wrap" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}>
          {featuredCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[12px] px-3 py-1.5 rounded-full transition-colors ${
                filter === cat
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--text-tertiary)] border border-[var(--border)] hover:bg-[var(--hover-bg)]"
              }`}
            >
              {cat === "all" ? "All" : categoryLabels[cat]}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-2.5">
          <AnimatePresence mode="popLayout">
            {filtered.map((app) => {
              const installed = installedIds.has(app.id);
              return (
                <motion.div
                  key={app.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="border border-[var(--border)] rounded-lg p-3.5 bg-white"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center text-[12px] font-medium ${
                      installed ? "bg-[var(--accent-blue)] text-white" : "bg-[var(--bg-muted)] text-[var(--text-tertiary)]"
                    }`}>
                      {app.name.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[13px] font-medium text-[var(--text)] truncate">{app.name}</span>
                        {app.popular && <Star size={10} fill="var(--accent-amber)" className="text-[var(--accent-amber)]" />}
                      </div>
                    </div>
                    {installed && <Check size={14} className="text-[var(--accent-green)] ml-auto flex-shrink-0" />}
                  </div>
                  <p className="text-[11px] text-[var(--text-tertiary)] leading-[1.4] mb-2 line-clamp-2">{app.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {app.replaces.slice(0, 2).map((r) => (
                      <span key={r} className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--bg-muted)] text-[var(--text-muted)]">
                        ↔ {r}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </SlideShell>
  );
}
