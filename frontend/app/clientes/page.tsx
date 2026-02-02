"use client";
import { useEffect, useState } from "react";

interface Cliente {
  id: number;
  nombreCompleto: string;
  email: string;
  documento: string;
}

export default function Clientes() {
  const [items, setItems] = useState<Cliente[]>([]);
  const [q, setQ] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Cliente, "id">>({
    nombreCompleto: "",
    email: "",
    documento: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const url = q
        ? `/api/clientes?q=${encodeURIComponent(q)}`
        : "/api/clientes";
      const res = await fetch(url);
      if (res.ok) {
        const data: Cliente[] = await res.json();
        setItems(data);
      }
    };
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [q]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      editingId ? `/api/clientes/${editingId}` : "/api/clientes",
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
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-serif font-bold tracking-tight">
            Directorio
          </h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-stone-900 text-white px-8 py-3 rounded-2xl font-bold shadow-lg"
          >
            Nuevo Cliente
          </button>
        </header>

        <input
          type="text"
          placeholder="Buscar..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full p-5 mb-8 rounded-3xl border-none shadow-sm focus:ring-2 focus:ring-stone-200 outline-none"
        />

        <div className="grid gap-4">
          {items.map((c) => (
            <div
              key={c.id}
              className="bg-white p-6 rounded-[2.5rem] flex justify-between items-center shadow-sm border border-stone-100 group"
            >
              <div>
                <h3 className="text-xl font-bold">{c.nombreCompleto}</h3>
                <p className="text-stone-400 text-sm">
                  {c.email} • DOC: {c.documento}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setEditingId(c.id);
                    setFormData(c);
                    setModalOpen(true);
                  }}
                  className="text-stone-900 font-bold underline decoration-stone-200"
                >
                  Editar
                </button>
                <button
                  onClick={async () => {
                    if (confirm("¿Eliminar?")) {
                      await fetch(`/api/clientes/${c.id}`, {
                        method: "DELETE",
                      });
                      window.location.reload();
                    }
                  }}
                  className="text-red-500 font-bold"
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
            className="bg-white p-12 rounded-[3.5rem] w-full max-w-md shadow-2xl"
          >
            <h2 className="text-3xl font-serif font-bold mb-8">
              {editingId ? "Actualizar" : "Nuevo"} Cliente
            </h2>
            <div className="space-y-4">
              <input
                required
                placeholder="Nombre Completo"
                value={formData.nombreCompleto}
                onChange={(e) =>
                  setFormData({ ...formData, nombreCompleto: e.target.value })
                }
                className="w-full p-5 bg-stone-50 rounded-2xl border-none"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-5 bg-stone-50 rounded-2xl border-none"
              />
              <input
                required
                placeholder="Documento"
                value={formData.documento}
                onChange={(e) =>
                  setFormData({ ...formData, documento: e.target.value })
                }
                className="w-full p-5 bg-stone-50 rounded-2xl border-none"
              />
            </div>
            <div className="flex gap-4 mt-10">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 font-bold text-stone-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-2 bg-stone-900 text-white py-5 rounded-2xl font-bold shadow-xl active:scale-95 transition-transform"
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
