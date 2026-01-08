import { client } from "@/lib/sanity/client";
import ProjectGallery from "@/components/projects/ProjectGallery";

// Revalidate every hour
export const revalidate = 3600;

export default async function ProjectsPage() {
    // Determine the query
    // We only want projects that have a slug and title
    const query = `*[_type == "project" && defined(slug.current)] | order(date desc) {
        title,
        "slug": slug.current,
        mainImage,
        category
    }`;

    // Check for dummy project ID to avoid crash
    if (client.config().projectId === 'dummy-project-id') {
        const mockProjects = [
            {
                title: "Villa Renovatie Kampen",
                slug: "villa-renovatie-kampen",
                category: "stucwerk",
                mainImage: "https://images.unsplash.com/photo-1620626012053-93f88c95e632?q=80&w=2670&auto=format&fit=crop"
            },
            {
                title: "Nieuwbouw Appartement",
                slug: "nieuwbouw-appartement",
                category: "spackspuiten",
                mainImage: "https://images.unsplash.com/photo-1594908079632-4d2c7ba64486?q=80&w=2670&auto=format&fit=crop"
            },
            {
                title: "Monumentaal Pand",
                slug: "monumentaal-pand",
                category: "decoratief",
                mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"
            }
        ];
        return (
            <main className="min-h-screen bg-white">
                <ProjectGallery projects={mockProjects} />
            </main>
        );
    }

    // Fetch data
    const projects = await client.fetch(query);

    return (
        <main className="min-h-screen bg-white">
            <ProjectGallery projects={projects} />
        </main>
    );
}

// Metadata
export const metadata = {
    title: "Projecten | H.J. Vink Afbouw",
    description: "Bekijk onze gerealiseerde projecten in Kampen en omgeving. Van stucwerk en spuitwerk tot decoratieve wandafwerking.",
};
