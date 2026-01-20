import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-5 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Página no encontrada</h2>
      <p className="mt-2 text-muted">Lo sentimos, la página que buscas no existe.</p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-accent px-5 py-3 font-bold text-white transition-transform hover:scale-105"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
