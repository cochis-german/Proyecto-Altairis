"use client";

import { useState, useEffect } from "react";
// Ruta relativa para garantizar que encuentre el archivo tras mover la carpeta types
import { Hotel } from "../types";

export default function HotelesPage() {
  const [hoteles, setHoteles] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [nuevoHotel, setNuevoHotel] = useState({
    nombre: "",
    ciudad: "",
    pais: "",
    activo: true,
  });

  // 1. Cargar hoteles (Ruta /api/ para proxy de Docker)
  const fetchHoteles = async (query = "") => {
    try {
      setLoading(true);
      const res = await fetch(`/api/hoteles${query ? `?q=${query}` : ""}`);
      const data = await res.json();
      setHoteles(data);
    } catch (error) {
      console.error("Error al cargar hoteles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoteles(search);
  }, [search]);

  // 2. Crear un nuevo hotel
  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/hoteles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoHotel),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNuevoHotel({ nombre: "", ciudad: "", pais: "", activo: true });
        fetchHoteles();
      }
    } catch (error) {
      console.error("Error al crear hotel:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Gestión de Hoteles
          </h1>
          <p className="text-slate-500">
            Administra las sedes y su disponibilidad global.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <span>+</span> Nuevo Hotel
        </button>
      </div>

      {/* Buscador */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <input
          type="text"
          placeholder="Buscar por nombre, ciudad o país..."
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                ID
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Nombre
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Ubicación
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Estado
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-slate-400"
                >
                  Cargando hoteles...
                </td>
              </tr>
            ) : hoteles.length > 0 ? (
              hoteles.map((hotel) => (
                <tr
                  key={hotel.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-slate-500 font-mono">
                    #{hotel.id}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">
                    {hotel.nombre}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {hotel.ciudad}, {hotel.pais}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${hotel.activo ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                    >
                      {hotel.activo ? "ACTIVO" : "INACTIVO"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-indigo-600 hover:text-indigo-900 font-medium text-sm">
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-slate-400"
                >
                  No se encontraron hoteles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal - Ajustado z-index para Tailwind nativo */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">
                Registrar Nuevo Hotel
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCrear} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nombre del Hotel
                </label>
                <input
                  required
                  type="text"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={nuevoHotel.nombre}
                  onChange={(e) =>
                    setNuevoHotel({ ...nuevoHotel, nombre: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Ciudad
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={nuevoHotel.ciudad}
                    onChange={(e) =>
                      setNuevoHotel({ ...nuevoHotel, ciudad: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    País
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={nuevoHotel.pais}
                    onChange={(e) =>
                      setNuevoHotel({ ...nuevoHotel, pais: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 py-2">
                <input
                  type="checkbox"
                  id="activo"
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                  checked={nuevoHotel.activo}
                  onChange={(e) =>
                    setNuevoHotel({ ...nuevoHotel, activo: e.target.checked })
                  }
                />
                <label
                  htmlFor="activo"
                  className="text-sm text-slate-700 font-medium cursor-pointer"
                >
                  Hotel operativo desde el registro
                </label>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-bold transition-all shadow-sm"
                >
                  Guardar Hotel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
