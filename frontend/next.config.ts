import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // En Docker (Production) usamos el nombre del servicio: 'backend'
        // En local usamos 127.0.0.1
        destination:
          process.env.NODE_ENV === "production"
            ? "http://backend:8080/api/:path*"
            : "http://127.0.0.1:8080/api/:path*",
      },
    ];
  },
  images: {
    domains: ["localhost", "127.0.0.1"],
  },
  // Desactivado para evitar doble renderizado durante las pruebas técnicas
  reactStrictMode: false,
};

export default nextConfig;
