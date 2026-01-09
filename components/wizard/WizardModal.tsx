"use client";

import useWizardStore from "@/store/wizardStore";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Check, Paintbrush, SprayCan as Spray, Hammer, Ruler, Layers, Sparkles, FileText, Info } from "lucide-react";
import { useEffect, useState } from "react";
import LiveReceipt from "./LiveReceipt";
import { cn } from "@/lib/utils";

// --- DATA: SERVICE OPTIONS ---
const SERVICE_OPTIONS = [
    {
        category: "Stucwerk",
        items: [
            { id: 'glad_stucwerk', label: 'Glad Pleisterwerk', icon: <Paintbrush className="w-8 h-8" />, tooltip: "Spiegelglad resultaat, direct klaar om te sausen." },
            { id: 'behangklaar', label: 'Behangklaar', icon: <Layers className="w-8 h-8" />, tooltip: "Iets ruwer en voordeliger. Perfect als ondergrond voor behang." },
            { id: 'dunpleister', label: 'Dunpleister', icon: <Ruler className="w-8 h-8" />, tooltip: "Exclusief voor nieuwbouw. Een dunne, superstrakke laag over betonmuren." },
            { id: 'raapwerk', label: 'Raapwerk', icon: <Hammer className="w-8 h-8" />, tooltip: "Het rechtzetten van kromme of scheve muren. Vaak voor badkamers of oude woningen." },
        ]
    },
    {
        category: "Spuitwerk",
        items: [
            { id: 'spackspuiten', label: 'Spackspuiten', icon: <Spray className="w-8 h-8" />, tooltip: "Korrelstructuur. De voordeligste en snelste afwerking voor wand en plafond." },
            { id: 'latex_spuiten', label: 'Latex Spuiten', icon: <Spray className="w-8 h-8 rotate-90" />, tooltip: "Airless machinaal sausen. Geen strepen of banen, super strak." },
        ]
    },
    {
        category: "Decoratief & Overig",
        items: [
            { id: 'betonlook', label: 'Betonlook / Ciré', icon: <Sparkles className="w-8 h-8" />, tooltip: "Luxe, waterdichte afwerking. Ideaal voor badkamers en keukens." },
            { id: 'renovlies', label: 'Renovlies', icon: <FileText className="w-8 h-8" />, tooltip: "Glasvezelbehang dat oogt als stucwerk. Scheurvrij en stootvast." },
            { id: 'schilderwerk', label: 'Schilderwerk', icon: <Paintbrush className="w-8 h-8" />, tooltip: "Het aflakken van kozijnen, deuren en trappen." },
        ]
    }
] as const;


export default function WizardModal() {
    const { isOpen, closeWizard, step, setStep, selection, setService, setType, setArea, setContact, resetWizard } = useWizardStore();
    const [agreed, setAgreed] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else handleSubmit();
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = () => {
        // Simulate API call
        setTimeout(() => {
            setStep(4);
        }, 500);
    };

    const handleClose = () => {
        closeWizard();
        if (step === 4) {
            setTimeout(resetWizard, 500);
        }
    };


    if (!isOpen) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-concrete-dark/90 backdrop-blur-sm p-4 md:p-8"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-plaster w-full max-w-7xl min-h-[600px] h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
                >

                    {/* CLOSE BUTTON */}
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 z-50 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-concrete" />
                    </button>


                    {/* LEFT: FORM (Steps) */}
                    <div className="w-full md:w-[65%] p-6 md:p-12 flex flex-col relative overflow-y-auto no-scrollbar">
                        {/* Progress Indicator */}
                        <div className="flex gap-2 mb-8 md:mb-12 sticky top-0 bg-plaster z-20 py-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${step >= i ? 'bg-gold' : 'bg-concrete/10'}`} />
                            ))}
                        </div>

                        <div className="flex-1 flex flex-col">
                            <AnimatePresence mode="wait">

                                {/* STEP 1: SERVICE */}
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="pb-20"
                                    >
                                        <h2 className="text-3xl md:text-4xl font-manrope font-bold text-concrete mb-2">
                                            Welke dienst zoek je?
                                        </h2>
                                        <p className="text-concrete/60 mb-8">Kies het type afwerking dat je wenst.</p>

                                        <div className="space-y-8">
                                            {SERVICE_OPTIONS.map((category) => (
                                                <div key={category.category}>
                                                    <h3 className="text-sm font-bold uppercase tracking-wider text-concrete/40 mb-4 ml-1">{category.category}</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        {category.items.map((item) => (
                                                            <ServiceCard
                                                                key={item.id}
                                                                label={item.label}
                                                                active={selection.service === item.id}
                                                                onClick={() => { setService(item.id as any); }} // Manual advance required? Or allow click to select
                                                                icon={item.icon}
                                                                tooltip={item.tooltip}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 2: SITUATION */}
                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h2 className="text-3xl font-manrope font-bold text-concrete mb-8">
                                            Vertel iets meer over de klus.
                                        </h2>

                                        {/* Type Toggle */}
                                        <div className="mb-12">
                                            <label className="block text-concrete/60 font-bold uppercase text-xs tracking-wider mb-4">Type Woning</label>
                                            <div className="flex bg-white rounded-full p-1 w-fit shadow-sm border border-concrete/5">
                                                <button
                                                    onClick={() => setType('nieuwbouw')}
                                                    className={`px-6 py-3 rounded-full font-bold transition-all ${selection.type === 'nieuwbouw' ? 'bg-concrete text-white shadow-md' : 'text-concrete hover:bg-concrete/5'}`}
                                                >
                                                    Nieuwbouw
                                                </button>
                                                <button
                                                    onClick={() => setType('renovatie')}
                                                    className={`px-6 py-3 rounded-full font-bold transition-all ${selection.type === 'renovatie' ? 'bg-concrete text-white shadow-md' : 'text-concrete hover:bg-concrete/5'}`}
                                                >
                                                    Renovatie
                                                </button>
                                            </div>
                                        </div>

                                        {/* Area Slider */}
                                        <div>
                                            <div className="flex justify-between items-end mb-4">
                                                <label className="block text-concrete/60 font-bold uppercase text-xs tracking-wider">Oppervlakte</label>
                                                <span className="text-4xl font-manrope font-bold text-gold">{selection.area} m²</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="500"
                                                step="10"
                                                value={selection.area}
                                                onChange={(e) => setArea(parseInt(e.target.value))}
                                                className="w-full h-2 bg-concrete/10 rounded-lg appearance-none cursor-pointer accent-gold hover:accent-gold/80"
                                            />
                                            <div className="flex justify-between text-xs text-concrete/40 mt-2 font-inter">
                                                <span>0 m²</span>
                                                <span>500+ m²</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 3: CONTACT */}
                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h2 className="text-3xl font-manrope font-bold text-concrete mb-8">
                                            Waar mogen we de offerte heen sturen?
                                        </h2>
                                        <div className="space-y-6">
                                            <Input
                                                label="Naam"
                                                value={selection.contact.naam}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContact({ naam: e.target.value })}
                                                placeholder="Uw volledige naam"
                                            />
                                            <Input
                                                label="Email"
                                                type="email"
                                                value={selection.contact.email}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContact({ email: e.target.value })}
                                                placeholder="bijv. naam@domein.nl"
                                            />
                                            <Input
                                                label="Telefoonnummer"
                                                type="tel"
                                                value={selection.contact.telefoon}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContact({ telefoon: e.target.value })}
                                                placeholder="06 12345678"
                                            />
                                            <div className="relative pt-4">
                                                <textarea
                                                    value={selection.contact.opmerking}
                                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContact({ opmerking: e.target.value })}
                                                    className="peer w-full border-b-2 border-concrete/10 py-3 bg-transparent text-lg font-inter text-concrete placeholder-transparent focus:outline-none focus:border-gold transition-colors resize-none h-32"
                                                    id="opmerking"
                                                    placeholder="Opmerking"
                                                />
                                                <label
                                                    htmlFor="opmerking"
                                                    className="absolute left-0 top-0 text-xs font-bold uppercase tracking-wider text-concrete/40 peer-focus:text-gold transition-all"
                                                >
                                                    Opmerkingen (Optioneel)
                                                </label>
                                            </div>
                                            <div className="flex items-start gap-3 pt-4 border-t border-concrete/5 mt-4">
                                                <div className="relative flex items-center h-6">
                                                    <input
                                                        id="wizard-agreement"
                                                        type="checkbox"
                                                        className="w-5 h-5 border-2 border-concrete/20 rounded text-gold focus:ring-gold focus:ring-offset-0 bg-transparent cursor-pointer"
                                                        checked={agreed}
                                                        onChange={(e) => setAgreed(e.target.checked)}
                                                    />
                                                </div>
                                                <label htmlFor="wizard-agreement" className="text-sm text-concrete/70 leading-relaxed cursor-pointer select-none">
                                                    Ik ga akkoord met de <a href="/privacy" target="_blank" className="underline hover:text-gold">privacyverklaring</a> en <a href="/voorwaarden" target="_blank" className="underline hover:text-gold">algemene voorwaarden</a>.
                                                </label>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 4: SUCCESS */}
                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center"
                                    >
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                            <Check className="w-10 h-10" />
                                        </div>
                                        <h2 className="text-4xl font-manrope font-bold text-concrete mb-4">
                                            Bedankt!
                                        </h2>
                                        <p className="text-lg text-concrete/60 max-w-md mx-auto mb-8">
                                            We hebben je gegevens ontvangen. We maken een berekening en nemen binnen 24 uur contact met je op.
                                        </p>
                                        <button onClick={handleClose} className="text-concrete font-bold underline hover:text-gold transition-colors">
                                            Terug naar website
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer Navigation */}
                        {step < 4 && (
                            <div className="mt-8 pt-8 border-t border-concrete/5 flex justify-between items-center bg-plaster z-20">
                                {step > 1 ? (
                                    <button onClick={handleBack} className="text-concrete/60 hover:text-concrete font-bold flex items-center gap-2 transition-colors">
                                        <ArrowLeft className="w-4 h-4" /> Vorige
                                    </button>
                                ) : <div />}

                                <button
                                    onClick={handleNext}
                                    disabled={(step === 1 && !selection.service) || (step === 3 && !agreed)}
                                    className="bg-concrete hover:bg-concrete-dark text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg"
                                >
                                    {step === 3 ? "Aanvraag Versturen" : "Volgende Stap"}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: RECEIPT VISUAL */}
                    <div className="hidden md:flex w-[35%] bg-concrete/5 items-center justify-center p-8 lg:p-12 border-l border-concrete/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
                        <LiveReceipt />
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function ServiceCard({ label, icon, active, onClick, tooltip }: { label: string, icon: any, active: boolean, onClick: () => void, tooltip: string }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onClick={onClick}
            className={`
                relative cursor-pointer rounded-2xl p-6 border transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center group
                ${active
                    ? 'border-gold bg-white shadow-xl ring-1 ring-gold/20'
                    : 'border-transparent bg-white shadow-sm hover:shadow-md hover:border-concrete/10'}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Tooltip Trigger */}
            <div className="absolute top-3 right-3 text-concrete/20 hover:text-concrete transition-colors group/info">
                <Info className="w-4 h-4" />

                {/* Tooltip Content */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            className="absolute bottom-full right-0 mb-2 w-48 bg-concrete-dark text-white text-xs text-left p-3 rounded-xl shadow-xl z-50 pointer-events-none"
                        >
                            {tooltip}
                            <div className="absolute -bottom-1 right-1 w-2 h-2 bg-concrete-dark rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Checkmark for Active State */}
            {active && (
                <div className="absolute top-3 left-3 text-gold">
                    <Check className="w-5 h-5" />
                </div>
            )}


            <div className={`
                w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300
                ${active ? 'bg-gold text-white' : 'bg-concrete/5 text-concrete/40 group-hover:text-gold group-hover:bg-gold/10'}
            `}>
                {icon}
            </div>
            <span className={`font-bold font-manrope transition-colors ${active ? 'text-concrete' : 'text-concrete/80 group-hover:text-concrete'}`}>
                {label}
            </span>
        </div>
    )
}

function Input({ label, ...props }: any) {
    return (
        <div className="relative pt-4">
            <input
                {...props}
                className="peer w-full border-b-2 border-concrete/10 py-3 bg-transparent text-lg font-inter text-concrete placeholder-transparent focus:outline-none focus:border-gold transition-colors"
                id={label}
            />
            <label
                htmlFor={label}
                className="absolute left-0 top-0 text-xs font-bold uppercase tracking-wider text-concrete/40 peer-shown:text-lg peer-shown:text-concrete/40 peer-shown:top-4 peer-focus:top-0 peer-focus:text-gold peer-focus:text-xs transition-all pointer-events-none"
            >
                {label}
            </label>
        </div>
    )
}
