import { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rick & Morty Multiverse Explorer",
  description: "Explora los personajes del multiverso de Rick and Morty",
};

interface LayoutProps {
  children: ReactNode;
}

export default function RickAndMortyLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-lime-500 selection:text-black">
      {/* Navbar con estilo temático */}
      <nav className="border-b border-lime-500/20 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link 
            href="/rickandmorty" 
            className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent hover:opacity-80 transition"
          >
            WUBBA LUBBA DUB DUB
          </Link>
          <div className="flex gap-4">
            <Link href="/pokemon" className="text-sm text-slate-400 hover:text-purple-400 transition">
              ← Volver a Pokédex
            </Link>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}