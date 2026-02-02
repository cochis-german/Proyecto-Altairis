"use client";
import { useEffect, useState } from "react";

type Hotel = {
  id: number;
  nombre: string;
  ciudad: string;
  pais: string;
  activo: boolean;
};

export default function Home() {
  const [hoteles, setHoteles] = useState<Hotel[]>([]);

  useEffect(() => {
    fetch("/api/hoteles", { cache: "no-store" })
      .then((r) => r.text())
      .then((t) => {
        try {
          const d = JSON.parse(t);
          setHoteles(Array.isArray(d) ? d : []);
        } catch {
          setHoteles([]);
        }
      });
  }, []);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Hoteles</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hoteles.map((h) => (
          <div key={h.id} className="border rounded-xl p-5 bg-white shadow-sm">
            <h2 className="text-xl font-semibold">{h.nombre}</h2>
            <p className="text-gray-600">
              {h.ciudad}, {h.pais}
            </p>
            <span
              className={`inline-block mt-3 px-3 py-1 text-sm rounded-full ${
                h.activo
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {h.activo ? "Activo" : "Inactivo"}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
