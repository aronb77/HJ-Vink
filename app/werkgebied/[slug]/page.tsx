import { getCityData } from "@/lib/cities";
import { client } from "@/lib/sanity/client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowUpRight, Clock, MapPin, Wallet } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import RouteVisualizer from "@/components/seo/RouteVisualizer";

import useWizardStore from "@/store/wizardStore"; // We'll need a client component wrapper for this interactive part or just Link to /offerte
import ProjectGallery from "@/components/projects/ProjectGallery"; // We'll need to adapt this or create a wrapper

// We can't use hooks in server components directly for the store, so we'll use a client component for the Hero CTA or just a Link.
import HeroCTA from "@/components/seo/HeroCTA";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const city = getCityData(slug);
    if (!city) return {};

    return {
        title: `Stucadoor ${city.name} | H.J. Vink Afbouw`,
        description: `Op zoek naar een stucadoor in ${city.name}? H.J. Vink Afbouw is uw lokale specialist. Binnen ${city.travelTime} ter plaatse. Vraag een offerte aan.`,
        alternates: {
            canonical: `https://hjvinkafbouw.nl/werkgebied/${slug}`,
        },
    };
}

export default async function LocationPage({ params }: Props) {
    const { slug } = await params;
    const city = getCityData(slug);

    if (!city) {
        notFound();
    }

    // Fetch projects (Scenario B: General highlights if no specific city tag logic yet)
    // In a real implementation, you'd add `&& city == "${city.name}"` to the query
    const query = `*[_type == "project" && defined(slug.current)] | order(date desc) [0...6] {
        title,
        "slug": slug.current,
        mainImage,
        category
    }`;

    let projects = [];

    // Check for dummy project ID to avoid crash or empty state during dev
    if (client.config().projectId === 'dummy-project-id') {
        projects = [
            {
                title: "Villa Renovatie",
                slug: "villa-renovatie-demo",
                category: "stucwerk",
                mainImage: "https://images.unsplash.com/photo-1620626012053-93f88c95e632?q=80&w=2670&auto=format&fit=crop"
            },
            {
                title: "Nieuwbouw Project",
                slug: "nieuwbouw-project-demo",
                category: "spackspuiten",
                mainImage: "https://images.unsplash.com/photo-1594908079632-4d2c7ba64486?q=80&w=2670&auto=format&fit=crop"
            },
            {
                title: "Wandafwerking Luxe",
                slug: "wandafwerking-luxe-demo",
                category: "decoratief",
                mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"
            }
        ];
    } else {
        try {
            projects = await client.fetch(query);
        } catch (e) {
            console.error("Failed to fetch projects", e);
            // keep projects empty
        }
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Stukadoor en Wandafwerking",
        "provider": {
            "@type": "LocalBusiness",
            "name": "H.J. Vink Afbouw",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kampen",
                "postalCode": "8265 TV",
                "streetAddress": "Wadloper 2"
            }
        },
        "areaServed": {
            "@type": "City",
            "name": city.name
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Diensten",
            "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Stucwerk" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Latex Spuiten" } }
            ]
        }
    };

    return (
        <main className="min-h-screen bg-plaster">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* SECTIE 1: DE 'HYPER-LOKALE' HERO (Split Screen) */}
            <section className="relative min-h-[90vh] flex flex-col md:flex-row">
                {/* Left Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 bg-concrete text-white order-2 md:order-1">
                    <div className="mb-6 inline-flex items-center gap-2 text-gold font-bold tracking-wider uppercase text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>Actief in regio {city.name}</span>
                    </div>


                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-manrope font-bold mb-6 leading-tight">
                        {city.slug === 'kampen'
                            ? 'Stukadoor in Kampen? Wij zijn uw buren.'
                            : city.slug === 'dronten'
                                ? 'Stukadoor in Dronten? Strak werk in de polder.'
                                : city.slug === 'ijsselmuiden'
                                    ? 'Stukadoor in IJsselmuiden? Uw overburen staan klaar.'
                                    : city.slug === 'emmeloord'
                                        ? 'Stukadoor in Emmeloord? Snel via de N50.'
                                        : `De standaard voor stucwerk in ${city.name}.`}
                    </h1>

                    <p className="text-lg text-gray-300 mb-10 max-w-lg leading-relaxed">
                        {city.slug === 'kampen'
                            ? "H.J. Vink Afbouw is gevestigd aan de Wadloper 2. Voor projecten in Kampen en IJsselmuiden rekenen wij uiteraard geen voorrijdkosten en zijn we razendsnel ter plaatse."
                            : city.slug === 'dronten'
                                ? "H.J. Vink Afbouw is dé specialist voor de regio Dronten. Via de N307 zijn we in 20 minuten bij u in wijken zoals De Gilden of Dronten-West. Geen voorrijdkosten."
                                : city.slug === 'ijsselmuiden'
                                    ? "H.J. Vink Afbouw steekt graag de stadsbrug over. Of u nu woont op de Sonnenberg of aan de dijk: wij zijn binnen 5 minuten bij u. Uiteraard zonder voorrijdkosten."
                                    : city.slug === 'emmeloord'
                                        ? "H.J. Vink Afbouw bedient de hele Noordoostpolder. Vanuit Kampen rijden we via de N50 in 15 minuten naar wijken zoals Emmelhage. Vakwerk zonder poespas."
                                        : `Op zoek naar vakmanschap? H.J. Vink Afbouw is uw lokale specialist. Vanuit Kampen zijn we in ${city.travelTime} op locatie in wijken zoals ${city.neighborhoods}.`}
                    </p>

                    <HeroCTA cityName={city.name} />
                </div>

                {/* Right Image */}
                <div className="w-full md:w-1/2 relative min-h-[50vh] order-1 md:order-2">
                    {/* Fallback image if city specific image is not available, or use heroScratchReveal asset */}
                    <div className="absolute inset-0">
                        <Image
                            src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80"
                            alt={`Stucadoor aan het werk in ${city.name} - H.J. Vink Afbouw`}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                </div>
            </section>

            {/* SECTIE 2: DE 'TRUST BAR' */}
            <section className="bg-concrete-dark text-white py-12 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">


                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <div className="p-3 bg-white/5 rounded-full text-gold">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="block font-bold">
                                    {city.slug === 'kampen' ? 'Gevestigd in Kampen' : city.slug === 'dronten' ? 'Binnen 20 min ter plaatse' : city.slug === 'ijsselmuiden' ? 'Direct over de brug' : city.slug === 'emmeloord' ? 'Direct aan de N50' : `Binnen ${city.travelTime}`}
                                </span>
                                <span className="text-sm text-gray-400">{city.slug === 'kampen' ? 'Geen reistijd' : 'ter plaatse'}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <div className="p-3 bg-white/5 rounded-full text-gold">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="block font-bold">{city.slug === 'dronten' ? 'Specialist in Dunpleister' : city.slug === 'ijsselmuiden' ? 'Bekend op de Sonnenberg' : city.slug === 'emmeloord' ? 'Veel werk in Emmelhage' : '20+ Jaar ervaring'}</span>
                                {city.slug === 'kampen'
                                    ? <span className="text-sm text-gray-400">Een begrip in de regio</span>
                                    : city.slug === 'dronten'
                                        ? <span className="text-sm text-gray-400">Ideaal voor nieuwbouw</span>
                                        : city.slug === 'ijsselmuiden'
                                            ? <span className="text-sm text-gray-400">Nieuwbouw expertise</span>
                                            : city.slug === 'emmeloord'
                                                ? <span className="text-sm text-gray-400">Nieuwbouw Emmelhage</span>
                                                : <span className="text-sm text-gray-400">in de regio</span>
                                }
                            </div>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <div className="p-3 bg-white/5 rounded-full text-gold">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="block font-bold">
                                    {city.slug === 'kampen' ? 'Showroom bezoek' : city.slug === 'dronten' ? 'Ook voor grote metrages' : city.slug === 'ijsselmuiden' ? 'Snel schakelen' : city.slug === 'emmeloord' ? 'Polder mentaliteit' : 'Geen voorrijdkosten'}
                                </span>
                                <span className="text-sm text-gray-400">
                                    {city.slug === 'kampen' ? 'Mogelijk op afspraak' : city.slug === 'dronten' ? 'Efficiënt met airless' : city.slug === 'ijsselmuiden' ? 'Vakman uit de buurt' : city.slug === 'emmeloord' ? 'Afspraak = afspraak' : `in ${city.name}`}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTIE 3: LOKAAL WERK */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="mb-12 max-w-3xl">
                        <span className="text-gold font-bold tracking-wider uppercase text-sm mb-2 block">
                            Portfolio
                        </span>
                        <h2 className="text-3xl md:text-5xl font-manrope font-bold text-concrete mb-4">
                            Ons werk in {city.name} en omgeving.
                        </h2>
                        <p className="text-concrete/60 text-lg">
                            {/* This could be dynamic based on if we have projects or not, for now generic favorable text */}
                            We hebben diverse projecten gerealiseerd in de regio. Bekijk hieronder een selectie van ons vakwerk.
                        </p>
                    </div>

                    {/* Using existing ProjectGallery - ideally we modify it to accept a filter prop */}
                    {/* For now, we will just show the gallery. In a real scenario we'd pass a tag filter. */}
                    <ProjectGallery projects={projects} cityName={city.name} />
                </div>
            </section>

            {/* SECTIE 4: DE 'WHY US' IN {CITY} */}
            <section className="py-24 bg-plaster">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Image */}
                        <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507646636738-41b6547bed7d?auto=format&fit=crop&q=80')` }}
                            />
                        </div>

                        {/* Right Points */}
                        <div>
                            <span className="text-gold font-bold tracking-wider uppercase text-sm mb-2 block">
                                Waarom H.J. Vink?
                            </span>
                            <h2 className="text-3xl md:text-4xl font-manrope font-bold text-concrete mb-10">
                                Waarom kiezen voor H.J. Vink in {city.name}?
                            </h2>

                            <div className="space-y-8">

                                {/* Point 1: USP */}
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gold shadow-sm font-bold font-manrope text-xl">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-concrete mb-2">
                                            {city.slug === 'dronten' ? 'Nieuwbouw Specialisme' : city.slug === 'ijsselmuiden' ? 'Nieuwbouw Expertise' : city.slug === 'emmeloord' ? 'Project Emmelhage' : 'Lokale Kennis'}
                                        </h3>
                                        <p className="text-concrete/70 leading-relaxed">
                                            {city.slug === 'kampen'
                                                ? "Wij kennen de Kamper huizenmarkt. Of het nu gaat om vochtproblemen in een oud pand in Brunnepe of dunpleister in de nieuwbouw van het Onderdijks; wij hebben de oplossing."
                                                : city.slug === 'dronten'
                                                    ? "Veel ervaring in Dronten-West en De Gilden. De betonnen wanden in de polder lenen zich perfect voor onze Dunpleister techniek: goedkoper dan stucwerk, maar net zo glad."
                                                    : city.slug === 'ijsselmuiden'
                                                        ? "Gaat u wonen in de nieuwbouw op de Sonnenberg? Wij zijn gespecialiseerd in het behangklaar maken en dunpleisteren van deze nieuwbouwwoningen. Strakker kan niet."
                                                        : city.slug === 'emmeloord'
                                                            ? "Heeft u een woning gekocht in Emmelhage? De strakke betonwanden in deze fase werken wij razendsnel af met dunpleister. Goedkoper dan traditioneel stucen, en spiegelglad."
                                                            : city.uspText}
                                        </p>
                                    </div>
                                </div>

                                {/* Point 2: Speed */}
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gold shadow-sm font-bold font-manrope text-xl">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-concrete mb-2">
                                            {city.slug === 'kampen' ? 'Groot Netwerk' : city.slug === 'dronten' ? 'Grote Oppervlaktes' : city.slug === 'ijsselmuiden' ? 'Oude Dorp' : city.slug === 'emmeloord' ? 'Renovatie' : 'Snelheid & Netheid'}
                                        </h3>
                                        <p className="text-concrete/70 leading-relaxed">
                                            {city.slug === 'kampen'
                                                ? "Korte lijntjes met andere Kamper aannemers en installateurs."
                                                : city.slug === 'dronten'
                                                    ? "Dronten staat bekend om ruime woningen. Met onze spuitmachines werken we grote woonkamers en plafonds razendsnel af, zonder strepen."
                                                    : city.slug === 'ijsselmuiden'
                                                        ? "Ook voor renovaties aan de Groenendijk of in de oude dorpskern draaien we onze hand niet om. Wij maken kromme muren weer recht."
                                                        : city.slug === 'emmeloord'
                                                            ? "Ook voor de oudere woningen in De Erven of rondom de Poldertoren draaien wij onze hand niet om. Wij maken verouderde muren weer strak en sausklaar."
                                                            : "Omdat we om de hoek zitten, kunnen we snel schakelen. We werken stofarm en laten alles netjes achter."}
                                        </p>
                                    </div>
                                </div>

                                {/* Point 3: Complete */}
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-gold shadow-sm font-bold font-manrope text-xl">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-concrete mb-2">
                                            {city.slug === 'dronten' ? 'De Buurman' : city.slug === 'ijsselmuiden' ? 'Lokaal' : city.slug === 'emmeloord' ? 'De Klik' : 'Totaalafbouw'}
                                        </h3>
                                        <p className="text-concrete/70 leading-relaxed">
                                            {city.slug === 'dronten'
                                                ? "Wij komen al jaren over de brug. We kennen de weg en de mentaliteit in de polder."
                                                : city.slug === 'ijsselmuiden'
                                                    ? "Geen aannemer van ver die u nooit meer ziet, maar een vakman uit de buurt waar u makkelijk even mee schakelt."
                                                    : city.slug === 'emmeloord'
                                                        ? "Wij houden van de poldermentaliteit: niet lullen maar poetsen. U wilt gewoon strak werk voor een eerlijke prijs, en dat is precies wat wij leveren."
                                                        : "Van raapwerk tot de laatste laag latex spuitwerk. Eén aanspreekpunt voor uw hele woning."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTIE 5: DE 'ROUTE VISUALIZER' */}
            <RouteVisualizer
                cityName={city.name}
                travelTime={city.travelTime}
                coordinates={city.coordinates}
            />

            {/* SECTIE 6: FOOTER CTA */}

        </main>
    );
}
