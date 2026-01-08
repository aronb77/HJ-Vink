"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function WallAnatomy() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Layer Animations mapped to scroll progress
    // 0-0.25: Step 1 (Primer)
    // 0.25-0.5: Step 2 (Stuc)
    // 0.5-0.75: Step 3 (Finish)
    // 0.75-1.0: Step 4 (Latex)

    const primerOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
    const stucHeight = useTransform(scrollYProgress, [0.3, 0.45], ["0%", "100%"]);
    const finishWidth = useTransform(scrollYProgress, [0.55, 0.7], ["0%", "100%"]);
    const latexOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-plaster">
            <div className="sticky top-0 h-screen flex flex-col md:flex-row overflow-hidden">

                {/* LEFT: VISUAL WALL (Sticky) */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-8 md:p-16 bg-concrete/5">
                    <div className="relative w-full max-w-md aspect-[4/5] shadow-2xl rounded-lg overflow-hidden border-8 border-white bg-white">

                        {/* 0. BASE LAYER (Brick) */}
                        <div className="absolute inset-0 bg-red-900">
                            <div
                                className="absolute inset-0 opacity-80"
                                style={{
                                    backgroundImage: "url('https://images.unsplash.com/photo-1543355209-410d540e1329?auto=format&fit=crop&q=80')",
                                    backgroundSize: 'cover'
                                }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white/20 font-manrope font-bold text-4xl uppercase -rotate-45">Ruwbouw</span>
                            </div>
                        </div>

                        {/* 1. PRIMER LAYER (Yellow Tint) */}
                        <motion.div
                            style={{ opacity: primerOpacity }}
                            className="absolute inset-0 bg-yellow-400/30 backdrop-blur-[1px] z-10"
                        >
                            <div className="absolute bottom-4 right-4 bg-yellow-500 text-white text-xs px-2 py-1 font-bold rounded">1. Hechting</div>
                        </motion.div>

                        {/* 2. STUC LAYER (Grey Texture - Vertical Wipe) */}
                        <motion.div
                            style={{ height: stucHeight }}
                            className="absolute top-0 left-0 right-0 bg-gray-300 z-20 overflow-hidden border-b-4 border-gray-400/20"
                        >
                            <div
                                className="absolute inset-0 opacity-60"
                                style={{
                                    backgroundImage: "url('https://images.unsplash.com/photo-1599700403969-f77b314d7c5f?auto=format&fit=crop&q=80')",
                                    backgroundSize: 'cover'
                                }}
                            />
                            <div className="absolute bottom-4 right-4 bg-gray-600 text-white text-xs px-2 py-1 font-bold rounded">2. Uitvlakken</div>
                        </motion.div>

                        {/* 3. FINISH LAYER (White Smooth - Horizontal Wipe) */}
                        <motion.div
                            style={{ width: finishWidth }}
                            className="absolute top-0 bottom-0 left-0 bg-white z-30 overflow-hidden shadow-[5px_0_10px_rgba(0,0,0,0.1)]"
                        >
                            <div className="absolute bottom-4 right-4 bg-concrete text-white text-xs px-2 py-1 font-bold rounded">3. Finish</div>
                        </motion.div>

                        {/* 4. LATEX LAYER (Color - Fade) */}
                        <motion.div
                            style={{ opacity: latexOpacity }}
                            className="absolute inset-0 bg-[#E6DAC3] z-40 mix-blend-multiply" // Using a warm beige/zand color
                        >
                            <div
                                className="absolute inset-0 opacity-30"
                                style={{
                                    backgroundImage: "url('https://www.transparenttextures.com/patterns/concrete-wall.png')"
                                }}
                            />
                            <div className="absolute bottom-4 right-4 bg-[#C2B280] text-white text-xs px-2 py-1 font-bold rounded">4. Kleur</div>
                        </motion.div>

                    </div>
                </div>

                {/* RIGHT: CONTENT (Scrolling Text Blocks) */}
                {/* These blocks act as the "spacers" that drive the scroll height */}
                <div className="w-full md:w-1/2 relative bg-plaster">

                    {/* Step 1: Primer */}
                    <div className="h-screen flex flex-col justify-center px-8 md:px-16 md:pr-24">
                        <span className="text-gold font-bold text-sm tracking-widest uppercase mb-4">Stap 1</span>
                        <h3 className="text-4xl font-manrope font-bold text-concrete mb-6">De Basis & Hechting</h3>
                        <p className="text-concrete/70 font-inter text-lg leading-relaxed">
                            Alles begint met inspectie. We plakken alles zorgvuldig af en brengen een professioneel hechtmiddel (primer) aan. Dit zorgt ervoor dat het stucwerk muurvast blijft zitten en niet loslaat.
                        </p>
                    </div>

                    {/* Step 2: Stuc */}
                    <div className="h-screen flex flex-col justify-center px-8 md:px-16 md:pr-24">
                        <span className="text-gold font-bold text-sm tracking-widest uppercase mb-4">Stap 2</span>
                        <h3 className="text-4xl font-manrope font-bold text-concrete mb-6">Het Uitvlakken</h3>
                        <p className="text-concrete/70 font-inter text-lg leading-relaxed">
                            De dikke laag (raaplaag). Hiermee maken we kromme muren weer kaarsrecht. We zetten de muren "in het lood" zodat plinten en kasten straks naadloos aansluiten.
                        </p>
                    </div>

                    {/* Step 3: Finish */}
                    <div className="h-screen flex flex-col justify-center px-8 md:px-16 md:pr-24">
                        <span className="text-gold font-bold text-sm tracking-widest uppercase mb-4">Stap 3</span>
                        <h3 className="text-4xl font-manrope font-bold text-concrete mb-6">Het Messen & Sponzen</h3>
                        <p className="text-concrete/70 font-inter text-lg leading-relaxed">
                            De finish. We pleisteren de laag tot deze spiegelglad is (sausklaar) of werken hem af met een fijne structuur. Dit is waar het echte vakmanschap zichtbaar wordt.
                        </p>
                    </div>

                    {/* Step 4: Latex */}
                    <div className="h-screen flex flex-col justify-center px-8 md:px-16 md:pr-24">
                        <span className="text-gold font-bold text-sm tracking-widest uppercase mb-4">Stap 4</span>
                        <h3 className="text-4xl font-manrope font-bold text-concrete mb-6">De Kleur</h3>
                        <p className="text-concrete/70 font-inter text-lg leading-relaxed">
                            Na volledige droging spuiten we de wand in jouw droomkleur met onze airless spuitmachine. Het resultaat is streeploos, egaal en direct helemaal af.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
