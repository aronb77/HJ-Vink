"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Copy, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/config/site-config";

export default function ContactCard() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
    const shineOpacity = useTransform(mouseX, [-0.5, 0.5], [0, 0.5]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;

        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const [copied, setCopied] = useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(siteConfig.contact.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={copyToClipboard}
            className="relative w-full max-w-sm aspect-[1.58/1] bg-concrete-dark rounded-xl shadow-2xl cursor-pointer group select-none"
        >
            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-20 rounded-xl overflow-hidden pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }} />

            {/* Shine Effect */}
            <motion.div
                style={{ opacity: shineOpacity }}
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent z-10 rounded-xl pointer-events-none"
            />

            {/* Content Layer (Raised) */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-gold font-manrope font-bold text-lg tracking-wider uppercase">{siteConfig.company.name}</h3>
                        <p className="text-white/40 text-xs tracking-widest uppercase">Afbouw & Stucadoors</p>
                    </div>
                    {/* Status Indicator */}
                    <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-full border border-white/5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] text-white/60 font-medium uppercase tracking-wide">Nu Bereikbaar</span>
                    </div>
                </div>

                {/* Center */}
                <div className="flex-1 flex items-center justify-center">
                    <h2 className="text-3xl text-white font-playfair italic">{siteConfig.company.owner}</h2>
                </div>

                {/* Footer Details */}
                <div className="space-y-2 text-sm text-gray-300 font-inter">
                    <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gold" />
                        <span>{siteConfig.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gold" />
                        <span>{siteConfig.contact.email}</span>
                    </div>
                </div>

            </div>

            {/* Copy Feedback Overlay */}
            {copied && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/80 rounded-xl z-20 flex flex-col items-center justify-center text-white backdrop-blur-sm"
                >
                    <Copy className="w-8 h-8 text-gold mb-2" />
                    <span className="font-bold">Email Gekopieerd!</span>
                </motion.div>
            )}

        </motion.div>
    );
}
