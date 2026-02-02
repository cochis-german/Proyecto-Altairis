"use client";

import { useState, useEffect } from "react";
// Ruta relativa para asegurar compatibilidad tras el movimiento de la carpeta types
import { Hotel, TipoHabitacion } from "../types";

export default function TiposHabitacionPage() {
  const [tipos, setTipos] = useState<TipoHabitacion[]>([]);
  const [hoteles, setHoteles] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [nuevoTipo, setNuevoTipo] = useState({
    hotelId: 0,
    nombre: "",
    capacidad: 2,
    precio: 0,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      // Usamos Promise.all para cargar ambas listas en paralelo de forma eficiente
      const [resTipos, resHoteles] = await Promise.all([
        fetch("/api/tipos-habitacion"),
        fetch("/api/hoteles"),
      ]);
      setTipos(await resTipos.json());
      setHoteles(await resHoteles.json());
    } catch (error) {
      console.error("Error al sincronizar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/tipos-habitacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoTipo),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNuevoTipo({ hotelId: 0, nombre: "", capacidad: 2, precio: 0 });
        fetchData();
      }
    } catch (error) {
      console.error("Error al crear categoría:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Tipos de Habitación
          </h1>
          <p className="text-slate-500">
            Define las categorías y precios por hotel.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm hover:bg-indigo-700 transition-colors"
        >
          + Nuevo Tipo
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
              <th className="px-6 py-4">Nombre</th>
              <th className="px-6 py-4">Capacidad</th>
              <th className="px-6 py-4">Precio</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-slate-400"
                >
                  Cargando categorías...
                </td>
              </tr>
            ) : (
              tipos.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {t.nombre}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {t.capacidad} personas
                  </td>
                  <td className="px-6 py-4 text-indigo-600 font-bold">
                    ${t.precio.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-indigo-600 font-medium hover:underline">
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal - Ajustado z-index a z-50 para compatibilidad con Tailwind estándar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">
                Nueva Categoría
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCrear} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Asignar a Hotel
                </label>
                <select
                  required
                  className="w-full border border-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={nuevoTipo.hotelId}
                  onChange={(e) =>
                    setNuevoTipo({
                      ...nuevoTipo,
                      hotelId: Number(e.target.value),
                    })
                  }
                >
                  <option value="">Seleccione un Hotel</option>
                  {hoteles.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nombre de la Categoría
                </label>
                <input
                  required
                  placeholder="ej. Suite Ejecutiva"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={nuevoTipo.nombre}
                  onChange={(e) =>
                    setNuevoTipo({ ...nuevoTipo, nombre: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Capacidad
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    value={nuevoTipo.capacidad}
                    onChange={(e) =>
                      setNuevoTipo({
                        ...nuevoTipo,
                        capacidad: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Precio por noche
                  </label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    value={nuevoTipo.precio}
                    onChange={(e) =>
                      setNuevoTipo({
                        ...nuevoTipo,
                        precio: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
