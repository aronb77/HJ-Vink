"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils"; // Assuming you might have a utils alias setup, otherwise I will avoid cn or ensure it exists.
// I will assume standard clsx/tailwind-merge pattern is not set up in a generic lib/utils unless I made it.
// I recall installing clsx/tailwind-merge but not creating a lib/utils.ts specifically for it in this chat yet?
// Wait, I see "Utilities: clsx, tailwind-merge" in the brief. 
// I'll stick to simple standard class strings or inline logic to avoid import error if lib/utils is missing.
import clsx from "clsx";
// Actually, let's just make it simple.

const items = [
    "Vloeren zorgvuldig afgeplakt met stucloper",
    "Stopcontacten en schakelaars afgeplakt",
    "Ramen en kozijnen beschermd",
    "Bouwafval volledig afgevoerd",
    "Woning bezemschoon opgeleverd"
];

export default function CleanWorkChecklist() {
    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        if (checkedItems.includes(index)) return; // Keep checked once clicked for "satisfaction"
        setCheckedItems((prev) => [...prev, index]);
    };

    const allChecked = checkedItems.length === items.length;

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-manrope font-bold text-concrete mb-4">
                        Wij laten geen rommel achter.
                    </h2>
                    <p className="text-concrete/60 font-inter text-lg">
                        Vakmanschap betekent ook respect voor uw woning.
                    </p>
                </div>

                <div className="space-y-4">
                    {items.map((item, index) => (
                        <CheckItem
                            key={index}
                            item={item}
                            isChecked={checkedItems.includes(index)}
                            onClick={() => toggleItem(index)}
                        />
                    ))}
                </div>

                {allChecked && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-gold font-bold text-xl mb-6">Zo hoort het. Klaar voor de start?</p>
                        <a href="/offerte" className="inline-flex items-center justify-center px-8 py-4 bg-concrete text-white font-manrope font-bold rounded-full hover:bg-gold hover:text-concrete transition-all duration-300">
                            Naar offerte tool
                        </a>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

function CheckItem({ item, isChecked, onClick }: { item: string, isChecked: boolean, onClick: () => void }) {
    return (
        <motion.div
            onClick={onClick}
            className={clsx(
                "flex items-center p-6 rounded-2xl cursor-pointer border transition-all duration-300 group",
                isChecked
                    ? "bg-green-50 border-green-200 shadow-sm"
                    : "bg-plaster border-transparent hover:border-black/5 hover:bg-white"
            )}
            whileTap={{ scale: 0.98 }}
        >
            <div className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center mr-6 transition-colors duration-300 shrink-0",
                isChecked ? "bg-green-500 text-white" : "bg-concrete/10 text-transparent group-hover:bg-concrete/20"
            )}>
                <Check className="w-5 h-5" />
            </div>

            <span className={clsx(
                "font-inter text-lg transition-colors duration-300",
                isChecked ? "text-green-900 font-medium" : "text-concrete"
            )}>
                {item}
            </span>
        </motion.div>
    )
}
