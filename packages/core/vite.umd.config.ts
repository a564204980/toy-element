import shell from "shelljs";
import vue from "@vitejs/plugin-vue";
import hooksPlugin from "./hooksPlugin";
import { resolve } from "path";
import { readFileSync } from "fs";
import { delay } from "lodash-es";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";
import terser from "@rollup/plugin-terser";

const MOVE_STYLES_DELAY = 800 as const;

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

/**
 * 移动样式文件到目标位置
 */
const moveStyles = () => {
  try {
    // 先检查gzip压缩是否完成
    readFileSync("./dist/umd/index.css.gz");
    shell.cp("./dist/umd/index.css", "./dist/index.css");
  } catch (_) {
    delay(moveStyles, MOVE_STYLES_DELAY);
  }
};

export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i,
    }),
    hooksPlugin({
      rmFiles: ["./dist/umd", "./dist/index.css"],
      afterBuild: moveStyles,
    }),
    terser({
      // 压缩
      compress: {
        drop_console: isProd && ["log"], // 删除console
        drop_debugger: isProd, // 删除debugger
        passes: 3, // 指定压缩的迭代次数
        // 条件编译
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
    }),
  ],
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
