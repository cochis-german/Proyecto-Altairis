"use client";
import { useEffect, useState } from "react";

type Cliente = {
  id: number;
  nombreCompleto: string;
  email: string;
};

export default function Clientes() {
  const [items, setItems] = useState<Cliente[]>([]);

  useEffect(() => {
    fetch("/api/clientes", { cache: "no-store" })
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
              Gestión de Clientes
            </h1>
            <p className="text-stone-500 mt-2 text-lg font-medium">
              Base de datos de huéspedes y contactos corporativos.
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
                placeholder="Buscar por nombre o correo..."
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
              Nuevo Cliente
            </button>
          </div>
        </header>

        <div className="space-y-4">
          {items.map((c) => (
            <div
              key={c.id}
              className="group bg-white p-5 rounded-4x1 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:border-stone-200 transition-all duration-500"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center font-bold text-stone-400 group-hover:bg-orange-50 group-hover:text-stone-700 transition-all duration-500 text-xl">
                  {c.nombreCompleto.substring(0, 1).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 leading-tight">
                    {c.nombreCompleto}
                  </h3>
                  <div className="flex items-center text-stone-400 mt-1">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium">{c.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-50">
                <button className="flex items-center gap-2 px-4 py-2 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-xl transition-all font-semibold text-sm">
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
                  Editar
                </button>
                <button className="p-2.5 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
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
                <div className="w-px h-8 bg-stone-100 mx-2 hidden sm:block"></div>
                <span className="text-[10px] font-mono text-stone-300 uppercase hidden md:block">
                  ID-00{c.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
