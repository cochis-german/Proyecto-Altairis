import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Altairis Backoffice",
  description: "Backoffice operativo de hoteles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <header className="border-b bg-white">
          <nav className="max-w-7xl mx-auto px-6 py-3 flex gap-6 items-center">
            <Link href="/" className="font-semibold text-gray-900">
              Hoteles
            </Link>
            <Link
              href="/clientes"
              className="text-gray-600 hover:text-gray-900"
            >
              Clientes
            </Link>
            <Link
              href="/habitaciones"
              className="text-gray-600 hover:text-gray-900"
            >
              Habitaciones
            </Link>
            <Link
              href="/reservas"
              className="text-gray-600 hover:text-gray-900"
            >
              Reservas
            </Link>
            <Link
              href="/inventario"
              className="text-gray-600 hover:text-gray-900"
            >
              Inventario
            </Link>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
