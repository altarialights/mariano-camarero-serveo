// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

/**
 * URL pública del sitio. Se usa para incluir el enlace a la tarjeta digital
 * dentro de la vCard. Orden de prioridad:
 *   1. SITE_URL (defínela en Vercel si usas un dominio propio)
 *   2. VERCEL_PROJECT_PRODUCTION_URL (Vercel la inyecta automáticamente en build)
 */
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "never",
  build: {
    // Incrusta el CSS en el HTML: una petición menos en la primera carga (NFC).
    inlineStylesheets: "always",
  },
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
