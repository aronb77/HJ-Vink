import { Facebook, Instagram, Linkedin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { siteConfig } from "@/config/site-config";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-concrete-dark text-white pt-16 pb-8 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* COLUMN 1: Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/logo-white.svg"
                                alt={siteConfig.company.name}
                                width={200}
                                height={50}
                                className="h-10 w-auto mb-2"
                            />
                        </Link>
                        <p className="text-gray-400 font-inter text-sm leading-relaxed max-w-xs">
                            Kwaliteit in afbouw. Wij verzorgen stuc- en schilderwerk op topniveau in de regio Kampen en omstreken.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialLink href={siteConfig.socials.facebook} icon={<Facebook className="w-5 h-5" />} />
                            <SocialLink href={siteConfig.socials.instagram} icon={<Instagram className="w-5 h-5" />} />
                            <SocialLink href="#" icon={<Linkedin className="w-5 h-5" />} />
                        </div>
                    </div>

                    {/* COLUMN 2: Navigation */}
                    <div>
                        <h4 className="text-gold font-bold uppercase text-sm tracking-wider mb-6">Navigatie</h4>
                        <ul className="space-y-3 font-inter text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/diensten" className="hover:text-white transition-colors">Diensten</Link></li>
                            <li><Link href="/projecten" className="hover:text-white transition-colors">Projecten</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/offerte" className="hover:text-white transition-colors">Offerte aanvragen</Link></li>
                        </ul>
                    </div>

                    {/* COLUMN 3: Werkgebied (SEO) */}
                    <div>
                        <h4 className="text-gold font-bold uppercase text-sm tracking-wider mb-6">Werkgebied</h4>
                        <ul className="space-y-3 font-inter text-sm text-gray-400">
                            <li><Link href="/werkgebied/kampen" className="hover:text-white transition-colors">Stucadoor Kampen</Link></li>
                            <li><Link href="/werkgebied/zwolle" className="hover:text-white transition-colors">Stucadoor Zwolle</Link></li>
                            <li><Link href="/werkgebied/dronten" className="hover:text-white transition-colors">Stucadoor Dronten</Link></li>
                            <li><Link href="/werkgebied/ijsselmuiden" className="hover:text-white transition-colors">Stucadoor IJsselmuiden</Link></li>
                            <li><Link href="/werkgebied/emmeloord" className="hover:text-white transition-colors">Stucadoor Emmeloord</Link></li>
                            <li><Link href="/werkgebied/hattem" className="hover:text-white transition-colors">Stucadoor Hattem</Link></li>
                            <li><Link href="/werkgebied/urk" className="hover:text-white transition-colors">Stucadoor Urk</Link></li>
                            <li><Link href="/werkgebied/genemuiden" className="hover:text-white transition-colors">Stucadoor Genemuiden</Link></li>
                            <li><Link href="/werkgebied/wezep" className="hover:text-white transition-colors">Stucadoor Wezep</Link></li>
                        </ul>
                    </div>

                    {/* COLUMN 4: Contact */}
                    <div>
                        <h4 className="text-gold font-bold uppercase text-sm tracking-wider mb-6">Contact</h4>
                        <ul className="space-y-4 font-inter text-sm text-gray-400">
                            <li>
                                <p className="font-bold text-white mb-1">{siteConfig.company.name}</p>
                                <p>{siteConfig.contact.address}</p>
                                <p>{siteConfig.contact.zip} {siteConfig.contact.city}</p>
                            </li>
                            <li>
                                <a href={siteConfig.contact.phoneLink} className="inline-flex items-center gap-2 text-white font-bold text-lg hover:text-gold transition-colors">
                                    <Phone className="w-5 h-5 text-gold" />
                                    {siteConfig.contact.phone}
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                                    {siteConfig.contact.email}
                                </a>
                            </li>
                            <li>
                                <p className="text-xs text-gray-600 mt-2">KVK: {siteConfig.company.kvk}</p>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* BOTTOM BAR */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-inter">
                    <p>&copy; {currentYear} H.J. Vink Afbouw. Alle rechten voorbehouden.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/voorwaarden" className="hover:text-white transition-colors">Voorwaarden</Link>
                        <a href="https://vossendesign.nl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors opacity-50 hover:opacity-100">Made by Vossen Design</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-gold hover:text-concrete transition-all duration-300"
        >
            {icon}
        </a>
    )
}
