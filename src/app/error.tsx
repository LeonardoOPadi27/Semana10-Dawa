"use client";

import Link from "next/link";
import { IoWarningOutline } from "react-icons/io5";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-purple-900 text-white p-8">
      <IoWarningOutline size={100} className="text-yellow-400 mb-6" />

      <h1 className="text-5xl font-bold mb-4">Ocurrió un error</h1>

      <p className="text-xl text-center mb-2 max-w-2xl">
        Hubo un problema al cargar la página.
      </p>

      <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-white/5 p-4 mb-8">
        <p className="text-sm font-semibold text-yellow-300 mb-2">Mensaje</p>
        <p className="text-sm text-slate-200 break-words">{error.message}</p>

        {error.digest ? (
          <p className="text-xs text-slate-400 mt-3 break-words">
            Digest: {error.digest}
          </p>
        ) : null}

        {isDevelopment && error.stack ? (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-slate-300 hover:text-white">
              Ver stack trace
            </summary>
            <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap rounded-lg bg-black/40 p-3 text-xs text-slate-200">
              {error.stack}
            </pre>
          </details>
        ) : null}
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => reset()}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg"
        >
          Reintentar
        </button>

        <Link
          href="/"
          className="bg-white text-black font-bold px-6 py-3 rounded-lg"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
