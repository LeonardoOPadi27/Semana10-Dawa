import SearchableList from "./SearchableList";
import { ApiResponse } from "../../types/rickandmorty";

// Función asíncrona para obtener los personajes del servidor
async function getInitialCharacters(): Promise<ApiResponse> {
  try {
    const res = await fetch("https://rickandmortyapi.com/api/character", {
      cache: "force-cache", // Requisito: Forzar el caché en la petición (Static Site Generation - SSG)
    });

    if (!res.ok) {
      throw new Error("No se pudieron teletransportar los personajes iniciales");
    }

    return res.json();
  } catch (error) {
    console.error("Rick and Morty API no disponible en build/runtime", error);
    return {
      info: {
        count: 0,
        pages: 0,
        next: null,
        previous: null,
      },
      results: [],
    };
  }
}

export default async function RickAndMortyIndex() {
  const data = await getInitialCharacters();

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-100 tracking-tight">
          Personajes del <span className="text-lime-400">Multiverso</span>
        </h1>
        <p className="text-slate-400 mt-2 text-base md:text-lg">
          Filtra y explora las entidades biológicas registradas por la Ciudadela.
        </p>
      </div>

      {/* Renderizado del componente del lado del cliente con el estado base */}
      <SearchableList initialCharacters={data.results} />
    </div>
  );
}