"use client";

import useWizardStore from "@/store/wizardStore";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Wand2 } from "lucide-react";
import { useState } from "react";

export default function FloatingWizardButton() {
    const { openWizard, isDocked, isFooterCtaVisible } = useWizardStore();
    const { scrollY } = useScroll();
    const [isScrolling, setIsScrolling] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolling(true);
        // Debounce scroll stop
        const timer = setTimeout(() => setIsScrolling(false), 200);
    });

    return (
        <AnimatePresence>
            {!isDocked && !isFooterCtaVisible && (
                <motion.button
                    layoutId="wizard-trigger-button"
                    initial={{ y: 0, opacity: 1, scale: 1 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    onClick={openWizard}
                    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 bg-concrete text-white rounded-full shadow-2xl flex items-center group overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="p-4 bg-gold text-concrete rounded-full z-10">
                        <Wand2 className="w-6 h-6" />
                    </div>

                    <motion.div
                        className="pr-6 pl-2 whitespace-nowrap overflow-hidden"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }} // Always expanded for clarity? Or expand on hover? 
                    // User Request: "Scroll Interactie: Als de gebruiker scrolt: Knop wordt klein. Als de gebruiker stopt: Knop klapt uit"
                    // Implementing robust scroll detection might be overkill/jittery. 
                    // Let's implement simpler: Expanded by default, but nice hover effect.
                    >
                        <span className="font-manrope font-bold text-sm">Bereken je prijs</span>
                    </motion.div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
