"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, User } from "lucide-react";
import { Review } from "@/lib/reviews/allReviews";

export default function ReviewsGrid({ reviews }: { reviews: Review[] }) {
    const [displayCount, setDisplayCount] = useState(20);

    const visibleReviews = reviews.slice(0, displayCount);
    const hasMore = displayCount < reviews.length;

    const loadMore = () => {
        setDisplayCount(prev => prev + 20);
    };

    return (
        <div className="container mx-auto px-4 pb-24">

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mb-16">
                <AnimatePresence>
                    {visibleReviews.map((review, i) => (
                        <motion.div
                            key={`${review.author_name}-${review.time}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i % 3 * 0.1 }}
                            className="break-inside-avoid bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 flex flex-col"
                        >
                            {/* Header: Avatar, Name, Date */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
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
                                                <User size={20} />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-manrope font-bold text-sm text-concrete">{review.author_name}</h3>
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <span>{review.relative_time_description}</span>
                                            <span>•</span>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" className="w-3 h-3 grayscale opacity-50" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-3 text-gold">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        fill={i < review.rating ? "currentColor" : "none"}
                                        className={i < review.rating ? "text-gold" : "text-gray-300"}
                                    />
                                ))}
                            </div>

                            {/* Body */}
                            <p className="text-concrete/80 font-inter text-sm leading-relaxed whitespace-pre-line">
                                {review.text}
                            </p>

                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className="flex justify-center">
                    <button
                        onClick={loadMore}
                        className="bg-white border border-gray-200 text-concrete font-bold py-3 px-8 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                    >
                        Laad meer ervaringen ({reviews.length - displayCount} over)
                    </button>
                </div>
            )}
        </div>
    );
}
