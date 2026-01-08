import { client } from "@/lib/sanity/client";
import ProjectDragSlider, { Project } from "./ProjectDragSlider";

export default async function ProjectShowcase() {
    // Defensive query
    const query = `*[_type == "project"] | order(date desc) [0...8] { 
    title, 
    "slug": slug.current, 
    mainImage, 
    category 
  }`;

    let projects: Project[] = [];

    // Check if we are running with dummy/missing credentials
    // If so, skip the actual fetch to avoid "Dataset not found" crashing the server component
    const isMock = !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'dummy-project-id';

    if (isMock) {
        console.log("Using mock data for Project Showcase (No Sanity Config)");
        projects = [
            { title: "Villa Kampen", slug: "villa-kampen", category: "Stucwerk", mainImage: null },
            { title: "Renovatie Boerderij", slug: "renovatie-boerderij", category: "Schilderwerk", mainImage: null },
            { title: "Nieuwbouw Zwolle", slug: "nieuwbouw-zwolle", category: "Spackspuiten", mainImage: null }
        ] as any;
    } else {
        try {
            projects = await client.fetch(query);
        } catch (error) {
            console.error("Sanity fetch failed:", error);
        }
    }

    if (!projects || projects.length === 0) {
        return null;
    }

    return (
        <section className="bg-concrete-dark py-24 overflow-hidden text-white relative">
            <div className="container mx-auto px-4 mb-12 flex flex-col items-center text-center">
                <span className="text-gold font-bold tracking-wider uppercase text-sm mb-2 block">
                    Portfolio
                </span>
                <h2 className="text-4xl md:text-5xl font-manrope font-bold text-white mb-6">
                    Recente Projecten.
                </h2>
                <p className="text-white/60 max-w-xl font-inter">
                    Een selectie van ons werk. Van particuliere woningen tot zakelijke projecten.
                </p>
            </div>

            <ProjectDragSlider projects={projects} />
        </section>
    );
}
