import { siteConfig } from "@/config/site-config";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Offerte Aanvragen | H.J. Vink Afbouw",
    description: "Vraag binnen 2 minuten een vrijblijvende offerte aan voor stuc- of spuitwerk.",
};

export default function OffertePage() {
    return (
        <main className="min-h-screen bg-plaster pt-32 pb-24">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-manrope font-bold text-concrete mb-6">Offerte Aanvragen</h1>
                <p className="text-concrete/70 mb-8">
                    Gebruik onze wizard om direct een prijsindicatie te krijgen.
                </p>
                {/* 
                    Ideally, we would embed the wizard here directly/inline, 
                    or trigger the modal. For now, since the wizard is a modal, 
                    we might want to just show a button that triggers it, 
                    or duplicate the wizard logic inline.
                    
                    Given the current setup with FloatingWizardButton, 
                    users might expect to click that.
                */}
                <div className="p-12 bg-white rounded-xl shadow-sm border border-black/5 max-w-2xl mx-auto">
                    <p className="text-lg text-concrete font-medium">
                        Klik op de knop rechtsonder om de offerte wizard te starten.
                    </p>
                </div>
            </div>
        </main>
    );
}
