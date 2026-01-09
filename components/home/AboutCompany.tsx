"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Ruler, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AboutCompany() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Stagger effect for items
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section className="py-24 bg-plaster relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* LEFT: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] md:aspect-square w-full max-w-lg mx-auto md:ml-0 rounded-2xl overflow-hidden shadow-2xl">
                            {/* 
                  Using Unsplash for hands/craftsmanship detail. 
                  "Hands plastering wall" or similar.
               */}
                            <Image
                                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80"
                                alt="Vakmanschap in detail"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* Floating Badge */}
                            <div className="absolute bottom-6 right-6 bg-white p-4 rounded-xl shadow-lg border-l-4 border-gold">
                                <p className="text-concrete font-bold text-sm uppercase tracking-wider">Ervaring</p>
                                <p className="text-3xl font-manrope font-extrabold text-gold">20+ Jaar</p>
                            </div>
                        </div>

                        {/* Decoration */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl -z-10" />
                    </motion.div>

                    {/* RIGHT: Text & USPs */}
                    <div>
                        <span className="text-gold font-bold tracking-wider uppercase text-sm mb-2 block">
                            Over Vink Afbouw
                        </span>
                        <h2 className="text-4xl md:text-5xl font-manrope font-bold text-concrete mb-6 leading-tight">
                            Vakmanschap in de vingers.
                        </h2>
                        <p className="text-lg text-concrete/70 font-inter mb-8 leading-relaxed">
                            Bij H.J. Vink Afbouw draait alles om de perfecte afwerking. Met meer dan 20 jaar ervaring in de polder weten wij precies hoe we uw woning van ruwbouw naar droomhuis transformeren. Wij combineren traditioneel vakmanschap met moderne technieken.
                        </p>

                        {/* UP Grid */}
                        <motion.div
                            className="grid grid-cols-1 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {/* USP 1 */}
                            <motion.div variants={itemVariants} className="flex gap-4 items-start p-4 bg-white rounded-xl shadow-sm border border-black/5">
                                <div className="bg-gold/10 p-3 rounded-full text-gold shrink-0">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-concrete font-manrope text-lg">Betrouwbaar</h4>
                                    <p className="text-sm text-concrete/70 font-inter">Afspraak is bij ons ook echt afspraak. Geen verrassingen achteraf.</p>
                                </div>
                            </motion.div>

                            {/* USP 2 */}
                            <motion.div variants={itemVariants} className="flex gap-4 items-start p-4 bg-white rounded-xl shadow-sm border border-black/5">
                                <div className="bg-gold/10 p-3 rounded-full text-gold shrink-0">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-concrete font-manrope text-lg">Netjes gewerkt</h4>
                                    <p className="text-sm text-concrete/70 font-inter">Wij werken schoon, dekken alles af en ruimen netjes op als we klaar zijn.</p>
                                </div>
                            </motion.div>

                            {/* USP 3 */}
                            <motion.div variants={itemVariants} className="flex gap-4 items-start p-4 bg-white rounded-xl shadow-sm border border-black/5">
                                <div className="bg-gold/10 p-3 rounded-full text-gold shrink-0">
                                    <Ruler className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-concrete font-manrope text-lg">Top Kwaliteit</h4>
                                    <p className="text-sm text-concrete/70 font-inter">Wij gebruiken uitsluitend A-merk materialen voor een duurzaam resultaat.</p>
                                </div>
                            </motion.div>

                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
