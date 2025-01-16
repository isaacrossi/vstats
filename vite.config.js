import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), svgr()],
  define: {
    "process.env": process.env,
  },
  test: {
    environment: "jsdom",
    setupFiles: "src/tests/setup.js",
  },
});
