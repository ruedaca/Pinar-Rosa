import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Los renders pesan varios MB en PNG/JPG: se sirven en AVIF si el navegador
    // lo soporta y si no en WebP, que es lo que pide la ficha del Hero.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
