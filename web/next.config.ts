import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Entrada de cada modo: el jugador arranca en Inicio y el organizador en Panel.
  redirects() {
    return [
      { source: "/", destination: "/inicio", permanent: false },
      { source: "/org", destination: "/org/panel", permanent: false },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
