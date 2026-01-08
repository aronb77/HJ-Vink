"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Project = {
    title: string;
    slug: string;
    mainImage: any;
    category: string;
};

type ProjectGalleryProps = {
    projects: Project[];
};

const CATEGORIES = [
    { label: "Alles", value: "all" },
    { label: "Stucwerk", value: "stucwerk" },
    { label: "Spackspuiten", value: "spackspuiten" },
    { label: "Schilderwerk", value: "schilderwerk" },
    { label: "Decoratief", value: "decoratief" },
    { label: "Nieuwbouw", value: "nieuwbouw" },
];

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredProjects = activeCategory === "all"
        ? projects
        : projects.filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase());

    return (
        <section className="py-20 min-h-screen bg-white">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="mb-16 text-center">
                    <span className="text-gold font-bold tracking-wider uppercase text-sm mb-2 block">
                        Portfolio
                    </span>
                    <h1 className="text-4xl md:text-5xl font-manrope font-bold text-concrete mb-4">
                        Ons Werk.
                    </h1>
                    <p className="text-concrete/70 font-inter max-w-xl mx-auto">
                        Resultaten waar we trots op zijn. Bekijk onze projecten en laat u inspireren door vakmanschap en detail.
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setActiveCategory(cat.value)}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border",
                                activeCategory === cat.value
                                    ? "bg-concrete-dark text-gold border-concrete-dark shadow-lg"
                                    : "bg-transparent text-concrete/60 border-concrete/20 hover:border-gold/50 hover:text-gold"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Masonry Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.slug} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-concrete/40 py-20 italic"
                    >
                        Geen projecten gevonden in deze categorie.
                    </motion.p>
                )}

            </div>
        </section>
    );
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
        >
            <Link
                href={`/projecten/${project.slug}`}
                className="group relative block w-full aspect-[4/5] rounded-xl overflow-hidden cursor-pointer"
            >
                {/* Image */}
                <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{
                        backgroundImage: `url(${typeof project.mainImage === 'string'
                                ? project.mainImage
                                : urlFor(project.mainImage).width(800).height(1000).url()
                            })`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Overlay (Hidden by default, shown on hover) */}
                <div className="absolute inset-0 bg-concrete-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">

                    <span className="text-gold text-xs font-bold uppercase tracking-widest mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                        {project.category}
                    </span>

                    <h3 className="text-2xl font-manrope font-bold text-white mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                        {project.title}
                    </h3>

                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200 group-hover:bg-gold group-hover:border-gold">
                        <ArrowUpRight className="w-5 h-5" />
                    </div>

                </div>

                {/* Animated Border */}
                <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 rounded-lg transition-colors duration-500 pointer-events-none" />

            </Link>
        </motion.div>
    );
}
