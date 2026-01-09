"use client";

import { motion } from "framer-motion";

interface RouteVisualizerProps {
    cityName: string;
    travelTime: string;
    coordinates: { x: number; y: number }; // x/y percentage (0-100)
}

export default function RouteVisualizer({ cityName, travelTime, coordinates }: RouteVisualizerProps) {
    // Kampen is altijd het startpunt (bijv. in het midden links)
    const homeBase = { x: 20, y: 50 };

    // De target stad (berekend of hardcoded in de data)
    // We mappen de coordinates van de data naar een visuele positie
    const target = {
        x: coordinates.x, // bijv 80%
        y: coordinates.y  // bijv 40%
    };

    const isHomeBase = cityName.toLowerCase() === 'kampen';

    return (
        <section className="relative w-full py-24 bg-concrete-dark overflow-hidden">
            {/* Background Grid Decoration */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                        {/* Tekst Kant */}
                        <div>
                            <h3 className="text-2xl md:text-3xl font-manrope font-bold text-white mb-4">
                                Korte lijnen, <span className="text-gold">snelle service.</span>
                            </h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                {isHomeBase
                                    ? "In Kampen rekenen wij geen reistijd en geen voorrijkosten. Wij zijn uw buren."
                                    : cityName.toLowerCase() === 'dronten'
                                        ? "Via de Hanzeweg (N307) zijn we zo bij u. Wij rekenen voor Dronten geen reiskosten."
                                        : cityName.toLowerCase() === 'ijsselmuiden'
                                            ? "Even de brug over en we zijn er. Voor IJsselmuiden rekenen wij nooit voorrijdkosten."
                                            : cityName.toLowerCase() === 'emmeloord'
                                                ? "De N50 is onze vaste route. Wij zijn in een kwartiertje bij de Poldertoren. Geen gedoe met lange reistijden."
                                                : `Wij zijn gevestigd in Kampen, wat betekent dat we voor projecten in ${cityName} letterlijk om de hoek zitten.`
                                }
                            </p>

                            <div className="flex items-center gap-4 text-white">
                                <div className="bg-white/10 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Reistijd</p>
                                    <p className="font-bold text-lg">{isHomeBase ? "0 minuten" : `+/- ${travelTime}`}</p>
                                </div>
                            </div>
                        </div>

                        {/* De Abstracte Kaart Visualisatie */}
                        <div className="relative h-64 w-full bg-black/20 rounded-xl border border-white/5 shadow-inner flex items-center justify-center overflow-hidden">

                            {/* SVG Connectie Lijn - Only show if NOT home base */}
                            {!isHomeBase && (
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    <motion.line
                                        x1={`${homeBase.x}%`}
                                        y1={`${homeBase.y}%`}
                                        x2={`${target.x}%`}
                                        y2={`${target.y}%`}
                                        stroke="#D4AF37"
                                        strokeWidth="2"
                                        strokeDasharray="4 4"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 0.6 }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                    />
                                </svg>
                            )}

                            {/* Start Punt (Kampen) - Render distinctly if it IS the target */}
                            {!isHomeBase && (
                                <div className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${homeBase.x}%`, top: `${homeBase.y}%` }}>
                                    <div className="relative">
                                        <div className="w-4 h-4 bg-white rounded-full border-2 border-concrete-dark relative z-10"></div>
                                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase text-gray-500 font-bold tracking-widest">Basis</div>
                                    </div>
                                </div>
                            )}

                            {/* Eind Punt (Doel Stad of Home Base) */}
                            <div className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${target.x}%`, top: `${target.y}%` }}>
                                <div className="relative">
                                    {/* Pulsing Effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gold rounded-full opacity-50"
                                        animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                    <div className="w-4 h-4 bg-gold rounded-full border-2 border-white relative z-10 shadow-[0_0_15px_rgba(212,175,55,0.6)]"></div>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-concrete-dark px-3 py-1 rounded text-xs font-bold shadow-lg border-b-2 border-gold">
                                        {isHomeBase ? "H.J. Vink (Uw locatie)" : cityName}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
