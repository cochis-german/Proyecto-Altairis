"use client";

import { useState, useEffect } from "react";
// Usamos ruta relativa para evitar errores tras el cambio de carpeta de types
import { Reserva, Hotel, Cliente, TipoHabitacion } from "../types";

export default function ReservasPage() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [hoteles, setHoteles] = useState<Hotel[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [tipos, setTipos] = useState<TipoHabitacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [nuevaReserva, setNuevaReserva] = useState({
    hotelId: 0,
    clienteId: 0,
    tipoHabitacionId: 0,
    fechaIngreso: "",
    fechaSalida: "",
    cantidadHabitaciones: 1,
    estado: "CONFIRMADO",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      // Sincronizamos los datos básicos necesarios para el listado y el formulario
      const [resR, resH, resC] = await Promise.all([
        fetch("/api/reservas"),
        fetch("/api/hoteles"),
        fetch("/api/clientes"),
      ]);
      setReservas(await resR.json());
      setHoteles(await resH.json());
      setClientes(await resC.json());
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CARGA DINÁMICA: Trae los tipos de habitación solo cuando se selecciona un hotel
  useEffect(() => {
    if (nuevaReserva.hotelId > 0) {
      fetch(`/api/tipos-habitacion?hotelId=${nuevaReserva.hotelId}`)
        .then((res) => res.json())
        .then(setTipos)
        .catch((err) => console.error("Error al cargar tipos:", err));
    } else {
      setTipos([]); // Limpiar si no hay hotel seleccionado
    }
  }, [nuevaReserva.hotelId]);

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaReserva),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNuevaReserva({
          hotelId: 0,
          clienteId: 0,
          tipoHabitacionId: 0,
          fechaIngreso: "",
          fechaSalida: "",
          cantidadHabitaciones: 1,
          estado: "CONFIRMADO",
        });
        fetchData();
      }
    } catch (error) {
      console.error("Error al crear reserva:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Reservas Activas
          </h1>
          <p className="text-slate-500">
            Monitoreo de entradas y salidas del día.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm hover:bg-emerald-700 transition-all"
        >
          + Nueva Reserva
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">Cliente / Hotel</th>
              <th className="px-6 py-4">Habitación</th>
              <th className="px-6 py-4">Fechas</th>
              <th className="px-6 py-4 text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-slate-400 font-medium"
                >
                  Sincronizando reservas...
                </td>
              </tr>
            ) : (
              reservas.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">{r.cliente}</div>
                    <div className="text-xs text-slate-500">{r.hotel}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {r.tipoHabitacion} ({r.cantidadHabitaciones})
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {new Date(r.fechaIngreso).toLocaleDateString()} ➔{" "}
                    {new Date(r.fechaSalida).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase">
                      {r.estado}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Reserva - Ajustado z-index a 50 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="p-6 bg-slate-50 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">
                Check-in Nueva Reserva
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCrear} className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Hotel
                  </label>
                  <select
                    required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                    value={nuevaReserva.hotelId}
                    onChange={(e) =>
                      setNuevaReserva({
                        ...nuevaReserva,
                        hotelId: Number(e.target.value),
                        tipoHabitacionId: 0,
                      })
                    }
                  >
                    <option value="">Seleccionar...</option>
                    {hoteles.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Huésped
                  </label>
                  <select
                    required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                    value={nuevaReserva.clienteId}
                    onChange={(e) =>
                      setNuevaReserva({
                        ...nuevaReserva,
                        clienteId: Number(e.target.value),
                      })
                    }
                  >
                    <option value="">Seleccionar...</option>
                    {clientes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombreCompleto}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Tipo de Habitación
                </label>
                <select
                  required
                  disabled={!nuevaReserva.hotelId}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50"
                  value={nuevaReserva.tipoHabitacionId}
                  onChange={(e) =>
                    setNuevaReserva({
                      ...nuevaReserva,
                      tipoHabitacionId: Number(e.target.value),
                    })
                  }
                >
                  <option value="">Seleccionar Categoría...</option>
                  {tipos.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nombre} - ${t.precio}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Fecha Ingreso
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                    value={nuevaReserva.fechaIngreso}
                    onChange={(e) =>
                      setNuevaReserva({
                        ...nuevaReserva,
                        fechaIngreso: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Fecha Salida
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                    value={nuevaReserva.fechaSalida}
                    onChange={(e) =>
                      setNuevaReserva({
                        ...nuevaReserva,
                        fechaSalida: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-black shadow-lg hover:bg-emerald-700 hover:-translate-y-0.5 transition-all"
              >
                CONFIRMAR RESERVA
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
