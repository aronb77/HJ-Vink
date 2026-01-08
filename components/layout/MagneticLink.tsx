"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

interface MagneticLinkProps {
    children: React.ReactNode;
    href: string;
}

export default function MagneticLink({ children, href }: MagneticLinkProps) {
    return (
        <div className="relative">
            <Link href={href} className="relative group block py-4 px-2">
                <span className="font-manrope font-bold text-concrete transition-colors duration-300 group-hover:text-gold relative z-10">
                    {children}
                </span>
                <motion.span
                    className="absolute left-1/2 bottom-2 w-1 h-1 bg-gold rounded-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    layoutId="nav-dot"
                />
            </Link>
        </div>
    );
}
