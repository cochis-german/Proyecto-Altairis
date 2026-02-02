import Link from "next/link";

export default function HomePage() {
  const menuItems = [
    {
      title: "Hoteles",
      desc: "Configura sedes y ubicaciones",
      icon: "🏢",
      href: "/hoteles",
      color: "bg-blue-500",
    },
    {
      title: "Habitaciones",
      desc: "Tipos, capacidades y precios",
      icon: "🛌",
      href: "/tipos-habitacion",
      color: "bg-purple-500",
    },
    {
      title: "Clientes",
      desc: "Registro de huéspedes",
      icon: "👤",
      href: "/clientes",
      color: "bg-indigo-500",
    },
    {
      title: "Reservas",
      desc: "Panel de control de estadías",
      icon: "🗓️",
      href: "/reservas",
      color: "bg-emerald-500",
    },
    {
      title: "Disponibilidad",
      desc: "Matriz de inventario real",
      icon: "📈",
      href: "/inventario",
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
          Gestión Hotelera <span className="text-indigo-600">Altairis</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Plataforma centralizada para el control de inventario, registro de
          huéspedes y optimización de reservas en tiempo real.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuItems.map((item) => (
          <Link key={item.title} href={item.href} className="group">
            <div className="h-full bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all duration-300 transform group-hover:-translate-y-1">
              <div
                className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}
              >
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              <div className="mt-6 flex items-center text-indigo-600 font-bold text-sm">
                ACCEDER
                <span className="ml-2 group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-24 text-center text-slate-400 text-sm font-medium">
        Altairis MVP - Technical Demo Project 2026
      </footer>
    </div>
  );
}
