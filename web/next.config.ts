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
  // Fotos del bucket público «imagenes» de Supabase Storage.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "smwqhyjohxtbhiueyegk.supabase.co",
        pathname: "/storage/v1/object/public/imagenes/**",
      },
    ],
  },
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
