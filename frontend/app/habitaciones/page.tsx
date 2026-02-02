"use client";
import { useEffect, useState } from "react";

interface TipoHabitacion {
  id: number;
  hotelId: number;
  nombre: string;
  capacidad: number;
  precio: number;
}

export default function Habitaciones() {
  const [items, setItems] = useState<TipoHabitacion[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<TipoHabitacion, "id">>({
    hotelId: 1,
    nombre: "",
    capacidad: 1,
    precio: 0,
  });

  useEffect(() => {
    fetch("/api/tipos-habitacion")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: TipoHabitacion[]) => setItems(data))
      .catch(() => setItems([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      editingId
        ? `/api/tipos-habitacion/${editingId}`
        : "/api/tipos-habitacion",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId || 0, ...formData }),
      },
    );
    if (res.ok) window.location.reload();
  };

  return (
    <main className="p-8 bg-stone-50 min-h-screen text-stone-800">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-stone-900">
            Habitaciones
          </h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-stone-900 text-white px-8 py-3 rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
          >
            Nueva Categoría
          </button>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((h) => (
            <div
              key={h.id}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 group hover:shadow-xl transition-all duration-500"
            >
              <h2 className="text-xl font-bold text-stone-900 mb-1 leading-none">
                {h.nombre}
              </h2>
              <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                Capacidad: {h.capacidad} Pers.
              </p>
              <div className="text-4xl font-serif font-bold text-stone-900 mb-6 tracking-tighter">
                ${h.precio}
              </div>
              <div className="flex gap-4 border-t pt-4">
                <button
                  onClick={() => {
                    setEditingId(h.id);
                    setFormData(h);
                    setModalOpen(true);
                  }}
                  className="text-stone-900 font-bold underline text-sm decoration-stone-200"
                >
                  Editar
                </button>
                <button
                  onClick={async () => {
                    if (confirm("¿Eliminar?")) {
                      await fetch(`/api/tipos-habitacion/${h.id}`, {
                        method: "DELETE",
                      });
                      window.location.reload();
                    }
                  }}
                  className="text-red-500 font-bold text-sm"
                >
                  Borrar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-[3rem] w-full max-w-md shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-6 italic text-stone-900">
              Configurar Categoría
            </h2>
            <div className="space-y-4">
              <input
                required
                type="number"
                placeholder="ID Hotel"
                value={formData.hotelId}
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
                placeholder="Nombre (Ej: Suite Nupcial)"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className="w-full p-4 bg-stone-50 rounded-xl border-none outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="number"
                  placeholder="Capacidad"
                  value={formData.capacidad}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      capacidad: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-4 bg-stone-50 rounded-xl border-none outline-none"
                />
                <input
                  required
                  type="number"
                  placeholder="Precio"
                  value={formData.precio}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      precio: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-4 bg-stone-50 rounded-xl border-none outline-none"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                  setEditingId(null);
                }}
                className="flex-1 font-bold text-stone-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-stone-900 text-white py-4 rounded-xl font-bold shadow-lg"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
