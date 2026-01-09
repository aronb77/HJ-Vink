"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

type Hotspot = {
    id: number;
    top: number; // percentage
    left: number; // percentage
    title: string;
    description: string;
    image: string;
    align?: "left" | "right"; // Tooltip alignment
};

const hotspots: Hotspot[] = [
    {
        id: 1,
        top: 60,
        left: 50,
        title: "Vloerbescherming",
        description: "Type 3 stucloper: extra dik, vloeistofdicht en ladder-proof.",
        image: "https://images.unsplash.com/photo-1635323490918-68788a445cb4?auto=format&fit=crop&q=80", // Floor protection placeholder
    },
    {
        id: 2,
        top: 25,
        left: 20,
        title: "Kozijn & Glas",
        description: "Statische folie die hecht zonder lijmresten. 100% veilig voor uw lakwerk.",
        image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80", // Window placeholder
    },
    {
        id: 3,
        top: 40,
        left: 75,
        title: "Detail Afplakwerk",
        description: "Stopcontacten en schakelaars worden gedemonteerd en inwendig afgeplakt.",
        image: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&q=80", // Socket/Switch details
        align: "right"
    },
    {
        id: 4,
        top: 85,
        left: 80,
        title: "De Schone Inloop",
        description: "Dubbele loper vanaf de voordeur tot de werkplek. Geen vieze voeten in huis.",
        image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80", // Hallway/Entry
        align: "right"
    }
];

export default function ProtectionBlueprint() {
    const [activeId, setActiveId] = useState<number | null>(null);

    return (
        <section className="bg-slate-900 py-24 relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            ></div>

            <div className="container mx-auto px-4 relative z-10">

                {/* 1. Header & Intro */}
                <div className="mb-16 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-manrope font-bold text-white mb-6">
                            Het Beschermplan.
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed font-inter">
                            Wij behandelen uw interieur als een operatiekamer. Voordat er een spaan de muur raakt,
                            wordt alles chirurgisch afgedekt met ons 4-punts veiligheidssysteem.
                        </p>
                    </motion.div>
                </div>

                {/* 2. De Blauwdruk Visualisatie Container */}
                <motion.div
                    className="relative w-full aspect-[4/3] md:aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Background Blueprint Image - Darkened */}
                    <Image
                        src="/images/blueprint-floorplan.png"
                        alt="Technical Blueprint"
                        fill
                        className="object-cover opacity-60 mix-blend-screen"
                    />

                    {/* Extra overlay for contrast */}
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-color"></div>

                    {/* 3. Hotspots */}
                    {hotspots.map((spot) => (
                        <div
                            key={spot.id}
                            className="absolute"
                            style={{ top: `${spot.top}%`, left: `${spot.left}%` }}
                            onMouseEnter={() => setActiveId(spot.id)}
                            onMouseLeave={() => setActiveId(null)}
                            // Mobile fallback: Toggle on tap
                            onClick={() => setActiveId(activeId === spot.id ? null : spot.id)}
                        >
                            <div className="relative -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
                                {/* The pulsing outer ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-cyan-400/30"
                                    animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ width: "100%", height: "100%" }}
                                />

                                {/* The solid dot */}
                                <div className={`relative w-6 h-6 rounded-full border-2 border-white transition-all duration-300 ${activeId === spot.id ? 'bg-cyan-400 scale-125' : 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]'}`}></div>

                                {/* Tooltip Card */}
                                <AnimatePresence>
                                    {activeId === spot.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className={`absolute z-20 top-8 ${spot.align === 'right' ? 'right-0' : 'left-0 md:-left-12'} w-64 md:w-72 bg-white rounded-lg shadow-2xl p-4 border border-slate-100`}
                                        >
                                            <div className="relative aspect-video w-full rounded bg-slate-100 mb-3 overflow-hidden">
                                                <Image
                                                    src={spot.image}
                                                    alt={spot.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <h4 className="font-manrope font-bold text-slate-900 mb-1">{spot.title}</h4>
                                            <p className="text-sm text-slate-600 leading-snug">{spot.description}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}

                    {/* Blueprint Labels (Decorative) */}
                    <div className="absolute bottom-6 right-6 font-mono text-xs text-cyan-500/50 border border-cyan-500/30 px-3 py-1 rounded">
                        PLAN: PROTECTION_LVL_3
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
