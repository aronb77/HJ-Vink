"use client";

import { motion } from "framer-motion";

export default function RegionMap() {
    return (
        <section className="w-full bg-white border-t border-concrete/5 py-12 md:py-24 overflow-hidden relative">
            <div className="container mx-auto px-4 flex flex-col items-center text-center">

                <h3 className="text-2xl font-manrope font-bold text-concrete mb-8">
                    Actief in de regio
                </h3>

                {/* Abstract Map Visual */}
                <div className="relative w-full max-w-2xl aspect-[2/1] bg-plaster rounded-3xl border border-concrete/5 overflow-hidden flex items-center justify-center">

                    {/* Background Texture for Map Feel */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cartographer.png')" }} />

                    {/* The Radius Circle */}
                    <motion.div
                        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-64 h-64 md:w-96 md:h-96 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center relative backdrop-blur-[2px]"
                    >
                        {/* Center Dot (Kampen) */}
                        <div className="w-4 h-4 bg-gold rounded-full shadow-lg z-10 relative">
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-bold shadow text-concrete">Kampen</span>
                        </div>
                    </motion.div>

                    {/* Simulated nearby cities (Dots) */}
                    <div className="absolute w-2 h-2 bg-concrete/20 rounded-full top-[40%] right-[30%]" title="Zwolle" />
                    <div className="absolute w-2 h-2 bg-concrete/20 rounded-full bottom-[45%] left-[35%]" title="Dronten" />

                </div>

                <p className="mt-8 text-concrete/60 font-inter text-sm max-w-md">
                    Wij werken in een straal van +/- 40km rondom Kampen. Twijfel je of je in ons gebied woont? Stuur gerust een berichtje.
                </p>

            </div>
        </section>
    );
}
