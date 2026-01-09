import { getReviews } from "@/lib/google/getReviews";
import archiveData from "@/data/reviews-archive.json";

export interface Review {
    author_name: string;
    author_url?: string;
    language?: string;
    original_language?: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
    translated?: boolean;
}

export async function getAllReviews(): Promise<Review[]> {
    // 1. Fetch live reviews (LIMIT 5 typically from API)
    let liveReviews: Review[] = [];
    try {
        const result = await getReviews();
        // Map GoogleReview to Review (adding optional fields)
        if (Array.isArray(result)) {
            liveReviews = result.map(r => ({
                ...r,
                author_url: "", // Default empty (not provided by basic API sometimes)
            }));
        }
    } catch (error) {
        console.error("Failed to fetch live reviews:", error);
        // Continue with archive only if live fails
    }

    // 2. Load Archive
    const historicalReviews: Review[] = archiveData as Review[];

    // 3. Merge & Deduplicate
    // We use author_name + time as a unique key
    const uniqueReviews = new Map<string, Review>();

    // Add historical first
    historicalReviews.forEach(review => {
        const key = `${review.author_name}-${review.time}`;
        uniqueReviews.set(key, review);
    });

    // Add/Overwrite with Live (Live data is fresher)
    liveReviews.forEach(review => {
        const key = `${review.author_name}-${review.time}`;
        uniqueReviews.set(key, review);
    });

    // Convert back to array
    const allReviews = Array.from(uniqueReviews.values());

    // 4. Sort by date (Newest first)
    // 'time' is usually a unix timestamp
    return allReviews.sort((a, b) => b.time - a.time);
}
