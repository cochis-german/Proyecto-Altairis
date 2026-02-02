"use client";
import { useEffect, useState } from "react";

type TipoHabitacion = {
  id: number;
  nombre: string;
  capacidad: number;
  precio: number;
};

export default function Habitaciones() {
  const [items, setItems] = useState<TipoHabitacion[]>([]);

  useEffect(() => {
    fetch("/api/tipos-habitacion", { cache: "no-store" })
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
      <h1 className="text-2xl font-semibold mb-4">Tipos de Habitación</h1>
      <ul className="divide-y border rounded-lg bg-white">
        {items.map((h) => (
          <li key={h.id} className="p-4 flex justify-between">
            <div>
              <div className="font-medium">{h.nombre}</div>
              <div className="text-sm text-gray-600">
                Capacidad: {h.capacidad}
              </div>
            </div>
            <div className="font-semibold">${h.precio}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
