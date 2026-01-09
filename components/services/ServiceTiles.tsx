"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

type ServiceType = "featured" | "standard";

interface ServiceItem {
    id: number;
    title: string;
    description: string;
    type: ServiceType;
    image: string;
}

const services: ServiceItem[] = [
    // FEATURED (Row 1)
    {
        id: 1,
        title: "Glad Stucwerk",
        description: "De basis van elk strak interieur. Wij maken wanden en plafonds spiegelglad (sausklaar) of strak afgewerkt voor behang.",
        type: "featured",
        image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80",
    },
    {
        id: 2,
        title: "Airless Latex Spuiten",
        description: "Het moderne alternatief voor de roller. Streeploos aanbrengen van latex voor een egaal en super strak resultaat.",
        type: "featured",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80",
    },

    // STANDARD (Row 2)
    {
        id: 3,
        title: "Spackspuiten",
        description: "Snel, voordelig en duurzaam. Een korrelstructuur die direct is afgewerkt.",
        type: "standard",
        image: "https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&q=80",
    },
    {
        id: 4,
        title: "Betonlook & Design",
        description: "Exclusieve wandafwerkingen voor badkamers en keukens. Robuust en waterdicht.",
        type: "standard",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80",
    },
    {
        id: 5,
        title: "Renovlies Behang",
        description: "De look van stucwerk, maar dan stootvaster. Ideaal voor nieuwbouw woningen.",
        type: "standard",
        image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80",
    },
];

export default function ServiceTiles() {
    return (
        <section className="py-24 bg-plaster">
            <div className="container mx-auto px-4">

                {/* HEADER */}
                <div className="mb-16 max-w-2xl">
                    <span className="text-gold font-bold tracking-wider uppercase text-sm mb-2 block">
                        Onze Expertise
                    </span>
                    <h2 className="text-4xl md:text-5xl font-manrope font-bold text-concrete mb-6">
                        Voor elke wand <br /> een oplossing.
                    </h2>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8 auto-rows-[400px]">
                    {services.map((service) => (
                        <ServiceCard key={service.id} item={service} />
                    ))}
                </div>

            </div>
        </section>
    );
}

function ServiceCard({ item }: { item: ServiceItem }) {
    const isFeatured = item.type === "featured";

    // Grid Span Logic
    const colSpanClass = isFeatured ? "md:col-span-3" : "md:col-span-2";

    return (
        <motion.div
            className={`relative group overflow-hidden rounded-2xl cursor-pointer ${colSpanClass} bg-concrete`}
            initial="rest"
            whileHover="hover"
            animate="rest"
        >
            {/* Background Image */}
            <motion.div
                className="absolute inset-0 w-full h-full"
                variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.05 }
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </motion.div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <div className="flex items-center gap-3 mb-2">
                    <h3 className={`font-manrope font-bold text-white ${isFeatured ? 'text-3xl' : 'text-2xl'}`}>
                        {item.title}
                    </h3>
                    <motion.span
                        variants={{
                            rest: { opacity: 0, x: -10 },
                            hover: { opacity: 1, x: 0 }
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <ArrowRight className="w-5 h-5 text-gold" />
                    </motion.span>
                </div>

                <p className="text-gray-300 font-inter font-light text-sm md:text-base max-w-md leading-relaxed">
                    {item.description}
                </p>
            </div>
        </motion.div>
    );
}
