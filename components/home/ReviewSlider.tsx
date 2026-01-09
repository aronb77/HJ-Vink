"use client";

import { motion } from "framer-motion";
import { Star, User } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Review } from "@/lib/reviews/allReviews";

export default function ReviewSlider({ reviews }: { reviews: Review[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
        }
    }, [reviews]);

    if (reviews.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                Nog geen reviews geladen.
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden relative group">
            {/* Fade gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-plaster to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-plaster to-transparent z-10 pointer-events-none" />

            <motion.div
                ref={containerRef}
                className="flex gap-6 px-8 md:px-32 py-10 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                whileTap={{ cursor: "grabbing" }}
            >
                {reviews.map((review, i) => (
                    <ReviewCard key={i} review={review} />
                ))}
            </motion.div>
        </div>
    );
}

function ReviewCard({ review }: { review: Review }) {
    return (
        <motion.div
            className="min-w-[300px] md:min-w-[400px] bg-white rounded-xl shadow-lg p-6 flex flex-col h-full select-none border border-black/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center gap-4 mb-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    {review.profile_photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={review.profile_photo_url}
                            alt={review.author_name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <User size={24} />
                        </div>
                    )}
                </div>

                {/* Name & Badge */}
                <div className="flex flex-col">
                    <span className="font-manrope font-bold text-concrete">{review.author_name}</span>
                    <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                        Geverifieerde Review
                    </span>
                </div>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-3 text-gold">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        fill={i < review.rating ? "currentColor" : "none"}
                        className={i < review.rating ? "text-gold" : "text-gray-300"}
                    />
                ))}
            </div>

            {/* Text */}
            <p className="text-concrete/80 font-inter text-sm mb-4 flex-grow line-clamp-4 leading-relaxed">
                {review.text}
            </p>

            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400 font-inter">
                <span>{review.relative_time_description}</span>
                <span className="flex items-center gap-1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-4 h-4" />
                    Google
                </span>
            </div>
        </motion.div>
    );
}
