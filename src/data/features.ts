import {
  LayoutDashboard,
  LineChart,
  FileBarChart,
  Sparkles,
  ShieldCheck,
  Plug,
  Bell,
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
    id: "reports",
    gridIndex: 2,
    name: "Reports",
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
    id: "security",
    gridIndex: 4,
    name: "Security",
    tagline: "Bank-grade protection, always on",
    description:
      "Multi-factor authentication, biometric login, and end-to-end encryption protect every order and every rupee, backed by 24/7 fraud monitoring.",
    benefits: [
      "Biometric & hardware-key 2FA",
      "256-bit end-to-end encryption",
      "Real-time fraud detection",
    ],
    icon: ShieldCheck,
    color: "#3b82f6",
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
    id: "notifications",
    gridIndex: 6,
    name: "Notifications",
    tagline: "Never miss a market-moving moment",
    description:
      "Granular, real-time alerts for price targets, order fills, and portfolio events delivered exactly where you want them: push, SMS, or email.",
    benefits: [
      "Custom price & volume triggers",
      "Multi-channel delivery (push/SMS/email)",
      "Smart digesting to cut alert fatigue",
    ],
    icon: Bell,
    color: "#a855f7",
    glowColor: "rgba(168,85,247,0.65)",
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
