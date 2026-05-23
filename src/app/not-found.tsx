import Link from "next/link";
import { IoAlertCircleOutline, IoHomeOutline, IoListOutline } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-black text-white p-8">
      <div className="max-w-2xl w-full rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm shadow-2xl">
        <IoAlertCircleOutline size={96} className="mx-auto text-fuchsia-300 mb-6" />

        <p className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-3">
          Página no encontrada
        </p>

        <h1 className="text-5xl font-black mb-4">404</h1>

        <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
          La ruta que intentaste abrir no existe o ya no está disponible.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-fuchsia-400 px-6 py-3 font-bold text-black transition hover:bg-fuchsia-300"
          >
            <IoHomeOutline size={20} />
            Ir al inicio
          </Link>

          <Link
            href="/pokemon"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-bold text-white transition hover:bg-white/10"
          >
            <IoListOutline size={20} />
            Ver Pokémon
          </Link>
        </div>
      </div>
    </div>
  );
}
