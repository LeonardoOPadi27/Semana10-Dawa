import { ReactNode } from "react";
import Link from "next/link";
import { IoGameController } from "react-icons/io5";

interface PokemonLayoutProps {
  children: ReactNode;
}

export default function PokemonLayout({ children }: PokemonLayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-black text-white">
      <nav className="bg-black/30 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center gap-4">
          <Link
            href="/pokemon"
            className="text-white text-2xl font-bold hover:text-purple-400 transition"
          >
            <IoGameController size={30} className="inline-block" /> Pokédex Next.js
          </Link>

          <Link
            href="/rickandmorty"
            className="text-sm text-slate-300 hover:text-lime-300 transition font-medium"
          >
            Ir a Rick & Morty
          </Link>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}
