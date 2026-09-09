import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 5193,
    strictPort: true,
    host: true,
  },
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
        useDefineForClassFields: false,
      },
    },
  },
  optimizeDeps: {
    include: [
      "@angular/compiler",
      "@angular/core",
      "@angular/common",
      "@angular/forms",
      "@angular/platform-browser",
      "zone.js",
    ],
  },
});
