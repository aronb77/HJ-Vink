import { getAllReviews } from "@/lib/reviews/allReviews";
import ReviewsGrid from "@/components/reviews/ReviewsGrid";
import { Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reviews | H.J. Vink Afbouw",
    description: "Lees de ervaringen van meer dan 100 tevreden klanten uit Kampen en omstreken.",
};

export default async function ReviewsPage() {
    const reviews = await getAllReviews();

    // Calculate Stats
    const total = reviews.length;
    const average = total > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1)
        : "5.0";

    return (
        <main className="min-h-screen bg-plaster pt-32">

            {/* Header / Stats */}
            <div className="container mx-auto px-4 mb-16 text-center">
                <span className="text-gold font-bold tracking-wider uppercase text-sm mb-4 block">
                    Reviews
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-manrope font-bold text-concrete mb-6">
                    Vertrouwen is de basis.
                </h1>
                <p className="text-lg text-concrete/70 font-inter max-w-2xl mx-auto mb-10">
                    Lees de ervaringen van meer dan 100 tevreden klanten uit Kampen en omstreken.
                    Wij zijn trots op onze reputatie.
                </p>

                {/* Score Card */}
                <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg border border-black/5 gap-4">
                    <div className="flex items-center gap-1 text-gold">
                        <Star fill="currentColor" size={24} />
                        <span className="text-2xl font-bold font-manrope text-concrete">{average}</span>
                    </div>
                    <div className="h-8 w-px bg-gray-200"></div>
                    <div className="text-left leading-tight">
                        <span className="block font-bold text-concrete">{total}+ Reviews</span>
                        <span className="block text-xs text-gray-400">Op Google</span>
                    </div>
                </div>
            </div>

            {/* The Grid Component */}
            <ReviewsGrid reviews={reviews} />

        </main>
    );
}
