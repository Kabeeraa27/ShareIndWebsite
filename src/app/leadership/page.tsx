import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InstitutionalThemeScope } from "@/components/InstitutionalThemeScope";
import { SectionPageHero } from "@/components/institutional/SectionPageHero";
import { LeadershipSection } from "@/components/institutional/LeadershipSection";

export const metadata: Metadata = {
  title: "Leadership | Share India Institutional Desk",
  description: "Driven by Experience. Defined by Insight — the leadership behind the institutional desk.",
};

export default function LeadershipPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <InstitutionalThemeScope>
          <SectionPageHero
            badge="Leadership"
            title="Driven by experience,"
            highlight="defined by insight"
            subtitle="Meet the leadership team behind Share India's institutional edge."
          />
          <LeadershipSection />
        </InstitutionalThemeScope>
      </main>
      <Footer />
    </div>
  );
}
