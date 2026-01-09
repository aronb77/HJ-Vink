export const siteConfig = {
    company: {
        name: "H.J. Vink Afbouw",
        owner: "Henk Vink",
        kvk: "69572739",
        btw: "NL000000000B01", // Placeholder
        iban: "NL00 RABO 0000 0000 00", // Placeholder
    },
    contact: {
        address: "Wadloper 2",
        zip: "8265 TV",
        city: "Kampen",
        email: "info@hjvinkafbouw.nl",
        phone: "06 31 64 09 86",
        phoneLink: "tel:+31631640986",
        whatsappLink: "https://wa.me/31631640986",
    },
    metadata: {
        title: "H.J. Vink Afbouw | Stukadoor Kampen & Zwolle",
        description: "Ruim 20 jaar ervaring in stucwerk, spackspuiten en wandafwerking. Vraag vrijblijvend een offerte aan.",
        baseUrl: "https://www.hjvinkafbouw.nl",
    },
    socials: {
        googleReviewLink: "https://g.page/r/...", // Link naar Google Reviews invoegen
        instagram: "https://instagram.com/hjvinkafbouw", // Placeholder
        facebook: "https://facebook.com/hjvinkafbouw", // Placeholder
    }
};

export type SiteConfig = typeof siteConfig;
