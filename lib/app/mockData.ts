// ============================================================
// SPACES
// ============================================================
export type SpaceAccent = "blue" | "amber" | "purple";

export interface Space {
  id: string;
  name: string;
  accent: SpaceAccent;
  initial: string;
  type: "client" | "internal";
  industry: string;
  description: string;
  modulesEnabled: string[];
}

export const accentColors: Record<SpaceAccent, { fg: string; bg: string }> = {
  blue: { fg: "#1e40af", bg: "#eff6ff" },
  amber: { fg: "#b45309", bg: "#fffbeb" },
  purple: { fg: "#7c3aed", bg: "#faf5ff" },
};

export const spaces: Space[] = [
  {
    id: "brand-factory",
    name: "Brand Factory",
    accent: "blue",
    initial: "B",
    type: "client",
    industry: "retail",
    description: "Swedish retail brand with 150+ stores. Focus: performance marketing and creative.",
    modulesEnabled: ["dashboard", "conversations", "chat", "crm", "files", "projects", "timeline", "calendar", "reports", "campaigns", "finance", "creative"],
  },
  {
    id: "svenska-spel",
    name: "Svenska Spel",
    accent: "amber",
    initial: "S",
    type: "client",
    industry: "gaming",
    description: "Swedish gaming/lottery company. Focus: compliant digital campaigns.",
    modulesEnabled: ["dashboard", "conversations", "chat", "crm", "files", "projects", "timeline", "calendar", "reports", "campaigns", "finance"],
  },
  {
    id: "stellar-internal",
    name: "Stellar Internal",
    accent: "purple",
    initial: "ST",
    type: "internal",
    industry: "agency",
    description: "Stellar's internal operations, hiring, and strategy.",
    modulesEnabled: ["dashboard", "conversations", "chat", "crm", "files", "projects", "timeline", "calendar", "reports", "finance"],
  },
];

// ============================================================
// PEOPLE
// ============================================================
export interface Person {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export const people: Person[] = [
  { id: "anton", name: "Anton Larsson", role: "Head of Performance", company: "Stellar", avatar: "A" },
  { id: "mikaela", name: "Mikaela Andersson", role: "Marketing Director", company: "Brand Factory", avatar: "M" },
  { id: "johan", name: "Johan Berg", role: "Digital Marketing Lead", company: "Svenska Spel", avatar: "J" },
  { id: "sara", name: "Sara Lindqvist", role: "Senior Strategist", company: "Stellar", avatar: "S" },
  { id: "erik", name: "Erik Johansson", role: "Creative Director", company: "Stellar", avatar: "E" },
  { id: "linnea", name: "Linnea Ström", role: "Account Manager", company: "Stellar", avatar: "L" },
  { id: "marcus", name: "Marcus Nylund", role: "Media Buyer", company: "Stellar", avatar: "MA" },
  { id: "anna", name: "Anna Hedberg", role: "Brand Manager", company: "Brand Factory", avatar: "AH" },
  { id: "karl", name: "Karl Persson", role: "CFO", company: "Brand Factory", avatar: "K" },
  { id: "emma", name: "Emma Wikström", role: "Compliance Officer", company: "Svenska Spel", avatar: "EW" },
  { id: "oscar", name: "Oscar Nilsson", role: "Campaign Manager", company: "Svenska Spel", avatar: "O" },
  { id: "frida", name: "Frida Bergman", role: "Junior Designer", company: "Stellar", avatar: "F" },
  { id: "david", name: "David Ekström", role: "Developer", company: "Stellar", avatar: "D" },
  { id: "lena", name: "Lena Sandberg", role: "HR Manager", company: "Stellar", avatar: "LE" },
];

export function getPersonById(id: string) {
  return people.find((p) => p.id === id);
}

// ============================================================
// CONVERSATIONS
// ============================================================
export interface Message {
  from: string;
  timestamp: string;
  content: string;
  source: "email" | "slack" | "meeting" | "internal";
}

export interface Conversation {
  id: string;
  spaceId: string;
  subject: string;
  participants: string[];
  source: "email" | "slack" | "meeting" | "internal";
  lastActivity: string;
  unread: boolean;
  messages: Message[];
}

export const conversations: Conversation[] = [
  // Brand Factory
  {
    id: "bf-conv-1",
    spaceId: "brand-factory",
    subject: "Q3 back-to-school campaign brief",
    participants: ["anton", "mikaela", "erik"],
    source: "email",
    lastActivity: "2 hours ago",
    unread: false,
    messages: [
      { from: "mikaela", timestamp: "2026-04-15T10:30:00", content: "Hi Anton, wanted to kick off the back-to-school campaign planning. We'd like to start the flight mid-July, running through August 31. Can you get a proposal together by next Friday?", source: "email" },
      { from: "anton", timestamp: "2026-04-15T11:45:00", content: "On it. I'll have Erik start on creative concepts Monday. Budget same as last year or adjusting?", source: "email" },
      { from: "mikaela", timestamp: "2026-04-15T14:20:00", content: "Budget up 15% on last year. Also let's do more TikTok this time, the last one didn't land but the audience data suggests we should try again with different creative.", source: "email" },
      { from: "erik", timestamp: "2026-04-16T09:10:00", content: "I've put together 3 initial mood boards based on last year's performance. Attaching the deck. The TikTok-native approach will need its own brief since the format is so different from Meta.", source: "email" },
      { from: "mikaela", timestamp: "2026-04-16T15:30:00", content: "Love direction 2 (the lifestyle-focused one). Let's develop that further. For TikTok, I'd lean into UGC-style content. We have some creators from last year who could work.", source: "email" },
    ],
  },
  {
    id: "bf-conv-2",
    spaceId: "brand-factory",
    subject: "Contract renewal discussion",
    participants: ["anton", "mikaela", "karl"],
    source: "email",
    lastActivity: "4 hours ago",
    unread: true,
    messages: [
      { from: "mikaela", timestamp: "2026-04-03T09:00:00", content: "Anton, we'd like to discuss renewing for another 12 months. The board is happy with the direction. Can we set up a call to go through terms?", source: "email" },
      { from: "anton", timestamp: "2026-04-03T10:30:00", content: "Great to hear. I'll put together a proposal with updated scope and pricing. Happy to do a call next week. Does Tuesday at 14:00 work?", source: "email" },
      { from: "karl", timestamp: "2026-04-04T08:15:00", content: "Tuesday works. I'll join as well since we need to align on the budget allocation for H2. Can you send the current contract summary before the call?", source: "email" },
      { from: "anton", timestamp: "2026-04-04T11:00:00", content: "Sent. I've also included a performance summary for Q1 showing the 3.2x ROAS improvement. Looking forward to Tuesday.", source: "email" },
    ],
  },
  {
    id: "bf-conv-3",
    spaceId: "brand-factory",
    subject: "May invoice and payment terms",
    participants: ["anton", "karl"],
    source: "email",
    lastActivity: "1 day ago",
    unread: false,
    messages: [
      { from: "karl", timestamp: "2026-04-14T10:00:00", content: "Hi Anton, just a heads up that the April invoice came through fine. For May, can we switch to net-45 terms? We're restructuring our AP process.", source: "email" },
      { from: "anton", timestamp: "2026-04-14T14:20:00", content: "I need to check with our finance team. We typically do net-30 but I understand the situation. Let me get back to you by end of week.", source: "email" },
    ],
  },
  {
    id: "bf-conv-4",
    spaceId: "brand-factory",
    subject: "Spring campaign creative review",
    participants: ["anton", "erik", "mikaela", "anna"],
    source: "slack",
    lastActivity: "3 hours ago",
    unread: true,
    messages: [
      { from: "erik", timestamp: "2026-04-17T09:00:00", content: "Uploaded the final spring collection assets to the shared folder. 12 static + 4 video variants. @anna can you review the product shots?", source: "slack" },
      { from: "anna", timestamp: "2026-04-17T10:15:00", content: "Looking now. The lifestyle shots look great. Two comments: 1) the hero banner needs the updated logo, and 2) can we get a square crop for Instagram stories?", source: "slack" },
      { from: "erik", timestamp: "2026-04-17T11:30:00", content: "Fixed the logo. Square crops coming this afternoon. @anton the Meta assets are ready for upload whenever you want to push them.", source: "slack" },
      { from: "anton", timestamp: "2026-04-17T14:00:00", content: "Will push them tonight. The campaign goes live tomorrow at 06:00.", source: "slack" },
    ],
  },
  {
    id: "bf-conv-5",
    spaceId: "brand-factory",
    subject: "Weekly performance sync",
    participants: ["anton", "mikaela", "sara"],
    source: "meeting",
    lastActivity: "2 days ago",
    unread: false,
    messages: [
      { from: "anton", timestamp: "2026-04-16T10:00:00", content: "Notes from our weekly sync:\n\n1. Spring campaign ROAS at 3.4x, above target\n2. TikTok test ad set performing 40% below Meta, pausing to optimize\n3. New store openings in Malmö and Uppsala need local geo-targeting\n4. Mikaela confirmed Q3 budget increase\n5. Next week: review back-to-school brief", source: "meeting" },
    ],
  },
  {
    id: "bf-conv-6",
    spaceId: "brand-factory",
    subject: "TikTok campaign underperformance",
    participants: ["anton", "marcus", "mikaela"],
    source: "slack",
    lastActivity: "5 hours ago",
    unread: false,
    messages: [
      { from: "marcus", timestamp: "2026-04-18T08:30:00", content: "Ran the numbers on the TikTok spring campaign. CTR is at 0.4% vs 1.2% on Meta. CPA is 3x higher. I think the creative format isn't working for the audience.", source: "slack" },
      { from: "anton", timestamp: "2026-04-18T09:15:00", content: "Agreed. Let's pause the current creative and test with UGC-style content. Mikaela mentioned they have creators from last year. Can you pull the audience data so we have a clear picture for the Q3 brief?", source: "slack" },
      { from: "marcus", timestamp: "2026-04-18T10:00:00", content: "On it. I'll have the audience analysis ready by EOD.", source: "slack" },
    ],
  },

  // Svenska Spel
  {
    id: "ss-conv-1",
    spaceId: "svenska-spel",
    subject: "Q2 digital campaign brief approval",
    participants: ["anton", "johan", "emma"],
    source: "email",
    lastActivity: "6 hours ago",
    unread: false,
    messages: [
      { from: "johan", timestamp: "2026-04-11T09:00:00", content: "Hi Anton, the Q2 campaign brief is approved from our side. Emma from compliance has signed off on the messaging. You can proceed with media planning.", source: "email" },
      { from: "anton", timestamp: "2026-04-11T10:30:00", content: "Thanks Johan. I'll have the media plan ready by Monday. One question: are we cleared for Google Ads this quarter? Last time there were restrictions on search terms.", source: "email" },
      { from: "emma", timestamp: "2026-04-11T14:00:00", content: "Google Ads is cleared with the updated keyword negative list I sent last week. Make sure all ad copy goes through the compliance portal before going live. Turnaround is 48 hours.", source: "email" },
      { from: "anton", timestamp: "2026-04-11T15:20:00", content: "Understood. I'll build in the 48h buffer. Plan will be in your inbox Monday morning.", source: "email" },
    ],
  },
  {
    id: "ss-conv-2",
    spaceId: "svenska-spel",
    subject: "Compliance audit preparation",
    participants: ["anton", "emma", "sara"],
    source: "email",
    lastActivity: "1 day ago",
    unread: true,
    messages: [
      { from: "emma", timestamp: "2026-04-15T11:00:00", content: "Reminder that the quarterly compliance audit for all active campaigns is scheduled for April 28. Please have all campaign documentation, targeting parameters, and creative assets ready for review.", source: "email" },
      { from: "anton", timestamp: "2026-04-15T14:00:00", content: "Sara and I will prepare the documentation package. We'll have it ready by April 25 so you have time to review before the audit.", source: "email" },
    ],
  },
  {
    id: "ss-conv-3",
    spaceId: "svenska-spel",
    subject: "Triss summer promo campaign",
    participants: ["anton", "johan", "oscar"],
    source: "slack",
    lastActivity: "3 hours ago",
    unread: false,
    messages: [
      { from: "oscar", timestamp: "2026-04-17T10:00:00", content: "Hey Anton, Johan wants to run a summer promo for Triss starting June 1. Big push on TV + digital. Budget is 2.5M SEK for digital alone. Can Stellar handle the digital side?", source: "slack" },
      { from: "anton", timestamp: "2026-04-17T11:00:00", content: "Definitely. We'll need the brief by mid-May to hit the June 1 launch. What's the primary KPI? Brand awareness or direct response?", source: "slack" },
      { from: "oscar", timestamp: "2026-04-17T13:30:00", content: "Mix of both. Johan says 60% brand, 40% DR. He'll send the full brief next week. Heads up: compliance will be tight on this one since it's a lottery product.", source: "slack" },
    ],
  },
  {
    id: "ss-conv-4",
    spaceId: "svenska-spel",
    subject: "Monthly performance review",
    participants: ["anton", "johan"],
    source: "meeting",
    lastActivity: "3 days ago",
    unread: false,
    messages: [
      { from: "anton", timestamp: "2026-04-15T14:00:00", content: "March performance review notes:\n\n1. Overall ROAS 2.8x (target was 2.5x)\n2. Google Ads CPA down 15% after keyword optimization\n3. Meta campaign reach +22% MoM\n4. Two ad creatives flagged by compliance (resolved within 24h)\n5. Recommendation: increase Google budget by 20% for Q2, reallocate from underperforming display", source: "meeting" },
    ],
  },

  // Stellar Internal
  {
    id: "st-conv-1",
    spaceId: "stellar-internal",
    subject: "Q2 OKR check-in",
    participants: ["anton", "sara", "linnea"],
    source: "slack",
    lastActivity: "1 hour ago",
    unread: true,
    messages: [
      { from: "sara", timestamp: "2026-04-18T08:00:00", content: "Team, Q2 OKR check-in is next Wednesday. Please update your progress in the shared doc before then. Key focus areas: revenue target tracking, client retention, and new business pipeline.", source: "slack" },
      { from: "anton", timestamp: "2026-04-18T08:30:00", content: "My OKRs are updated. Revenue tracking at 82% of Q2 target. Brand Factory renewal is the big one. If that closes, we'll be at 95%.", source: "slack" },
      { from: "linnea", timestamp: "2026-04-18T09:15:00", content: "Updated mine. Client retention is at 100% so far this quarter. Three new leads in pipeline, one looks very promising (Nordic Logistics).", source: "slack" },
    ],
  },
  {
    id: "st-conv-2",
    spaceId: "stellar-internal",
    subject: "Senior Designer hiring",
    participants: ["anton", "erik", "lena"],
    source: "email",
    lastActivity: "2 days ago",
    unread: false,
    messages: [
      { from: "lena", timestamp: "2026-04-16T10:00:00", content: "We have 3 final candidates for the Senior Designer role. Interviews are scheduled for next week. Erik, can you prepare a design task for them?", source: "email" },
      { from: "erik", timestamp: "2026-04-16T11:30:00", content: "Already on it. I'll have the task ready by Friday. It'll be a mini-brief based on a real (anonymized) client project.", source: "email" },
    ],
  },
  {
    id: "st-conv-3",
    spaceId: "stellar-internal",
    subject: "Office move timeline",
    participants: ["anton", "sara", "lena", "david"],
    source: "slack",
    lastActivity: "5 hours ago",
    unread: false,
    messages: [
      { from: "lena", timestamp: "2026-04-18T07:00:00", content: "Quick update on the office move: new lease signed for Birger Jarlsgatan. Move date is June 15. We need a task force to plan the logistics.", source: "slack" },
      { from: "david", timestamp: "2026-04-18T07:30:00", content: "I'll handle the IT infrastructure side. We need at least 2 weeks for network setup. Can we get access to the new space by June 1?", source: "slack" },
      { from: "sara", timestamp: "2026-04-18T08:00:00", content: "I'll coordinate the client communication. Some meetings will need to be rescheduled around the move week.", source: "slack" },
    ],
  },
  {
    id: "st-conv-4",
    spaceId: "stellar-internal",
    subject: "All-hands meeting agenda",
    participants: ["anton", "sara", "erik", "linnea", "lena"],
    source: "slack",
    lastActivity: "4 hours ago",
    unread: false,
    messages: [
      { from: "sara", timestamp: "2026-04-18T10:00:00", content: "All-hands is tomorrow at 10:00. Agenda:\n1. Q2 progress update (Anton)\n2. New client wins (Linnea)\n3. Office move update (Lena)\n4. Creative team expansion (Erik)\n5. Open floor", source: "slack" },
    ],
  },
];

// ============================================================
// FILES
// ============================================================
export interface FileItem {
  id: string;
  spaceId: string;
  name: string;
  type: "pdf" | "docx" | "xlsx" | "pptx" | "png" | "jpg" | "folder" | "figma";
  size: string;
  lastModified: string;
  uploadedBy: string;
  tags: string[];
  summary: string;
}

export const files: FileItem[] = [
  // Brand Factory
  { id: "bf-f1", spaceId: "brand-factory", name: "Q2_Performance_Review.pdf", type: "pdf", size: "2.4 MB", lastModified: "Apr 15", uploadedBy: "anton", tags: ["report", "q2", "performance"], summary: "Quarterly performance review showing 3.2x ROAS across all channels." },
  { id: "bf-f2", spaceId: "brand-factory", name: "Back_to_School_Brief_2026.docx", type: "docx", size: "1.1 MB", lastModified: "Apr 16", uploadedBy: "erik", tags: ["brief", "campaign", "q3"], summary: "Creative brief for Q3 back-to-school campaign across Meta, Google, TikTok." },
  { id: "bf-f3", spaceId: "brand-factory", name: "Spring_Campaign_Assets", type: "folder", size: "48 files", lastModified: "Apr 17", uploadedBy: "erik", tags: ["creative", "assets"], summary: "Final creative assets for spring collection campaign." },
  { id: "bf-f4", spaceId: "brand-factory", name: "Contract_2025-2026.pdf", type: "pdf", size: "340 KB", lastModified: "Jan 10", uploadedBy: "anton", tags: ["contract", "legal"], summary: "Current service agreement between Stellar and Brand Factory." },
  { id: "bf-f5", spaceId: "brand-factory", name: "Media_Plan_Q2.xlsx", type: "xlsx", size: "890 KB", lastModified: "Apr 1", uploadedBy: "marcus", tags: ["media", "planning", "q2"], summary: "Detailed media plan with budget allocation across channels." },
  { id: "bf-f6", spaceId: "brand-factory", name: "Brand_Guidelines_2026.pdf", type: "pdf", size: "12.3 MB", lastModified: "Feb 20", uploadedBy: "anna", tags: ["brand", "guidelines"], summary: "Updated brand guidelines including new logo variations and color palette." },
  { id: "bf-f7", spaceId: "brand-factory", name: "TikTok_Audience_Analysis.pptx", type: "pptx", size: "3.2 MB", lastModified: "Apr 18", uploadedBy: "marcus", tags: ["tiktok", "audience", "analysis"], summary: "Audience segmentation and performance data for TikTok campaigns." },
  { id: "bf-f8", spaceId: "brand-factory", name: "Monthly_Invoice_April.pdf", type: "pdf", size: "120 KB", lastModified: "Apr 1", uploadedBy: "anton", tags: ["invoice", "finance"], summary: "April invoice for Brand Factory: 187,500 SEK." },
  { id: "bf-f9", spaceId: "brand-factory", name: "Hero_Banner_Spring.png", type: "png", size: "4.8 MB", lastModified: "Apr 17", uploadedBy: "erik", tags: ["creative", "banner"], summary: "Hero banner for spring campaign, 1920x1080." },
  { id: "bf-f10", spaceId: "brand-factory", name: "Weekly_Report_W16.pdf", type: "pdf", size: "1.6 MB", lastModified: "Apr 18", uploadedBy: "anton", tags: ["report", "weekly"], summary: "Week 16 performance report with campaign metrics and recommendations." },

  // Svenska Spel
  { id: "ss-f1", spaceId: "svenska-spel", name: "Q2_Campaign_Brief.docx", type: "docx", size: "980 KB", lastModified: "Apr 11", uploadedBy: "johan", tags: ["brief", "campaign", "q2"], summary: "Approved Q2 digital campaign brief with compliance sign-off." },
  { id: "ss-f2", spaceId: "svenska-spel", name: "Compliance_Guidelines.pdf", type: "pdf", size: "5.4 MB", lastModified: "Mar 1", uploadedBy: "emma", tags: ["compliance", "legal", "guidelines"], summary: "Gambling advertising compliance guidelines for Swedish market." },
  { id: "ss-f3", spaceId: "svenska-spel", name: "March_Performance_Report.pdf", type: "pdf", size: "2.1 MB", lastModified: "Apr 5", uploadedBy: "anton", tags: ["report", "performance", "march"], summary: "March performance: 2.8x ROAS, CPA down 15%." },
  { id: "ss-f4", spaceId: "svenska-spel", name: "Keyword_Negative_List.xlsx", type: "xlsx", size: "45 KB", lastModified: "Apr 8", uploadedBy: "emma", tags: ["google", "compliance", "keywords"], summary: "Updated negative keyword list for Google Ads compliance." },
  { id: "ss-f5", spaceId: "svenska-spel", name: "Campaign_Documentation_Q1.pdf", type: "pdf", size: "3.8 MB", lastModified: "Apr 2", uploadedBy: "anton", tags: ["documentation", "audit", "q1"], summary: "Full campaign documentation for Q1 compliance audit." },
  { id: "ss-f6", spaceId: "svenska-spel", name: "Triss_Summer_Promo_Concept.pptx", type: "pptx", size: "8.2 MB", lastModified: "Apr 17", uploadedBy: "oscar", tags: ["triss", "summer", "concept"], summary: "Initial concept deck for Triss summer promotional campaign." },
  { id: "ss-f7", spaceId: "svenska-spel", name: "Media_Plan_Q2.xlsx", type: "xlsx", size: "720 KB", lastModified: "Apr 14", uploadedBy: "anton", tags: ["media", "planning", "q2"], summary: "Q2 media plan: 1.8M SEK across Google, Meta, display." },

  // Stellar Internal
  { id: "st-f1", spaceId: "stellar-internal", name: "Q2_OKR_Tracker.xlsx", type: "xlsx", size: "280 KB", lastModified: "Apr 18", uploadedBy: "sara", tags: ["okr", "q2", "strategy"], summary: "Company OKR tracking sheet for Q2 2026." },
  { id: "st-f2", spaceId: "stellar-internal", name: "Onboarding_Playbook.pdf", type: "pdf", size: "4.2 MB", lastModified: "Mar 15", uploadedBy: "lena", tags: ["hr", "onboarding"], summary: "New employee onboarding guide and checklist." },
  { id: "st-f3", spaceId: "stellar-internal", name: "Office_Move_Plan.docx", type: "docx", size: "1.4 MB", lastModified: "Apr 18", uploadedBy: "lena", tags: ["office", "logistics"], summary: "Birger Jarlsgatan office move timeline and task assignments." },
  { id: "st-f4", spaceId: "stellar-internal", name: "Senior_Designer_Job_Spec.pdf", type: "pdf", size: "180 KB", lastModified: "Apr 10", uploadedBy: "erik", tags: ["hiring", "design"], summary: "Job specification for Senior Designer role." },
  { id: "st-f5", spaceId: "stellar-internal", name: "Revenue_Forecast_2026.xlsx", type: "xlsx", size: "520 KB", lastModified: "Apr 12", uploadedBy: "sara", tags: ["finance", "forecast"], summary: "Revenue forecast showing path from 75 MSEK to 100 MSEK target." },
  { id: "st-f6", spaceId: "stellar-internal", name: "Team_Structure_2026.pptx", type: "pptx", size: "2.8 MB", lastModified: "Mar 28", uploadedBy: "lena", tags: ["team", "org"], summary: "Current and planned team structure across departments." },
  { id: "st-f7", spaceId: "stellar-internal", name: "All_Hands_April.pptx", type: "pptx", size: "6.1 MB", lastModified: "Apr 18", uploadedBy: "sara", tags: ["meeting", "allhands"], summary: "Presentation deck for April all-hands meeting." },
];

// ============================================================
// PROJECTS / TASKS
// ============================================================
export type TaskStatus = "backlog" | "in-progress" | "review" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assignee: string;
  deadline?: string;
  priority?: "low" | "medium" | "high";
}

export interface ProjectPhase {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "completed";
}

export interface Project {
  id: string;
  spaceId: string;
  title: string;
  status: "active" | "completed" | "archived";
  deadline: string;
  assignee: string;
  team: string[];
  description: string;
  tasks: Task[];
  phases: ProjectPhase[];
  budgetHours: number;
}

export const projects: Project[] = [
  // Brand Factory
  {
    id: "bf-proj-1", spaceId: "brand-factory", title: "Q3 Back-to-School Campaign", status: "active", deadline: "2026-07-15", assignee: "anton", team: ["anton", "erik", "sara", "marcus"],
    description: "Full campaign: creative, media planning, execution across Meta, Google, TikTok.",
    budgetHours: 180,
    phases: [
      { id: "bf-p1-ph1", title: "Brief & planning", startDate: "2026-04-14", endDate: "2026-04-28", status: "active" },
      { id: "bf-p1-ph2", title: "Creative production", startDate: "2026-04-28", endDate: "2026-05-20", status: "upcoming" },
      { id: "bf-p1-ph3", title: "Media setup", startDate: "2026-05-15", endDate: "2026-06-10", status: "upcoming" },
      { id: "bf-p1-ph4", title: "Campaign live", startDate: "2026-07-01", endDate: "2026-08-31", status: "upcoming" },
    ],
    tasks: [
      { id: "bf-t1", title: "Creative brief approval", status: "done", assignee: "erik", deadline: "2026-04-18", priority: "high" },
      { id: "bf-t2", title: "Media plan draft", status: "in-progress", assignee: "anton", deadline: "2026-04-25", priority: "high" },
      { id: "bf-t3", title: "TikTok creative concepts", status: "backlog", assignee: "erik", deadline: "2026-05-01", priority: "medium" },
      { id: "bf-t4", title: "Audience research TikTok", status: "in-progress", assignee: "marcus", deadline: "2026-04-22", priority: "medium" },
      { id: "bf-t5", title: "Budget allocation proposal", status: "review", assignee: "anton", deadline: "2026-04-20", priority: "high" },
    ],
  },
  {
    id: "bf-proj-2", spaceId: "brand-factory", title: "Spring Collection Launch", status: "active", deadline: "2026-04-19", assignee: "marcus", team: ["anton", "marcus", "erik"],
    description: "Spring campaign launch across Meta and Google. Final assets delivered, going live tomorrow.",
    budgetHours: 120,
    phases: [
      { id: "bf-p2-ph1", title: "Creative production", startDate: "2026-03-01", endDate: "2026-03-25", status: "completed" },
      { id: "bf-p2-ph2", title: "Campaign setup", startDate: "2026-03-25", endDate: "2026-04-05", status: "completed" },
      { id: "bf-p2-ph3", title: "Campaign live", startDate: "2026-04-01", endDate: "2026-05-31", status: "active" },
    ],
    tasks: [
      { id: "bf-t6", title: "Upload Meta assets", status: "in-progress", assignee: "marcus", deadline: "2026-04-18", priority: "high" },
      { id: "bf-t7", title: "Google Ads copy finalization", status: "done", assignee: "anton", priority: "medium" },
      { id: "bf-t8", title: "Landing page QA", status: "done", assignee: "david", priority: "high" },
      { id: "bf-t9", title: "Campaign launch monitoring", status: "backlog", assignee: "marcus", deadline: "2026-04-19", priority: "high" },
    ],
  },
  {
    id: "bf-proj-3", spaceId: "brand-factory", title: "Contract Renewal Q3", status: "active", deadline: "2026-06-30", assignee: "anton", team: ["anton", "linnea"],
    description: "Prepare and negotiate 12-month contract renewal with Brand Factory.",
    budgetHours: 40,
    phases: [
      { id: "bf-p3-ph1", title: "Performance summary", startDate: "2026-04-01", endDate: "2026-04-10", status: "completed" },
      { id: "bf-p3-ph2", title: "Proposal & negotiation", startDate: "2026-04-10", endDate: "2026-05-15", status: "active" },
      { id: "bf-p3-ph3", title: "Contract signing", startDate: "2026-05-15", endDate: "2026-06-30", status: "upcoming" },
    ],
    tasks: [
      { id: "bf-t10", title: "Performance summary document", status: "done", assignee: "anton", priority: "high" },
      { id: "bf-t11", title: "Renewal proposal draft", status: "in-progress", assignee: "anton", deadline: "2026-04-22", priority: "high" },
      { id: "bf-t12", title: "Pricing review with management", status: "backlog", assignee: "linnea", priority: "medium" },
    ],
  },

  // Svenska Spel
  {
    id: "ss-proj-1", spaceId: "svenska-spel", title: "Q2 Digital Campaign", status: "active", deadline: "2026-05-31", assignee: "anton", team: ["anton", "marcus", "oscar"],
    description: "Multi-channel digital campaign for Q2 with compliance-first approach.",
    budgetHours: 200,
    phases: [
      { id: "ss-p1-ph1", title: "Brief & compliance", startDate: "2026-03-15", endDate: "2026-04-11", status: "completed" },
      { id: "ss-p1-ph2", title: "Media planning", startDate: "2026-04-11", endDate: "2026-04-25", status: "active" },
      { id: "ss-p1-ph3", title: "Creative production", startDate: "2026-04-20", endDate: "2026-05-10", status: "upcoming" },
      { id: "ss-p1-ph4", title: "Campaign live", startDate: "2026-05-01", endDate: "2026-06-30", status: "upcoming" },
    ],
    tasks: [
      { id: "ss-t1", title: "Media plan approval", status: "in-progress", assignee: "anton", deadline: "2026-04-21", priority: "high" },
      { id: "ss-t2", title: "Ad copy compliance review", status: "backlog", assignee: "oscar", deadline: "2026-04-23", priority: "high" },
      { id: "ss-t3", title: "Creative production", status: "backlog", assignee: "erik", deadline: "2026-04-28", priority: "medium" },
    ],
  },
  {
    id: "ss-proj-2", spaceId: "svenska-spel", title: "Compliance Audit Prep", status: "active", deadline: "2026-04-25", assignee: "sara", team: ["anton", "sara", "emma"],
    description: "Prepare all documentation for quarterly compliance audit on April 28.",
    budgetHours: 60,
    phases: [
      { id: "ss-p2-ph1", title: "Document gathering", startDate: "2026-04-10", endDate: "2026-04-22", status: "active" },
      { id: "ss-p2-ph2", title: "Review & submission", startDate: "2026-04-22", endDate: "2026-04-28", status: "upcoming" },
    ],
    tasks: [
      { id: "ss-t4", title: "Gather campaign docs", status: "in-progress", assignee: "sara", deadline: "2026-04-22", priority: "high" },
      { id: "ss-t5", title: "Creative archive review", status: "backlog", assignee: "anton", deadline: "2026-04-24", priority: "medium" },
      { id: "ss-t6", title: "Targeting parameter export", status: "done", assignee: "marcus", priority: "medium" },
    ],
  },
  {
    id: "ss-proj-3", spaceId: "svenska-spel", title: "Triss Summer Promo Planning", status: "active", deadline: "2026-05-15", assignee: "anton", team: ["anton", "oscar", "erik"],
    description: "Planning phase for Triss summer promotional campaign. Budget: 2.5M SEK digital.",
    budgetHours: 80,
    phases: [
      { id: "ss-p3-ph1", title: "Client brief", startDate: "2026-04-20", endDate: "2026-05-01", status: "upcoming" },
      { id: "ss-p3-ph2", title: "Concept development", startDate: "2026-05-01", endDate: "2026-05-15", status: "upcoming" },
    ],
    tasks: [
      { id: "ss-t7", title: "Receive client brief", status: "backlog", assignee: "oscar", deadline: "2026-04-25", priority: "high" },
      { id: "ss-t8", title: "Initial concept development", status: "backlog", assignee: "erik", priority: "medium" },
    ],
  },

  // Stellar Internal
  {
    id: "st-proj-1", spaceId: "stellar-internal", title: "Hire Senior Designer", status: "active", deadline: "2026-05-15", assignee: "erik", team: ["erik", "lena"],
    description: "Recruit and onboard a Senior Designer to expand the creative team.",
    budgetHours: 50,
    phases: [
      { id: "st-p1-ph1", title: "Sourcing", startDate: "2026-03-15", endDate: "2026-04-10", status: "completed" },
      { id: "st-p1-ph2", title: "Interviews", startDate: "2026-04-10", endDate: "2026-05-05", status: "active" },
      { id: "st-p1-ph3", title: "Onboarding", startDate: "2026-05-05", endDate: "2026-05-30", status: "upcoming" },
    ],
    tasks: [
      { id: "st-t1", title: "Shortlist candidates", status: "done", assignee: "lena", priority: "high" },
      { id: "st-t2", title: "Prepare design task", status: "in-progress", assignee: "erik", deadline: "2026-04-19", priority: "high" },
      { id: "st-t3", title: "Schedule interviews", status: "backlog", assignee: "lena", deadline: "2026-04-22", priority: "medium" },
      { id: "st-t4", title: "Final decision", status: "backlog", assignee: "erik", deadline: "2026-05-05", priority: "high" },
    ],
  },
  {
    id: "st-proj-2", spaceId: "stellar-internal", title: "Office Move to Birger Jarlsgatan", status: "active", deadline: "2026-06-15", assignee: "lena", team: ["lena", "david", "sara"],
    description: "Coordinate full office relocation including IT, furniture, and client communications.",
    budgetHours: 100,
    phases: [
      { id: "st-p2-ph1", title: "Lease & contracts", startDate: "2026-03-01", endDate: "2026-04-15", status: "completed" },
      { id: "st-p2-ph2", title: "IT & furniture", startDate: "2026-04-15", endDate: "2026-05-30", status: "active" },
      { id: "st-p2-ph3", title: "Move week", startDate: "2026-06-08", endDate: "2026-06-19", status: "upcoming" },
    ],
    tasks: [
      { id: "st-t5", title: "Sign new lease", status: "done", assignee: "lena", priority: "high" },
      { id: "st-t6", title: "IT infrastructure plan", status: "in-progress", assignee: "david", deadline: "2026-04-30", priority: "high" },
      { id: "st-t7", title: "Client notification emails", status: "backlog", assignee: "sara", deadline: "2026-05-15", priority: "medium" },
      { id: "st-t8", title: "Furniture order", status: "backlog", assignee: "lena", deadline: "2026-05-01", priority: "medium" },
    ],
  },
  {
    id: "st-proj-3", spaceId: "stellar-internal", title: "Q2 OKR Review", status: "active", deadline: "2026-04-23", assignee: "sara", team: ["anton", "sara", "linnea"],
    description: "Mid-quarter OKR check-in and progress reporting.",
    budgetHours: 30,
    phases: [
      { id: "st-p3-ph1", title: "Data collection", startDate: "2026-04-14", endDate: "2026-04-20", status: "active" },
      { id: "st-p3-ph2", title: "Review & present", startDate: "2026-04-20", endDate: "2026-04-23", status: "upcoming" },
    ],
    tasks: [
      { id: "st-t9", title: "Collect team updates", status: "in-progress", assignee: "sara", deadline: "2026-04-20", priority: "high" },
      { id: "st-t10", title: "Revenue tracking analysis", status: "done", assignee: "anton", priority: "high" },
      { id: "st-t11", title: "Client retention report", status: "done", assignee: "linnea", priority: "medium" },
      { id: "st-t12", title: "Present to leadership", status: "backlog", assignee: "sara", deadline: "2026-04-23", priority: "high" },
    ],
  },
];

// ============================================================
// CALENDAR EVENTS
// ============================================================
export interface CalendarEvent {
  id: string;
  spaceId: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: string[];
  type: "meeting" | "deadline" | "reminder";
  notes?: string;
}

export const calendarEvents: CalendarEvent[] = [
  // Brand Factory
  { id: "bf-e1", spaceId: "brand-factory", title: "Weekly performance sync", date: "2026-04-21", startTime: "10:00", endTime: "10:45", participants: ["anton", "mikaela", "sara"], type: "meeting" },
  { id: "bf-e2", spaceId: "brand-factory", title: "Creative review: spring assets", date: "2026-04-22", startTime: "14:00", endTime: "15:00", participants: ["anton", "erik", "anna"], type: "meeting" },
  { id: "bf-e3", spaceId: "brand-factory", title: "Contract renewal call", date: "2026-04-22", startTime: "14:00", endTime: "15:00", participants: ["anton", "mikaela", "karl"], type: "meeting" },
  { id: "bf-e4", spaceId: "brand-factory", title: "Back-to-school brief deadline", date: "2026-04-25", startTime: "17:00", endTime: "17:00", participants: ["anton"], type: "deadline" },
  { id: "bf-e5", spaceId: "brand-factory", title: "Spring campaign launch", date: "2026-04-19", startTime: "06:00", endTime: "06:00", participants: ["marcus"], type: "deadline" },

  // Svenska Spel
  { id: "ss-e1", spaceId: "svenska-spel", title: "Johan Berg: Q2 strategy call", date: "2026-04-21", startTime: "11:00", endTime: "12:00", participants: ["anton", "johan"], type: "meeting" },
  { id: "ss-e2", spaceId: "svenska-spel", title: "Media plan delivery", date: "2026-04-21", startTime: "09:00", endTime: "09:00", participants: ["anton"], type: "deadline" },
  { id: "ss-e3", spaceId: "svenska-spel", title: "Compliance audit", date: "2026-04-28", startTime: "10:00", endTime: "12:00", participants: ["anton", "sara", "emma"], type: "meeting" },
  { id: "ss-e4", spaceId: "svenska-spel", title: "Triss promo kickoff", date: "2026-04-24", startTime: "13:00", endTime: "14:00", participants: ["anton", "oscar", "erik"], type: "meeting" },

  // Stellar Internal
  { id: "st-e1", spaceId: "stellar-internal", title: "All-hands meeting", date: "2026-04-19", startTime: "10:00", endTime: "11:00", participants: ["anton", "sara", "erik", "linnea", "lena", "david", "frida"], type: "meeting" },
  { id: "st-e2", spaceId: "stellar-internal", title: "OKR check-in", date: "2026-04-23", startTime: "09:00", endTime: "10:00", participants: ["anton", "sara", "linnea"], type: "meeting" },
  { id: "st-e3", spaceId: "stellar-internal", title: "Designer candidate interviews", date: "2026-04-23", startTime: "13:00", endTime: "16:00", participants: ["erik", "lena"], type: "meeting" },
  { id: "st-e4", spaceId: "stellar-internal", title: "Anton + Sara: weekly 1:1", date: "2026-04-21", startTime: "09:00", endTime: "09:30", participants: ["anton", "sara"], type: "meeting" },
  { id: "st-e5", spaceId: "stellar-internal", title: "IT planning: new office", date: "2026-04-22", startTime: "15:00", endTime: "16:00", participants: ["david", "lena"], type: "meeting" },
];

// ============================================================
// CAMPAIGNS
// ============================================================
export interface Campaign {
  id: string;
  spaceId: string;
  name: string;
  platform: "meta" | "google" | "tiktok";
  status: "active" | "paused" | "ended";
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  metrics: { impressions: number; clicks: number; ctr: number; conversions: number; cpa: number; roas: number };
  alerts: { type: "warning" | "info"; message: string; date: string }[];
}

export const campaigns: Campaign[] = [
  // Brand Factory
  { id: "bf-c1", spaceId: "brand-factory", name: "Q2 Spring Collection Launch", platform: "meta", status: "active", startDate: "2026-04-01", endDate: "2026-05-31", budget: 450000, spent: 287000, metrics: { impressions: 2840000, clicks: 48000, ctr: 1.69, conversions: 1240, cpa: 231, roas: 3.4 }, alerts: [{ type: "warning", message: "CTR dropped 12% in last 3 days", date: "2026-04-17" }] },
  { id: "bf-c2", spaceId: "brand-factory", name: "Spring Brand Search", platform: "google", status: "active", startDate: "2026-04-01", endDate: "2026-05-31", budget: 280000, spent: 156000, metrics: { impressions: 890000, clicks: 67000, ctr: 7.53, conversions: 2100, cpa: 74, roas: 5.2 }, alerts: [] },
  { id: "bf-c3", spaceId: "brand-factory", name: "TikTok Spring Test", platform: "tiktok", status: "paused", startDate: "2026-04-05", endDate: "2026-04-30", budget: 120000, spent: 48000, metrics: { impressions: 1200000, clicks: 4800, ctr: 0.4, conversions: 95, cpa: 505, roas: 0.8 }, alerts: [{ type: "warning", message: "CPA 3x above target, campaign paused", date: "2026-04-18" }] },
  { id: "bf-c4", spaceId: "brand-factory", name: "Winter Sale Wrap-Up", platform: "meta", status: "ended", startDate: "2026-01-15", endDate: "2026-02-28", budget: 380000, spent: 372000, metrics: { impressions: 4100000, clicks: 82000, ctr: 2.0, conversions: 3200, cpa: 116, roas: 4.1 }, alerts: [] },

  // Svenska Spel
  { id: "ss-c1", spaceId: "svenska-spel", name: "Q2 Awareness Campaign", platform: "meta", status: "active", startDate: "2026-04-01", endDate: "2026-06-30", budget: 800000, spent: 312000, metrics: { impressions: 5200000, clicks: 78000, ctr: 1.5, conversions: 1850, cpa: 169, roas: 2.8 }, alerts: [] },
  { id: "ss-c2", spaceId: "svenska-spel", name: "Search Performance", platform: "google", status: "active", startDate: "2026-04-01", endDate: "2026-06-30", budget: 600000, spent: 245000, metrics: { impressions: 1100000, clicks: 92000, ctr: 8.36, conversions: 2800, cpa: 88, roas: 3.1 }, alerts: [] },
  { id: "ss-c3", spaceId: "svenska-spel", name: "Q1 Lottery Promo", platform: "meta", status: "ended", startDate: "2026-01-01", endDate: "2026-03-31", budget: 950000, spent: 940000, metrics: { impressions: 8900000, clicks: 142000, ctr: 1.6, conversions: 4100, cpa: 229, roas: 2.4 }, alerts: [{ type: "info", message: "Two creatives flagged by compliance (resolved)", date: "2026-03-15" }] },
];

// ============================================================
// INVOICES
// ============================================================
export interface Invoice {
  id: string;
  spaceId: string;
  number: string;
  recipient: string;
  amount: number;
  status: "draft" | "sent" | "paid" | "overdue";
  dueDate: string;
  issuedDate: string;
  lineItems: { description: string; amount: number }[];
}

export const invoices: Invoice[] = [
  { id: "bf-inv-1", spaceId: "brand-factory", number: "INV-2026-041", recipient: "Brand Factory AB", amount: 187500, status: "sent", dueDate: "2026-04-23", issuedDate: "2026-04-01", lineItems: [{ description: "Performance marketing management", amount: 95000 }, { description: "Creative production", amount: 45000 }, { description: "Media buying fee", amount: 47500 }] },
  { id: "bf-inv-2", spaceId: "brand-factory", number: "INV-2026-031", recipient: "Brand Factory AB", amount: 175000, status: "paid", dueDate: "2026-03-25", issuedDate: "2026-03-01", lineItems: [{ description: "Performance marketing management", amount: 95000 }, { description: "Creative production", amount: 35000 }, { description: "Media buying fee", amount: 45000 }] },
  { id: "bf-inv-3", spaceId: "brand-factory", number: "INV-2026-021", recipient: "Brand Factory AB", amount: 175000, status: "paid", dueDate: "2026-02-25", issuedDate: "2026-02-01", lineItems: [{ description: "Performance marketing management", amount: 95000 }, { description: "Creative production", amount: 35000 }, { description: "Media buying fee", amount: 45000 }] },
  { id: "ss-inv-1", spaceId: "svenska-spel", number: "INV-2026-042", recipient: "Svenska Spel AB", amount: 245000, status: "sent", dueDate: "2026-04-30", issuedDate: "2026-04-01", lineItems: [{ description: "Digital campaign management", amount: 120000 }, { description: "Media buying fee", amount: 85000 }, { description: "Compliance review hours", amount: 40000 }] },
  { id: "ss-inv-2", spaceId: "svenska-spel", number: "INV-2026-032", recipient: "Svenska Spel AB", amount: 230000, status: "paid", dueDate: "2026-03-30", issuedDate: "2026-03-01", lineItems: [{ description: "Digital campaign management", amount: 120000 }, { description: "Media buying fee", amount: 75000 }, { description: "Compliance review hours", amount: 35000 }] },
];

// ============================================================
// REPORTS
// ============================================================
export interface Report {
  id: string;
  spaceId: string;
  title: string;
  type: "weekly" | "monthly" | "custom";
  status: "draft" | "published" | "scheduled";
  lastUpdated: string;
  dateRange: string;
}

export const reports: Report[] = [
  { id: "bf-r1", spaceId: "brand-factory", title: "Week 16 Performance Report", type: "weekly", status: "draft", lastUpdated: "Apr 18", dateRange: "Apr 14 - Apr 18" },
  { id: "bf-r2", spaceId: "brand-factory", title: "March Monthly Report", type: "monthly", status: "published", lastUpdated: "Apr 3", dateRange: "Mar 1 - Mar 31" },
  { id: "bf-r3", spaceId: "brand-factory", title: "Q1 Performance Summary", type: "custom", status: "published", lastUpdated: "Apr 5", dateRange: "Jan 1 - Mar 31" },
  { id: "ss-r1", spaceId: "svenska-spel", title: "Week 16 Performance Report", type: "weekly", status: "draft", lastUpdated: "Apr 18", dateRange: "Apr 14 - Apr 18" },
  { id: "ss-r2", spaceId: "svenska-spel", title: "March Monthly Report", type: "monthly", status: "published", lastUpdated: "Apr 4", dateRange: "Mar 1 - Mar 31" },
  { id: "st-r1", spaceId: "stellar-internal", title: "Q2 OKR Progress", type: "custom", status: "draft", lastUpdated: "Apr 18", dateRange: "Apr 1 - Apr 18" },
  { id: "st-r2", spaceId: "stellar-internal", title: "Revenue Tracking Q2", type: "monthly", status: "published", lastUpdated: "Apr 15", dateRange: "Apr 1 - Apr 15" },
];

// ============================================================
// PULSE BRIEFINGS (static for initial load, agent generates live later)
// ============================================================
export const pulseBriefings: Record<string, string> = {
  "brand-factory": "Brand Factory's Q2 campaign is on track, with 3.4x ROAS on the spring collection launch across Meta. Mikaela approved the back-to-school brief on Wednesday and Erik has started on creative concepts. The TikTok test campaign underperformed at 0.4% CTR, Marcus is pulling audience data to inform the Q3 approach. The contract renewal conversation has started quietly via email, Karl and Mikaela both seem positive. Worth preparing a formal proposal this week. The April invoice (187,500 SEK) is due in 5 days and still outstanding, a gentle nudge might help. Spring campaign assets are finalized and going live tomorrow at 06:00.",

  "svenska-spel": "Svenska Spel's Q2 campaign is approved and in media planning, with compliance sign-off from Emma on all messaging. Google Ads performing well at 3.1x ROAS after keyword optimizations. The quarterly compliance audit is April 28, Sara is gathering documentation. Oscar flagged a new Triss summer promo opportunity: 2.5M SEK digital budget, brief expected next week. Compliance will be tight on lottery products. Overall account health is strong, the relationship is in a good place after the positive March performance review.",

  "stellar-internal": "Stellar's Q2 is tracking at 82% of revenue target. Brand Factory renewal is the swing deal. The all-hands meeting is tomorrow at 10:00, Sara has the agenda ready. Three final candidates are lined up for the Senior Designer role, interviews next week. The Birger Jarlsgatan office move is confirmed for June 15, David is handling IT infrastructure. The OKR check-in is Wednesday, team updates look solid. Linnea has a promising new lead at Nordic Logistics worth pursuing. Two open items: office furniture order needs to go out by May 1, and the Q2 revenue forecast needs updating with the latest pipeline data.",
};

// ============================================================
// HELPERS
// ============================================================
export function getSpaceById(id: string) {
  return spaces.find((s) => s.id === id);
}

export function getConversationsBySpace(spaceId: string) {
  return conversations.filter((c) => c.spaceId === spaceId);
}

export function getFilesBySpace(spaceId: string) {
  return files.filter((f) => f.spaceId === spaceId);
}

export function getProjectsBySpace(spaceId: string) {
  return projects.filter((p) => p.spaceId === spaceId);
}

export function getEventsBySpace(spaceId: string) {
  return calendarEvents.filter((e) => e.spaceId === spaceId);
}

export function getCampaignsBySpace(spaceId: string) {
  return campaigns.filter((c) => c.spaceId === spaceId);
}

export function getInvoicesBySpace(spaceId: string) {
  return invoices.filter((i) => i.spaceId === spaceId);
}

export function getReportsBySpace(spaceId: string) {
  return reports.filter((r) => r.spaceId === spaceId);
}

// ============================================================
// CRM: CONTACTS, COMPANIES, DEALS, INTERACTIONS
// ============================================================
export interface CrmCompany {
  id: string;
  spaceId: string;
  name: string;
  industry: string;
  size: string;
  website: string;
}

export interface CrmContact {
  id: string;
  spaceId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  companyId: string;
  lastInteraction: string;
}

export type DealStage = "lead" | "qualified" | "proposal" | "negotiation" | "closed-won" | "closed-lost";

export interface CrmDeal {
  id: string;
  spaceId: string;
  title: string;
  value: number;
  stage: DealStage;
  contactId: string;
  companyId: string;
  probability: number;
  closeDate: string;
}

export interface CrmInteraction {
  id: string;
  spaceId: string;
  contactId: string;
  type: "call" | "email" | "meeting" | "note";
  date: string;
  summary: string;
}

export const crmCompanies: CrmCompany[] = [
  { id: "co-bf", spaceId: "brand-factory", name: "Brand Factory AB", industry: "Retail", size: "150+ stores, ~800 employees", website: "brandfactory.se" },
  { id: "co-ss", spaceId: "svenska-spel", name: "Svenska Spel AB", industry: "Gaming / Lottery", size: "1,600 employees", website: "svenskaspel.se" },
  { id: "co-nl", spaceId: "brand-factory", name: "Nordic Logistics AB", industry: "Logistics", size: "~200 employees", website: "nordiclogistics.se" },
  { id: "co-stellar", spaceId: "stellar-internal", name: "Stellar AB", industry: "Digital Agency", size: "~50 employees", website: "stellar.se" },
];

export const crmContacts: CrmContact[] = [
  // Brand Factory
  { id: "ct-mikaela", spaceId: "brand-factory", name: "Mikaela Andersson", email: "mikaela@brandfactory.se", phone: "+46 70 123 4567", role: "Marketing Director", companyId: "co-bf", lastInteraction: "Apr 16" },
  { id: "ct-karl", spaceId: "brand-factory", name: "Karl Persson", email: "karl@brandfactory.se", phone: "+46 70 234 5678", role: "CFO", companyId: "co-bf", lastInteraction: "Apr 14" },
  { id: "ct-anna", spaceId: "brand-factory", name: "Anna Hedberg", email: "anna@brandfactory.se", phone: "+46 70 345 6789", role: "Brand Manager", companyId: "co-bf", lastInteraction: "Apr 17" },
  { id: "ct-john-nl", spaceId: "brand-factory", name: "John Eriksson", email: "john@nordiclogistics.se", phone: "+46 70 456 7890", role: "Head of Marketing", companyId: "co-nl", lastInteraction: "Apr 10" },

  // Svenska Spel
  { id: "ct-johan", spaceId: "svenska-spel", name: "Johan Berg", email: "johan.berg@svenskaspel.se", phone: "+46 70 567 8901", role: "Digital Marketing Lead", companyId: "co-ss", lastInteraction: "Apr 15" },
  { id: "ct-emma", spaceId: "svenska-spel", name: "Emma Wikström", email: "emma.wikstrom@svenskaspel.se", phone: "+46 70 678 9012", role: "Compliance Officer", companyId: "co-ss", lastInteraction: "Apr 15" },
  { id: "ct-oscar", spaceId: "svenska-spel", name: "Oscar Nilsson", email: "oscar.nilsson@svenskaspel.se", phone: "+46 70 789 0123", role: "Campaign Manager", companyId: "co-ss", lastInteraction: "Apr 17" },

  // Stellar Internal
  { id: "ct-sara-int", spaceId: "stellar-internal", name: "Sara Lindqvist", email: "sara@stellar.se", phone: "+46 70 111 2222", role: "Senior Strategist", companyId: "co-stellar", lastInteraction: "Apr 18" },
  { id: "ct-erik-int", spaceId: "stellar-internal", name: "Erik Johansson", email: "erik@stellar.se", phone: "+46 70 333 4444", role: "Creative Director", companyId: "co-stellar", lastInteraction: "Apr 16" },
  { id: "ct-lena-int", spaceId: "stellar-internal", name: "Lena Sandberg", email: "lena@stellar.se", phone: "+46 70 555 6666", role: "HR Manager", companyId: "co-stellar", lastInteraction: "Apr 18" },
];

export const crmDeals: CrmDeal[] = [
  // Brand Factory
  { id: "dl-bf-1", spaceId: "brand-factory", title: "12-month contract renewal", value: 2250000, stage: "negotiation", contactId: "ct-mikaela", companyId: "co-bf", probability: 80, closeDate: "2026-06-30" },
  { id: "dl-bf-2", spaceId: "brand-factory", title: "Q3 Back-to-school campaign", value: 850000, stage: "proposal", contactId: "ct-mikaela", companyId: "co-bf", probability: 90, closeDate: "2026-05-01" },
  { id: "dl-bf-3", spaceId: "brand-factory", title: "Nordic Logistics intro", value: 480000, stage: "lead", contactId: "ct-john-nl", companyId: "co-nl", probability: 20, closeDate: "2026-07-15" },

  // Svenska Spel
  { id: "dl-ss-1", spaceId: "svenska-spel", title: "Triss summer promo", value: 2500000, stage: "qualified", contactId: "ct-oscar", companyId: "co-ss", probability: 60, closeDate: "2026-05-15" },
  { id: "dl-ss-2", spaceId: "svenska-spel", title: "Q3 campaign extension", value: 1800000, stage: "lead", contactId: "ct-johan", companyId: "co-ss", probability: 30, closeDate: "2026-08-01" },

  // Stellar Internal
  { id: "dl-st-1", spaceId: "stellar-internal", title: "Senior Designer hire", value: 0, stage: "negotiation", contactId: "ct-erik-int", companyId: "co-stellar", probability: 70, closeDate: "2026-05-15" },
];

export const crmInteractions: CrmInteraction[] = [
  // Brand Factory
  { id: "int-1", spaceId: "brand-factory", contactId: "ct-mikaela", type: "email", date: "2026-04-16", summary: "Discussed back-to-school brief. Budget confirmed at +15% vs last year." },
  { id: "int-2", spaceId: "brand-factory", contactId: "ct-mikaela", type: "meeting", date: "2026-04-14", summary: "Weekly performance sync. ROAS at 3.4x, TikTok paused." },
  { id: "int-3", spaceId: "brand-factory", contactId: "ct-karl", type: "email", date: "2026-04-14", summary: "Payment terms discussion. Karl requests net-45 for May invoice." },
  { id: "int-4", spaceId: "brand-factory", contactId: "ct-mikaela", type: "call", date: "2026-04-03", summary: "Contract renewal first conversation. Positive signals from board." },
  { id: "int-5", spaceId: "brand-factory", contactId: "ct-anna", type: "email", date: "2026-04-17", summary: "Creative review feedback on spring assets. Logo fix + square crops needed." },
  { id: "int-6", spaceId: "brand-factory", contactId: "ct-john-nl", type: "email", date: "2026-04-10", summary: "Introduction email. John interested in collaboration, low priority." },

  // Svenska Spel
  { id: "int-7", spaceId: "svenska-spel", contactId: "ct-johan", type: "meeting", date: "2026-04-15", summary: "March performance review. 2.8x ROAS, recommended Google budget increase." },
  { id: "int-8", spaceId: "svenska-spel", contactId: "ct-emma", type: "email", date: "2026-04-15", summary: "Compliance audit reminder for April 28. Documentation needed by April 25." },
  { id: "int-9", spaceId: "svenska-spel", contactId: "ct-oscar", type: "email", date: "2026-04-17", summary: "Triss summer promo brief incoming. 2.5M SEK digital budget, 60% brand 40% DR." },
  { id: "int-10", spaceId: "svenska-spel", contactId: "ct-emma", type: "email", date: "2026-04-11", summary: "Google Ads cleared with updated negative keyword list. 48h compliance turnaround." },
  { id: "int-11", spaceId: "svenska-spel", contactId: "ct-johan", type: "email", date: "2026-04-11", summary: "Q2 campaign brief approved. Compliance signed off." },

  // Stellar Internal
  { id: "int-12", spaceId: "stellar-internal", contactId: "ct-lena-int", type: "note", date: "2026-04-18", summary: "Office move lease signed. Move date June 15. Task force needed." },
  { id: "int-13", spaceId: "stellar-internal", contactId: "ct-erik-int", type: "email", date: "2026-04-16", summary: "Design task for candidates being prepared. Ready by Friday." },
  { id: "int-14", spaceId: "stellar-internal", contactId: "ct-sara-int", type: "meeting", date: "2026-04-18", summary: "All-hands agenda finalized. Q2 progress, new wins, office move, creative expansion." },
];

// ============================================================
// CHAT CHANNELS & MESSAGES
// ============================================================
export interface ChatChannel {
  id: string;
  spaceId: string;
  name: string;
  participants: string[];
  lastMessage: string;
  lastActivity: string;
  unread: number;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  from: string;
  timestamp: string;
  content: string;
}

export const chatChannels: ChatChannel[] = [
  // Brand Factory
  { id: "ch-bf-general", spaceId: "brand-factory", name: "general", participants: ["anton", "mikaela", "erik", "sara", "marcus"], lastMessage: "Spring campaign going live tomorrow", lastActivity: "2 hours ago", unread: 0 },
  { id: "ch-bf-creative", spaceId: "brand-factory", name: "creative", participants: ["erik", "anna", "anton", "frida"], lastMessage: "Square crops uploaded", lastActivity: "3 hours ago", unread: 2 },
  { id: "ch-bf-finance", spaceId: "brand-factory", name: "finance", participants: ["anton", "karl", "linnea"], lastMessage: "Net-45 terms, checking with finance", lastActivity: "1 day ago", unread: 0 },

  // Svenska Spel
  { id: "ch-ss-general", spaceId: "svenska-spel", name: "general", participants: ["anton", "johan", "oscar", "emma", "sara"], lastMessage: "Compliance audit prep on track", lastActivity: "4 hours ago", unread: 1 },
  { id: "ch-ss-campaigns", spaceId: "svenska-spel", name: "campaigns", participants: ["anton", "oscar", "marcus"], lastMessage: "Triss brief expected next week", lastActivity: "5 hours ago", unread: 0 },

  // Stellar Internal
  { id: "ch-st-general", spaceId: "stellar-internal", name: "general", participants: ["anton", "sara", "erik", "linnea", "lena", "david", "frida"], lastMessage: "All-hands tomorrow 10:00", lastActivity: "1 hour ago", unread: 3 },
  { id: "ch-st-hiring", spaceId: "stellar-internal", name: "hiring", participants: ["erik", "lena", "anton"], lastMessage: "Design task ready by Friday", lastActivity: "2 days ago", unread: 0 },
  { id: "ch-st-office-move", spaceId: "stellar-internal", name: "office-move", participants: ["lena", "david", "sara", "anton"], lastMessage: "IT needs access by June 1", lastActivity: "5 hours ago", unread: 1 },
];

export const chatMessages: ChatMessage[] = [
  // Brand Factory #general
  { id: "cm-1", channelId: "ch-bf-general", from: "anton", timestamp: "2026-04-18T14:00:00", content: "Spring campaign going live tomorrow at 06:00. Marcus is handling the Meta upload tonight." },
  { id: "cm-2", channelId: "ch-bf-general", from: "marcus", timestamp: "2026-04-18T14:10:00", content: "All assets are ready. Will push at 22:00 so everything is reviewed by morning." },
  { id: "cm-3", channelId: "ch-bf-general", from: "sara", timestamp: "2026-04-18T14:25:00", content: "Do we have the Google Ads copy finalized too?" },
  { id: "cm-4", channelId: "ch-bf-general", from: "anton", timestamp: "2026-04-18T14:30:00", content: "Yes, finalized yesterday. Both search and display variants." },
  { id: "cm-5", channelId: "ch-bf-general", from: "mikaela", timestamp: "2026-04-18T14:45:00", content: "Great work team. Looking forward to seeing the results next week." },
  { id: "cm-6", channelId: "ch-bf-general", from: "erik", timestamp: "2026-04-18T15:00:00", content: "I'll be monitoring the creative performance closely the first 48h. Will flag if we need to swap any variants." },

  // Brand Factory #creative
  { id: "cm-7", channelId: "ch-bf-creative", from: "erik", timestamp: "2026-04-17T16:00:00", content: "Square crops for Instagram Stories are done. Check the shared folder." },
  { id: "cm-8", channelId: "ch-bf-creative", from: "anna", timestamp: "2026-04-17T16:30:00", content: "These look great! The lifestyle shots especially." },
  { id: "cm-9", channelId: "ch-bf-creative", from: "frida", timestamp: "2026-04-18T09:00:00", content: "Should I start on the TikTok-native variants for back-to-school?" },
  { id: "cm-10", channelId: "ch-bf-creative", from: "erik", timestamp: "2026-04-18T09:15:00", content: "Not yet, let's wait for the audience analysis from Marcus first. Should be ready by EOD." },

  // Svenska Spel #general
  { id: "cm-11", channelId: "ch-ss-general", from: "anton", timestamp: "2026-04-18T10:00:00", content: "Compliance audit prep update: targeting parameters exported, campaign docs still being gathered." },
  { id: "cm-12", channelId: "ch-ss-general", from: "sara", timestamp: "2026-04-18T10:30:00", content: "I'm on it. Should have everything compiled by Tuesday." },
  { id: "cm-13", channelId: "ch-ss-general", from: "emma", timestamp: "2026-04-18T11:00:00", content: "Reminder: all ad copy variants need to be included in the documentation package." },
  { id: "cm-14", channelId: "ch-ss-general", from: "anton", timestamp: "2026-04-18T11:15:00", content: "Noted. We'll include the full creative archive." },

  // Stellar #general
  { id: "cm-15", channelId: "ch-st-general", from: "sara", timestamp: "2026-04-18T10:00:00", content: "All-hands is tomorrow at 10:00. Agenda posted in #general on Notion." },
  { id: "cm-16", channelId: "ch-st-general", from: "anton", timestamp: "2026-04-18T10:15:00", content: "My Q2 section is ready. Revenue at 82%, Brand Factory renewal is the swing deal." },
  { id: "cm-17", channelId: "ch-st-general", from: "linnea", timestamp: "2026-04-18T10:30:00", content: "New business update: Nordic Logistics intro went well. Following up next week." },
  { id: "cm-18", channelId: "ch-st-general", from: "lena", timestamp: "2026-04-18T11:00:00", content: "Office move update: lease is signed, move date June 15. Need IT access by June 1." },
  { id: "cm-19", channelId: "ch-st-general", from: "david", timestamp: "2026-04-18T11:15:00", content: "I'll need at least 2 weeks for network setup. Will create a detailed plan by end of month." },

  // Stellar #office-move
  { id: "cm-20", channelId: "ch-st-office-move", from: "lena", timestamp: "2026-04-18T07:00:00", content: "New lease signed for Birger Jarlsgatan. Move date confirmed: June 15." },
  { id: "cm-21", channelId: "ch-st-office-move", from: "david", timestamp: "2026-04-18T07:30:00", content: "How many network drops do we need? Current office has 48." },
  { id: "cm-22", channelId: "ch-st-office-move", from: "lena", timestamp: "2026-04-18T08:00:00", content: "Plan for 60 to have room for growth. The new space is 20% larger." },
  { id: "cm-23", channelId: "ch-st-office-move", from: "sara", timestamp: "2026-04-18T08:30:00", content: "I'll draft the client notification emails. When should we send them?" },
];

// ============================================================
// TIME TRACKING
// ============================================================
export interface TimeEntry {
  id: string;
  spaceId: string;
  projectId: string;
  taskId?: string;
  personId: string;
  date: string;
  minutes: number;
  description: string;
}

export interface SpaceSettings {
  spaceId: string;
  hourlyRate: number;
  currency: string;
}

export const spaceSettings: SpaceSettings[] = [
  { spaceId: "brand-factory", hourlyRate: 1200, currency: "SEK" },
  { spaceId: "svenska-spel", hourlyRate: 1350, currency: "SEK" },
  { spaceId: "stellar-internal", hourlyRate: 0, currency: "SEK" },
];

export const timeEntries: TimeEntry[] = [
  // Brand Factory - Q3 Campaign
  { id: "te-1", spaceId: "brand-factory", projectId: "bf-proj-1", taskId: "bf-t1", personId: "erik", date: "2026-04-15", minutes: 180, description: "Creative brief drafting" },
  { id: "te-2", spaceId: "brand-factory", projectId: "bf-proj-1", taskId: "bf-t2", personId: "anton", date: "2026-04-16", minutes: 120, description: "Media plan research" },
  { id: "te-3", spaceId: "brand-factory", projectId: "bf-proj-1", taskId: "bf-t4", personId: "marcus", date: "2026-04-17", minutes: 240, description: "TikTok audience analysis" },
  { id: "te-4", spaceId: "brand-factory", projectId: "bf-proj-1", taskId: "bf-t5", personId: "anton", date: "2026-04-18", minutes: 90, description: "Budget allocation draft" },
  { id: "te-5", spaceId: "brand-factory", projectId: "bf-proj-1", taskId: "bf-t2", personId: "anton", date: "2026-04-18", minutes: 150, description: "Media plan draft continued" },

  // Brand Factory - Spring Collection
  { id: "te-6", spaceId: "brand-factory", projectId: "bf-proj-2", personId: "marcus", date: "2026-04-17", minutes: 120, description: "Meta campaign setup" },
  { id: "te-7", spaceId: "brand-factory", projectId: "bf-proj-2", personId: "erik", date: "2026-04-16", minutes: 300, description: "Final asset production" },
  { id: "te-8", spaceId: "brand-factory", projectId: "bf-proj-2", personId: "anton", date: "2026-04-15", minutes: 90, description: "Google Ads copy writing" },
  { id: "te-9", spaceId: "brand-factory", projectId: "bf-proj-2", personId: "marcus", date: "2026-04-18", minutes: 60, description: "Campaign launch prep" },

  // Brand Factory - Contract Renewal
  { id: "te-10", spaceId: "brand-factory", projectId: "bf-proj-3", personId: "anton", date: "2026-04-04", minutes: 180, description: "Performance summary document" },
  { id: "te-11", spaceId: "brand-factory", projectId: "bf-proj-3", personId: "anton", date: "2026-04-18", minutes: 120, description: "Renewal proposal drafting" },

  // Svenska Spel
  { id: "te-12", spaceId: "svenska-spel", projectId: "ss-proj-1", personId: "anton", date: "2026-04-14", minutes: 180, description: "Media plan development" },
  { id: "te-13", spaceId: "svenska-spel", projectId: "ss-proj-1", personId: "marcus", date: "2026-04-15", minutes: 120, description: "Channel budget allocation" },
  { id: "te-14", spaceId: "svenska-spel", projectId: "ss-proj-2", personId: "sara", date: "2026-04-16", minutes: 240, description: "Campaign documentation gathering" },
  { id: "te-15", spaceId: "svenska-spel", projectId: "ss-proj-2", personId: "marcus", date: "2026-04-15", minutes: 90, description: "Targeting parameter export" },
  { id: "te-16", spaceId: "svenska-spel", projectId: "ss-proj-2", personId: "anton", date: "2026-04-18", minutes: 60, description: "Creative archive review planning" },

  // Stellar Internal
  { id: "te-17", spaceId: "stellar-internal", projectId: "st-proj-1", personId: "lena", date: "2026-04-10", minutes: 180, description: "Candidate shortlisting" },
  { id: "te-18", spaceId: "stellar-internal", projectId: "st-proj-1", personId: "erik", date: "2026-04-17", minutes: 120, description: "Design task preparation" },
  { id: "te-19", spaceId: "stellar-internal", projectId: "st-proj-2", personId: "lena", date: "2026-04-15", minutes: 240, description: "Lease negotiation finalization" },
  { id: "te-20", spaceId: "stellar-internal", projectId: "st-proj-2", personId: "david", date: "2026-04-18", minutes: 180, description: "IT infrastructure planning" },
  { id: "te-21", spaceId: "stellar-internal", projectId: "st-proj-3", personId: "sara", date: "2026-04-17", minutes: 120, description: "OKR data collection" },
  { id: "te-22", spaceId: "stellar-internal", projectId: "st-proj-3", personId: "anton", date: "2026-04-16", minutes: 90, description: "Revenue tracking analysis" },
  { id: "te-23", spaceId: "stellar-internal", projectId: "st-proj-3", personId: "linnea", date: "2026-04-17", minutes: 60, description: "Client retention report" },
];

// ============================================================
// NEW HELPERS
// ============================================================
export function getContactsBySpace(spaceId: string) { return crmContacts.filter((c) => c.spaceId === spaceId); }
export function getCompaniesBySpace(spaceId: string) { return crmCompanies.filter((c) => c.spaceId === spaceId); }
export function getDealsBySpace(spaceId: string) { return crmDeals.filter((d) => d.spaceId === spaceId); }
export function getInteractionsByContact(contactId: string) { return crmInteractions.filter((i) => i.contactId === contactId); }
export function getInteractionsBySpace(spaceId: string) { return crmInteractions.filter((i) => i.spaceId === spaceId); }
export function getChatChannelsBySpace(spaceId: string) { return chatChannels.filter((c) => c.spaceId === spaceId); }
export function getChatMessagesByChannel(channelId: string) { return chatMessages.filter((m) => m.channelId === channelId); }
export function getTimeEntriesByProject(projectId: string) { return timeEntries.filter((t) => t.projectId === projectId); }
export function getTimeEntriesBySpace(spaceId: string) { return timeEntries.filter((t) => t.spaceId === spaceId); }
export function getSpaceSettings(spaceId: string) { return spaceSettings.find((s) => s.spaceId === spaceId); }
