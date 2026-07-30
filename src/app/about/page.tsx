import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InstitutionalThemeScope } from "@/components/InstitutionalThemeScope";
import { SectionPageHero } from "@/components/institutional/SectionPageHero";
import { WhoWeAreSection } from "@/components/institutional/WhoWeAreSection";

export const metadata: Metadata = {
  title: "About Us | Share India Institutional Desk",
  description: "Insight. Access. Execution — who Share India Institutional Desk is and who we serve.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <InstitutionalThemeScope>
          <SectionPageHero
            badge="About Us"
            title="Who"
            highlight="we are"
            subtitle="Insight. Access. Execution."
          />
          <WhoWeAreSection />
        </InstitutionalThemeScope>
      </main>
      <Footer />
    </div>
  );
}
