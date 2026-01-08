export type GoogleReview = {
    author_name: string;
    profile_photo_url: string;
    rating: number;
    text: string;
    relative_time_description: string;
    time: number;
};

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;

export async function getReviews(): Promise<GoogleReview[]> {
    if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
        console.warn("Missing Google Place ID or API Key. Returning empty reviews.");
        return [];
    }

    try {
        // Using the Place Details API (Old style, but robust for basic details) or New Places API.
        // Let's use the standard "Place Details" endpoint which is reliably supported.
        // fields we need: reviews
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=reviews&key=${GOOGLE_PLACES_API_KEY}&language=nl`;

        const res = await fetch(url, {
            next: { revalidate: 86400 }, // Cache for 24 hours
        });

        if (!res.ok) {
            console.error("Failed to fetch Google Reviews:", res.statusText);
            return [];
        }

        const data = await res.json();

        if (!data.result || !data.result.reviews) {
            return [];
        }

        const reviews: GoogleReview[] = data.result.reviews;

        // Filter and Sort
        const filteredReviews = reviews
            .filter((review) => review.rating >= 4) // Only 4 or 5 stars
            .filter((review) => review.text && review.text.length > 10) // Must have some text
            .sort((a, b) => b.time - a.time); // Newest first

        return filteredReviews;
    } catch (error) {
        console.error("Error fetching Google Reviews:", error);
        return [];
    }
}
