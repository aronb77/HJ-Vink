"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="flex items-center gap-2 text-gold font-bold hover:underline transition-colors mt-8"
        >
            <Printer className="w-5 h-5" />
            Print deze voorwaarden
        </button>
    );
}
