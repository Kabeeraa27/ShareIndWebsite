import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { InstitutionalThemeScope } from "@/components/InstitutionalThemeScope";
import { SectionPageHero } from "@/components/institutional/SectionPageHero";
import { DifferentiatorsSection } from "@/components/institutional/DifferentiatorsSection";

export const metadata: Metadata = {
  title: "Differentiators | Share India Institutional Desk",
  description: "Research-Led. Relationship-Driven. Result-Focused — what sets Share India apart.",
};

export default function DifferentiatorsPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <InstitutionalThemeScope>
          <SectionPageHero
            badge="Differentiators"
            title="What sets us"
            highlight="apart"
            subtitle="Research-Led. Relationship-Driven. Result-Focused."
          />
          <DifferentiatorsSection />
        </InstitutionalThemeScope>
      </main>
    </div>
  );
}
