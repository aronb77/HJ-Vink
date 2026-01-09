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
                    <h2 className="text-4xl md:text-5xl font-manrope font-bold text-concrete mb-4">
                        Wat klanten zeggen.
                    </h2>

                    {/* Average Rating Badge */}
                    <div className="flex items-center gap-4">
                        <div className="flex text-gold">
                            {/* 5 Filled Stars */}
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                            ))}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-concrete text-lg leading-none">
                                5.0
                                <span className="text-concrete/40 font-normal ml-1">/ 5</span>
                            </span>
                            <span className="text-xs text-concrete/60 font-inter">
                                Gebaseerd op {reviews.length} reviews
                            </span>
                        </div>
                    </div>
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
