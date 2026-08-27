import path from "node:path"
import babel from "@rolldown/plugin-babel"
import tailwindcss from "@tailwindcss/vite"
import react, { reactCompilerPreset } from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@assets": path.resolve(import.meta.dirname, "./src/assets"),
      "@components": path.resolve(import.meta.dirname, "./src/components"),
      "@constants": path.resolve(import.meta.dirname, "./src/constants"),
      "@pages": path.resolve(import.meta.dirname, "./src/pages"),
      "@services": path.resolve(import.meta.dirname, "./src/services"),
      "@styles": path.resolve(import.meta.dirname, "./src/styles"),
      "@utils": path.resolve(import.meta.dirname, "./src/utils"),
    },
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
  },
})
