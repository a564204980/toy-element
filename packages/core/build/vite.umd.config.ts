import { resolve } from "path";
import { readFileSync, readFile } from "fs";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import shell from "shelljs";
import hooks from "../hooksPlugin";
import vue from "@vitejs/plugin-vue";
import { delay, defer } from "lodash-es";
import terser from "@rollup/plugin-terser";

const TRY_MOVE_STYLES_DELAY = 800;
// 环境变量
const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

const moveStyles = () => {
  readFile("./dist/umd/index.css.gz", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.cp("./dist/umd/index.css", "./dist/index.css"));
  });
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
    terser({
      // 代码压缩优化
      compress: {
        drop_console: ["log"], // 移除 console.log
        drop_debugger: true, // 移除 debugger 语句
        passes: 3, // 压缩次数增加到 3 次
        global_defs: {
          // 全局常量替换（编译时替换代码中的 @DEV 等标识）
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
    }),
  ],
  build: {
    outDir: "dist/umd", // 输出目录
    // 库模式
    lib: {
      // 入口文件（库的主文件，导出所有公共 API）
      entry: resolve(__dirname, "../index.ts"),
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
