"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ServicesHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring for the lens movement
    const springConfig = { damping: 30, stiffness: 200 };
    const lensX = useSpring(mouseX, springConfig);
    const lensY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isMobile || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    // Convert exact X/Y to a gradient string for the mask
    const maskImage = useTransform(
        [lensX, lensY],
        ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, black 0px, black 120px, transparent 200px)`
    );

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative h-[70vh] w-full bg-plaster flex flex-col items-center justify-center overflow-hidden cursor-none select-none"
        >
            {/* BASE LAYER (Monochrome style) - Always Visible Background */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 select-none">
                <h1 className="font-playfair italic text-2xl md:text-3xl text-concrete/40 mb-2">
                    De anatomie van -
                </h1>
                <h2 className="font-manrope font-extrabold text-5xl md:text-8xl text-concrete tracking-tight text-center">
                    DE PERFECTE WAND
                </h2>
                <p className="mt-6 md:mt-8 font-inter text-concrete/40 text-sm md:text-lg tracking-wide uppercase">
                    Van spack tot spiegelglad
                </p>
            </div>

            {/* REVEAL LAYER (Masked - Gold & Texture) - Only Visible via Mask */}
            <motion.div
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white select-none"
                style={{
                    WebkitMaskImage: maskImage, // Use the transform here
                    maskImage: maskImage,
                }}
            >
                {/* Background Texture Logic */}
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1599700403969-f77b314d7c5f?auto=format&fit=crop&q=80')`,
                        backgroundSize: 'cover',
                        filter: 'contrast(1.2)'
                    }}
                />

                {/* The Gold Content */}
                <div className="relative flex flex-col items-center justify-center p-4 z-10">
                    <h1 className="font-playfair italic text-2xl md:text-3xl text-gold mb-2 drop-shadow-sm">
                        De anatomie van
                    </h1>
                    <h2 className="font-manrope font-extrabold text-5xl md:text-8xl text-gold tracking-tight text-center drop-shadow-md">
                        DE PERFECTE WAND
                    </h2>
                    <p className="mt-6 md:mt-8 font-inter text-gold/80 text-sm md:text-lg tracking-wide uppercase font-bold">
                        Van spack tot spiegelglad
                    </p>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 z-30 text-concrete/30 animate-bounce"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <ArrowDown className="w-6 h-6" />
            </motion.div>

        </section>
    );
}
