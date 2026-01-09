import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 pt-32 pb-20">
            <h1 className="text-4xl font-manrope font-bold text-concrete mb-4">404</h1>
            <h2 className="text-2xl font-manrope font-bold text-concrete mb-4">Pagina niet gevonden</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">De pagina die je zoekt bestaat niet of is verplaatst.</p>
            <Link
                href="/"
                className="bg-gold text-concrete px-6 py-3 rounded hover:bg-gold/90 transition-colors font-bold inline-block"
            >
                Terug naar Home
            </Link>
        </div>
    )
}
