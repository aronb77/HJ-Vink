import { siteConfig } from "@/config/site-config";
import ContactCard from "@/components/contact/ContactCard";
import ContactForm from "@/components/contact/ContactForm";
import RegionMap from "@/components/contact/RegionMap";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-plaster pt-32">

            <div className="container mx-auto px-4 mb-24">
                <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">

                    {/* LEFT: Sticky Contact Card */}
                    <div className="w-full md:w-1/3 md:sticky md:top-32">
                        {/* <ContactCard /> */}

                        {/* Extra Info visible just below card on desktop */}
                        <div className="mt-8 hidden md:block text-sm text-concrete/40 font-inter">
                            <p className="mb-2">KvK: {siteConfig.company.kvk}</p>
                            {/* <p>BTW: {siteConfig.company.btw}</p> */}
                        </div>
                    </div>

                    {/* RIGHT: Form */}
                    <div className="w-full md:w-2/3">
                        <ContactForm />
                    </div>

                </div>
            </div>

            <RegionMap />

        </main>
    );
}

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | H.J. Vink Afbouw",
    description: "Neem direct contact op voor een vrijblijvende offerte of advies op maat. Gevestigd in Kampen, werkzaam in de hele regio.",
};
