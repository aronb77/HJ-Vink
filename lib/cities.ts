export interface CityData {
    slug: string;
    name: string;
    travelTime: string; // bijv. "15 minuten"
    neighborhoods: string; // bijv. "Stadshagen en de binnenstad"
    uspText: string; // Specifieke tekst voor de stad
    coordinates: { x: number; y: number }; // Voor de Route Visualizer (0-100 range)
}

export const CITY_DATA: Record<string, CityData> = {
    zwolle: {
        slug: "zwolle",
        name: "Zwolle",
        travelTime: "15 minuten",
        neighborhoods: "Stadshagen, Westenholte en het centrum",
        uspText: "Wij kennen de nieuwbouwprojecten in Stadshagen net zo goed als de monumentale panden in de binnenstad.",
        coordinates: { x: 80, y: 40 }, // Zwolle ligt rechts van Kampen
    },
    dronten: {
        slug: "dronten",
        name: "Dronten",
        travelTime: "20 minuten", // Via de N307
        neighborhoods: "De Gilden, Dronten-West, de Munten en het Centrum",
        uspText: "De woningen in Dronten zijn vaak ruim opgezet. Wij hebben de capaciteit en machines (Airless Spuiten) om grote oppervlaktes in de polder strak en efficiënt af te werken.",
        coordinates: { x: 20, y: 60 }, // Dronten ligt ten westen van Kampen
    },
    kampen: {
        slug: "kampen",
        name: "Kampen",
        travelTime: "Direct", // Want we zitten er al
        neighborhoods: "de Binnenstad, Brunnepe, De Maten en Het Onderdijks",
        uspText: "Als écht Kamper bedrijf kennen we elk type woning. Van monumentale panden aan de Oudestraat tot de betonbouw in Het Onderdijks.",
        coordinates: { x: 20, y: 50 }, // Zelfde X-positie als de 'Home Base'
    },
    ijsselmuiden: {
        slug: "ijsselmuiden",
        name: "IJsselmuiden",
        travelTime: "5 minuten", // Even de brug over
        neighborhoods: "Sonnenberg, Trekvaart, Groenendijk en het dorp",
        uspText: "Wij zitten letterlijk aan de overkant van de IJssel. Voor projecten in IJsselmuiden, zoals de nieuwbouw op de Sonnenberg, zijn wij uw directe buurman.",
        coordinates: { x: 35, y: 50 }, // Vlak naast Kampen (Home Base is 20,50)
    },
    emmeloord: {
        slug: "emmeloord",
        name: "Emmeloord",
        travelTime: "15 minuten", // Via de N50
        neighborhoods: "Emmelhage, De Erven, Revelsant en het Centrum",
        uspText: "De Noordoostpolder kent een echte no-nonsense mentaliteit, net als wij. Wij zijn veel actief in de nieuwbouw van Emmelhage met dunpleister en spuitwerk.",
        coordinates: { x: 30, y: 20 }, // Emmeloord ligt ten noorden van Kampen
    },
    hattem: {
        slug: "hattem",
        name: "Hattem",
        travelTime: "10 minuten", // Via de N50/Brug
        neighborhoods: "De binnenstad, villawijken in de bossen en 't Veen",
        uspText: "Hattem vraagt om precisie. Of het nu gaat om een monumentaal pand in de stad of een moderne villa in de bossen: wij leveren de high-end afwerking die uw woning verdient.",
        coordinates: { x: 40, y: 55 }, // Ten zuidoosten van Kampen
    },
    urk: {
        slug: "urk",
        name: "Urk",
        travelTime: "20 minuten", // Via N50 en Domineesweg
        neighborhoods: "de Zeeheldenwijk, Oranjewijk, De Staart en de oude Bult",
        uspText: "Op Urk telt maar één ding: kwaliteit. Wij begrijpen dat u een vakman zoekt die zijn woord houdt en meters kan maken in uw (nieuwe) woning.",
        coordinates: { x: 10, y: 30 },
    },
    genemuiden: {
        slug: "genemuiden",
        name: "Genemuiden",
        travelTime: "15 minuten", // Via de Kamperzeedijk/N760
        neighborhoods: "Tag West, De Greente, het Industriegebied en de Binnenstad",
        uspText: "Genemuidenaren houden van doorpakken. Wij ook. Met onze spuittechnieken maken we uw nieuwbouwwoning in Tag West of renovatieproject in de binnenstad in recordtijd strak.",
        coordinates: { x: 35, y: 35 },
    },
    wezep: {
        slug: "wezep",
        name: "Wezep",
        travelTime: "10 minuten", // Via de N50
        neighborhoods: "Wezep-Noord, Hattemerbroek, de Stationsomgeving en het Centrum",
        uspText: "Wezep ligt strategisch perfect. Wij helpen veel nieuwe bewoners in Wezep om gedateerde woningen weer helemaal strak en modern te maken.",
        coordinates: { x: 45, y: 60 },
    },
};

export const getCityData = (slug: string) => CITY_DATA[slug.toLowerCase()] || null;
