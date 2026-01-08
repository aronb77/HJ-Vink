import WallAnatomy from "@/components/werkwijze/WallAnatomy";
import CleanWorkChecklist from "@/components/werkwijze/CleanWorkChecklist";
import ReviewsSection from "@/components/home/ReviewsSection";

export default function WerkwijzePage() {
    return (
        <main className="min-h-screen bg-plaster">
            {/* 
        Optional: Small Hero or Title could go here, 
        but WallAnatomy starts immediately as requested.
      */}
            <div className="pt-24 pb-12 text-center bg-plaster container mx-auto px-4">
                <span className="text-gold font-bold tracking-wider uppercase text-sm mb-2 block">
                    Onze Methode
                </span>
                <h1 className="text-5xl md:text-6xl font-manrope font-bold text-concrete">
                    Van ruw naar resultaat
                </h1>
            </div>

            <WallAnatomy />
            <CleanWorkChecklist />
            <ReviewsSection />
        </main>
    );
}
