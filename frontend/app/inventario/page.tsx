"use client";
import { useEffect, useState } from "react";

type Inventario = {
  id: number;
  fecha: string;
  unidadesDisponibles: number;
};

export default function Inventario() {
  const [items, setItems] = useState<Inventario[]>([]);

  useEffect(() => {
    fetch("/api/inventario", { cache: "no-store" })
      .then((r) => r.text())
      .then((t) => {
        try {
          const d = JSON.parse(t);
          setItems(Array.isArray(d) ? d : []);
        } catch {
          setItems([]);
        }
      });
  }, []);

  return (
    <main className="min-h-screen bg-stone-50 p-6 md:p-10 text-stone-800">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Control de Inventario
            </h1>
            <p className="text-stone-500 mt-2 text-lg font-medium">
              Monitoreo de disponibilidad diaria de unidades.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative group">
              <input
                type="date"
                className="w-full sm:w-64 pl-4 pr-4 py-4 bg-white border-none shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] rounded-2xl text-stone-700 focus:ring-2 focus:ring-stone-200 transition-all uppercase text-xs font-bold tracking-widest"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Actualizar
            </button>
          </div>
        </header>

        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-stone-100 overflow-hidden">
          <div className="grid grid-cols-1 divide-y divide-stone-50">
            {items.map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between p-6 hover:bg-stone-50/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-stone-50 rounded-xl flex flex-col items-center justify-center border border-stone-100 group-hover:bg-white transition-colors">
                    <span className="text-[10px] font-bold text-stone-400 uppercase leading-none mb-1">
                      Día
                    </span>
                    <span className="text-lg font-bold text-stone-700 leading-none">
                      {new Date(i.fecha).getDate() + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-800 tracking-tight">
                      {new Date(i.fecha).toLocaleDateString("es-ES", {
                        month: "long",
                        year: "numeric",
                        day: "numeric",
                      })}
                    </h3>
                    <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">
                      Estado de ocupación
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right hidden sm:block">
                    <div className="flex items-center gap-2 justify-end">
                      <span
                        className={`h-2 w-2 rounded-full ${i.unidadesDisponibles > 5 ? "bg-emerald-400" : "bg-orange-400"}`}
                      ></span>
                      <span className="text-2xl font-serif font-bold text-stone-900">
                        {i.unidadesDisponibles}
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">
                      Unidades Libres
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-3 text-stone-300 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition-all">
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button className="p-3 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
