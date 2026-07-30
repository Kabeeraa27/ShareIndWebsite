import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InstitutionalThemeScope } from "@/components/InstitutionalThemeScope";
import { SectionPageHero } from "@/components/institutional/SectionPageHero";
import { InstitutionalContactSection } from "@/components/institutional/InstitutionalContactSection";

export const metadata: Metadata = {
  title: "Contact | Share India Institutional Desk",
  description: "Get in touch with the Share India Institutional Desk.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <InstitutionalThemeScope>
          <SectionPageHero
            badge="Contact"
            title="Let's"
            highlight="talk"
            subtitle="Reach the institutional desk directly, or find us across our offices."
          />
          <InstitutionalContactSection />
        </InstitutionalThemeScope>
      </main>
      <Footer />
    </div>
  );
}
