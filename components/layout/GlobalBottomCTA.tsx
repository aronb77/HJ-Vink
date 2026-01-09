"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import useWizardStore from "@/store/wizardStore";

export default function GlobalBottomCTA() {
    const { openWizard, setFooterCtaVisible } = useWizardStore();
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.5 });

    useEffect(() => {
        setFooterCtaVisible(isInView);
    }, [isInView, setFooterCtaVisible]);

    return (
        <section ref={containerRef} className="py-24 bg-concrete-dark relative overflow-hidden">
            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-4xl font-manrope font-bold text-white mb-2">
                    Vraag gratis en vrijblijvend een offerte aan.
                </h2>
                <p className="text-gray-400 text-sm mb-12 font-inter">
                    Binnen 2 minuten een prijsindicatie. Direct in je mailbox.
                </p>

                {/* The "Dock" for the button */}
                <div className="h-16 w-full flex items-center justify-center">
                    {isInView && (
                        <motion.button
                            layoutId="wizard-trigger-button"
                            onClick={openWizard}
                            className="bg-gold text-concrete-dark font-manrope font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-gold/20 hover:scale-105 transition-shadow"
                            style={{ borderRadius: "9999px" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            Bereken je prijs
                        </motion.button>
                    )}
                </div>
            </div>
        </section>
    );
}
