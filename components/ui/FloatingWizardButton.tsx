import useWizardStore from "@/store/wizardStore";
import { AnimatePresence, motion } from "framer-motion";
import { Calculator } from "lucide-react";

export default function FloatingWizardButton() {
    const { openWizard, isDocked, isFooterCtaVisible } = useWizardStore();

    return (
        <AnimatePresence>
            {!isDocked && !isFooterCtaVisible && (
                <motion.button
                    layoutId="wizard-trigger"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={openWizard}
                    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 bg-concrete text-white rounded-full shadow-2xl flex items-center group overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="p-4 bg-gold text-concrete rounded-full z-10">
                        <Calculator className="w-6 h-6" />
                    </div>

                    <motion.div
                        className="pr-6 pl-2 whitespace-nowrap overflow-hidden"
                        initial={{ width: "auto", opacity: 1 }}
                        animate={{ width: "auto", opacity: 1 }}
                    >
                        <span className="font-manrope font-bold text-sm">Bereken je prijs</span>
                    </motion.div>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
