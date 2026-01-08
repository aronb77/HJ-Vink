"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { urlFor } from "@/lib/sanity/image";
import { ArrowUpRight, GripHorizontal } from "lucide-react";
import Link from "next/link";

// Define locally or import if shared
export type Project = {
    title: string;
    slug: string;
    mainImage: any;
    category: string;
};

export default function ProjectDragSlider({ projects }: { projects: Project[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [isCursorVisible, setIsCursorVisible] = useState(false);

    useEffect(() => {
        if (containerRef.current) {
            // Calculate scrollable width: Total scroll width - Viewport width + some padding
            setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
        }
    }, [projects]);

    return (
        <div
            className="relative w-full overflow-hidden group py-12"
            onMouseEnter={() => setIsCursorVisible(true)}
            onMouseLeave={() => setIsCursorVisible(false)}
        >
            {/* Custom Cursor Text (Optional Bonus) */}
            <motion.div
                className="fixed pointer-events-none z-50 bg-white text-concrete text-[10px] font-bold uppercase px-2 py-1 rounded mix-blend-difference hidden md:block"
                animate={{
                    opacity: isCursorVisible ? 1 : 0,
                    scale: isCursorVisible ? 1 : 0.8,
                }}
                style={{
                    left: 0,
                    top: 0,
                    // We'd need to track mouse here again for this specific element if we want it to follow.
                    // Since we already did a complex cursor in Hero, maybe just stick to CSS cursor: grab/grabbing for now
                    // to save complexity and performance.
                }}
            >
            </motion.div>

            {/* 
        We use a simple CSS cursor class on the container for the grab feel.
        'cursor-grab' and 'active:cursor-grabbing'
      */}

            <motion.div
                ref={containerRef}
                className="flex gap-6 md:gap-10 px-8 md:px-20 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ right: 0, left: -width }}
                whileTap={{ cursor: "grabbing" }}
            >
                {projects.map((project, i) => (
                    <ProjectCard key={i} project={project} />
                ))}
            </motion.div>

            {/* Link to all projects */}
            <div className="container mx-auto px-4 mt-12 flex justify-center">
                <Link
                    href="/projecten"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-manrope font-bold text-sm uppercase tracking-widest border-b border-white/20 pb-1 hover:border-white"
                >
                    Bekijk alle projecten
                    <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}

function ProjectCard({ project }: { project: Project }) {
    const imageUrl = project.mainImage ? urlFor(project.mainImage).width(600).height(450).url() : "";

    return (
        <Link href={`/projecten/${project.slug}`} draggable={false} className="relative group block min-w-[300px] md:min-w-[500px] aspect-[4/3] rounded-md overflow-hidden bg-white/5">
            {/* Image */}
            {imageUrl ? (
                <motion.div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${imageUrl}')` }}
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 text-zinc-600">
                    <GripHorizontal />
                </div>
            )}

            {/* Overlay - Desktop Hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block" />

            {/* Overlay - Mobile Always (Gradient) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent md:hidden" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                <div className="transform md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-gold text-xs font-bold uppercase tracking-wider mb-2 block">
                        {project.category}
                    </span>
                    <h3 className="text-xl md:text-3xl font-manrope font-bold text-white">
                        {project.title}
                    </h3>
                </div>
                {/* Mobile Static Content (duplicate logic slightly but easier to separate visuals) */}
                <div className="md:hidden mt-2">
                    {/* Already rendered above, we just need to ensure visibility rules match. 
                     Actually, the above block is hidden by opacity on desktop default.
                     On mobile, we want it visible always.
                  */}
                    <style jsx>{`
                    @media (max-width: 768px) {
                        .transform { transform: none !important; opacity: 1 !important; }
                    }
                  `}</style>
                </div>
            </div>
        </Link>
    );
}
