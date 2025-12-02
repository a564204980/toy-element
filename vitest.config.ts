// vitest.config.ts
/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],

  define: {
    // 定义全局环境变量（用于条件编译）
    DEV: JSON.stringify(false),
    PROD: JSON.stringify(false),
    TEST: JSON.stringify(true),
  },
  test: {
    globals: true,
    environment: "jsdom",
    // 在每个测试文件运行前执行 setup 文件
    setupFiles: [resolve(__dirname, "./vitest.setup.ts")],
  },
});
