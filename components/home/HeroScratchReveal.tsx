"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Move } from "lucide-react";

export default function HeroScratchReveal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Mouse position state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse movement for cursor
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // Handle mask position
    // We use CSS variables to update the mask position performantly without re-renders
    const maskSize = 300;

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        // Set initial mouse position to center
        if (typeof window !== "undefined") {
            mouseX.set(window.innerWidth / 2);
            mouseY.set(window.innerHeight / 2);
        }

        return () => window.removeEventListener("resize", checkMobile);
    }, [mouseX, mouseY]);

    function handleMouseMove(e: React.MouseEvent) {
        if (isMobile) return;

        const { clientX, clientY } = e;
        const { left, top } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);

        // Update CSS variables for the mask
        if (containerRef.current) {
            containerRef.current.style.setProperty("--x", `${clientX - left}px`);
            containerRef.current.style.setProperty("--y", `${clientY - top}px`);
        }
    }

    // Animation variants for the mobile auto-reveal
    const mobileMaskVariants = {
        initial: {
            WebkitMaskPosition: "50% 150%", // Start below view
            maskPosition: "50% 150%"
        },
        animate: {
            WebkitMaskPosition: "50% 50%", // Move to center
            maskPosition: "50% 50%",
            transition: { duration: 1.5, ease: "easeOut" }
        }
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative h-screen w-full overflow-hidden bg-concrete"
        >
            {/* 
        LAYER 1: THE RESULT (ONDERLAAG) 
        This is the "Clean" version underneath.
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
                />

                {/* Content: Clean */}
                <div className="relative z-10 text-center max-w-4xl px-4">
                    <h1 className="text-4xl md:text-7xl font-bold font-manrope text-concrete mb-6">
                        Van ruwbouw naar rust.
                    </h1>
                    <p className="text-lg md:text-2xl text-concrete/80 font-inter mb-10 max-w-2xl mx-auto">
                        Stuc- en schilderwerk waar je naar blijft kijken. Vakmanschap in regio Kampen.
                    </p>
                    <button className="bg-gold text-concrete hover:bg-[#c29d2b] transition-colors font-bold py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 duration-200">
                        Bekijk mijn werk
                    </button>
                </div>
            </div>

            {/* 
        LAYER 2: THE RAW (BOVENLAAG) 
        This overlays layer 1 and gets masked out.
      */}
            <div
                className="absolute inset-0 z-10 w-full h-full pointer-events-none"
                style={{
                    // The mask logic:
                    // We use a radial gradient that is TRANSPARENT in the middle (where we scrub) and BLACK (opaque) outside.
                    // In CSS masking: transparent = hidden, black = visible.
                    // Wait, standard CSS mask: white/opaque = visible, transparent = hidden.
                    // So we want the layer to be visible everywhere EXCEPT the circle.
                    // So: radial-gradient(circle at var(--x) var(--y), transparent 150px, black 250px)
                    maskImage: isMobile
                        ? `radial-gradient(circle at 50% 50%, transparent 100px, black 200px)` // Static hole on mobile (or handled by entry animation if we want dynamic)
                        : `radial-gradient(circle at var(--x, 50%) var(--y, 50%), transparent ${maskSize}px, black ${maskSize + 1}px)`,
                    WebkitMaskImage: isMobile
                        ? `radial-gradient(circle at 50% 50%, transparent 100px, black 101px)`
                        : `radial-gradient(circle at var(--x, 50%) var(--y, 50%), transparent ${maskSize}px, black ${maskSize + 1}px)`,
                }}
            >
                {/* Background Image: Raw Concrete */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1599700403969-f77b314d7c5f?auto=format&fit=crop&q=80')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black/40" /> {/* Overlay to ensure text readability */}
                </div>

                {/* Content: Raw Version (Lighter text, no button) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center max-w-4xl px-4">
                        <h1 className="text-4xl md:text-7xl font-bold font-manrope text-plaster/90 mb-6 drop-shadow-xl">
                            Van ruwbouw naar rust.
                        </h1>
                        <p className="text-lg md:text-2xl text-plaster/80 font-inter mb-10 max-w-2xl mx-auto drop-shadow-md">
                            Stuc- en schilderwerk waar je naar blijft kijken. Vakmanschap in regio Kampen.
                        </p>
                        {/* Invisible spacer to match height of button in lower layer */}
                        <div className="h-[60px] w-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}
