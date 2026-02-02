"use client";

import { useState, useEffect } from "react";
// Ruta relativa segura tras el movimiento de la carpeta types
import { Hotel, Inventario } from "../types";

// Interfaz para la matriz de datos con tipado estricto
interface MatrizDisponibilidad {
  [tipo: string]: {
    [fecha: string]: number;
  };
}

export default function InventarioPage() {
  const [hoteles, setHoteles] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<number | "">("");
  const [datos, setDatos] = useState<{ items: Inventario[] } | null>(null);
  const [loading, setLoading] = useState(false);

  // Cargar lista de hoteles al iniciar
  useEffect(() => {
    fetch("/api/hoteles")
      .then((res) => res.json())
      .then((data) => setHoteles(data))
      .catch((err) => console.error("Error cargando hoteles:", err));
  }, []);

  // Cargar inventario cuando se selecciona un hotel
  const fetchInventario = async (hId: number) => {
    setLoading(true);
    try {
      // La ruta relativa /api/ es necesaria para el proxy de Docker
      const res = await fetch(`/api/inventario?hotelId=${hId}`);
      const data = await res.json();
      setDatos(data);
    } catch (err) {
      console.error("Error cargando inventario:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleHotelChange = (id: string) => {
    const hotelId = id === "" ? "" : Number(id);
    setSelectedHotel(hotelId);
    if (hotelId !== "") {
      fetchInventario(hotelId);
    } else {
      setDatos(null);
    }
  };

  // 1. Extraer las fechas únicas (Cabeceras de columna)
  const fechas: string[] =
    datos?.items?.reduce((acc: string[], curr: Inventario) => {
      const f = new Date(curr.fecha).toLocaleDateString();
      if (!acc.includes(f)) acc.push(f);
      return acc;
    }, []) || [];

  // 2. Agrupar datos por Tipo de Habitación (Filas)
  const filas: MatrizDisponibilidad =
    datos?.items?.reduce((acc: MatrizDisponibilidad, curr: Inventario) => {
      const tipo = curr.tipoHabitacion || "Sin Categoría";
      const fechaKey = new Date(curr.fecha).toLocaleDateString();

      if (!acc[tipo]) acc[tipo] = {};
      acc[tipo][fechaKey] = curr.unidadesDisponibles;
      return acc;
    }, {} as MatrizDisponibilidad) || {};

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Disponibilidad Real
          </h1>
          <p className="text-slate-500">
            Matriz de ocupación proyectada a 14 días.
          </p>
        </div>
        <select
          className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-medium outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
          value={selectedHotel}
          onChange={(e) => handleHotelChange(e.target.value)}
        >
          <option value="">Seleccione un Hotel...</option>
          {hoteles.map((h) => (
            <option key={h.id} value={h.id}>
              {h.nombre}
            </option>
          ))}
        </select>
      </div>

      {!selectedHotel ? (
        <div className="bg-indigo-50 border border-indigo-100 p-12 rounded-3xl text-center">
          <span className="text-4xl mb-4 block">🏢</span>
          <p className="text-indigo-600 font-medium">
            Seleccione un hotel para visualizar la disponibilidad.
          </p>
        </div>
      ) : loading ? (
        <div className="p-12 text-center text-slate-400 font-bold animate-pulse">
          Sincronizando datos de inventario...
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-600 sticky left-0 bg-slate-50 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  Categoría
                </th>
                {fechas.map((f) => (
                  <th
                    key={f}
                    className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-l border-slate-100"
                  >
                    {f.split("/")[0]}/{f.split("/")[1]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.keys(filas).map((tipo) => (
                <tr key={tipo} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-left text-sm font-bold text-slate-700 sticky left-0 bg-white border-r border-slate-100 z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                    {tipo}
                  </td>
                  {fechas.map((f) => (
                    <td key={f} className="px-4 py-4 border-l border-slate-50">
                      <div
                        className={`w-9 h-9 mx-auto flex items-center justify-center rounded-lg text-xs font-black shadow-sm transition-all ${
                          (filas[tipo][f] || 0) > 0
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            : "bg-rose-100 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {filas[tipo][f] || 0}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
