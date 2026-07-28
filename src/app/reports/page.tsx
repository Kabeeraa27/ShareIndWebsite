import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InstitutionalThemeScope } from "@/components/InstitutionalThemeScope";
import { ReportsHero } from "@/components/reports/ReportsHero";
import { ReportsCabinet } from "@/components/reports/ReportsCabinet";

export const metadata: Metadata = {
  title: "Research Reports | Share India Institutional Desk",
  description:
    "Browse institutional-grade sector research organized like a file cabinet — pick a sector, open the folder, get the report.",
};

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <InstitutionalThemeScope>
          <ReportsHero />
          <ReportsCabinet />
        </InstitutionalThemeScope>
      </main>
      <Footer />
    </div>
  );
}
