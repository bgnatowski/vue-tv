import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import webfontDownload from 'vite-plugin-webfont-dl';

export default defineConfig({
  plugins: [
    vue(),
    webfontDownload(),
  ],
  base: '/vue-tv>/',
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});