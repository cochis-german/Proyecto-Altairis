"use client";
import { useEffect, useState } from "react";

interface InventarioItem {
  id: number;
  tipoHabitacionId: number;
  tipoHabitacion: string;
  fecha: string;
  unidadesDisponibles: number;
}

interface InventarioResponse {
  items: InventarioItem[];
}

export default function Inventario() {
  const [hotelId, setHotelId] = useState<number>(1);
  const [items, setItems] = useState<InventarioItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    hotelId: 1,
    tipoHabitacionId: 1,
    fecha: "",
    unidadesDisponibles: 1,
  });

  useEffect(() => {
    fetch(`/api/inventario?hotelId=${hotelId}`)
      .then((res) => (res.ok ? res.json() : { items: [] }))
      .then((data: InventarioResponse) => setItems(data.items || []))
      .catch(() => setItems([]));
  }, [hotelId]);

  const handleUpsert = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/inventario/upsert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) window.location.reload();
  };

  return (
    <main className="p-8 bg-stone-50 min-h-screen text-stone-800 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-stone-900">
            Disponibilidad
          </h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-stone-900 text-white px-8 py-3 rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
          >
            Actualizar Stock
          </button>
        </header>

        <div className="bg-white p-4 rounded-3xl mb-10 flex gap-4 items-center shadow-sm max-w-xs border border-stone-100">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-4">
            Hotel ID:
          </span>
          <input
            type="number"
            value={hotelId}
            onChange={(e) => setHotelId(parseInt(e.target.value))}
            className="w-20 p-2 bg-stone-50 rounded-xl text-center font-bold text-stone-900 border-none outline-none focus:ring-2 focus:ring-stone-200"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <div
              key={i.id}
              className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-stone-100 border-b-4 border-b-stone-900 transition-transform hover:-translate-y-1"
            >
              <p className="text-stone-400 text-[10px] font-bold uppercase mb-1">
                {new Date(i.fecha).toLocaleDateString()}
              </p>
              <h3 className="font-bold text-lg text-stone-800 mb-4 leading-none">
                {i.tipoHabitacion}
              </h3>
              <div className="flex justify-between items-end">
                <span className="text-5xl font-serif font-bold text-stone-900 leading-none">
                  {i.unidadesDisponibles}
                </span>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-tighter">
                  Libres
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleUpsert}
            className="bg-white p-12 rounded-[3.5rem] w-full max-w-md shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-stone-900">
              Gestionar Inventario
            </h2>
            <div className="space-y-4">
              <input
                required
                type="number"
                placeholder="Hotel ID"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hotelId: parseInt(e.target.value),
                  })
                }
                className="w-full p-4 bg-stone-50 rounded-xl border-none outline-none"
              />
              <input
                required
                type="number"
                placeholder="Tipo Habitación ID"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tipoHabitacionId: parseInt(e.target.value),
                  })
                }
                className="w-full p-4 bg-stone-50 rounded-xl border-none outline-none"
              />
              <input
                required
                type="date"
                onChange={(e) =>
                  setFormData({ ...formData, fecha: e.target.value })
                }
                className="w-full p-4 bg-stone-50 rounded-xl border-none outline-none"
              />
              <input
                required
                type="number"
                placeholder="Unidades Disponibles"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    unidadesDisponibles: parseInt(e.target.value),
                  })
                }
                className="w-full p-4 bg-stone-50 rounded-xl border-none outline-none"
              />
            </div>
            <div className="flex gap-4 mt-10">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 font-bold text-stone-400"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="flex-1 bg-stone-900 text-white py-4 rounded-xl font-bold shadow-lg"
              >
                Confirmar
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
