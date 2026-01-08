import HeroScratchReveal from "@/components/home/HeroScratchReveal";
import ServicesTiltGrid from "@/components/home/ServicesTiltGrid";
import AboutCompany from "@/components/home/AboutCompany";
import ReviewsSection from "@/components/home/ReviewsSection";
import ProjectShowcase from "@/components/home/ProjectShowcase";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-plaster">
      <HeroScratchReveal />
      <ServicesTiltGrid />
      <AboutCompany />
      <ProjectsShowcaseBoundary />
      <ReviewsSection />
      {/* Quote Wizard will go here */}
    </main>
  );
}

// Separate component for async server component boundary to avoid type issues if Any
function ProjectsShowcaseBoundary() {
  return <ProjectShowcase />
}
