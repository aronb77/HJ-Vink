"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ClipboardList, Paintbrush, ShieldCheck, ThumbsUp } from "lucide-react";
import { useRef } from "react";

const steps = [
    {
        icon: <ClipboardList className="w-6 h-6" />,
        title: "Offerte",
        description: "Duidelijk & Vrijblijvend",
    },
    {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: "Afplakken",
        description: "Bescherming van vloer & meubels",
    },
    {
        icon: <Paintbrush className="w-6 h-6" />,
        title: "Uitvoering",
        description: "Vakmannen aan het werk",
    },
    {
        icon: <ThumbsUp className="w-6 h-6" />,
        title: "Oplevering",
        description: "Schoon & Gecontroleerd",
    },
];

export default function ProcessTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Simple progress bar that fills as we scroll through the section
    const width = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="py-24 bg-plaster relative overflow-hidden">
            <div className="container mx-auto px-4">

                <div className="text-center mb-16">
                    <span className="text-gold font-bold tracking-wider uppercase text-sm mb-2 block">
                        Zorgeloos Afbouwen
                    </span>
                    <h2 className="text-3xl md:text-4xl font-manrope font-bold text-concrete">
                        Van begin tot eind geregeld.
                    </h2>
                </div>

                {/* Timeline Container */}
                <div className="relative">

                    {/* The Track (Grey Line) */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-concrete/10 -translate-y-1/2 hidden md:block" />

                    {/* The Progress (Gold Line) */}
                    <motion.div
                        className="absolute top-1/2 left-0 h-1 bg-gold -translate-y-1/2 hidden md:block origin-left"
                        style={{ width }}
                    />

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="flex flex-col items-center text-center bg-white md:bg-transparent p-6 md:p-0 rounded-xl shadow-sm md:shadow-none"
                            >
                                {/* Dot / Icon Circle */}
                                <div className="w-16 h-16 rounded-full bg-white border-2 border-concrete/10 flex items-center justify-center text-concrete mb-4 shadow-sm relative z-20">
                                    <span className="text-gold">{step.icon}</span>
                                </div>

                                <h4 className="font-manrope font-bold text-lg text-concrete mb-1">{step.title}</h4>
                                <p className="font-inter text-sm text-concrete/60">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}
