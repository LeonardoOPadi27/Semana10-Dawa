"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Character } from "../../types/rickandmorty";

interface SearchableListProps {
  initialCharacters: Character[];
}

export default function SearchableList({ initialCharacters }: SearchableListProps) {
  // Hooks de Estado para los filtros
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  // Hook de Efecto para la búsqueda en tiempo real
  useEffect(() => {
    const fetchFilteredCharacters = async () => {
      setLoading(true);
      try {
        // Construcción dinámica de la URL con query params de la API
        const queryParams = new URLSearchParams();
        if (name) queryParams.append("name", name);
        if (status) queryParams.append("status", status);
        if (gender) queryParams.append("gender", gender);
        if (type) queryParams.append("type", type);

        const res = await fetch(`https://rickandmortyapi.com/api/character/?${queryParams.toString()}`);
        
        if (res.ok) {
          const data = await res.json();
          setCharacters(data.results);
        } else {
          setCharacters([]); // Si la API devuelve 404 (ningún personaje coincide)
        }
      } catch (error) {
        console.error("Error filtrando personajes:", error);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce simple para evitar saturar la API en cada pulsación de tecla
    const timeoutId = setTimeout(() => {
      fetchFilteredCharacters();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [name, status, gender, type]);

  return (
    <div className="space-y-8">
      {/* Panel de Filtros UI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <label className="block text-xs font-bold text-lime-400 uppercase tracking-wider mb-2">Nombre</label>
          <input
            type="text"
            placeholder="Ej: Rick, Morty..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-lime-500 transition text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-lime-400 uppercase tracking-wider mb-2">Estado</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-lime-500 transition text-sm"
          >
            <option value="">Todos</option>
            <option value="alive">Vivo (Alive)</option>
            <option value="dead">Muerto (Dead)</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-lime-400 uppercase tracking-wider mb-2">Género</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-lime-500 transition text-sm"
          >
            <option value="">Todos</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
            <option value="genderless">Sin Género</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-lime-400 uppercase tracking-wider mb-2">Tipo / Subespecie</label>
          <input
            type="text"
            placeholder="Ej: Parasite, Clone..."
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-lime-500 transition text-sm"
          />
        </div>
      </div>

      {/* Grid de Resultados */}
      {loading ? (
        <div className="text-center py-12 text-lime-400 font-medium animate-pulse text-lg">
          Abriendo portal dimensional...
        </div>
      ) : characters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/rickandmorty/${character.id}`}
              className="bg-slate-900 text-slate-100 rounded-xl shadow-lg p-6 border border-slate-800 hover:border-lime-500 hover:shadow-lime-500/20 transform transition hover:scale-105 cursor-pointer flex flex-col items-center text-center"
            >
              <Image
                width={150}
                height={150}
                src={character.image}
                alt={character.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4 shadow-md"
                priority={false} // Cumple el requisito de Carga de imágenes bajo demanda
              />
              
              <h2 className="text-xl font-bold capitalize line-clamp-1 w-full">
                {character.name}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                {character.species}
              </p>
              
              <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-slate-800/60 w-full">
                <span className={`w-2 h-2 rounded-full ${
                  character.status === 'Alive' ? 'bg-green-500' : 
                  character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
                }`} />
                <span className="text-xs font-semibold">{character.status}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl mt-8">
          Ningún personaje coincide con las coordenadas interdimensionales ingresadas.
        </div>
      )}
    </div>
  );
}