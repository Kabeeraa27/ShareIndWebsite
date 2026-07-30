import {
  LayoutDashboard,
  LineChart,
  FileBarChart,
  FolderOpen,
  Sparkles,
  IdCard,
  Plug,
  Users,
  Settings,
  type LucideIcon,
} from "lucide-react";

/**
 * A single feature = a single tile on the cube's front face (3x3 grid, 9 tiles).
 * `gridIndex` maps to the sticker grid position: 0-2 top row, 3-5 middle, 6-8 bottom
 * (left -> right within each row), matching how the cube builds its front face.
 */
export interface Feature {
  id: string;
  gridIndex: number;
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  icon: LucideIcon;
  /** Accent color used for the tile glow, icon tint, and panel theming. */
  color: string;
  glowColor: string;
  /** When set, the panel's CTA navigates here instead of being a dead button. */
  href?: string;
}

export const features: Feature[] = [
  {
    id: "dashboard",
    gridIndex: 0,
    name: "Dashboard",
    tagline: "Your entire portfolio, one glance away",
    description:
      "A unified command center that surfaces your holdings, watchlists, and market movers in real time, so you always know where you stand before the bell rings.",
    benefits: [
      "Live portfolio valuation with P&L breakdowns",
      "Customizable widgets and layouts",
      "Cross-device sync in real time",
    ],
    icon: LayoutDashboard,
    color: "#3b82f6",
    glowColor: "rgba(59,130,246,0.65)",
  },
  {
    id: "analytics",
    gridIndex: 1,
    name: "Analytics",
    tagline: "Data that trades with you",
    description:
      "Institutional-grade charting and technical analysis tools, powered by low-latency market data feeds, built for traders who act on signal, not noise.",
    benefits: [
      "100+ technical indicators & overlays",
      "Custom scripting for strategy backtests",
      "Millisecond-accurate historical data",
    ],
    icon: LineChart,
    color: "#22d3ee",
    glowColor: "rgba(34,211,238,0.65)",
  },
  {
    id: "account-reports",
    gridIndex: 2,
    name: "Account Reports",
    tagline: "Clarity, delivered automatically",
    description:
      "Automated tax statements, contract notes, and performance reports generated the moment you need them, exportable in the formats your accountant loves.",
    benefits: [
      "One-click annual tax summaries",
      "Custom date-range performance reports",
      "Export to PDF, CSV, or Excel",
    ],
    icon: FileBarChart,
    color: "#a855f7",
    glowColor: "rgba(168,85,247,0.65)",
  },
  {
    id: "ai-assistant",
    gridIndex: 3,
    name: "AI Assistant",
    tagline: "Your co-pilot for every market move",
    description:
      "An always-on AI research analyst that reads filings, summarizes earnings calls, and flags portfolio risk before it becomes a headline.",
    benefits: [
      "Natural-language portfolio queries",
      "Instant earnings & filing summaries",
      "Proactive risk & anomaly alerts",
    ],
    icon: Sparkles,
    color: "#ec4899",
    glowColor: "rgba(236,72,153,0.65)",
  },
  {
    id: "our-team",
    gridIndex: 4,
    name: "Our Team",
    tagline: "The analysts behind the research",
    description:
      "Meet the research desk: sector specialists who cover the ground so you don't have to, from first read-through to the final call.",
    benefits: [
      "Dedicated analysts per sector cluster",
      "Direct access for institutional queries",
      "Decades of combined market experience",
    ],
    icon: IdCard,
    color: "#3b82f6",
    href: "/team",
    glowColor: "rgba(59,130,246,0.65)",
  },
  {
    id: "integrations",
    gridIndex: 5,
    name: "Integrations",
    tagline: "Plays well with your whole stack",
    description:
      "Connect your accounting software, tax tools, and third-party algo platforms through a robust API and a growing library of native integrations.",
    benefits: [
      "REST & WebSocket trading APIs",
      "Native connectors for popular tools",
      "Webhook-based order automation",
    ],
    icon: Plug,
    color: "#22d3ee",
    glowColor: "rgba(34,211,238,0.65)",
  },
  {
    id: "reports",
    gridIndex: 6,
    name: "Reports",
    tagline: "Sector research, organized like a filing cabinet",
    description:
      "Browse institutional-grade sector research the way you'd flip through a real file cabinet — pick a sector, open the file, and get straight to the reports that matter.",
    benefits: [
      "13 sectors covered, from BFSI to Textiles",
      "Fresh research reports added regularly",
      "One click from cube to full report",
    ],
    icon: FolderOpen,
    color: "#a855f7",
    glowColor: "rgba(168,85,247,0.65)",
    href: "/reports",
  },
  {
    id: "user-management",
    gridIndex: 7,
    name: "User Management",
    tagline: "Built for teams, not just individuals",
    description:
      "Role-based access for family accounts, advisory desks, and institutional teams, with granular permissions and a full audit trail.",
    benefits: [
      "Role-based access control",
      "Sub-accounts for family & teams",
      "Full activity audit logs",
    ],
    icon: Users,
    color: "#ec4899",
    glowColor: "rgba(236,72,153,0.65)",
  },
  {
    id: "settings",
    gridIndex: 8,
    name: "Settings",
    tagline: "Make it feel like yours",
    description:
      "Fine-tune order defaults, risk limits, themes, and notification rules so the platform adapts to your workflow, not the other way around.",
    benefits: [
      "Custom order & risk defaults",
      "Personalized themes & layouts",
      "Granular privacy controls",
    ],
    icon: Settings,
    color: "#3b82f6",
    glowColor: "rgba(59,130,246,0.65)",
  },
];

export const getFeatureByGridIndex = (index: number): Feature | undefined =>
  features.find((f) => f.gridIndex === index);
