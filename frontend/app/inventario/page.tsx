"use client";
import { useEffect, useState } from "react";

type Inventario = {
  id: number;
  fecha: string;
  unidadesDisponibles: number;
};

export default function Inventario() {
  const [items, setItems] = useState<Inventario[]>([]);

  useEffect(() => {
    fetch("/api/inventario", { cache: "no-store" })
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
      <h1 className="text-2xl font-semibold mb-4">Inventario</h1>
      <ul className="divide-y border rounded-lg bg-white">
        {items.map((i) => (
          <li key={i.id} className="p-4 flex justify-between">
            <div>{i.fecha}</div>
            <div className="font-semibold">{i.unidadesDisponibles}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
