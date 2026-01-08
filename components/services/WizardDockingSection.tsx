"use client";

import useWizardStore from "@/store/wizardStore";
import { motion } from "framer-motion";
import { Wand2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export default function WizardDockingSection() {
    const { setDocked, openWizard, isDocked } = useWizardStore();
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2 });

    useEffect(() => {
        setDocked(isInView);
    }, [isInView, setDocked]);

    return (
        <section ref={ref} className="py-32 bg-plaster-white flex flex-col items-center justify-center text-center">
            <div className="container mx-auto px-4">

                <h2 className="text-3xl md:text-5xl font-manrope font-bold text-concrete mb-12">
                    Weet je genoeg?
                </h2>

                {/* The Static Button that "catches" the floating one */}
                {/* We use layoutId to animate the transition from Fixed to Static */}
                <div className="h-20 w-full flex justify-center"> {/* Placeholder height to prevent layout shift */}
                    {isDocked && (
                        <motion.button
                            layoutId="wizard-trigger"
                            onClick={openWizard}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-concrete text-white rounded-full shadow-2xl flex items-center group overflow-hidden pl-2 pr-8 py-2 gap-4"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="p-4 bg-gold text-concrete rounded-full">
                                <Wand2 className="w-8 h-8" />
                            </div>
                            <span className="font-manrope font-bold text-xl">Start de Prijsberekening</span>
                        </motion.button>
                    )}
                </div>

            </div>
        </section>
    );
}
