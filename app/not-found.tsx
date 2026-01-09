import Link from 'next/link'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 pt-32 pb-20 bg-plaster">
            <div className="bg-white/50 p-6 rounded-full mb-6">
                <FileQuestion className="w-16 h-16 text-gold" />
            </div>
            <h1 className="text-5xl font-manrope font-bold text-concrete mb-4">404</h1>
            <h2 className="text-2xl font-manrope font-bold text-concrete mb-4">Pagina niet gevonden</h2>
            <p className="text-concrete/70 mb-8 max-w-md mx-auto">
                De pagina die u zoekt bestaat niet, is verplaatst of verwijderd.
            </p>
            <Link
                href="/"
                className="bg-gold text-concrete px-8 py-3 rounded-md hover:bg-gold/90 transition-colors font-bold inline-block shadow-sm"
            >
                Terug naar Home
            </Link>
        </div>
    )
}
