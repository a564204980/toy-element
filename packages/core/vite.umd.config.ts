import { resolve } from "path";
import { readFileSync } from "fs";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import shell from "shelljs";
import hooks from "./hooksPlugin";
import vue from "@vitejs/plugin-vue";
import { delay } from "lodash-es";

const TRY_MOVE_STYLES_DELAY = 800;

const moveStyles = () => {
  try {
    readFileSync("./dist/umd/index.css.gz");
    // 复制一份到dist的根目录，确保可以直接引入到样式文件，不用关心内部的路径，也确保不会被tree shaking优化掉
    shell.cp("./dist/umd/index.css", "./dist/index.css");
  } catch (_) {
    delay(moveStyles, TRY_MOVE_STYLES_DELAY);
  }
};

export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i,
    }),
    hooks({
      rmFiles: ["./dist/umd", "./dist/index.css"],
      afterBuild: moveStyles,
    }),
  ],
  build: {
    outDir: "dist/umd", // 输出目录
    // 库模式
    lib: {
      // 入口文件（库的主文件，导出所有公共 API）
      entry: resolve(__dirname, "./index.ts"),
      // 库的全局变量名（UMD 模式下，通过 script 标签引入时使用）
      name: "ToyElement",
      // 输出文件名（会自动加上模块格式后缀，如 .umd.js、.es.js）
      fileName: "index",
      // 支持的模块格式
      formats: ["umd"],
    },
    // 外部依赖（不打包进库，由使用方提供）
    rollupOptions: {
      // 排除 Vue 依赖
      external: ["vue"],
      output: {
        exports: "named", // 导出所有命名导出
        // 为外部依赖提供全局变量映射（UMD 模式下）
        globals: {
          vue: "Vue",
        },
        // 自定义资产文件名
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as string;
        },
      },
    },
  },
});
