"use client";

import { motion } from "framer-motion";

export default function HeroScratchReveal() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-concrete">
            {/* 
            STANDARD HERO: THE RESULT
            Showing the clean, finished look directly without hover effects.
            */}
            <div className="absolute inset-0 z-0 bg-plaster flex items-center justify-center">
                {/* Background Image: Clean Wall */}
                <div
                    className="absolute inset-0 opacity-100"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Optional lightweight overlay if text needs contrast */}
                    <div className="absolute inset-0 bg-white/10" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center max-w-4xl px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-7xl font-bold font-manrope text-concrete mb-6"
                    >
                        Van ruwbouw naar rust.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-2xl text-concrete/80 font-inter mb-10 max-w-2xl mx-auto"
                    >
                        Stuc- en schilderwerk waar je naar blijft kijken. Vakmanschap in regio Kampen.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-gold text-concrete hover:bg-[#c29d2b] transition-colors font-bold py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 duration-200"
                    >
                        Bekijk mijn werk
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
