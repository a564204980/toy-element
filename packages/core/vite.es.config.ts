import shell from "shelljs";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";
import hooksPlugin from "./hooksPlugin";

import { resolve } from "path";
import { delay } from "lodash-es";
import { defineConfig } from "vite";
import { filter, map } from "lodash-es";
import { readdirSync, readFileSync } from "fs"; // 同步读取目录
import terser from "@rollup/plugin-terser"; // 用于压缩代码的Rollup插件

const MOVE_STYLES_DELAY = 800 as const;

const isProd = process.env.NODE_ENV === "production"; // 生产环境
const isDev = process.env.NODE_ENV === "development"; // 开发环境
const isTest = process.env.NODE_ENV === "test"; // 测试环境

console.log("当前环境：", process.env.NODE_ENV);

/**
 * 移动样式文件到目标位置
 */
const moveStyles = () => {
  try {
    readFileSync("./dist/es/theme/index.css");
    shell.mv("./dist/es/theme", "./dist");
  } catch (_) {
    delay(moveStyles, MOVE_STYLES_DELAY);
  }
};

/**
 * 同步获取指定路径下的所有子目录名称
 * @param basePath - 需要读取的基准路径
 * @returns 返回 basePath 路径下的所有子目录名称数组
 */
const getDirectoriesSync = (basePath: string) => {
  const entries = readdirSync(basePath, { withFileTypes: true }); // 获取指定路径下的所有文件和目录

  // filter(entries, (entry) => entry.isDirectory())  筛选出子目录
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
};

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
      exclude: ["**/vitest.config.ts", "**/vitest.config.js"],
      // 启用类型声明文件的更快生成，就是只输出一个类型文件，不建议
      // rollupTypes: true,
    }),
    hooksPlugin({
      rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: moveStyles,
    }),
    terser({
      // 压缩
      compress: {
        sequences: isProd, // 合并连续的简单语句
        arguments: isProd, // 优化函数参数
        drop_console: isProd && ["log"], // 删除console
        drop_debugger: isProd, // 删除debugger
        passes: isProd ? 4 : 1, // 指定压缩的迭代次数
        // 条件编译
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
      // 混淆
      mangle: {
        toplevel: isProd, // 顶级变量名混淆
        eval: isProd, // 混淆 eval
        keep_classnames: isDev, // 保留类名
        keep_fnames: isDev, // 保留函数名
      },
      // 格式化输出
      format: {
        semicolons: false, // 删除多余分号
        shorthand: isProd, // 使用短标识符
        braces: !isProd, // 压缩花括号
        beautify: !isProd, // 美化代码
        comments: !isProd, // 保留注释
      },
    }),
  ],
  build: {
    outDir: "dist/es",
    minify: false,
    cssCodeSplit: true, // 是否将CSS提取为单独的文件
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "ToyElement",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      // 配置输出选项
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") return "index.css";
          if (
            chunkInfo.type === "asset" &&
            /\.(css)$/i.test(chunkInfo.name as string)
          ) {
            // [ext] 表示原文件的扩展名
            return "theme/[name].[ext]";
          }
          return chunkInfo.name as string;
        },
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (
            id.includes("/packages/utils") ||
            id.includes("plugin-vue:export-helper")
          ) {
            return "utils";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }

          for (const dirName of getDirectoriesSync("../components")) {
            if (id.includes(`/packages/components/${dirName}`)) {
              return dirName;
            }
          }
        },
      },
    },
    // 使用更快的 sourcemap 生成方式
    sourcemap: isDev,
  },
});
