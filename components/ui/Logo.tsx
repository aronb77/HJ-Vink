import React from "react";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
    return (
        <Image
            src="/logo.png"
            alt="H.J. Vink Afbouw"
            width={185}
            height={91}
            className={className}
            priority
        />
    );
}
