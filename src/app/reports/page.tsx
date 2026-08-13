import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { InstitutionalThemeScope } from "@/components/InstitutionalThemeScope";
import { ReportsHero } from "@/components/reports/ReportsHero";
import { ReportsDashboard } from "@/components/reports/ReportsDashboard";

export const metadata: Metadata = {
  title: "Research Reports | Share India Institutional Desk",
  description:
    "Browse institutional-grade sector research by sector, category, and date — every report the desk publishes, organized in one dashboard.",
};

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <InstitutionalThemeScope>
          <ReportsHero />
          <ReportsDashboard />
        </InstitutionalThemeScope>
      </main>
    </div>
  );
}
