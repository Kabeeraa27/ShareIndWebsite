import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { InstitutionalThemeScope } from "@/components/InstitutionalThemeScope";
import { FileStack } from "@/components/institutional/FileStack";
import { WhoWeAreSection } from "@/components/institutional/WhoWeAreSection";
import { DifferentiatorsSection } from "@/components/institutional/DifferentiatorsSection";
import { LeadershipSection } from "@/components/institutional/LeadershipSection";
import { OfferingsSection } from "@/components/institutional/OfferingsSection";
import { SectorsSection } from "@/components/institutional/SectorsSection";
import { InstitutionalContactSection } from "@/components/institutional/InstitutionalContactSection";
import { Footer } from "@/components/Footer";

const BLUE = "#1b6fb8";
const RED = "#ce2626";
const NAVY = "#0a2947";

const FILES = [
  { label: "About Us", color: BLUE, Section: WhoWeAreSection },
  { label: "Differentiators", color: RED, Section: DifferentiatorsSection },
  { label: "Leadership", color: NAVY, Section: LeadershipSection },
  { label: "Offerings", color: BLUE, Section: OfferingsSection },
  { label: "Sector Expertise", color: RED, Section: SectorsSection },
  { label: "Contact", color: BLUE, Section: InstitutionalContactSection },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <InstitutionalThemeScope>
          <Hero />
          <FileStack files={FILES} />
        </InstitutionalThemeScope>
      </main>
      <Footer />
    </div>
  );
}
