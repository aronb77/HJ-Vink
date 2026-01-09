"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import useWizardStore from "@/store/wizardStore";

export default function ReadyToStart() {
    const { openWizard } = useWizardStore();

    return (
        <section className="relative py-32 bg-concrete-dark overflow-hidden">
            {/* Background Texture/Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* Background Text Decoration */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none hidden xl:block">
                <span className="font-manrope font-bold text-[10rem] leading-none text-white opacity-[0.02] select-none stroke-text">
                    H.J. VINK
                </span>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 pointer-events-none hidden xl:block">
                <span className="font-manrope font-bold text-[10rem] leading-none text-white opacity-[0.02] select-none stroke-text">
                    AFBOUW
                </span>
            </div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">

                {/* 1. Floating Icon */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-8"
                >
                    <Sparkles className="w-8 h-8 text-gold" />
                </motion.div>

                {/* 2. Headline */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-manrope font-bold text-white mb-6">
                    Is uw woning de volgende?
                </h2>

                {/* 3. Body */}
                <p className="max-w-2xl text-lg text-gray-400 font-inter mb-10 leading-relaxed">
                    U heeft de ervaringen gelezen. Nu is het tijd voor uw eigen resultaat.
                    Ontdek binnen 2 minuten wat wij voor uw project kunnen betekenen.
                </p>

                {/* 4. Actions */}
                <div className="flex flex-col items-center gap-6">
                    <button
                        onClick={openWizard}
                        className="group relative px-8 py-4 bg-gold rounded-full font-manrope font-bold text-concrete-dark text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95"
                    >
                        <span className="relative z-10">Start de Prijs-Wizard</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>

                    <Link
                        href="/contact"
                        className="text-sm text-gray-500 underline underline-offset-4 hover:text-white transition-colors"
                    >
                        Of neem direct contact op
                    </Link>
                </div>

            </div>
        </section>
    );
}
