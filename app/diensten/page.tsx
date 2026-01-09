import ServicesHero from "@/components/services/ServicesHero";
import ServiceTiles from "@/components/services/ServiceTiles";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import ReviewsSection from "@/components/home/ReviewsSection";


export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-plaster">
      <ServicesHero />
      <ServiceTiles />
      <ProcessTimeline />

      <div className="mb-24">
        <ReviewsSection />
      </div>


    </main>
  );
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diensten | H.J. Vink Afbouw",
  description: "Ontdek onze diensten: van traditioneel stucwerk en spuitwerk tot exclusieve wandafwerking. Vakmanschap voor nieuwbouw en renovatie.",
};
