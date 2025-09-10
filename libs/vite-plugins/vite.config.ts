import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    // 生成文件类型文件
    dts({
      include: ["./**/*.ts"],
      exclude: ["./vite.config.ts"],
    }),
  ],
  build: {
    minify: false, // 是否压缩
    outDir: ".dist", // 输出目录
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "vitePlugins",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["lodash-es", "shelljs"],
    },
  },
});
