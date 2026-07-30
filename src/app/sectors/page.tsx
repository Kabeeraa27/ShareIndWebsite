import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InstitutionalThemeScope } from "@/components/InstitutionalThemeScope";
import { SectionPageHero } from "@/components/institutional/SectionPageHero";
import { SectorsSection } from "@/components/institutional/SectorsSection";

export const metadata: Metadata = {
  title: "Sector Expertise | Share India Institutional Desk",
  description: "13 sectors of dedicated coverage, from BFSI to Textiles.",
};

export default function SectorsPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <InstitutionalThemeScope>
          <SectionPageHero
            badge="Sector Expertise"
            title="Coverage across"
            highlight="every sector"
            subtitle="13 sectors of dedicated research coverage, from BFSI to Textiles."
          />
          <SectorsSection />
        </InstitutionalThemeScope>
      </main>
      <Footer />
    </div>
  );
}
