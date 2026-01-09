"use client";

import { motion } from "framer-motion";

export default function RegionMap() {
    return (
        <section className="w-full bg-white border-t border-concrete/5 py-12 md:py-24 overflow-hidden relative">
            <div className="container mx-auto px-4 flex flex-col items-center text-center">

                <h3 className="text-2xl font-manrope font-bold text-concrete mb-8">
                    Actief in de regio
                </h3>

                {/* Google Map */}
                <div className="relative w-full max-w-4xl aspect-[16/9] md:aspect-[21/9] bg-concrete/5 rounded-3xl border border-concrete/10 overflow-hidden shadow-2xl">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.729059595562!2d5.9086827761921265!3d52.55395677981504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c87883393952dd%3A0x66f6874013110265!2sWadloper%202%2C%208265%20TV%20Kampen!5e0!3m2!1snl!2snl!4v1709825432000!5m2!1snl!2snl"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: "grayscale(1) contrast(1.2)" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                    />
                </div>

                <p className="mt-8 text-concrete/60 font-inter text-sm max-w-md">
                    Wij werken in een straal van +/- 40km rondom Kampen. Twijfel je of je in ons gebied woont? Stuur gerust een berichtje.
                </p>

            </div>
        </section>
    );
}
