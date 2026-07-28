import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { InstitutionalThemeScope } from "@/components/InstitutionalThemeScope";
import { WhoWeAreSection } from "@/components/institutional/WhoWeAreSection";
import { DifferentiatorsSection } from "@/components/institutional/DifferentiatorsSection";
import { LeadershipSection } from "@/components/institutional/LeadershipSection";
import { OfferingsSection } from "@/components/institutional/OfferingsSection";
import { SectorsSection } from "@/components/institutional/SectorsSection";
import { ComplianceSection } from "@/components/institutional/ComplianceSection";
import { InstitutionalContactSection } from "@/components/institutional/InstitutionalContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <InstitutionalThemeScope>
          <Hero />
          <WhoWeAreSection />
          <DifferentiatorsSection />
          <LeadershipSection />
          <OfferingsSection />
          <SectorsSection />
          <ComplianceSection />
          <InstitutionalContactSection />
        </InstitutionalThemeScope>
      </main>
      <Footer />
    </div>
  );
}
