import { getAllReviews } from "@/lib/reviews/allReviews";
import ReviewSlider from "./ReviewSlider";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function ReviewsSection() {
    const reviews = await getAllReviews();

    return (
        <section className="bg-plaster py-24 relative overflow-hidden">
            {/* Background Texture/Grain could go here */}

            <div className="container mx-auto px-4 mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
                <div>
                    <span className="text-gold font-bold tracking-wider uppercase text-sm mb-2 block">
                        Ervaringen
                    </span>
                    <h2 className="text-4xl md:text-5xl font-manrope font-bold text-concrete">
                        Wat klanten zeggen.
                    </h2>
                </div>

                <a
                    href={`https://search.google.com/local/writereview?placeid=${process.env.GOOGLE_PLACE_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-concrete font-bold hover:text-gold transition-colors"
                >
                    Schrijf zelf een review
                    <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>

            {/* Slice here to only show top 8 newest on homepage */}
            <ReviewSlider reviews={reviews.slice(0, 8)} />

            <div className="flex justify-center mt-12 relative z-10">
                <Link
                    href="/reviews"
                    className="inline-flex items-center gap-2 font-bold text-concrete border-b-2 border-gold pb-1 hover:text-gold transition-colors"
                >
                    Lees alle 100+ reviews
                    <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
