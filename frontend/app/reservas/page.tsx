"use client";
import { useEffect, useState } from "react";

type Reserva = {
  id: number;
  fechaCreacion: string;
  estado: string;
};

export default function Reservas() {
  const [items, setItems] = useState<Reserva[]>([]);

  useEffect(() => {
    fetch("/api/reservas", { cache: "no-store" })
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
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Libro de Reservas
            </h1>
            <p className="text-stone-500 mt-2 text-lg font-medium">
              Historial de actividad y gestión de estados operativos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-stone-400"
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
                placeholder="Buscar por ID o estado..."
                className="w-full sm:w-80 pl-11 pr-4 py-4 bg-white border-none shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] rounded-2xl text-stone-700 focus:ring-2 focus:ring-stone-200 transition-all"
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
              Nueva Reserva
            </button>
          </div>
        </header>

        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-stone-100 overflow-hidden">
          <div className="grid grid-cols-1 divide-y divide-stone-50">
            {items.map((r) => (
              <div
                key={r.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-7 hover:bg-stone-50/50 transition-all duration-300 group gap-6"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-stone-50 rounded-2xl flex flex-col items-center justify-center border border-stone-100 group-hover:bg-orange-50 transition-colors duration-500">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter leading-none mb-1">
                      ID
                    </span>
                    <span className="text-xl font-bold text-stone-800 leading-none">
                      #{r.id}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                      {new Date(r.fechaCreacion).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </h3>
                    <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mt-1">
                      Registrada el{" "}
                      {new Date(r.fechaCreacion).toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      hs
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-10">
                  <div
                    className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-sm ${
                      r.estado === "Confirmada"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : r.estado === "Pendiente"
                          ? "bg-orange-50 text-orange-600 border border-orange-100"
                          : "bg-stone-100 text-stone-500 border border-stone-200"
                    }`}
                  >
                    {r.estado}
                  </div>

                  <div className="flex items-center gap-2">
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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
