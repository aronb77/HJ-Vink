import { siteConfig } from '@/config/site-config';
import { Metadata } from 'next';
import PrintButton from '@/components/ui/PrintButton';

export const metadata: Metadata = {
    title: "Algemene Voorwaarden | H.J. Vink Afbouw",
    description: "Onze leveringsvoorwaarden: duidelijkheid over planning, uitvoering en betaling.",
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-plaster">
            {/* Header Section */}
            <section className="bg-concrete-dark text-white py-16 md:py-24 print:hidden">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-manrope font-bold mb-4">
                        Algemene Voorwaarden
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        Duidelijke afspraken voor een prettige samenwerking.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 md:py-24 px-6 print:py-8 print:px-0">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8 print:mb-4">
                        <h1 className="hidden print:block text-3xl font-bold mb-2">Algemene Voorwaarden {siteConfig.company.name}</h1>
                        <p className="text-gray-500 italic">Versie: Januari 2026</p>
                    </div>

                    <article className="prose prose-slate prose-lg mx-auto print:prose-sm">
                        <h2>1. Geldigheid van Offertes</h2>
                        <p>
                            Alle offertes van {siteConfig.company.name} zijn vrijblijvend en hebben een geldigheidsduur van 30 dagen, tenzij schriftelijk anders is aangegeven.
                        </p>
                        <p>
                            De prijzen in onze offertes zijn gebaseerd op de situatie zoals die tijdens de bezichtiging of op basis van de door u aangeleverde gegevens is ingeschat. Indien de ondergrond bij aanvang van de werkzaamheden anders blijkt te zijn (bijvoorbeeld: er zit nog behang op de muren terwijl 'behangvrij' was afgesproken, of de ondergrond is in slechtere staat dan zichtbaar was), behouden wij ons het recht voor om de prijs in overleg aan te passen of de werkzaamheden op te schorten.
                        </p>

                        <h2>2. Verplichtingen van de Opdrachtgever</h2>
                        <p>
                            Om het stuc- of spuitwerk optimaal uit te kunnen voeren, vragen wij van u de volgende voorbereidingen:
                        </p>
                        <ul>
                            <li><strong>Lege werkruimte:</strong> De ruimtes waar gewerkt wordt, dienen leeg en bezemschoon te zijn. Meubels en obstakels moeten verwijderd zijn.</li>
                            <li><strong>Voorzieningen:</strong> Er dient gratis toegang te zijn tot elektriciteit (230V, en indien specifiek aangegeven 400V krachtstroom) en stromend water in de directe nabijheid van de werkplek.</li>
                            <li><strong>Temperatuur:</strong> De temperatuur in de woning mag tijdens de werkzaamheden en het droogproces niet lager zijn dan 10 graden Celsius, om een goede hechting en droging te garanderen.</li>
                        </ul>

                        <h2>3. Uitvoering en Droogtijden</h2>
                        <p>
                            Wij streven er altijd naar om de werkzaamheden binnen de opgegeven planning uit te voeren. Een opgegeven planning is echter altijd indicatief; bouwprojecten kunnen soms vertraging oplopen door onvoorziene omstandigheden.
                        </p>
                        <p>
                            <strong>Droging:</strong> De opdrachtgever is na oplevering zelf verantwoordelijk voor de juiste drogingscondities. Dit betekent goed ventileren (ramen op de kierstand, niet wijd open bij harde wind/kou). Schade aan het stucwerk (zoals krimpscheuren) ontstaan door geforceerde droging (bijvoorbeeld bouwheaters die te hoog staan) of door vochtproblemen van buitenaf, valt niet onder de aansprakelijkheid van {siteConfig.company.name}.
                        </p>

                        <h2>4. Meerwerk</h2>
                        <p>
                            Wijzigingen in de opdracht die leiden tot extra werkzaamheden (zoals het stucen van extra muren, plafonds of een andere afwerking dan overeengekomen) worden beschouwd als meerwerk. Dit wordt voorafgaand aan of tijdens de uitvoering met u besproken en apart in rekening gebracht.
                        </p>

                        <h2>5. Betaling</h2>
                        <p>
                            Tenzij anders schriftelijk overeengekomen, hanteren wij een betalingstermijn van 14 dagen na factuurdatum.
                        </p>
                        <p>
                            Bij grotere projecten (bijvoorbeeld > € 2.500,-) kan er in termijnen gefactureerd worden. Hierbij hanteren wij doorgaans een verdeling zoals: 30% bij aanvang van de werkzaamheden en 70% bij oplevering. De details hiervan vindt u terug op uw offerte.
                        </p>

                        <h2>6. Garantie</h2>
                        <p>
                            {siteConfig.company.name} staat in voor de kwaliteit van het geleverde werk en de hechting van het stucwerk op de ondergrond.
                        </p>
                        <p>
                            Er wordt <strong>geen garantie</strong> verstrekt op scheuren die ontstaan door werking van de ondergrond of de constructie van het pand. Dit geldt in het bijzonder voor nieuwbouwwoningen (zettingsscheuren) en overgangen tussen verschillende materialen (bijvoorbeeld hout op steen), tenzij er specifiek wapeningsgaas is geoffreerd en aangebracht (wat de kans op scheuren vermindert, maar nooit 100% uitsluit).
                        </p>
                    </article>

                    <div className="mt-12 border-t pt-8 print:hidden">
                        <PrintButton />
                    </div>
                </div>
            </section>
        </main>
    );
}
