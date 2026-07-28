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

export interface ReportFile {
  title: string;
  date: string;
  pages: number;
}

export interface ReportSector {
  id: string;
  name: string;
  icon: IconType;
  color: string;
  /** One vivid, sector-specific line — the "artillery and tanks" kind of
   *  detail that makes each folder feel like it belongs to a real desk. */
  blurb: string;
  files: ReportFile[];
}

export const REPORT_SECTORS: ReportSector[] = [
  {
    id: "bfsi",
    name: "BFSI",
    icon: FaBuildingColumns,
    color: "#0082c6",
    blurb: "Banks, NBFCs, and insurers navigating credit cycles, asset quality, and digital disruption.",
    files: [
      { title: "BFSI Sector Outlook — Q2 FY27", date: "14 Jul 2026", pages: 32 },
      { title: "NBFC Asset Quality Deep Dive", date: "02 Jun 2026", pages: 24 },
      { title: "Private Banks — Coverage Initiation", date: "11 Apr 2026", pages: 41 },
    ],
  },
  {
    id: "auto",
    name: "Auto",
    icon: FaCarSide,
    color: "#ed3237",
    blurb: "Two-wheelers, passenger vehicles, and the EV transition reshaping India's roads.",
    files: [
      { title: "Auto Sector Outlook — Q2 FY27", date: "09 Jul 2026", pages: 28 },
      { title: "EV Transition Tracker", date: "22 May 2026", pages: 19 },
      { title: "Two-Wheeler Demand Update", date: "30 Mar 2026", pages: 15 },
    ],
  },
  {
    id: "hospitality",
    name: "Hospitality",
    icon: FaHotel,
    color: "#4da6d9",
    blurb: "Hotels, travel, and leisure riding the post-pandemic demand recovery.",
    files: [
      { title: "Hospitality Sector Outlook — Q2 FY27", date: "05 Jul 2026", pages: 22 },
      { title: "Hotel RevPAR Tracker", date: "18 May 2026", pages: 12 },
    ],
  },
  {
    id: "consumer-durables",
    name: "Consumer Durables",
    icon: FaKitchenSet,
    color: "#005a8c",
    blurb: "White goods, electronics, and the premiumization of Indian households.",
    files: [
      { title: "Consumer Durables Outlook — Q2 FY27", date: "11 Jul 2026", pages: 26 },
      { title: "Summer Demand Channel Check", date: "27 Apr 2026", pages: 14 },
    ],
  },
  {
    id: "pharma",
    name: "Pharma",
    icon: FaPills,
    color: "#0082c6",
    blurb: "Generics, specialty formulations, and API manufacturing powering global healthcare.",
    files: [
      { title: "Pharma Sector Outlook — Q2 FY27", date: "16 Jul 2026", pages: 34 },
      { title: "US Generics Pricing Tracker", date: "08 Jun 2026", pages: 18 },
      { title: "API & CDMO Coverage Initiation", date: "14 Mar 2026", pages: 38 },
    ],
  },
  {
    id: "capital-goods",
    name: "Capital Goods",
    icon: FaIndustry,
    color: "#ed3237",
    blurb: "Industrial machinery and engineering firms building India's manufacturing base.",
    files: [
      { title: "Capital Goods Sector Outlook — Q2 FY27", date: "10 Jul 2026", pages: 30 },
      { title: "Capex Cycle Order Book Tracker", date: "19 May 2026", pages: 20 },
    ],
  },
  {
    id: "cement",
    name: "Cement",
    icon: GiConcreteBag,
    color: "#4da6d9",
    blurb: "Capacity additions and pricing power across India's infrastructure build-out.",
    files: [
      { title: "Cement Sector Outlook — Q2 FY27", date: "07 Jul 2026", pages: 24 },
      { title: "Regional Pricing Tracker — North & East", date: "23 Apr 2026", pages: 11 },
    ],
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    icon: FaBridge,
    color: "#005a8c",
    blurb: "Roads, ports, and utilities underpinning the next decade of growth.",
    files: [
      { title: "Infrastructure Sector Outlook — Q2 FY27", date: "13 Jul 2026", pages: 29 },
      { title: "Road & Highway Awarding Tracker", date: "05 Jun 2026", pages: 16 },
    ],
  },
  {
    id: "it",
    name: "IT",
    icon: FaMicrochip,
    color: "#0082c6",
    blurb: "Software services, product engineering, and India's global technology footprint.",
    files: [
      { title: "IT Services Sector Outlook — Q2 FY27", date: "17 Jul 2026", pages: 33 },
      { title: "Deal TCV & Pipeline Tracker", date: "01 Jun 2026", pages: 17 },
      { title: "GenAI Impact on Services — Thematic", date: "20 Feb 2026", pages: 27 },
    ],
  },
  {
    id: "auto-ancillaries",
    name: "Auto & Auto Ancillaries",
    icon: FaCarBattery,
    color: "#ed3237",
    blurb: "Component makers and Tier-1 suppliers feeding the automotive value chain.",
    files: [
      { title: "Auto Ancillaries Outlook — Q2 FY27", date: "08 Jul 2026", pages: 25 },
      { title: "EV Component Supply Chain Map", date: "15 May 2026", pages: 21 },
    ],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    icon: FaBuilding,
    color: "#4da6d9",
    blurb: "Residential, commercial, and REIT plays across India's urban growth corridors.",
    files: [
      { title: "Real Estate Sector Outlook — Q2 FY27", date: "12 Jul 2026", pages: 27 },
      { title: "Top-8 City Launches & Absorption", date: "29 Apr 2026", pages: 16 },
    ],
  },
  {
    id: "capital-goods-power",
    name: "Capital Goods/Power",
    icon: FaBoltLightning,
    color: "#005a8c",
    blurb: "Power generation, transmission, and the equipment behind the energy transition.",
    files: [
      { title: "Power & Utilities Outlook — Q2 FY27", date: "15 Jul 2026", pages: 31 },
      { title: "T&D Equipment Order Book Tracker", date: "03 Jun 2026", pages: 18 },
    ],
  },
  {
    id: "textiles",
    name: "Textiles",
    icon: FaShirt,
    color: "#ed3237",
    blurb: "Spinning, weaving, and garmenting across India's export-oriented textile belt.",
    files: [
      { title: "Textiles Sector Outlook — Q2 FY27", date: "06 Jul 2026", pages: 20 },
      { title: "Cotton Price & Export Order Tracker", date: "24 Apr 2026", pages: 13 },
    ],
  },
];
