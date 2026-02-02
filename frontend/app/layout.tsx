import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Altairis | Sistema Hotelero",
  description: "Gestión profesional de hoteles, reservas y disponibilidad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}
      >
        {/* Barra de navegacion */}
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-10">
                <Link
                  href="/"
                  className="text-2xl font-black text-indigo-600 tracking-tighter"
                >
                  ALTAIRIS
                </Link>
                <div className="hidden md:flex space-x-6">
                  <Link
                    href="/hoteles"
                    className="text-slate-600 hover:text-indigo-600 font-semibold transition-colors"
                  >
                    Hoteles
                  </Link>
                  <Link
                    href="/tipos-habitacion"
                    className="text-slate-600 hover:text-indigo-600 font-semibold transition-colors"
                  >
                    Habitaciones
                  </Link>
                  <Link
                    href="/clientes"
                    className="text-slate-600 hover:text-indigo-600 font-semibold transition-colors"
                  >
                    Clientes
                  </Link>
                  <Link
                    href="/reservas"
                    className="text-slate-600 hover:text-indigo-600 font-semibold transition-colors"
                  >
                    Reservas
                  </Link>
                  <Link
                    href="/inventario"
                    className="text-slate-600 hover:text-indigo-600 font-semibold transition-colors"
                  >
                    Disponibilidad
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Sistema Activo
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Contenido principal */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
