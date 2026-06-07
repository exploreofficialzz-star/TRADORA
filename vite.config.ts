import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

let extraPlugins: any[] = [];
try {
  const { inspectAttr } = require('kimi-plugin-inspect-react');
  extraPlugins = [inspectAttr()];
} catch {
  // kimi plugin not available in this environment — skip
}

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), ...extraPlugins],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
