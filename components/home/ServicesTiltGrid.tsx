"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

type ServiceProps = {
    title: string;
    description: string;
    href: string;
    image: string;
};

export default function ServicesTiltGrid() {
    const services = [
        {
            title: "Stucwerk & Pleister",
            description: "Strakke wanden en plafonds. Van sausklaar tot betonlook.",
            href: "/diensten/stucwerk",
            image: "https://images.unsplash.com/photo-1594908079632-4d2c7ba64486?auto=format&fit=crop&q=80", // Clean white wall
        },
        {
            title: "Spackspuiten",
            description: "De voordelige en snelle afwerking. Ideaal voor nieuwbouw.",
            href: "/diensten/spackspuiten",
            image: "https://images.unsplash.com/photo-1558603668-6570496b66f8?auto=format&fit=crop&q=80", // Texture close up
        },
        {
            title: "Schilder- & Spuitwerk",
            description: "Sausen, lakken of airless spuiten. Kleur die blijft.",
            href: "/diensten/schilderwerk",
            image: "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?auto=format&fit=crop&q=80", // Colored wall
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div>
                        <span className="text-gold font-bold tracking-wider uppercase text-sm mb-2 block">
                            Diensten
                        </span>
                        <h2 className="text-4xl md:text-5xl font-manrope font-bold text-concrete">
                            Vakmanschap in detail.
                        </h2>
                    </div>
                    <p className="text-concrete/70 max-w-md font-inter">
                        Van ruwe basis tot perfecte afwerking. Wij verzorgen het complete pakket voor wanden en plafonds.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <TiltCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TiltCard({ title, description, href, image }: ServiceProps) {
    return (
        <Link
            href={href}
            className="group block w-full aspect-[3/4] cursor-pointer"
        >
            <div
                className="relative w-full h-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2"
            >
                {/* Background Image */}
                <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                    style={{
                        backgroundImage: `url('${image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" />

                {/* Content */}
                <div
                    className="relative h-full flex flex-col justify-end p-8 z-20"
                >
                    <div>
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center backdrop-blur-sm mb-4 text-gold group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                            <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                        <h3 className="text-2xl font-manrope font-bold text-white mb-2">{title}</h3>
                        <p className="text-white/70 font-inter text-sm leading-relaxed">{description}</p>
                    </div>
                </div>

                {/* Outline Border on Hover */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-gold/50 rounded-xl transition-colors duration-300 z-40 pointer-events-none" />

            </div>
        </Link>
    );
}
