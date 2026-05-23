import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-300">
            Next.js en Vercel
          </p>

          <h1 className="text-5xl font-black leading-tight md:text-7xl">
            Dos rutas, una sola app.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
            Desde esta portada puedes abrir la Pokédex y la sección de Rick & Morty.
            Así tu profesor entra a la URL principal y navega sin errores.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Link
            href="/pokemon"
            className="group rounded-3xl border border-purple-400/20 bg-white/5 p-8 transition hover:-translate-y-1 hover:bg-white/10"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-purple-300">
              Pokédex
            </p>
            <h2 className="mt-3 text-3xl font-bold">Ver Pokémon</h2>
            <p className="mt-3 text-slate-300">
              Lista ISR con navegación a cada detalle de Pokémon.
            </p>
          </Link>

          <Link
            href="/rickandmorty"
            className="group rounded-3xl border border-lime-400/20 bg-white/5 p-8 transition hover:-translate-y-1 hover:bg-white/10"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-lime-300">
              Rick & Morty
            </p>
            <h2 className="mt-3 text-3xl font-bold">Ver personajes</h2>
            <p className="mt-3 text-slate-300">
              Búsqueda, filtros y detalle de personajes con páginas generadas.
            </p>
          </Link>
        </div>

        <p className="mt-10 text-sm text-slate-400">
          URLs clave: <span className="text-white">/pokemon</span> y{' '}
          <span className="text-white">/rickandmorty</span>.
        </p>
      </div>
    </main>
  );
}
