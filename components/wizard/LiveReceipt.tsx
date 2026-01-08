"use client";

import useWizardStore from "@/store/wizardStore";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveReceipt() {
    const { selection, step } = useWizardStore();
    const today = new Date().toLocaleDateString("nl-NL");

    // Format Text Helpers
    const formatService = (s: string | null) => {
        switch (s) {
            case 'glad_stucwerk': return 'Glad Pleisterwerk';
            case 'behangklaar': return 'Behangklaar Stucwerk';
            case 'dunpleister': return 'Dunpleister';
            case 'raapwerk': return 'Raapwerk';
            case 'spackspuiten': return 'Spackspuiten';
            case 'latex_spuiten': return 'Latex Spuiten';
            case 'betonlook': return 'Betonlook / Ciré';
            case 'renovlies': return 'Renovlies Behang';
            case 'schilderwerk': return 'Schilderwerk';
            default: return '...';
        }
    }

    const isSuccess = step === 4;

    return (
        <div className="relative w-full max-w-sm mx-auto">
            <motion.div
                layout
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden relative"
            >
                {/* Header */}
                <div className="p-6 border-b border-concrete/5 bg-concrete/5">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-manrope font-bold text-lg text-concrete">Specificaties</h3>
                            <p className="text-xs text-concrete/40 uppercase tracking-wider mt-1">H.J. Vink Afbouw</p>
                        </div>
                        <div className="text-xs font-mono text-concrete/40 bg-white/50 px-2 py-1 rounded">
                            {today}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">

                    {/* Placeholder when nothing selected */}
                    {step === 1 && !selection.service && (
                        <div className="text-center py-8 text-concrete/30 text-sm italic">
                            Maak een keuze om te beginnen...
                        </div>
                    )}

                    {/* 1. Service Item */}
                    <AnimatePresence mode="popLayout">
                        {selection.service && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex justify-between items-center group"
                            >
                                <span className="text-sm text-concrete/60">Dienst</span>
                                <span className="font-bold text-concrete text-right">{formatService(selection.service)}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 2. Type Item */}
                    <AnimatePresence mode="popLayout">
                        {step >= 2 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex justify-between items-center"
                            >
                                <span className="text-sm text-concrete/60">Situatie</span>
                                <span className="font-bold text-concrete capitalize">{selection.type}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 3. Area Item */}
                    <AnimatePresence mode="popLayout">
                        {step >= 2 && (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex justify-between items-center"
                            >
                                <span className="text-sm text-concrete/60">Oppervlakte</span>
                                <span className="font-bold text-gold">{selection.area} m²</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 4. Customer Ref */}
                    <AnimatePresence mode="popLayout">
                        {step >= 3 && selection.contact.naam && (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="pt-4 mt-4 border-t border-concrete/5"
                            >
                                <div className="flex justify-between items-start">
                                    <span className="text-xs text-concrete/40 uppercase tracking-widest mt-1">Klant</span>
                                    <span className="font-bold text-concrete text-right max-w-[150px] truncate">{selection.contact.naam}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {/* Footer State */}
                <div className="bg-concrete text-white p-4 text-center text-xs">
                    {step < 4 ? (
                        <span className="opacity-60">Voltooi de stappen voor een prijsindicatie</span>
                    ) : (
                        <span className="font-bold text-gold">Aanvraag succesvol ontvangen!</span>
                    )}
                </div>

            </motion.div>
        </div>
    );
}
