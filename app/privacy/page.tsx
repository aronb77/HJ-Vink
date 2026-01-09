import { siteConfig } from '@/config/site-config';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Privacyverklaring | H.J. Vink Afbouw",
    description: "Hoe wij omgaan met uw gegevens en privacy.",
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-plaster">
            {/* Header Section */}
            <section className="bg-concrete-dark text-white py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-manrope font-bold mb-4">
                        Privacyverklaring
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        H.J. Vink Afbouw hecht veel waarde aan de bescherming van uw persoonsgegevens.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 md:py-24 px-6">
                <article className="prose prose-slate prose-lg mx-auto max-w-3xl">
                    <p className="text-sm text-gray-500 italic mb-8">
                        Laatst gewijzigd: Januari 2025
                    </p>

                    <h2>1. Wie zijn wij?</h2>
                    <p>
                        H.J. Vink Afbouw is gevestigd te {siteConfig.contact.city}. Wij zijn verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring.
                    </p>
                    <p>
                        <strong>Contactgegevens:</strong><br />
                        {siteConfig.contact.address}<br />
                        {siteConfig.contact.zip} {siteConfig.contact.city}<br />
                        <a href={`mailto:${siteConfig.contact.email}`} className="text-gold hover:underline">{siteConfig.contact.email}</a><br />
                        KVK: {siteConfig.company.kvk}
                    </p>

                    <h2>2. Persoonsgegevens die wij verwerken</h2>
                    <p>
                        Wij verwerken uw persoonsgegevens doordat u gebruik maakt van onze diensten en/of omdat u deze zelf aan ons verstrekt (bijvoorbeeld via de offerte-wizard of het contactformulier).
                    </p>
                    <ul>
                        <li>Voor- en achternaam</li>
                        <li>Adresgegevens (voor locatiebepaling en uitvoering)</li>
                        <li>Telefoonnummer (om contact op te nemen over de klus)</li>
                        <li>E-mailadres (voor offertes en facturatie)</li>
                    </ul>

                    <h2>3. Met welk doel verwerken wij gegevens?</h2>
                    <p>
                        Wij gebruiken uw gegevens uitsluitend voor:
                    </p>
                    <ul>
                        <li>Het opstellen en versturen van een offerte.</li>
                        <li>Het kunnen bellen of e-mailen indien dit nodig is voor de uitvoering van onze dienstverlening.</li>
                        <li>Het leveren van goederen en diensten bij u op locatie.</li>
                        <li>Het afhandelen van uw betaling.</li>
                    </ul>

                    <h2>4. Projectfoto's en Social Media</h2>
                    <p>
                        In onze branche zijn foto's van het eindresultaat ons visitekaartje. Wij maken en plaatsen foto's van projecten op onze website of social media <strong>alleen met uw mondelinge of schriftelijke toestemming</strong>. Wij zorgen ervoor dat er geen privacygevoelige details (zoals familiefoto's in huis) zichtbaar zijn.
                    </p>

                    <h2>5. Delen van persoonsgegevens met derden</h2>
                    <p>
                        H.J. Vink Afbouw verkoopt uw gegevens niet aan derden en verstrekt deze uitsluitend indien dit nodig is voor de uitvoering van onze overeenkomst met u (bijvoorbeeld aan een leverancier van bouwmaterialen) of om te voldoen aan een wettelijke verplichting.
                    </p>

                    <h2>6. Cookies en Analytics</h2>
                    <p>
                        Wij maken gebruik van functionele cookies (voor de werking van de site) en analytische cookies (Google Analytics) om het bezoekgedrag geanonimiseerd te analyseren. Wij hebben een verwerkersovereenkomst met Google gesloten en delen geen data voor advertentiedoeleinden.
                    </p>

                    <h2>7. Gegevens inzien, aanpassen of verwijderen</h2>
                    <p>
                        U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Neem hiervoor contact op via <a href={`mailto:${siteConfig.contact.email}`} className="text-gold hover:underline">{siteConfig.contact.email}</a>.
                    </p>
                </article>
            </section>
        </main>
    );
}
