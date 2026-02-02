"use client";
import { useEffect, useState } from "react";

type Cliente = {
  id: number;
  nombreCompleto: string;
  email: string;
};

export default function Clientes() {
  const [items, setItems] = useState<Cliente[]>([]);

  useEffect(() => {
    fetch("/api/clientes", { cache: "no-store" })
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
      <h1 className="text-2xl font-semibold mb-4">Clientes</h1>
      <ul className="divide-y border rounded-lg bg-white">
        {items.map((c) => (
          <li key={c.id} className="p-4">
            <div className="font-medium">{c.nombreCompleto}</div>
            <div className="text-sm text-gray-600">{c.email}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
