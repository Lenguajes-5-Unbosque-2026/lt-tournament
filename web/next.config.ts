import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // La app abre en el Splash (/); el organizador entra al Panel por /org.
  redirects() {
    return [
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
