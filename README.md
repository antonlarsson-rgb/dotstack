# .stack

**The AI operating system that replaces your company's entire SaaS stack.**

One invoice. One dashboard. One AI agent. 10% cheaper from day one, 50% within a year.

Live: [dotstack-five.vercel.app](https://dotstack-five.vercel.app)

---

## What is this

This repo contains two things:

### 1. The Pitch (`/`)
A 14-slide horizontally-scrolling interactive pitch for the Pinecone Ventures Buildathon (AI Infrastructure track, June 2026, Visby).

- Interactive financial model with 6 sliders (customers, spend, Stackie params, marketing)
- P&L and Cashflow toggle with live chart
- Company valuation at 8x ARR
- 42-app App Store showcase with category filtering
- AI agent that answers investor questions (powered by Claude Sonnet 4.6)
- Embedded live product preview
- 12-month launch plan with expandable quarters
- Competitor analysis built into AI agent knowledge

### 2. The Product (`/app`)
A working MVP of .stack with three demo Spaces (Brand Factory, Svenska Spel, Stellar Internal).

**Modules:**
- Dashboard with AI-streamed briefings
- CRM (contacts, deals pipeline, companies, interaction history)
- Conversations (unified inbox across email/Slack/meetings)
- Chat (real-time channels per space)
- Projects (Kanban board + Progress view with time tracking)
- Timeline (Gantt chart with phases, milestones, today-line)
- Calendar (week view with events)
- Campaigns (Meta/Google/TikTok with metrics)
- Finance (invoices, time tracking, project economics with hourly rates)
- Reports, Creative, Files
- App Store (42 apps across 12 categories)
- Today view (AI-curated daily priorities)
- Inbox (cross-space unified view)

---

## Tech stack

- **Framework**: Next.js 16 (App Router, TypeScript, Turbopack)
- **Styling**: Tailwind CSS + CSS custom properties
- **Animation**: Framer Motion
- **Charts**: Recharts
- **AI**: Anthropic Claude Sonnet 4.6 via direct API (SSE streaming)
- **Icons**: Lucide React
- **Fonts**: Inter Tight, Instrument Serif, JetBrains Mono
- **Deployment**: Vercel

## The business model

.stack takes over a company's entire SaaS stack:
1. We pay the vendors directly
2. Customer gets one invoice at 10% discount, net-60 terms (1.8% factoring fee)
3. A dedicated Stackie (1 per 10 customers) actively cancels ~20% of subscriptions per month
4. We replace vendor tools with AI-built .stack modules
5. Vendor cost drops to ~15% floor (API tokens + essential backends)
6. Target: 50% total cost reduction within 12 months

## Environment variables

```
ANTHROPIC_API_KEY=your-key-here
```

## Development

```bash
npm install
npm run dev
```

## Founder

Anton Larsson
Head of Performance, Stellar
anton.larsson@wearestellar.se
[LinkedIn](https://www.linkedin.com/in/anton-larsson-23aa574a/)
