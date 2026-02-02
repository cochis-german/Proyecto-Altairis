"use client";
import { useEffect, useState } from "react";

type Hotel = {
  id: number;
  nombre: string;
  ciudad: string;
  pais: string;
  activo: boolean;
};

export default function Home() {
  const [hoteles, setHoteles] = useState<Hotel[]>([]);

  useEffect(() => {
    fetch("/api/hoteles", { cache: "no-store" })
      .then((r) => r.text())
      .then((t) => {
        try {
          const d = JSON.parse(t);
          setHoteles(Array.isArray(d) ? d : []);
        } catch {
          setHoteles([]);
        }
      });
  }, []);

  return (
    <main className="min-h-screen bg-stone-50 p-6 md:p-10 text-stone-800">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div>
            <h1 className="text-5xl font-serif font-bold text-stone-900 tracking-tight">
              Viajes Altairis
            </h1>
            <p className="text-stone-500 mt-3 text-lg">
              Catálogo estratégico de establecimientos hoteleros.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-stone-400 group-focus-within:text-stone-600 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Filtrar por nombre o ciudad..."
                className="w-full sm:w-80 pl-11 pr-4 py-4 bg-white border-none shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] rounded-2xl text-stone-700 focus:ring-2 focus:ring-stone-200 transition-all placeholder:text-stone-400"
              />
            </div>
            <button className="bg-stone-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-stone-800 transition-all shadow-xl shadow-stone-200 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Añadir Hotel
            </button>
          </div>
        </header>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {hoteles.map((h) => (
            <div
              key={h.id}
              className="group relative bg-white rounded-[2.5rem] p-8 shadow-[0_15px_50px_-20px_rgba(0,0,0,0.05)] border border-stone-100 hover:border-stone-200 hover:shadow-[0_30px_60px_-15px_rgba(120,113,108,0.15)] transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-stone-50 rounded-3xl flex items-center justify-center group-hover:bg-orange-50 group-hover:scale-110 transition-all duration-500">
                  <svg
                    className="w-8 h-8 text-stone-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="p-3 bg-stone-50 text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition-all">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button className="p-3 bg-stone-50 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] ${h.activo ? "bg-emerald-50 text-emerald-600" : "bg-stone-100 text-stone-400"}`}
                >
                  {h.activo ? "Activo" : "Inactivo"}
                </div>
                <h2 className="text-3xl font-bold text-stone-900 tracking-tight leading-none group-hover:text-stone-700 transition-colors">
                  {h.nombre}
                </h2>
                <div className="flex items-center text-stone-400 font-medium">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                  {h.ciudad}, {h.pais}
                </div>
              </div>

              <div className="pt-6 border-t border-stone-50 flex items-center justify-between">
                <button className="text-sm font-bold text-stone-900 hover:text-stone-600 transition-colors flex items-center gap-1 group/btn">
                  Ver Detalles
                  <svg
                    className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <span className="text-[10px] font-mono text-stone-300 uppercase">
                  Ref. 00{h.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
