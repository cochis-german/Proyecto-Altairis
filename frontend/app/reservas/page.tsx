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
    <section className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Reservas</h1>
      <ul className="divide-y border rounded-lg bg-white">
        {items.map((r) => (
          <li key={r.id} className="p-4 flex justify-between">
            <div>ID #{r.id}</div>
            <div className="text-sm text-gray-600">{r.estado}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
