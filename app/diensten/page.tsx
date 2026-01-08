import ServicesHero from "@/components/services/ServicesHero";
import ServiceTiles from "@/components/services/ServiceTiles";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import ReviewsSection from "@/components/home/ReviewsSection";
import WizardDockingSection from "@/components/services/WizardDockingSection";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-plaster">
      <ServicesHero />
      <ServiceTiles />
      <ProcessTimeline />

      <div className="mb-24">
        <ReviewsSection />
      </div>

      <WizardDockingSection />
    </main>
  );
}
