"use client";
import { useEffect, useState } from "react";

interface Hotel {
  id: number;
  nombre: string;
  ciudad: string;
  pais: string;
  activo: boolean;
}

export default function Hoteles() {
  const [items, setItems] = useState<Hotel[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Hotel, "id">>({
    nombre: "",
    ciudad: "",
    pais: "",
    activo: true,
  });

  useEffect(() => {
    fetch("/api/hoteles")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: Hotel[]) => setItems(data))
      .catch(() => setItems([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      editingId ? `/api/hoteles/${editingId}` : "/api/hoteles",
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
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-5xl font-serif font-bold tracking-tight text-stone-900">
            Hoteles
          </h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-stone-900 text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:bg-stone-800 transition-all active:scale-95"
          >
            Añadir Sede
          </button>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((h) => (
            <div
              key={h.id}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-stone-100 group hover:shadow-2xl transition-all duration-500"
            >
              <div
                className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase mb-4 inline-block ${h.activo ? "bg-emerald-50 text-emerald-600" : "bg-stone-100 text-stone-400"}`}
              >
                {h.activo ? "Activo" : "Inactivo"}
              </div>
              <h2 className="text-3xl font-bold text-stone-900 mb-2 uppercase tracking-tighter leading-none">
                {h.nombre}
              </h2>
              <p className="text-stone-400 font-medium mb-8">
                {h.ciudad}, {h.pais}
              </p>
              <div className="flex gap-6 border-t pt-6">
                <button
                  onClick={() => {
                    setEditingId(h.id);
                    setFormData(h);
                    setModalOpen(true);
                  }}
                  className="text-stone-900 font-bold underline underline-offset-4 decoration-stone-200"
                >
                  Editar
                </button>
                <button
                  onClick={async () => {
                    if (confirm("¿Eliminar hotel?")) {
                      await fetch(`/api/hoteles/${h.id}`, { method: "DELETE" });
                      window.location.reload();
                    }
                  }}
                  className="text-red-500 font-bold"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-12 rounded-[3.5rem] w-full max-w-lg shadow-2xl"
          >
            <h2 className="text-3xl font-serif font-bold mb-8 text-stone-900">
              {editingId ? "Editar" : "Nueva"} Sede
            </h2>
            <div className="space-y-4">
              <input
                required
                placeholder="Nombre Comercial"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className="w-full p-5 bg-stone-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-stone-100"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Ciudad"
                  value={formData.ciudad}
                  onChange={(e) =>
                    setFormData({ ...formData, ciudad: e.target.value })
                  }
                  className="w-full p-5 bg-stone-50 rounded-2xl border-none outline-none"
                />
                <input
                  required
                  placeholder="País"
                  value={formData.pais}
                  onChange={(e) =>
                    setFormData({ ...formData, pais: e.target.value })
                  }
                  className="w-full p-5 bg-stone-50 rounded-2xl border-none outline-none"
                />
              </div>
              <label className="flex items-center gap-4 p-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.activo}
                  onChange={(e) =>
                    setFormData({ ...formData, activo: e.target.checked })
                  }
                  className="w-6 h-6 rounded-lg text-stone-900 focus:ring-stone-900"
                />
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
                  Estado Activo
                </span>
              </label>
            </div>
            <div className="flex gap-4 mt-10">
              <button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                  setEditingId(null);
                }}
                className="flex-1 font-bold text-stone-400"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="flex-2 bg-stone-900 text-white py-5 rounded-2xl font-bold shadow-xl"
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
