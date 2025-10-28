import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist/umd",
    lib: {
      entry: resolve(__dirname, "./index.ts"), // 指定入口文件
      name: "ToyElement",
      fileName: "index", // 输出文件名
      formats: ["umd"], // 输出格式
    },
    rollupOptions: {
      external: ["vue"], // 指定外部依赖，不会打包到最终的bundle中
      // 输出选项配置
      output: {
        // 为外部依赖指定全局变量名，例如通过script方式引入的vue会被映射为Vue
        globals: {
          vue: "Vue",
        },
        // 输出的模块类型
        exports: "named", // named 用于命令导出或默认导出的模块
        // 自定义资产文件名
        assetFileNames(chunkInfo) {
          if (chunkInfo.name === "style.css") return "index.css";
          return chunkInfo.name as string;
        },
      },
    },
  },
});
