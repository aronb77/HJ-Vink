import type { Metadata, Viewport } from "next";
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { projectId } from "@/lib/sanity/client";

export const metadata: Metadata = {
    title: "Sanity Studio | H.J. Vink Afbouw CMS",
    robots: {
        index: false,
        follow: false,
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    interactiveWidget: "resizes-content",
};

export default function StudioPage() {
    // Check if we are running with dummy credentials
    if (projectId === 'dummy-project-id') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-neutral-100 p-4 font-sans text-center">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md border border-neutral-200">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Sanity Setup Required</h1>
                    <p className="mb-6 text-neutral-700 leading-relaxed">
                        De Sanity Studio kan niet laden omdat er nog geen geldig <code>Project ID</code> is ingesteld.
                    </p>
                    <div className="bg-neutral-50 p-4 rounded-lg text-left text-sm font-mono text-neutral-600 mb-6 border border-neutral-200 overflow-x-auto">
                        NEXT_PUBLIC_SANITY_PROJECT_ID=...<br />
                        NEXT_PUBLIC_SANITY_DATASET=...
                    </div>
                    <p className="text-neutral-500 text-sm">
                        Voeg deze variabelen toe aan je <code>.env.local</code> bestand om het CMS te activeren.
                    </p>
                </div>
            </div>
        );
    }

    return <NextStudio config={config} />;
}
