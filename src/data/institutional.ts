import {
  BarChart3,
  Building2,
  LineChart,
  Radar,
  ShieldCheck,
  Users2,
  type LucideIcon,
} from "lucide-react";

export const CLIENT_TYPES = [
  "Mutual Funds",
  "Insurance Firms",
  "FIIs & DIIs",
  "PMS Firms",
  "Family Offices",
  "Corporate Offices",
  "AIFs",
];

export const OFFICE_LOCATIONS = ["Mumbai", "Delhi", "Singapore", "Dubai", "Pune", "Chennai"];

export interface Differentiator {
  title: string;
  description: string;
}

export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: "Marquee client base",
    description: "Trusted by leading institutional investors across geographies.",
  },
  {
    title: "100+ companies covered",
    description: "Deep, sector-mapped research coverage spanning the market.",
  },
  {
    title: "Dedicated corporate access",
    description: "A proactive team that engineers direct engagement with management.",
  },
  {
    title: "Low-latency infrastructure",
    description: "DMA and colocation services built for speed-sensitive strategies.",
  },
  {
    title: "ETF basket execution",
    description: "Specialist expertise in basket and market-making execution.",
  },
  {
    title: "Small-cap research edge",
    description: "Bottom-up, niche investment ideas outside the obvious large-caps.",
  },
  {
    title: "Resilient back office",
    description: "Reliable, multi-format reporting traders and compliance teams can count on.",
  },
];

export interface InstitutionalService {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
  points: string[];
}

export const SERVICES: InstitutionalService[] = [
  {
    id: "research",
    name: "Research",
    icon: LineChart,
    color: "#3b82f6",
    description: "Bottom-up, niche investment ideas backed by comprehensive sector coverage.",
    points: [
      "Bottom-up, niche investment ideas",
      "Comprehensive sector coverage",
      "Small-cap expertise",
      "Thematic research and insights",
    ],
  },
  {
    id: "sales",
    name: "Sales",
    icon: Users2,
    color: "#22d3ee",
    description: "A single point of contact model built on research-driven relationships.",
    points: [
      "Single point of contact model",
      "Research-driven team approach",
      "Partnerships with domestic & global investors",
      "Market intelligence and corporate access",
    ],
  },
  {
    id: "dealing",
    name: "Dealing",
    icon: BarChart3,
    color: "#a855f7",
    description: "Low-impact execution across cash and derivatives, built for scale and speed.",
    points: [
      "Low-impact execution (cash & derivatives)",
      "ETF market making",
      "Advanced algorithmic suite",
      "Block-trade capabilities",
      "DMA and low-latency trading",
      "Cash-futures arbitrage & options strategy support",
    ],
  },
  {
    id: "corporate-access",
    name: "Corporate Access",
    icon: Radar,
    color: "#ec4899",
    description: "A proactive, well-connected team that opens direct lines to management.",
    points: [
      "Corporate roadshows and reverse roadshows",
      "Plant and site visits",
      "Sector-focused conferences",
    ],
  },
  {
    id: "operations",
    name: "Operations",
    icon: ShieldCheck,
    color: "#3b82f6",
    description: "A strong risk framework behind every trade, from reporting to reconciliation.",
    points: [
      "Strong risk management framework",
      "Multi-format reporting",
      "Timely file delivery",
      "Efficient reconciliation processes",
    ],
  },
];

export const SECTORS = [
  "BFSI",
  "Auto & Auto Ancillaries",
  "Hospitality",
  "Consumer Durables",
  "Pharma",
  "Capital Goods",
  "Cement",
  "Infrastructure",
  "IT",
  "Real Estate",
  "Textiles",
  "Power",
];

export interface Leader {
  name: string;
  title: string;
  experience: string;
  qualification: string;
  background: string;
  bio: string;
}

export const LEADERSHIP: Leader[] = [
  {
    name: "Kalpesh Parekh",
    title: "Head – Institutional Business",
    experience: "23+ years in Indian capital markets",
    qualification: "Chartered Accountant",
    background: "CLSA, DAIWA, IDFC, Elara, ASK",
    bio: "Brings analytical depth, team leadership, and a strong commitment to ethical practices, built across two decades at some of the industry's most respected institutional desks.",
  },
  {
    name: "Himani Shah",
    title: "Co-Head – Institutional Business",
    experience: "Nearly 2 decades in capital markets",
    qualification: "Chartered Accountant",
    background: "Trading, operations, algo trading, business development",
    bio: "Leads team building, operations, and risk management, with deep cross-functional expertise spanning trading desks, algo execution, and business development.",
  },
];

export const CORPORATE_OFFICE = {
  name: "Share India Securities Ltd.",
  address: "601/811 B-wing, 8th Floor, Kanakia Wall Street, Andheri East, Mumbai – 400093",
  phone: "022 69041175",
  icon: Building2,
};
