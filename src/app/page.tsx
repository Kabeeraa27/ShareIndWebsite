import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturesSection />
        <PricingSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
