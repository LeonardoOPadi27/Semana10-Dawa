import { ReactNode } from "react";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokédex - Next.js",
  description: "Explora el mundo Pokémon",
};

interface PokemonLayoutProps {
  children: ReactNode;
}

export default function PokemonLayout({ children }: PokemonLayoutProps) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
