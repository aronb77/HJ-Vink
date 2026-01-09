"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
    const [formState, setFormState] = useState({ name: "", contact: "", subject: "offer", message: "", agreed: false });
    const [focused, setFocused] = useState<string | null>(null);

    return (
        <div className="w-full max-w-lg space-y-12">

            {/* Intro Text */}
            <div>
                <h2 className="text-3xl font-manrope font-bold text-concrete mb-4">Stuur een berichtje.</h2>
                <p className="text-concrete/60">Ik probeer altijd binnen 24 uur te antwoorden.</p>
            </div>

            <div className="space-y-8">

                {/* Name Input */}
                <div className="relative group">
                    <label className="block text-concrete/40 text-sm font-bold uppercase tracking-wider mb-2">Ik ben</label>
                    <input
                        type="text"
                        placeholder="Je naam"
                        className="w-full bg-transparent border-b-2 border-gray-200 py-2 text-xl font-manrope text-concrete focus:outline-none focus:border-gold transition-colors placeholder:text-concrete/20"
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                    {/* Animated Bottom Line Override (Optional enhancement, regular border-bottom transition usually enough) */}
                </div>

                {/* Contact Input */}
                <div className="relative group">
                    <label className="block text-concrete/40 text-sm font-bold uppercase tracking-wider mb-2">Ik ben bereikbaar op</label>
                    <input
                        type="text"
                        placeholder="Email of Telefoonnummer"
                        className="w-full bg-transparent border-b-2 border-gray-200 py-2 text-xl font-manrope text-concrete focus:outline-none focus:border-gold transition-colors placeholder:text-concrete/20"
                        value={formState.contact}
                        onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
                    />
                </div>

                {/* Subject Select */}
                <div className="relative group">
                    <label className="block text-concrete/40 text-sm font-bold uppercase tracking-wider mb-2">Ik heb een vraag over</label>
                    <select
                        className="w-full bg-transparent border-b-2 border-gray-200 py-2 text-xl font-manrope text-concrete focus:outline-none focus:border-gold transition-colors cursor-pointer"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    >
                        <option value="offer">Een offerte op maat</option>
                        <option value="advice">Advies nodig</option>
                        <option value="planning">Planning & Beschikbaarheid</option>
                        <option value="other">Iets anders</option>
                    </select>
                </div>

                {/* Message Textarea */}
                <div className="relative group">
                    <label className="block text-concrete/40 text-sm font-bold uppercase tracking-wider mb-2">Mijn bericht</label>
                    <textarea
                        rows={4}
                        placeholder="Vertel waar ik kan helpen..."
                        className="w-full bg-transparent border-b-2 border-gray-200 py-2 text-xl font-inter text-concrete focus:outline-none focus:border-gold transition-colors placeholder:text-concrete/20 resize-none"
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    />
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                    <div className="relative flex items-center h-6">
                        <input
                            id="agreement"
                            type="checkbox"
                            className="w-5 h-5 border-2 border-concrete/20 rounded text-gold focus:ring-gold focus:ring-offset-0 bg-transparent cursor-pointer"
                            checked={formState.agreed}
                            onChange={(e) => setFormState({ ...formState, agreed: e.target.checked })}
                        />
                    </div>
                    <label htmlFor="agreement" className="text-sm text-concrete/70 leading-relaxed cursor-pointer select-none">
                        Ik ga akkoord met de <a href="/privacy" target="_blank" className="underline hover:text-gold">privacyverklaring</a> en <a href="/voorwaarden" target="_blank" className="underline hover:text-gold">algemene voorwaarden</a>.
                    </label>
                </div>

            </div>

            {/* Submit Button */}
            <button
                disabled={!formState.agreed}
                className="group flex items-center gap-4 bg-concrete text-white px-8 py-4 rounded-full font-bold hover:bg-concrete-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span>Verstuur Bericht</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

        </div>
    );
}
