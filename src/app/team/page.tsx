import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InstitutionalThemeScope } from "@/components/InstitutionalThemeScope";
import { LeadershipSection } from "@/components/institutional/LeadershipSection";
import { TeamHero } from "@/components/team/TeamHero";
import { TeamGrid } from "@/components/team/TeamGrid";

export const metadata: Metadata = {
  title: "Our Team | Share India Institutional Desk",
  description: "Meet the sector analysts behind Share India Institutional Desk's research.",
};

export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <InstitutionalThemeScope>
          <TeamHero />
          <LeadershipSection />
          <TeamGrid />
        </InstitutionalThemeScope>
      </main>
      <Footer />
    </div>
  );
}
