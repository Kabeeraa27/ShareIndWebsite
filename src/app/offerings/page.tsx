import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { InstitutionalThemeScope } from "@/components/InstitutionalThemeScope";
import { SectionPageHero } from "@/components/institutional/SectionPageHero";
import { OfferingsSection } from "@/components/institutional/OfferingsSection";

export const metadata: Metadata = {
  title: "Offerings | Share India Institutional Desk",
  description: "Research, Sales, Dealing, Corporate Access, and Operations — the full institutional offering.",
};

export default function OfferingsPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <InstitutionalThemeScope>
          <SectionPageHero
            badge="Offerings"
            title="Every desk you"
            highlight="need"
            subtitle="Research, Sales, Dealing, Corporate Access, and Operations, working as one desk."
          />
          <OfferingsSection />
        </InstitutionalThemeScope>
      </main>
    </div>
  );
}
