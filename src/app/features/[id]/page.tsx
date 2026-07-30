import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InstitutionalThemeScope } from "@/components/InstitutionalThemeScope";
import { FeaturePageContent } from "@/components/features/FeaturePageContent";
import { features } from "@/data/features";

export async function generateStaticParams() {
  return features.filter((f) => !f.href).map((f) => ({ id: f.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const feature = features.find((f) => f.id === id);
  if (!feature) return {};
  return {
    title: `${feature.name} | Share India Institutional Desk`,
    description: feature.tagline,
  };
}

export default async function FeaturePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const feature = features.find((f) => f.id === id);

  if (!feature) notFound();
  if (feature.href) redirect(feature.href);

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <InstitutionalThemeScope>
          <FeaturePageContent featureId={feature.id} />
        </InstitutionalThemeScope>
      </main>
      <Footer />
    </div>
  );
}
