import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // Si usas Docker Compose, cambia 'localhost' por 'backend'
        // para que Next.js encuentre la API en la red interna de Docker.
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
  reactStrictMode: false, // Recomendado para evitar dobles llamadas de carga en desarrollo
};

export default nextConfig;
