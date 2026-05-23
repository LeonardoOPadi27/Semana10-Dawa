import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Character, ApiResponse } from "../../../types/rickandmorty";

interface Props {
  params: Promise<{ id: string }>;
}

// Configuración de Revalidación: 10 días en segundos (10 * 24 * 60 * 60)
export const revalidate = 864000; 

async function getCharacterDetail(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 }
  });

  if (!res.ok) notFound();
  return res.json();
}

// Genera rutas estáticas en tiempo de compilación (SSG/ISR base)
export async function generateStaticParams() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data: ApiResponse = await res.json();

  return data.results.map((character) => ({
    id: character.id.toString(),
  }));
}

// Metadata Dinámica para optimizar las pestañas del navegador
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const character = await getCharacterDetail(id);
  return {
    title: `${character.name} - Expediente Multiversal`,
    description: `Detalles completos sobre ${character.name}`,
  };
}

export default async function CharacterDetailPage({ params }: Props) {
  const { id } = await params;
  const character = await getCharacterDetail(id);

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        
        {/* Botón Volver */}
        <Link
          href="/rickandmorty"
          className="inline-block bg-slate-900 hover:bg-lime-500 hover:text-black text-lime-400 font-bold py-3 px-6 rounded-lg transition-all duration-300 mb-8 border border-lime-500/30"
        >
          ← Volver al listado
        </Link>

        {/* Tarjeta Principal */}
        <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
          
          {/* Encabezado (Nombre y ID) */}
          <div className="bg-gradient-to-r from-slate-950 to-slate-900 p-8 border-b border-slate-800 text-center md:text-left">
            <span className="text-lime-400 font-bold text-lg tracking-widest uppercase">
              ID: #{character.id.toString().padStart(3, "0")}
            </span>
            <h1 className="text-5xl font-black text-white capitalize mt-2 drop-shadow-md">
              {character.name}
            </h1>
          </div>

          {/* Contenido Estructurado en Columnas (Imagen e Información) */}
          <div className="flex flex-col md:flex-row p-8 gap-12 items-center md:items-start">
            
            {/* Lado Izquierdo: Imagen centrada y escalada al tamaño del Pokédex */}
            <div className="flex-shrink-0 flex justify-center items-center">
              <div className="relative p-2 rounded-full bg-gradient-to-tr from-lime-500 to-emerald-600 shadow-xl shadow-lime-500/20">
                <Image
                  width={250}
                  height={250}
                  src={character.image}
                  alt={character.name}
                  className="w-64 h-auto rounded-full object-cover border-4 border-slate-950 bg-slate-950"
                  priority
                />
              </div>
            </div>

            {/* Lado Derecho: Detalles del Personaje mapeados */}
            <div className="flex-1 w-full space-y-6">
              
              {/* Sección Datos Biológicos */}
              <div>
                <h3 className="text-2xl font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2">
                  Datos Biológicos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="block text-slate-500 text-sm mb-1">Estado Vital</span>
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${
                        character.status === 'Alive' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 
                        character.status === 'Dead' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-gray-500'
                      }`} />
                      <span className="font-bold text-lg text-white">{character.status}</span>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="block text-slate-500 text-sm mb-1">Especie / Género</span>
                    <span className="font-bold text-lg text-white capitalize">
                      {character.species} • {character.gender}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sección Ubicaciones */}
              <div>
                <h3 className="text-2xl font-bold text-slate-200 mb-4 border-b border-slate-700 pb-2">
                  Ubicación Mundana
                </h3>
                <div className="space-y-3 text-slate-300">
                  <p className="flex flex-col sm:flex-row sm:justify-between bg-slate-800/30 p-3 rounded-lg text-base">
                    <strong className="text-lime-400">Origen:</strong> 
                    <span className="text-right">{character.origin.name}</span>
                  </p>
                  <p className="flex flex-col sm:flex-row sm:justify-between bg-slate-800/30 p-3 rounded-lg text-base">
                    <strong className="text-lime-400">Ubicación actual:</strong> 
                    <span className="text-right">{character.location.name}</span>
                  </p>
                </div>
              </div>

              {/* Barra de Datos Extras Inferior */}
              <div className="flex justify-between items-center pt-6 text-sm text-slate-500">
                <span className="bg-slate-950 px-4 py-2 rounded-full border border-slate-800">
                  Apariciones: <strong className="text-lime-400">{character.episode.length} eps</strong>
                </span>
                <span>Registrado: {new Date(character.created).toLocaleDateString()}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}