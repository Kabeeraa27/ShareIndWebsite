import { BarChart3, LineChart, Radar, ShieldCheck, Users2, type LucideIcon } from "lucide-react";
import {
  FaBoltLightning,
  FaBridge,
  FaBuilding,
  FaBuildingColumns,
  FaCarBattery,
  FaCarSide,
  FaHotel,
  FaIndustry,
  FaKitchenSet,
  FaMicrochip,
  FaPills,
  FaShirt,
} from "react-icons/fa6";
import { GiConcreteBag } from "react-icons/gi";
import type { IconType } from "react-icons";

export const WHO_WE_ARE = {
  tagline: "Insight. Access. Execution",
  paragraphs: [
    "With 3-decades of broking excellence, Share India Securities has grown into one of the Top 10 players in India's derivatives market.",
    "Built on this foundation, Share India Institutional Desk focuses on uncovering strong return opportunities in the small and mid-cap space. We work closely with institutions to provide smooth, efficient and high standard execution, so ideas move seamlessly from research to trade.",
    "As a boutique firm, we stay nimble and client-focused. Our strength lies in deep research, unhindered corporate access, strong trading infrastructure, and reliable back-office support. This integrated approach has enabled us to build long-term institutional relationships and establish ourselves as a trusted institutional brokerage firm in India.",
  ],
};

export const CLIENT_TYPES = [
  "Mutual Funds",
  "Insurance Firms",
  "FIIs",
  "DIIs",
  "PMS",
  "Family Offices",
  "Corporate Office",
  "AIFs",
];

export const OFFICE_LOCATIONS = ["Mumbai", "Delhi", "Singapore", "Dubai", "Pune", "Chennai"];

export const DIFFERENTIATORS_TAGLINE = "Research-Led. Relationship-Driven. Result-Focused.";

export const DIFFERENTIATORS: string[] = [
  "Serving marquee clients across geographies",
  "Focus driven differentiated research products with 100+ companies covering varied sectors",
  "Proactive and well-connected Corporate Access team facilitating direct and seamless engagement",
  "Low latency solution",
  "Seamless DMA, colo services",
  "Expertise in large and complex ETF basket execution",
  "Deep high-conviction small-cap research",
  "Resilient back-office & reporting",
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
    color: "#1b6fb8",
    description: "Distinctive, niche investment ideas driven by bottom-up strategies.",
    points: [
      "Distinctive, niche investment ideas driven by bottom-up strategies",
      "Comprehensive coverage across India's key economic sectors",
      "Strong expertise in the small-cap investment universe",
      "In-depth, thematic research and insights",
    ],
  },
  {
    id: "sales",
    name: "Sales",
    icon: Users2,
    color: "#4fa3d1",
    description: "A single point of contact model built on research-driven relationships.",
    points: [
      "Single point of contact enabling seamless engagement and faster decision-making",
      "Research-driven team with deep understanding of client requirements",
      "Partners closely with leading domestic and global investors",
      "Tailored research flow, sharp market intelligence, and direct access to corporates and sector experts",
    ],
  },
  {
    id: "dealing",
    name: "Dealing",
    icon: BarChart3,
    color: "#ce2626",
    description: "Low-impact execution across cash and derivatives, built for scale and speed.",
    points: [
      "Comprehensive, low impact execution in cash and derivatives, ETF market making",
      "Advanced algorithmic suite",
      "Strong block-trade capabilities",
      "Seamless large and complex ETF basket orders execution",
      "DMA (Direct Market Access), low-latency trading",
      "Cash-Futures arbitrage and options strategies",
      "Colocation and infrastructure support",
    ],
  },
  {
    id: "corporate-access",
    name: "Corporate Access",
    icon: Radar,
    color: "#a9c9dc",
    description: "A proactive, well-connected team that opens direct lines to management.",
    points: [
      "A proactive, well-connected team facilitating direct and seamless engagement",
      "High-quality corporate roadshows and reverse roadshows, with a strong focus on the small-cap space",
      "Plant and site visits offering on-ground operational insights",
      "Thematic, sector-focused conferences bringing together corporates, experts, and long-term investors",
    ],
  },
  {
    id: "operations",
    name: "Operations",
    icon: ShieldCheck,
    color: "#0a2947",
    description: "A strong risk framework behind every trade, from reporting to reconciliation.",
    points: [
      "Strong Risk Management Framework",
      "Clean, easy-to-use reports delivered in multiple formats for seamless analysis",
      "Timely delivery of day-to-day files, enabling smooth and efficient reconciliation processes",
    ],
  },
];

export interface Sector {
  name: string;
  icon: IconType;
}

export const SECTORS: Sector[] = [
  { name: "BFSI", icon: FaBuildingColumns },
  { name: "Auto", icon: FaCarSide },
  { name: "Hospitality", icon: FaHotel },
  { name: "Consumer Durables", icon: FaKitchenSet },
  { name: "Pharma", icon: FaPills },
  { name: "Capital Goods", icon: FaIndustry },
  { name: "Cement", icon: GiConcreteBag },
  { name: "Infrastructure", icon: FaBridge },
  { name: "IT", icon: FaMicrochip },
  { name: "Auto & Auto Ancillaries", icon: FaCarBattery },
  { name: "Real Estate", icon: FaBuilding },
  { name: "Capital Goods/Power", icon: FaBoltLightning },
  { name: "Textiles", icon: FaShirt },
];

export interface Leader {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string[];
}

export const LEADERSHIP: Leader[] = [
  {
    id: "kalpesh-parekh",
    name: "Mr Kalpesh Parekh",
    title: "Head – Institutional Business",
    image: "/people/kalpesh-parekh.png",
    bio: [
      "Mr Kalpesh Parekh brings over 23 years of rich experience in the Indian capital markets. A Chartered Accountant by qualification, he has played multiple leadership roles across top-tier financial institutions. He has worked with reputed organisations like CLSA, DAIWA, IDFC, PL, Elara and ASK.",
      "At Share India, Mr Parekh serves as the Head of Equities – Institutional Desk overseeing the company's strategy for engaging with domestic and global institutional investors. Known for his analytical depth, calm leadership, and ability to foster high-performance teams, Mr Parekh plays a vital role in elevating the company's profile among mutual funds, PMS houses, and foreign institutional clients.",
      "On a personal note, Mr Parekh's career stands as a testament to the power of discipline, humility, and lifelong learning. His commitment to ethical capital market practices and investor education makes him a respected name not only within the organisation but also across the financial services industry.",
    ],
  },
  {
    id: "himani-shah",
    name: "Ms Himani Shah",
    title: "Co-Head – Institutional Business",
    image: "/people/himani-shah.png",
    bio: [
      "Ms. Himani Shah brings nearly two decades of experience in the capital markets and has been an integral part of Share India's growth journey. A Chartered Accountant by qualification, she has played a key role in strengthening the firm's trading and operations ecosystem while actively contributing to business development across multiple segments.",
      "Over the years, she has built and mentored trading teams, expanded new business segments, and overseen operations, risk management, and the overall functioning of the Mumbai division. With strong market insight and deep expertise in algo trading, she combines strategy, execution, and team leadership to drive growth and operational excellence within the organisation.",
    ],
  },
];

export const LEADERSHIP_TAGLINE = "Driven by Experience. Defined by Insight";
export const LEADERSHIP_INTRO =
  "Our leadership team brings decades of combined experience across institutional research, sales, and trading. Their deep understanding of market cycles and corporate dynamics defines Share India's institutional edge.";

export const CORPORATE_OFFICE = {
  name: "Share India Securities Ltd.",
  address: "601/811, B-wing, 8th Floor, Kanakia Wall Street, Andheri East, Mumbai – 400093",
  phone: "022 69041175",
};

export const SOCIAL_LINKS = {
  x: "https://x.com/ShareIndiaIR",
  linkedin: "https://www.linkedin.com/in/share-india-institutional-desk-852b10374/",
};
