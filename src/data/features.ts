import {
  Building2,
  Award,
  FileBarChart,
  FolderOpen,
  Users2,
  IdCard,
  Layers,
  PieChart,
  Phone,
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

const BLUE = "#1b6fb8";
const RED = "#ce2626";
const NAVY = "#0a2947";
const BLUE_GLOW = "rgba(27,111,184,0.65)";
const RED_GLOW = "rgba(206,38,38,0.65)";
const NAVY_GLOW = "rgba(10,41,71,0.65)";

export const features: Feature[] = [
  {
    id: "about-us",
    gridIndex: 0,
    name: "About Us",
    tagline: "Insight. Access. Execution.",
    description:
      "Three decades of broking excellence behind a boutique institutional desk — who we are, who we serve, and where we operate.",
    benefits: [
      "Top 10 player in India's derivatives market",
      "Serving Mutual Funds, FIIs, DIIs, PMS, and more",
      "Presence across Mumbai, Delhi, Singapore, Dubai, Pune, Chennai",
    ],
    icon: Building2,
    color: BLUE,
    glowColor: BLUE_GLOW,
    href: "/about",
  },
  {
    id: "differentiators",
    gridIndex: 1,
    name: "Differentiators",
    tagline: "Research-Led. Relationship-Driven. Result-Focused.",
    description:
      "What sets the desk apart: differentiated research, proactive corporate access, and execution infrastructure built for scale.",
    benefits: [
      "100+ companies covering varied sectors",
      "Proactive, well-connected corporate access team",
      "Low-latency, seamless DMA and colo services",
    ],
    icon: Award,
    color: RED,
    glowColor: RED_GLOW,
    href: "/differentiators",
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
    id: "leadership",
    gridIndex: 3,
    name: "Leadership",
    tagline: "Driven by Experience. Defined by Insight.",
    description:
      "The leadership team behind Share India's institutional edge, bringing decades of combined experience across research, sales, and trading.",
    benefits: [
      "Decades of combined capital markets experience",
      "Backgrounds spanning CLSA, DAIWA, IDFC, PL, Elara, ASK",
      "Direct oversight of the institutional strategy",
    ],
    icon: Users2,
    color: NAVY,
    glowColor: NAVY_GLOW,
    href: "/team",
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
    color: "#54a9d4",
    href: "/team",
    glowColor: "rgba(84,169,212,0.65)",
  },
  {
    id: "offerings",
    gridIndex: 5,
    name: "Offerings",
    tagline: "Every desk you need",
    description:
      "Research, Sales, Dealing, Corporate Access, and Operations, working as one desk built around institutional clients.",
    benefits: [
      "Single point of contact model",
      "Low-impact execution across cash and derivatives",
      "Strong risk management and reconciliation framework",
    ],
    icon: Layers,
    color: BLUE,
    glowColor: BLUE_GLOW,
    href: "/offerings",
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
    id: "sector-expertise",
    gridIndex: 7,
    name: "Sector Expertise",
    tagline: "Coverage across every sector",
    description:
      "13 sectors of dedicated research coverage, from BFSI to Textiles, each backed by specialist analysts.",
    benefits: [
      "13 sectors, from BFSI to Textiles",
      "Specialist analyst per sector cluster",
      "Deep, high-conviction small-cap research",
    ],
    icon: PieChart,
    color: RED,
    glowColor: RED_GLOW,
    href: "/sectors",
  },
  {
    id: "contact",
    gridIndex: 8,
    name: "Contact",
    tagline: "Let's talk",
    description: "Reach the institutional desk directly, or find us across our offices.",
    benefits: [
      "Direct line to the institutional desk",
      "Offices across India, Singapore, and Dubai",
      "Follow us for research and market updates",
    ],
    icon: Phone,
    color: BLUE,
    glowColor: BLUE_GLOW,
    href: "/contact",
  },
];

export const getFeatureByGridIndex = (index: number): Feature | undefined =>
  features.find((f) => f.gridIndex === index);
