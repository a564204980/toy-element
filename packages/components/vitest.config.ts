// vitest.config.ts
/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],

  define: {
    "@DEV": JSON.stringify(DEV),
    "@PROD": JSON.stringify(PROD),
    "@TEST": JSON.stringify(TEST),
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
