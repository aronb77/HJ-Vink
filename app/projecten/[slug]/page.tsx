import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";
import FloatingWizardButton from "@/components/ui/FloatingWizardButton";

// Revalidate every hour
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const project = await getProject(params.slug);
    if (!project) return { title: "Project niet gevonden" };
    return {
        title: `${project.title} | H.J. Vink Afbouw`,
        description: project.description,
    };
}

async function getProject(slug: string) {
    if (client.config().projectId === 'dummy-project-id') {
        // Return mock data for development without valid credentials
        return {
            title: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
            slug: { current: slug },
            mainImage: "https://images.unsplash.com/photo-1620626012053-93f88c95e632?q=80&w=2670&auto=format&fit=crop",
            category: "stucwerk",
            description: "Dit is een voorbeeldproject. Omdat er nog geen actieve Sanity connectie is, wordt deze dummy data getoond. Hier zou normaal de uitgebreide omschrijving van het project staan, met details over de uitgevoerde werkzaamheden en specifieke wensen van de klant.",
            date: new Date().toISOString(),
            gallery: [
                "https://images.unsplash.com/photo-1594908079632-4d2c7ba64486?q=80&w=2670&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1558603668-6570496b66f8?q=80&w=2574&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"
            ],
            beforeImage: null
        };
    }

    const query = `*[_type == "project" && slug.current == $slug][0]{
        title,
        mainImage,
        category,
        description,
        date,
        gallery,
        beforeImage
    }`;
    return client.fetch(query, { slug });
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const project = await getProject(params.slug);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Project niet gevonden.</p>
                <Link href="/projecten" className="ml-4 underline">Terug naar overzicht</Link>
            </div>
        );
    }

    return (
        <main className="bg-white min-h-screen pb-20">
            {/* Hero Image */}
            <div className="relative h-[60vh] w-full bg-concrete-dark">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${typeof project.mainImage === 'string'
                            ? project.mainImage
                            : urlFor(project.mainImage).width(1920).height(1080).url()
                            })`
                    }}
                />
                <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="container mx-auto">
                        <Link href="/projecten" className="inline-flex items-center text-white/70 hover:text-gold mb-6 transition-colors">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Terug naar overzicht
                        </Link>

                        <span className="text-gold font-bold tracking-widest uppercase text-sm block mb-2">
                            {project.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-manrope font-bold text-white max-w-4xl">
                            {project.title}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Info Column */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-manrope font-bold text-concrete mb-6">Over dit project</h2>
                    {project.description ? (
                        <div className="prose prose-lg text-concrete/80 font-inter">
                            <p>{project.description}</p>
                        </div>
                    ) : (
                        <p className="text-concrete/60 italic">Geen beschrijving beschikbaar.</p>
                    )}

                    {/* Gallery Grid */}
                    {project.gallery && project.gallery.length > 0 && (
                        <div className="mt-16">
                            <h3 className="text-xl font-bold text-concrete mb-6">Galerij</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.gallery.map((image: any, index: number) => (
                                    <div key={index} className="aspect-square relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                                            style={{
                                                backgroundImage: `url(${typeof image === 'string'
                                                    ? image
                                                    : urlFor(image).width(800).height(800).url()
                                                    })`
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Details */}
                <div className="space-y-8">
                    <div className="bg-concrete-light/30 p-8 rounded-2xl border border-concrete/5">
                        <h3 className="text-lg font-bold text-concrete mb-6">Details</h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-concrete/80">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gold shadow-sm">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-concrete/50">Datum</p>
                                    <p className="font-medium">
                                        {project.date ? new Date(project.date).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long' }) : 'Onbekend'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-concrete/80">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gold shadow-sm">
                                    <Tag className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-concrete/50">Categorie</p>
                                    <p className="font-medium capitalize">{project.category}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-concrete/80">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gold shadow-sm">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-concrete/50">Regio</p>
                                    <p className="font-medium">Kampen / Zwolle</p> {/* Hardcoded for now, or add to schema */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Card */}
                    <div className="bg-concrete-dark p-8 rounded-2xl text-white text-center">
                        <h3 className="text-xl font-bold mb-4">Overtuigd?</h3>
                        <p className="text-white/70 mb-6 text-sm">
                            Vraag direct een vrijblijvende offerte aan voor uw project.
                        </p>
                        {/* The Floating Button is global, but maybe we want an explicit button here too */}
                        {/* Ideally we trigger the wizard. For now, let's just use the global button which is always there. */}
                        <p className="text-xs text-gold/80 italic">
                            Klik op de knop rechtsonder om te starten &rarr;
                        </p>
                    </div>
                </div>

            </div>

            {/* Provide Floating Button context if needed, mostly it's in layout */}
            <FloatingWizardButton />
        </main>
    );
}
