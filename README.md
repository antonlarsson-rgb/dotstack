# .stack

**The AI operating system that replaces your company's entire SaaS stack.**

One invoice. One dashboard. One AI agent. 10% cheaper from day one, 50% within a year.

Live: [dotstack-five.vercel.app](https://dotstack-five.vercel.app)
GitHub: [github.com/antonlarsson-rgb/dotstack](https://github.com/antonlarsson-rgb/dotstack)

---

## Vision

Every company with 10-75 employees pays for 50-100 SaaS tools. A third of those licenses go unused. Nobody has an overview. Everyone is afraid to cancel anything.

.stack fixes this by becoming the only software vendor a company needs. We take over all their subscriptions, pay the vendors, send one invoice, and assign a dedicated person (a Stackie) who actively works to replace tools and lower costs. The platform is AI-native: CRM, projects, chat, finance, campaigns, all built into one system with an AI agent that works across everything.

The end goal is to be the default operating system for B2B companies. The company that replaces the SaaS layer entirely.

---

## What's in this repo

### 1. The Pitch (`/`)
A 14-slide horizontally-scrolling interactive pitch website for the Pinecone Ventures Buildathon (AI Infrastructure track, Almedalen Week, Visby, June 21-22 2026).

**Slide flow:**
1. Hero: what .stack is
2. Problem: 87 tools, 34% unused, afraid to cancel
3. Why now: SaaS repricing, AI builds faster, MCP integration
4. Solution: Stackie model (pay bills, dedicated person, 50% reduction, no missed features)
5. Founder: Anton Larsson, career timeline, strengths/gaps
6. Architecture: 4-layer model (.stack replaces layers 2-4, keeps deterministic backends)
7. App Store: 42 apps across 12 categories, each replacing specific SaaS
8. Company economics: interactive model with 6 sliders, P&L + cashflow toggle, valuation
9. Traction: MVP built, 2 test customers, 15 warm leads
10. Roadmap: 12-month launch plan (onboard, cancel, grow, Series A)
11. Ask the AI: prominent agent with suggested investor questions
12. The Ask: 1M SEK budget breakdown with pie chart
13. Live product: embedded MVP preview with CTAs
14. Contact: email + LinkedIn

**Interactive features:**
- Financial model: 6 sliders (customers, spend, time, customers/Stackie, Stackie salary, marketing)
- P&L and Cashflow chart toggle
- Live valuation at 8x ARR
- App Store with category filtering and AnimatePresence
- Solution cards expand on click
- Roadmap quarters expand to show month-by-month detail
- AI agent answers any question (competitor analysis, economics, strategy)
- Employee cost slider on problem slide

### 2. The Product (`/app`)
A working MVP with three demo Spaces (Brand Factory, Svenska Spel, Stellar Internal).

**12 modules:**
- Dashboard (AI-streamed briefing, stat cards, needs-attention, activity feed)
- CRM (contacts, deals pipeline with stage indicator, companies, interaction history)
- Conversations (unified inbox, email/Slack/meeting threads, reply with "Draft with .stack")
- Chat (channels per space, messages, unread indicators)
- Projects (Kanban board with drag-drop + Progress view with time tracking and economics)
- Timeline (horizontal Gantt with phases, milestones, today-line, legend)
- Calendar (week view with time grid and colored events)
- Campaigns (Meta/Google/TikTok with budget, ROAS, CPA, CTR, alerts)
- Finance (invoices, project economics with hourly rates, time tracking, editable rate settings)
- Reports (list with status badges)
- Creative (briefs + generated assets grid)
- Files (file browser with type icons, tags, AI summaries)

**Cross-space views:**
- App Store (`/app/store`): 42 apps, 12 categories, search, install simulation
- Today (`/app/today`): AI-curated priority cards
- Inbox (`/app/inbox`): cross-space unified conversation list

**App shell (3-zone cockpit):**
- Top bar: .stack wordmark, space selector dropdown, universal search (Cmd+K), notifications
- Navigation rail: space icons, cross-space modules, personal modules, App Store
- Context rail: collapsible metadata panel + AI agent chat with streaming
- Status strip: counters + keyboard hints

---

## Tech stack

- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS + CSS custom properties
- Framer Motion (animations)
- Recharts (charts in pitch + product)
- Anthropic Claude Sonnet 4.6 (AI agent, SSE streaming)
- Lucide React (icons)
- Inter Tight, Instrument Serif, JetBrains Mono (fonts)
- Vercel (deployment)

---

## Business model

1. **Take over**: .stack takes over all customer SaaS subscriptions and pays vendors directly
2. **One invoice**: customer gets one invoice at 10% discount. First invoice at net-60 (1.8% factoring fee gives customer 2 months extra cashflow)
3. **Stackie**: dedicated human account manager (1 per 10 customers) actively cancels ~20% of subscriptions per month
4. **Replace**: as .stack modules replace vendor tools, vendor cost drops to ~15% floor (API tokens + essential backends like Fortnox, Google Workspace)
5. **Target**: 50% total cost reduction within 12 months

**Why this works:**
- High revenue from day one (90% of customer's SaaS spend flows through .stack)
- Margin grows rapidly as vendor costs are eliminated
- Stackies are human because everything else is AI: platform, agent, app generation. The human handles trust and decisions.
- Net-60 invoicing is a customer acquisition tool (two months free cashflow)
- Low risk: if a customer leaves, we stop paying their vendors

**Unit economics (at scale, month 12 with 15 customers at 80k SEK avg spend):**
- MRR: ~1M SEK
- Vendor cost: ~15% of original
- Gross margin: ~83%
- Opex: ~280k/mo (2 founders x 45k + 2 Stackies x 35k + 15k office + 20k infra + 20k marketing)
- EBITDA: ~620k/mo
- ARR: ~12M SEK
- Valuation (8x ARR): ~100M SEK

---

## Key numbers (consistent across all slides and AI agent)

| Item | Value |
|---|---|
| Customer discount | 10% from day one |
| Cost reduction target | 50% within 12 months |
| Vendor cost reduction | ~20%/month, floor 15% |
| Invoice terms | Net-60, 1.8% factoring |
| Stackie ratio | 1 per 10 customers |
| Apps in store | 42 across 12 categories |
| Test customers | 2 (Stellar + retail brand) |
| Warm leads | 15 |
| Investment ask | 1M SEK |
| Budget | 270k co-founder, 210k Stackie, 200k SaaS float, 120k infra, 100k marketing, 100k buffer |
| M12 target | 12-15 customers, 1M+ MRR, ARR 12-15M SEK |

---

## Competitor landscape (built into AI agent)

- **All-in-one suites** (Zoho, Odoo): sell their own tools, don't take over existing subscriptions
- **AI workspaces** (nexos.ai, Simtheory): AI model aggregators, not SaaS replacers
- **AI agent platforms** (Eragon $12M raise): closest competitor, but enterprise-focused. .stack is SMB.
- **Vertical AI SaaS** (Sierra, Harvey): replace one category each. .stack replaces many.
- **SaaS management** (Vendr, Zylo): report on spend, don't take over or reduce it

**What's unique**: taking over subscriptions economically (reseller model) + progressive AI replacement + SMB focus + human Stackie model. Nobody does this combination.

---

## Environment variables

```
ANTHROPIC_API_KEY=your-key-here
```

## Development

```bash
npm install
npm run dev
```

## Deployment

Deployed on Vercel. API key set via `vercel env add ANTHROPIC_API_KEY production`.

---

## Founder

**Anton Larsson**
Head of Performance, Stellar (50-person Swedish digital agency)
12 years building companies. B2B customer acquisition, performance marketing, sales, operations.
Biggest venture: construction staffing platform, 23 MSEK revenue, bankrupt 2022.

anton.larsson@wearestellar.se
[LinkedIn](https://www.linkedin.com/in/anton-larsson-23aa574a/)
