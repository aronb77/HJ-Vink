"use client";

import { ArrowUpRight } from "lucide-react";
import useWizardStore from "@/store/wizardStore";

export default function HeroCTA({ cityName }: { cityName: string }) {
    const { openWizard } = useWizardStore();

    return (
        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-xl max-w-md backdrop-blur-sm">
            <p className="text-white font-bold text-lg mb-4">
                Start uw project in {cityName}.
            </p>
            <button
                onClick={openWizard}
                className="w-full bg-gold hover:bg-[#c29d2b] text-concrete font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 group"
            >
                Vraag offerte aan
                <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}
