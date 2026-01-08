"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import MagneticLink from "./MagneticLink";
import { Menu, X } from "lucide-react";
import useWizardStore from "@/store/wizardStore"; // Direct access to wizard trigger

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { openWizard } = useWizardStore();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const scrolled = latest > 50;
        if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
        }
    });

    const links = [
        { name: "Home", href: "/" },
        { name: "Diensten", href: "/diensten" },
        { name: "Werkwijze", href: "/werkwijze" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                        ? "bg-plaster/80 backdrop-blur-md border-b border-stone-200/50 py-3 shadow-sm"
                        : "bg-transparent py-6"
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">

                    {/* 1. Logo */}
                    <Link href="/" className="flex items-center gap-1 z-50 relative">
                        <span className="font-manrope font-bold text-xl md:text-2xl text-concrete">HJ Vink</span>
                        <span className="font-manrope font-light text-xl md:text-2xl text-concrete">Afbouw</span>
                    </Link>

                    {/* 2. Desktop Navigation (Magnetic) */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <MagneticLink key={link.name} href={link.href}>
                                {link.name}
                            </MagneticLink>
                        ))}
                    </div>

                    {/* 3. Actions (Desktop CTA + Mobile Toggle) */}
                    <div className="flex items-center gap-4">

                        {/* Desktop CTA */}
                        <button
                            onClick={openWizard}
                            className={`hidden md:flex items-center px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${isScrolled
                                    ? "bg-gold text-white hover:bg-[#c29d2b] shadow-md"
                                    : "bg-transparent text-concrete border border-concrete/20 hover:border-gold hover:text-gold"
                                }`}
                        >
                            Offerte Aanvragen
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden z-50 p-2 text-concrete relative"
                        >
                            {isMobileMenuOpen ? <X className="text-white" /> : <Menu />}
                        </button>
                    </div>

                </div>
            </motion.header>

            {/* 4. Mobile Menu Overlay (Curtain) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }} // Bezier for smooth curtain feel
                        className="fixed inset-0 z-40 bg-concrete-dark flex flex-col items-center justify-center"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {links.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="font-manrope font-bold text-4xl text-white hover:text-gold transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Mobile Menu CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + (links.length * 0.1) }}
                            >
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        openWizard();
                                    }}
                                    className="mt-8 px-8 py-4 bg-gold text-concrete font-bold rounded-full text-xl"
                                >
                                    Offerte Aanvragen
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
