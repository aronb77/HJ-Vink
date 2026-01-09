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

// Define the shape of the raw JSON data
interface RawReview {
    title: string;
    url: string;
    stars: number;
    name: string;
    reviewUrl: string;
    text: string | null;
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

    // 2. Load Archive & Map to Review Interface
    // The raw data from JSON needs to be transformed
    const rawArchive = archiveData as RawReview[];

    const historicalReviews: Review[] = rawArchive.map((raw, index) => ({
        author_name: raw.name,
        author_url: raw.reviewUrl,
        language: "nl",
        profile_photo_url: "", // No photo in export
        rating: raw.stars,
        relative_time_description: "Eerder geplaatst",
        text: raw.text || "",
        time: 0, // No timestamp in export, push to end of sort
        translated: false
    }));

    // 3. Merge & Deduplicate
    // We use author_name as a unique key since time is missing in archive
    const uniqueReviews = new Map<string, Review>();

    // Add historical first
    historicalReviews.forEach(review => {
        // Use name as key. 
        uniqueReviews.set(review.author_name, review);
    });

    // Add/Overwrite with Live (Live data is fresher and has better metadata)
    liveReviews.forEach(review => {
        uniqueReviews.set(review.author_name, review);
    });

    // Convert back to array
    const allReviews = Array.from(uniqueReviews.values());

    // 4. Sort by date (Newest first) defines: large time > small time.
    // Live reviews have real timestamps (huge numbers). Archive has 0.
    // So Live reviews will be at the TOP. Archive at BOTTOM.
    // Ideally we'd randomize the archive or keep them in array order?
    // Array.from usually respects insertion order for Map, but let's explicit sort.
    return allReviews.sort((a, b) => {
        // If both have 0 time (unlikely if fetched), keep order
        if (a.time === 0 && b.time === 0) return 0;
        return b.time - a.time;
    });
}
