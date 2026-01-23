// vite.es.config.ts
import shell2 from "file:///D:/my/toy-element-clone/node_modules/.pnpm/shelljs@0.10.0/node_modules/shelljs/shell.js";
import dts from "file:///D:/my/toy-element-clone/node_modules/.pnpm/vite-plugin-dts@3.9.1_@type_2a0780e55fbc4440332f1be4dd736434/node_modules/vite-plugin-dts/dist/index.mjs";
import vue from "file:///D:/my/toy-element-clone/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vi_733ffedbdc168e44a7db81374934633d/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// hooksPlugin.ts
import { each, isFunction } from "file:///D:/my/toy-element-clone/node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/lodash.js";
import shell from "file:///D:/my/toy-element-clone/node_modules/.pnpm/shelljs@0.10.0/node_modules/shelljs/shell.js";
function hooksPlugin({
  rmFiles = [],
  beforeBuild,
  afterBuild
}) {
  return {
    name: "hooks-plugin",
    buildStart() {
      each(rmFiles, (fName) => {
        shell.rm("-rf", fName);
      });
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err) {
      !err && isFunction(afterBuild) && afterBuild();
    }
  };
}

// vite.es.config.ts
import { resolve } from "path";
import { delay } from "file:///D:/my/toy-element-clone/node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/lodash.js";
import { defineConfig } from "file:///D:/my/toy-element-clone/node_modules/.pnpm/vite@5.4.21_@types+node@24.10.4_sass@1.97.1_terser@5.44.1/node_modules/vite/dist/node/index.js";
import { filter, map } from "file:///D:/my/toy-element-clone/node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/lodash.js";
import { readdirSync, readFileSync } from "fs";
import terser from "file:///D:/my/toy-element-clone/node_modules/.pnpm/@rollup+plugin-terser@0.4.4_rollup@4.54.0/node_modules/@rollup/plugin-terser/dist/es/index.js";
var __vite_injected_original_dirname = "D:\\my\\toy-element-clone\\packages\\core";
var MOVE_STYLES_DELAY = 800;
var isProd = process.env.NODE_ENV === "production";
var isDev = process.env.NODE_ENV === "development";
var isTest = process.env.NODE_ENV === "test";
console.log("\u5F53\u524D\u73AF\u5883\uFF1A", process.env.NODE_ENV);
var moveStyles = () => {
  try {
    readFileSync("./dist/es/theme/index.css");
    shell2.mv("./dist/es/theme", "./dist");
  } catch (_) {
    delay(moveStyles, MOVE_STYLES_DELAY);
  }
};
var getDirectoriesSync = (basePath) => {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
};
var vite_es_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
      exclude: ["**/vitest.config.ts", "**/vitest.config.js"]
      // 启用类型声明文件的更快生成，就是只输出一个类型文件，不建议
      // rollupTypes: true,
    }),
    hooksPlugin({
      rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: moveStyles
    }),
    terser({
      // 压缩
      compress: {
        sequences: isProd,
        // 合并连续的简单语句
        arguments: isProd,
        // 优化函数参数
        drop_console: isProd && ["log"],
        // 删除console
        drop_debugger: isProd,
        // 删除debugger
        passes: isProd ? 4 : 1,
        // 指定压缩的迭代次数
        // 条件编译
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest)
        }
      },
      // 混淆
      mangle: {
        toplevel: isProd,
        // 顶级变量名混淆
        eval: isProd,
        // 混淆 eval
        keep_classnames: isDev,
        // 保留类名
        keep_fnames: isDev
        // 保留函数名
      },
      // 格式化输出
      format: {
        semicolons: false,
        // 删除多余分号
        shorthand: isProd,
        // 使用短标识符
        braces: !isProd,
        // 压缩花括号
        beautify: !isProd,
        // 美化代码
        comments: !isProd
        // 保留注释
      }
    })
  ],
  build: {
    outDir: "dist/es",
    minify: false,
    cssCodeSplit: true,
    // 是否将CSS提取为单独的文件
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./index.ts"),
      name: "ToyElement",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator"
      ],
      // 配置输出选项
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") return "index.css";
          if (chunkInfo.type === "asset" && /\.(css)$/i.test(chunkInfo.name)) {
            return "theme/[name].[ext]";
          }
          return chunkInfo.name;
        },
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/utils") || id.includes("plugin-vue:export-helper")) {
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
        }
      }
    },
    // 使用更快的 sourcemap 生成方式
    sourcemap: isDev
  }
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5lcy5jb25maWcudHMiLCAiaG9va3NQbHVnaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxteVxcXFx0b3ktZWxlbWVudC1jbG9uZVxcXFxwYWNrYWdlc1xcXFxjb3JlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxteVxcXFx0b3ktZWxlbWVudC1jbG9uZVxcXFxwYWNrYWdlc1xcXFxjb3JlXFxcXHZpdGUuZXMuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9teS90b3ktZWxlbWVudC1jbG9uZS9wYWNrYWdlcy9jb3JlL3ZpdGUuZXMuY29uZmlnLnRzXCI7aW1wb3J0IHNoZWxsIGZyb20gXCJzaGVsbGpzXCI7XHJcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcclxuaW1wb3J0IGhvb2tzUGx1Z2luIGZyb20gXCIuL2hvb2tzUGx1Z2luXCI7XHJcblxyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgZGVsYXkgfSBmcm9tIFwibG9kYXNoLWVzXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSBcImxvZGFzaC1lc1wiO1xyXG5pbXBvcnQgeyByZWFkZGlyU3luYywgcmVhZEZpbGVTeW5jIH0gZnJvbSBcImZzXCI7IC8vIFx1NTQwQ1x1NkI2NVx1OEJGQlx1NTNENlx1NzZFRVx1NUY1NVxyXG5pbXBvcnQgdGVyc2VyIGZyb20gXCJAcm9sbHVwL3BsdWdpbi10ZXJzZXJcIjsgLy8gXHU3NTI4XHU0RThFXHU1MzhCXHU3RjI5XHU0RUUzXHU3ODAxXHU3Njg0Um9sbHVwXHU2M0QyXHU0RUY2XHJcblxyXG5jb25zdCBNT1ZFX1NUWUxFU19ERUxBWSA9IDgwMCBhcyBjb25zdDtcclxuXHJcbmNvbnN0IGlzUHJvZCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIjsgLy8gXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHJcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIjsgLy8gXHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHJcbmNvbnN0IGlzVGVzdCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInRlc3RcIjsgLy8gXHU2RDRCXHU4QkQ1XHU3M0FGXHU1ODgzXHJcblxyXG5jb25zb2xlLmxvZyhcIlx1NUY1M1x1NTI0RFx1NzNBRlx1NTg4M1x1RkYxQVwiLCBwcm9jZXNzLmVudi5OT0RFX0VOVik7XHJcblxyXG4vKipcclxuICogXHU3OUZCXHU1MkE4XHU2ODM3XHU1RjBGXHU2NTg3XHU0RUY2XHU1MjMwXHU3NkVFXHU2ODA3XHU0RjREXHU3RjZFXHJcbiAqL1xyXG5jb25zdCBtb3ZlU3R5bGVzID0gKCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICByZWFkRmlsZVN5bmMoXCIuL2Rpc3QvZXMvdGhlbWUvaW5kZXguY3NzXCIpO1xyXG4gICAgc2hlbGwubXYoXCIuL2Rpc3QvZXMvdGhlbWVcIiwgXCIuL2Rpc3RcIik7XHJcbiAgfSBjYXRjaCAoXykge1xyXG4gICAgZGVsYXkobW92ZVN0eWxlcywgTU9WRV9TVFlMRVNfREVMQVkpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBcdTU0MENcdTZCNjVcdTgzQjdcdTUzRDZcdTYzMDdcdTVCOUFcdThERUZcdTVGODRcdTRFMEJcdTc2ODRcdTYyNDBcdTY3MDlcdTVCNTBcdTc2RUVcdTVGNTVcdTU0MERcdTc5RjBcclxuICogQHBhcmFtIGJhc2VQYXRoIC0gXHU5NzAwXHU4OTgxXHU4QkZCXHU1M0Q2XHU3Njg0XHU1N0ZBXHU1MUM2XHU4REVGXHU1Rjg0XHJcbiAqIEByZXR1cm5zIFx1OEZENFx1NTZERSBiYXNlUGF0aCBcdThERUZcdTVGODRcdTRFMEJcdTc2ODRcdTYyNDBcdTY3MDlcdTVCNTBcdTc2RUVcdTVGNTVcdTU0MERcdTc5RjBcdTY1NzBcdTdFQzRcclxuICovXHJcbmNvbnN0IGdldERpcmVjdG9yaWVzU3luYyA9IChiYXNlUGF0aDogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3QgZW50cmllcyA9IHJlYWRkaXJTeW5jKGJhc2VQYXRoLCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSk7IC8vIFx1ODNCN1x1NTNENlx1NjMwN1x1NUI5QVx1OERFRlx1NUY4NFx1NEUwQlx1NzY4NFx1NjI0MFx1NjcwOVx1NjU4N1x1NEVGNlx1NTQ4Q1x1NzZFRVx1NUY1NVxyXG5cclxuICAvLyBmaWx0ZXIoZW50cmllcywgKGVudHJ5KSA9PiBlbnRyeS5pc0RpcmVjdG9yeSgpKSAgXHU3QjVCXHU5MDA5XHU1MUZBXHU1QjUwXHU3NkVFXHU1RjU1XHJcbiAgcmV0dXJuIG1hcChcclxuICAgIGZpbHRlcihlbnRyaWVzLCAoZW50cnkpID0+IGVudHJ5LmlzRGlyZWN0b3J5KCkpLFxyXG4gICAgKGVudHJ5KSA9PiBlbnRyeS5uYW1lXHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICBkdHMoe1xyXG4gICAgICB0c2NvbmZpZ1BhdGg6IFwiLi4vLi4vdHNjb25maWcuYnVpbGQuanNvblwiLFxyXG4gICAgICBvdXREaXI6IFwiZGlzdC90eXBlc1wiLFxyXG4gICAgICBleGNsdWRlOiBbXCIqKi92aXRlc3QuY29uZmlnLnRzXCIsIFwiKiovdml0ZXN0LmNvbmZpZy5qc1wiXSxcclxuICAgICAgLy8gXHU1NDJGXHU3NTI4XHU3QzdCXHU1NzhCXHU1OEYwXHU2NjBFXHU2NTg3XHU0RUY2XHU3Njg0XHU2NkY0XHU1RkVCXHU3NTFGXHU2MjEwXHVGRjBDXHU1QzMxXHU2NjJGXHU1M0VBXHU4RjkzXHU1MUZBXHU0RTAwXHU0RTJBXHU3QzdCXHU1NzhCXHU2NTg3XHU0RUY2XHVGRjBDXHU0RTBEXHU1RUZBXHU4QkFFXHJcbiAgICAgIC8vIHJvbGx1cFR5cGVzOiB0cnVlLFxyXG4gICAgfSksXHJcbiAgICBob29rc1BsdWdpbih7XHJcbiAgICAgIHJtRmlsZXM6IFtcIi4vZGlzdC9lc1wiLCBcIi4vZGlzdC90aGVtZVwiLCBcIi4vZGlzdC90eXBlc1wiXSxcclxuICAgICAgYWZ0ZXJCdWlsZDogbW92ZVN0eWxlcyxcclxuICAgIH0pLFxyXG4gICAgdGVyc2VyKHtcclxuICAgICAgLy8gXHU1MzhCXHU3RjI5XHJcbiAgICAgIGNvbXByZXNzOiB7XHJcbiAgICAgICAgc2VxdWVuY2VzOiBpc1Byb2QsIC8vIFx1NTQwOFx1NUU3Nlx1OEZERVx1N0VFRFx1NzY4NFx1N0I4MFx1NTM1NVx1OEJFRFx1NTNFNVxyXG4gICAgICAgIGFyZ3VtZW50czogaXNQcm9kLCAvLyBcdTRGMThcdTUzMTZcdTUxRkRcdTY1NzBcdTUzQzJcdTY1NzBcclxuICAgICAgICBkcm9wX2NvbnNvbGU6IGlzUHJvZCAmJiBbXCJsb2dcIl0sIC8vIFx1NTIyMFx1OTY2NGNvbnNvbGVcclxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiBpc1Byb2QsIC8vIFx1NTIyMFx1OTY2NGRlYnVnZ2VyXHJcbiAgICAgICAgcGFzc2VzOiBpc1Byb2QgPyA0IDogMSwgLy8gXHU2MzA3XHU1QjlBXHU1MzhCXHU3RjI5XHU3Njg0XHU4RkVEXHU0RUUzXHU2QjIxXHU2NTcwXHJcbiAgICAgICAgLy8gXHU2NzYxXHU0RUY2XHU3RjE2XHU4QkQxXHJcbiAgICAgICAgZ2xvYmFsX2RlZnM6IHtcclxuICAgICAgICAgIFwiQERFVlwiOiBKU09OLnN0cmluZ2lmeShpc0RldiksXHJcbiAgICAgICAgICBcIkBQUk9EXCI6IEpTT04uc3RyaW5naWZ5KGlzUHJvZCksXHJcbiAgICAgICAgICBcIkBURVNUXCI6IEpTT04uc3RyaW5naWZ5KGlzVGVzdCksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgLy8gXHU2REY3XHU2REM2XHJcbiAgICAgIG1hbmdsZToge1xyXG4gICAgICAgIHRvcGxldmVsOiBpc1Byb2QsIC8vIFx1OTg3Nlx1N0VBN1x1NTNEOFx1OTFDRlx1NTQwRFx1NkRGN1x1NkRDNlxyXG4gICAgICAgIGV2YWw6IGlzUHJvZCwgLy8gXHU2REY3XHU2REM2IGV2YWxcclxuICAgICAgICBrZWVwX2NsYXNzbmFtZXM6IGlzRGV2LCAvLyBcdTRGRERcdTc1NTlcdTdDN0JcdTU0MERcclxuICAgICAgICBrZWVwX2ZuYW1lczogaXNEZXYsIC8vIFx1NEZERFx1NzU1OVx1NTFGRFx1NjU3MFx1NTQwRFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBcdTY4M0NcdTVGMEZcdTUzMTZcdThGOTNcdTUxRkFcclxuICAgICAgZm9ybWF0OiB7XHJcbiAgICAgICAgc2VtaWNvbG9uczogZmFsc2UsIC8vIFx1NTIyMFx1OTY2NFx1NTkxQVx1NEY1OVx1NTIwNlx1NTNGN1xyXG4gICAgICAgIHNob3J0aGFuZDogaXNQcm9kLCAvLyBcdTRGN0ZcdTc1MjhcdTc3RURcdTY4MDdcdThCQzZcdTdCMjZcclxuICAgICAgICBicmFjZXM6ICFpc1Byb2QsIC8vIFx1NTM4Qlx1N0YyOVx1ODJCMVx1NjJFQ1x1NTNGN1xyXG4gICAgICAgIGJlYXV0aWZ5OiAhaXNQcm9kLCAvLyBcdTdGOEVcdTUzMTZcdTRFRTNcdTc4MDFcclxuICAgICAgICBjb21tZW50czogIWlzUHJvZCwgLy8gXHU0RkREXHU3NTU5XHU2Q0U4XHU5MUNBXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6IFwiZGlzdC9lc1wiLFxyXG4gICAgbWluaWZ5OiBmYWxzZSxcclxuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSwgLy8gXHU2NjJGXHU1NDI2XHU1QzA2Q1NTXHU2M0QwXHU1M0Q2XHU0RTNBXHU1MzU1XHU3MkVDXHU3Njg0XHU2NTg3XHU0RUY2XHJcbiAgICBsaWI6IHtcclxuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vaW5kZXgudHNcIiksXHJcbiAgICAgIG5hbWU6IFwiVG95RWxlbWVudFwiLFxyXG4gICAgICBmaWxlTmFtZTogXCJpbmRleFwiLFxyXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiXSxcclxuICAgIH0sXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGV4dGVybmFsOiBbXHJcbiAgICAgICAgXCJ2dWVcIixcclxuICAgICAgICBcIkBmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZVwiLFxyXG4gICAgICAgIFwiQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zXCIsXHJcbiAgICAgICAgXCJAZm9ydGF3ZXNvbWUvdnVlLWZvbnRhd2Vzb21lXCIsXHJcbiAgICAgICAgXCJAcG9wcGVyanMvY29yZVwiLFxyXG4gICAgICAgIFwiYXN5bmMtdmFsaWRhdG9yXCIsXHJcbiAgICAgIF0sXHJcbiAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1OEY5M1x1NTFGQVx1OTAwOVx1OTg3OVxyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogKGNodW5rSW5mbykgPT4ge1xyXG4gICAgICAgICAgaWYgKGNodW5rSW5mby5uYW1lID09PSBcInN0eWxlLmNzc1wiKSByZXR1cm4gXCJpbmRleC5jc3NcIjtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgY2h1bmtJbmZvLnR5cGUgPT09IFwiYXNzZXRcIiAmJlxyXG4gICAgICAgICAgICAvXFwuKGNzcykkL2kudGVzdChjaHVua0luZm8ubmFtZSBhcyBzdHJpbmcpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgLy8gW2V4dF0gXHU4ODY4XHU3OTNBXHU1MzlGXHU2NTg3XHU0RUY2XHU3Njg0XHU2MjY5XHU1QzU1XHU1NDBEXHJcbiAgICAgICAgICAgIHJldHVybiBcInRoZW1lL1tuYW1lXS5bZXh0XVwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGNodW5rSW5mby5uYW1lIGFzIHN0cmluZztcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hbnVhbENodW5rczogKGlkKSA9PiB7XHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwidmVuZG9yXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGlkLmluY2x1ZGVzKFwiL3BhY2thZ2VzL3V0aWxzXCIpIHx8XHJcbiAgICAgICAgICAgIGlkLmluY2x1ZGVzKFwicGx1Z2luLXZ1ZTpleHBvcnQtaGVscGVyXCIpXHJcbiAgICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwidXRpbHNcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIi9wYWNrYWdlcy9ob29rc1wiKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJob29rc1wiO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZvciAoY29uc3QgZGlyTmFtZSBvZiBnZXREaXJlY3Rvcmllc1N5bmMoXCIuLi9jb21wb25lbnRzXCIpKSB7XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhgL3BhY2thZ2VzL2NvbXBvbmVudHMvJHtkaXJOYW1lfWApKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGRpck5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIC8vIFx1NEY3Rlx1NzUyOFx1NjZGNFx1NUZFQlx1NzY4NCBzb3VyY2VtYXAgXHU3NTFGXHU2MjEwXHU2NUI5XHU1RjBGXHJcbiAgICBzb3VyY2VtYXA6IGlzRGV2LFxyXG4gIH0sXHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXG15XFxcXHRveS1lbGVtZW50LWNsb25lXFxcXHBhY2thZ2VzXFxcXGNvcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG15XFxcXHRveS1lbGVtZW50LWNsb25lXFxcXHBhY2thZ2VzXFxcXGNvcmVcXFxcaG9va3NQbHVnaW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L215L3RveS1lbGVtZW50LWNsb25lL3BhY2thZ2VzL2NvcmUvaG9va3NQbHVnaW4udHNcIjtpbXBvcnQgeyBlYWNoLCBpc0Z1bmN0aW9uIH0gZnJvbSBcImxvZGFzaC1lc1wiO1xyXG5pbXBvcnQgc2hlbGwgZnJvbSBcInNoZWxsanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhvb2tzUGx1Z2luKHtcclxuICBybUZpbGVzID0gW10sXHJcbiAgYmVmb3JlQnVpbGQsXHJcbiAgYWZ0ZXJCdWlsZCxcclxufToge1xyXG4gIHJtRmlsZXM/OiBzdHJpbmdbXTtcclxuICBiZWZvcmVCdWlsZD86IEZ1bmN0aW9uO1xyXG4gIGFmdGVyQnVpbGQ/OiBGdW5jdGlvbjtcclxufSkge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiBcImhvb2tzLXBsdWdpblwiLFxyXG4gICAgYnVpbGRTdGFydCgpIHtcclxuICAgICAgLy8gXHU1MjIwXHU5NjY0XHU2MzA3XHU1QjlBXHU3NkVFXHU1RjU1XHJcbiAgICAgIGVhY2gocm1GaWxlcywgKGZOYW1lKSA9PiB7XHJcbiAgICAgICAgc2hlbGwucm0oXCItcmZcIiwgZk5hbWUpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXNGdW5jdGlvbihiZWZvcmVCdWlsZCkgJiYgYmVmb3JlQnVpbGQoKTtcclxuICAgIH0sXHJcbiAgICBidWlsZEVuZChlcnI/OiBFcnJvcikge1xyXG4gICAgICAhZXJyICYmIGlzRnVuY3Rpb24oYWZ0ZXJCdWlsZCkgJiYgYWZ0ZXJCdWlsZCgpO1xyXG4gICAgfSxcclxuICB9O1xyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVQsT0FBT0EsWUFBVztBQUNuVSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxTQUFTOzs7QUNGMlIsU0FBUyxNQUFNLGtCQUFrQjtBQUM1VSxPQUFPLFdBQVc7QUFFSCxTQUFSLFlBQTZCO0FBQUEsRUFDbEMsVUFBVSxDQUFDO0FBQUEsRUFDWDtBQUFBLEVBQ0E7QUFDRixHQUlHO0FBQ0QsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sYUFBYTtBQUVYLFdBQUssU0FBUyxDQUFDLFVBQVU7QUFDdkIsY0FBTSxHQUFHLE9BQU8sS0FBSztBQUFBLE1BQ3ZCLENBQUM7QUFDRCxpQkFBVyxXQUFXLEtBQUssWUFBWTtBQUFBLElBQ3pDO0FBQUEsSUFDQSxTQUFTLEtBQWE7QUFDcEIsT0FBQyxPQUFPLFdBQVcsVUFBVSxLQUFLLFdBQVc7QUFBQSxJQUMvQztBQUFBLEVBQ0Y7QUFDRjs7O0FEcEJBLFNBQVMsZUFBZTtBQUN4QixTQUFTLGFBQWE7QUFDdEIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxRQUFRLFdBQVc7QUFDNUIsU0FBUyxhQUFhLG9CQUFvQjtBQUMxQyxPQUFPLFlBQVk7QUFWbkIsSUFBTSxtQ0FBbUM7QUFZekMsSUFBTSxvQkFBb0I7QUFFMUIsSUFBTSxTQUFTLFFBQVEsSUFBSSxhQUFhO0FBQ3hDLElBQU0sUUFBUSxRQUFRLElBQUksYUFBYTtBQUN2QyxJQUFNLFNBQVMsUUFBUSxJQUFJLGFBQWE7QUFFeEMsUUFBUSxJQUFJLGtDQUFTLFFBQVEsSUFBSSxRQUFRO0FBS3pDLElBQU0sYUFBYSxNQUFNO0FBQ3ZCLE1BQUk7QUFDRixpQkFBYSwyQkFBMkI7QUFDeEMsSUFBQUMsT0FBTSxHQUFHLG1CQUFtQixRQUFRO0FBQUEsRUFDdEMsU0FBUyxHQUFH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
