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

export const REPORT_CATEGORIES = ["Sector Outlook", "Coverage & Trackers", "Notes & Thematics"] as const;
export type ReportCategory = (typeof REPORT_CATEGORIES)[number];

export interface ReportFile {
  title: string;
  date: string;
  pages: number;
  category: ReportCategory;
}

export interface ReportSectorSeed {
  id: string;
  name: string;
  icon: IconType;
  color: string;
  /** One vivid, sector-specific line — the "artillery and tanks" kind of
   *  detail that makes each folder feel like it belongs to a real desk. */
  blurb: string;
  /** Short titles specific to this sector, in category order (2 per
   *  category); combined with generated dates/page counts at build time
   *  via buildFiles() so the data below stays readable. */
  titles: [string, string, string, string, string, string];
}

export interface ReportSector extends Omit<ReportSectorSeed, "titles"> {
  files: ReportFile[];
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Deterministic (no Math.random, so SSR/CSR stay in sync) but varied
 *  dates/page counts, seeded per-sector so each folder's files don't all
 *  look identical. */
function buildFiles(titles: ReportSectorSeed["titles"], seed: number): ReportFile[] {
  return titles.map((title, i) => {
    const dayOffset = ((seed * 7 + i * 11) % 24) + 1;
    const monthIndex = (6 - Math.floor((seed + i * 3) % 5)) % 12; // recent months, wraps safely
    const day = String(dayOffset).padStart(2, "0");
    return {
      title,
      date: `${day} ${MONTHS[monthIndex]} 2026`,
      pages: 10 + ((seed * 5 + i * 9) % 32),
      category: REPORT_CATEGORIES[Math.floor(i / 2)],
    };
  });
}

const SEEDS: ReportSectorSeed[] = [
  {
    id: "bfsi",
    name: "BFSI",
    icon: FaBuildingColumns,
    color: "#1b6fb8",
    blurb: "Banks, NBFCs, and insurers navigating credit cycles, asset quality, and digital disruption.",
    titles: [
      "BFSI Sector Outlook — Q2 FY27",
      "Private Banks — Q2 FY27 Preview",
      "NBFC Asset Quality Deep Dive",
      "Private Banks — Coverage Initiation",
      "Insurance — Management Meet Note",
      "BFSI Monthly Credit Growth Tracker",
    ],
  },
  {
    id: "auto",
    name: "Auto",
    icon: FaCarSide,
    color: "#ce2626",
    blurb: "Two-wheelers, passenger vehicles, and the EV transition reshaping India's roads.",
    titles: [
      "Auto Sector Outlook — Q2 FY27",
      "Two-Wheeler Demand Update",
      "EV Transition Tracker",
      "PV OEMs — Coverage Initiation",
      "Auto Dealer Channel Check",
      "Auto Monthly Volume Wrap",
    ],
  },
  {
    id: "hospitality",
    name: "Hospitality",
    icon: FaHotel,
    color: "#4fa3d1",
    blurb: "Hotels, travel, and leisure riding the post-pandemic demand recovery.",
    titles: [
      "Hospitality Sector Outlook — Q2 FY27",
      "Hotel RevPAR Tracker",
      "Leisure Travel Demand Note",
      "Hospitality — Coverage Initiation",
      "Hotel Chains — Management Meet Note",
      "Hospitality Monthly Occupancy Wrap",
    ],
  },
  {
    id: "consumer-durables",
    name: "Consumer Durables",
    icon: FaKitchenSet,
    color: "#0a2947",
    blurb: "White goods, electronics, and the premiumization of Indian households.",
    titles: [
      "Consumer Durables Outlook — Q2 FY27",
      "Summer Demand Channel Check",
      "Premiumization Tracker",
      "White Goods — Coverage Initiation",
      "Consumer Durables Thematic Note",
      "Consumer Durables Monthly Wrap",
    ],
  },
  {
    id: "pharma",
    name: "Pharma",
    icon: FaPills,
    color: "#1b6fb8",
    blurb: "Generics, specialty formulations, and API manufacturing powering global healthcare.",
    titles: [
      "Pharma Sector Outlook — Q2 FY27",
      "US Generics Pricing Tracker",
      "API & CDMO Coverage Initiation",
      "Specialty Formulations Thematic",
      "Pharma — Management Meet Note",
      "Pharma Monthly Launch Tracker",
    ],
  },
  {
    id: "capital-goods",
    name: "Capital Goods",
    icon: FaIndustry,
    color: "#ce2626",
    blurb: "Industrial machinery and engineering firms building India's manufacturing base.",
    titles: [
      "Capital Goods Sector Outlook — Q2 FY27",
      "Capex Cycle Order Book Tracker",
      "Engineering Majors — Coverage Initiation",
      "Capital Goods — Management Meet Note",
      "Manufacturing PLI Thematic",
      "Capital Goods Monthly Wrap",
    ],
  },
  {
    id: "cement",
    name: "Cement",
    icon: GiConcreteBag,
    color: "#4fa3d1",
    blurb: "Capacity additions and pricing power across India's infrastructure build-out.",
    titles: [
      "Cement Sector Outlook — Q2 FY27",
      "Regional Pricing Tracker — North & East",
      "Capacity Addition Coverage Initiation",
      "Cement — Management Meet Note",
      "Cement Cost Curve Thematic",
      "Cement Monthly Dispatch Wrap",
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    icon: FaBridge,
    color: "#0a2947",
    blurb: "Roads, ports, and utilities underpinning the next decade of growth.",
    titles: [
      "Infrastructure Sector Outlook — Q2 FY27",
      "Road & Highway Awarding Tracker",
      "EPC Majors — Coverage Initiation",
      "Ports & Logistics Thematic",
      "Infrastructure — Management Meet Note",
      "Infrastructure Monthly Order Wrap",
    ],
  },
  {
    id: "it",
    name: "IT",
    icon: FaMicrochip,
    color: "#1b6fb8",
    blurb: "Software services, product engineering, and India's global technology footprint.",
    titles: [
      "IT Services Sector Outlook — Q2 FY27",
      "Deal TCV & Pipeline Tracker",
      "Mid-Cap IT — Coverage Initiation",
      "GenAI Impact on Services — Thematic",
      "IT — Management Meet Note",
      "IT Monthly Hiring Tracker",
    ],
  },
  {
    id: "auto-ancillaries",
    name: "Auto & Auto Ancillaries",
    icon: FaCarBattery,
    color: "#ce2626",
    blurb: "Component makers and Tier-1 suppliers feeding the automotive value chain.",
    titles: [
      "Auto Ancillaries Outlook — Q2 FY27",
      "EV Component Supply Chain Map",
      "Tier-1 Suppliers — Coverage Initiation",
      "Auto Ancillaries — Management Meet Note",
      "Export Ancillaries Thematic",
      "Auto Ancillaries Monthly Wrap",
    ],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    icon: FaBuilding,
    color: "#4fa3d1",
    blurb: "Residential, commercial, and REIT plays across India's urban growth corridors.",
    titles: [
      "Real Estate Sector Outlook — Q2 FY27",
      "Top-8 City Launches & Absorption",
      "REIT Coverage Initiation",
      "Real Estate — Management Meet Note",
      "Commercial Leasing Thematic",
      "Real Estate Monthly Launch Wrap",
    ],
  },
  {
    id: "capital-goods-power",
    name: "Capital Goods/Power",
    icon: FaBoltLightning,
    color: "#0a2947",
    blurb: "Power generation, transmission, and the equipment behind the energy transition.",
    titles: [
      "Power & Utilities Outlook — Q2 FY27",
      "T&D Equipment Order Book Tracker",
      "Renewables Coverage Initiation",
      "Power — Management Meet Note",
      "Energy Transition Thematic",
      "Power Monthly Generation Wrap",
    ],
  },
  {
    id: "textiles",
    name: "Textiles",
    icon: FaShirt,
    color: "#ce2626",
    blurb: "Spinning, weaving, and garmenting across India's export-oriented textile belt.",
    titles: [
      "Textiles Sector Outlook — Q2 FY27",
      "Cotton Price & Export Order Tracker",
      "Garmenting Majors — Coverage Initiation",
      "Textiles — Management Meet Note",
      "Export Demand Thematic",
      "Textiles Monthly Order Wrap",
    ],
  },
];

export const REPORT_SECTORS: ReportSector[] = SEEDS.map(({ titles, ...seed }, i) => ({
  ...seed,
  files: buildFiles(titles, i + 1),
}));
