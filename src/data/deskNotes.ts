import { BookOpen, CalendarDays, Sunrise, type LucideIcon } from "lucide-react";

export interface DeskNotePost {
  date: string;
  author: string;
  role: string;
  paragraphs: string[];
}

export interface DeskNoteSection {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  blurb: string;
  posts: DeskNotePost[];
}

/** Written desk commentary — daily/weekly notes, not sector PDFs, so they
 *  get their own dated-post format (see DeskNotePostCard) instead of the
 *  file-cabinet ReportCard used for REPORT_SECTORS. */
export const DESK_NOTES: DeskNoteSection[] = [
  {
    id: "knowledge-center",
    name: "Knowledge Center",
    icon: BookOpen,
    color: "#1b6fb8",
    blurb: "Daily perspective from the desk — markets, positioning, and what's moving the tape.",
    posts: [
      {
        date: "Apr 8, 2026",
        author: "Kalpesh Parekh",
        role: "Head Equities",
        paragraphs: [
          "Gm, today is the day of relief for investors at large across world particularly India, as we saw positive news flow on ceasefire for war in middle east. In Risk On is back as oil slips the max in almost 6 years.",
          "Plus wait and watch policy by RBI also gave more legs to momentum in Nifty that is up by almost 3.8% (yes we rarely see this type of positive markets nowadays).",
          "There is lot of short squeeze that is taking place in market today particularly in BFSI, Auto and real estate stocks.",
          "In todays environment, we will have to learn to avoid the noise and take structural views, otherwise getting slaughtered in given.",
        ],
      },
      {
        date: "Mar 30, 2026",
        author: "Kalpesh Parekh",
        role: "Head Equities",
        paragraphs: [
          "Good afternoon. Today marks the conclusion of the 2025-26 financial year, a period that the equity markets, particularly in India, may prefer to move past. The Nifty recorded a 5% negative return and remained largely flat over the past two years.",
          "In contrast, gold and silver performed remarkably throughout the year, driven by demand for safe-haven assets, despite some moderation in prices during the final month. While bonds and real estate yielded positive returns, they were insufficient to offset inflation.",
          "A key takeaway from FY26 is the critical importance of genuine diversification, extending beyond mere equity holdings to encompass a broader range of asset classes.",
          "However, looking ahead to FY27, despite persistent global uncertainties, the downside risk appears diminished following the significant short-term correction. Indian equity valuations are approaching an attractive range, though sustained recovery will necessitate robust earnings growth and supportive policy initiatives.",
        ],
      },
    ],
  },
  {
    id: "weekly-report",
    name: "Weekly Report",
    icon: CalendarDays,
    color: "#ce2626",
    blurb: "A weekly wrap of the calls, catalysts, and data that mattered.",
    posts: [],
  },
  {
    id: "morning-note",
    name: "Morning Note",
    icon: Sunrise,
    color: "#0a2947",
    blurb: "The desk's first read on markets before the opening bell.",
    posts: [],
  },
];
