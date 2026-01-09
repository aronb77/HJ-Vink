import type { Metadata } from "next";
import { Manrope, Inter, Playfair_Display } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import GlobalBottomCTA from "@/components/layout/GlobalBottomCTA";
import FloatingWizardButton from "@/components/ui/FloatingWizardButton";
import WizardModal from "@/components/wizard/WizardModal";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "H.J. Vink Afbouw | De Digitale Ambachtsman",
  description: "Stuc- en schilderwerk waar je naar blijft kijken. Vakmanschap in regio Kampen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${manrope.variable} ${inter.variable} ${playfair.variable} antialiased bg-plaster text-concrete`}
      >
        <Navbar />
        {children}
        <GlobalBottomCTA />
        <Footer />
        <FloatingWizardButton />
        <WizardModal />
      </body>
    </html>
  );
}
