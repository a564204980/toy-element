// vite.umd.config.ts
import shell2 from "file:///D:/my/toy-element-clone/node_modules/.pnpm/shelljs@0.10.0/node_modules/shelljs/shell.js";
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

// vite.umd.config.ts
import { resolve } from "path";
import { readFileSync } from "fs";
import { delay } from "file:///D:/my/toy-element-clone/node_modules/.pnpm/lodash-es@4.17.22/node_modules/lodash-es/lodash.js";
import { defineConfig } from "file:///D:/my/toy-element-clone/node_modules/.pnpm/vite@5.4.21_@types+node@24.10.4_sass@1.97.1_terser@5.44.1/node_modules/vite/dist/node/index.js";
import { compression } from "file:///D:/my/toy-element-clone/node_modules/.pnpm/vite-plugin-compression2@2.4.0_rollup@4.54.0/node_modules/vite-plugin-compression2/dist/index.mjs";
import terser from "file:///D:/my/toy-element-clone/node_modules/.pnpm/@rollup+plugin-terser@0.4.4_rollup@4.54.0/node_modules/@rollup/plugin-terser/dist/es/index.js";
var __vite_injected_original_dirname = "D:\\my\\toy-element-clone\\packages\\core";
var MOVE_STYLES_DELAY = 800;
var isProd = process.env.NODE_ENV === "production";
var isDev = process.env.NODE_ENV === "development";
var isTest = process.env.NODE_ENV === "test";
var moveStyles = () => {
  try {
    readFileSync("./dist/umd/index.css.gz");
    shell2.cp("./dist/umd/index.css", "./dist/index.css");
  } catch (_) {
    delay(moveStyles, MOVE_STYLES_DELAY);
  }
};
var vite_umd_config_default = defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i
    }),
    hooksPlugin({
      rmFiles: ["./dist/umd", "./dist/index.css"],
      afterBuild: moveStyles
    }),
    terser({
      // 压缩
      compress: {
        drop_console: isProd && ["log"],
        // 删除console
        drop_debugger: isProd,
        // 删除debugger
        passes: 3,
        // 指定压缩的迭代次数
        // 条件编译
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest)
        }
      }
    })
  ],
  build: {
    outDir: "dist/umd",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./index.ts"),
      // 指定入口文件
      name: "ToyElement",
      fileName: "index",
      // 输出文件名
      formats: ["umd"]
      // 输出格式
    },
    rollupOptions: {
      external: ["vue"],
      // 指定外部依赖，不会打包到最终的bundle中
      // 输出选项配置
      output: {
        // 为外部依赖指定全局变量名，例如通过script方式引入的vue会被映射为Vue
        globals: {
          vue: "Vue"
        },
        // 输出的模块类型
        exports: "named",
        // named 用于命令导出或默认导出的模块
        // 自定义资产文件名
        assetFileNames(chunkInfo) {
          if (chunkInfo.name === "style.css") return "index.css";
          return chunkInfo.name;
        }
      }
    }
  }
});
export {
  vite_umd_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS51bWQuY29uZmlnLnRzIiwgImhvb2tzUGx1Z2luLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcbXlcXFxcdG95LWVsZW1lbnQtY2xvbmVcXFxccGFja2FnZXNcXFxcY29yZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbXlcXFxcdG95LWVsZW1lbnQtY2xvbmVcXFxccGFja2FnZXNcXFxcY29yZVxcXFx2aXRlLnVtZC5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L215L3RveS1lbGVtZW50LWNsb25lL3BhY2thZ2VzL2NvcmUvdml0ZS51bWQuY29uZmlnLnRzXCI7aW1wb3J0IHNoZWxsIGZyb20gXCJzaGVsbGpzXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xyXG5pbXBvcnQgaG9va3NQbHVnaW4gZnJvbSBcIi4vaG9va3NQbHVnaW5cIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgeyBkZWxheSB9IGZyb20gXCJsb2Rhc2gtZXNcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgY29tcHJlc3Npb24gfSBmcm9tIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb24yXCI7XHJcbmltcG9ydCB0ZXJzZXIgZnJvbSBcIkByb2xsdXAvcGx1Z2luLXRlcnNlclwiO1xyXG5cclxuY29uc3QgTU9WRV9TVFlMRVNfREVMQVkgPSA4MDAgYXMgY29uc3Q7XHJcblxyXG5jb25zdCBpc1Byb2QgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCI7XHJcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIjtcclxuY29uc3QgaXNUZXN0ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwidGVzdFwiO1xyXG5cclxuLyoqXHJcbiAqIFx1NzlGQlx1NTJBOFx1NjgzN1x1NUYwRlx1NjU4N1x1NEVGNlx1NTIzMFx1NzZFRVx1NjgwN1x1NEY0RFx1N0Y2RVxyXG4gKi9cclxuY29uc3QgbW92ZVN0eWxlcyA9ICgpID0+IHtcclxuICB0cnkge1xyXG4gICAgLy8gXHU1MTQ4XHU2OEMwXHU2N0U1Z3ppcFx1NTM4Qlx1N0YyOVx1NjYyRlx1NTQyNlx1NUI4Q1x1NjIxMFxyXG4gICAgcmVhZEZpbGVTeW5jKFwiLi9kaXN0L3VtZC9pbmRleC5jc3MuZ3pcIik7XHJcbiAgICBzaGVsbC5jcChcIi4vZGlzdC91bWQvaW5kZXguY3NzXCIsIFwiLi9kaXN0L2luZGV4LmNzc1wiKTtcclxuICB9IGNhdGNoIChfKSB7XHJcbiAgICBkZWxheShtb3ZlU3R5bGVzLCBNT1ZFX1NUWUxFU19ERUxBWSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICAgIGNvbXByZXNzaW9uKHtcclxuICAgICAgaW5jbHVkZTogLy4oY2pzfGNzcykkL2ksXHJcbiAgICB9KSxcclxuICAgIGhvb2tzUGx1Z2luKHtcclxuICAgICAgcm1GaWxlczogW1wiLi9kaXN0L3VtZFwiLCBcIi4vZGlzdC9pbmRleC5jc3NcIl0sXHJcbiAgICAgIGFmdGVyQnVpbGQ6IG1vdmVTdHlsZXMsXHJcbiAgICB9KSxcclxuICAgIHRlcnNlcih7XHJcbiAgICAgIC8vIFx1NTM4Qlx1N0YyOVxyXG4gICAgICBjb21wcmVzczoge1xyXG4gICAgICAgIGRyb3BfY29uc29sZTogaXNQcm9kICYmIFtcImxvZ1wiXSwgLy8gXHU1MjIwXHU5NjY0Y29uc29sZVxyXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IGlzUHJvZCwgLy8gXHU1MjIwXHU5NjY0ZGVidWdnZXJcclxuICAgICAgICBwYXNzZXM6IDMsIC8vIFx1NjMwN1x1NUI5QVx1NTM4Qlx1N0YyOVx1NzY4NFx1OEZFRFx1NEVFM1x1NkIyMVx1NjU3MFxyXG4gICAgICAgIC8vIFx1Njc2MVx1NEVGNlx1N0YxNlx1OEJEMVxyXG4gICAgICAgIGdsb2JhbF9kZWZzOiB7XHJcbiAgICAgICAgICBcIkBERVZcIjogSlNPTi5zdHJpbmdpZnkoaXNEZXYpLFxyXG4gICAgICAgICAgXCJAUFJPRFwiOiBKU09OLnN0cmluZ2lmeShpc1Byb2QpLFxyXG4gICAgICAgICAgXCJAVEVTVFwiOiBKU09OLnN0cmluZ2lmeShpc1Rlc3QpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6IFwiZGlzdC91bWRcIixcclxuICAgIGxpYjoge1xyXG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9pbmRleC50c1wiKSwgLy8gXHU2MzA3XHU1QjlBXHU1MTY1XHU1M0UzXHU2NTg3XHU0RUY2XHJcbiAgICAgIG5hbWU6IFwiVG95RWxlbWVudFwiLFxyXG4gICAgICBmaWxlTmFtZTogXCJpbmRleFwiLCAvLyBcdThGOTNcdTUxRkFcdTY1ODdcdTRFRjZcdTU0MERcclxuICAgICAgZm9ybWF0czogW1widW1kXCJdLCAvLyBcdThGOTNcdTUxRkFcdTY4M0NcdTVGMEZcclxuICAgIH0sXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGV4dGVybmFsOiBbXCJ2dWVcIl0sIC8vIFx1NjMwN1x1NUI5QVx1NTkxNlx1OTBFOFx1NEY5RFx1OEQ1Nlx1RkYwQ1x1NEUwRFx1NEYxQVx1NjI1M1x1NTMwNVx1NTIzMFx1NjcwMFx1N0VDOFx1NzY4NGJ1bmRsZVx1NEUyRFxyXG4gICAgICAvLyBcdThGOTNcdTUxRkFcdTkwMDlcdTk4NzlcdTkxNERcdTdGNkVcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgLy8gXHU0RTNBXHU1OTE2XHU5MEU4XHU0RjlEXHU4RDU2XHU2MzA3XHU1QjlBXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXHU1NDBEXHVGRjBDXHU0RjhCXHU1OTgyXHU5MDFBXHU4RkM3c2NyaXB0XHU2NUI5XHU1RjBGXHU1RjE1XHU1MTY1XHU3Njg0dnVlXHU0RjFBXHU4OEFCXHU2NjIwXHU1QzA0XHU0RTNBVnVlXHJcbiAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgdnVlOiBcIlZ1ZVwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gXHU4RjkzXHU1MUZBXHU3Njg0XHU2QTIxXHU1NzU3XHU3QzdCXHU1NzhCXHJcbiAgICAgICAgZXhwb3J0czogXCJuYW1lZFwiLCAvLyBuYW1lZCBcdTc1MjhcdTRFOEVcdTU0N0RcdTRFRTRcdTVCRkNcdTUxRkFcdTYyMTZcdTlFRDhcdThCQTRcdTVCRkNcdTUxRkFcdTc2ODRcdTZBMjFcdTU3NTdcclxuICAgICAgICAvLyBcdTgxRUFcdTVCOUFcdTRFNDlcdThENDRcdTRFQTdcdTY1ODdcdTRFRjZcdTU0MERcclxuICAgICAgICBhc3NldEZpbGVOYW1lcyhjaHVua0luZm8pIHtcclxuICAgICAgICAgIGlmIChjaHVua0luZm8ubmFtZSA9PT0gXCJzdHlsZS5jc3NcIikgcmV0dXJuIFwiaW5kZXguY3NzXCI7XHJcbiAgICAgICAgICByZXR1cm4gY2h1bmtJbmZvLm5hbWUgYXMgc3RyaW5nO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXG15XFxcXHRveS1lbGVtZW50LWNsb25lXFxcXHBhY2thZ2VzXFxcXGNvcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG15XFxcXHRveS1lbGVtZW50LWNsb25lXFxcXHBhY2thZ2VzXFxcXGNvcmVcXFxcaG9va3NQbHVnaW4udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L215L3RveS1lbGVtZW50LWNsb25lL3BhY2thZ2VzL2NvcmUvaG9va3NQbHVnaW4udHNcIjtpbXBvcnQgeyBlYWNoLCBpc0Z1bmN0aW9uIH0gZnJvbSBcImxvZGFzaC1lc1wiO1xyXG5pbXBvcnQgc2hlbGwgZnJvbSBcInNoZWxsanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhvb2tzUGx1Z2luKHtcclxuICBybUZpbGVzID0gW10sXHJcbiAgYmVmb3JlQnVpbGQsXHJcbiAgYWZ0ZXJCdWlsZCxcclxufToge1xyXG4gIHJtRmlsZXM/OiBzdHJpbmdbXTtcclxuICBiZWZvcmVCdWlsZD86IEZ1bmN0aW9uO1xyXG4gIGFmdGVyQnVpbGQ/OiBGdW5jdGlvbjtcclxufSkge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiBcImhvb2tzLXBsdWdpblwiLFxyXG4gICAgYnVpbGRTdGFydCgpIHtcclxuICAgICAgLy8gXHU1MjIwXHU5NjY0XHU2MzA3XHU1QjlBXHU3NkVFXHU1RjU1XHJcbiAgICAgIGVhY2gocm1GaWxlcywgKGZOYW1lKSA9PiB7XHJcbiAgICAgICAgc2hlbGwucm0oXCItcmZcIiwgZk5hbWUpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXNGdW5jdGlvbihiZWZvcmVCdWlsZCkgJiYgYmVmb3JlQnVpbGQoKTtcclxuICAgIH0sXHJcbiAgICBidWlsZEVuZChlcnI/OiBFcnJvcikge1xyXG4gICAgICAhZXJyICYmIGlzRnVuY3Rpb24oYWZ0ZXJCdWlsZCkgJiYgYWZ0ZXJCdWlsZCgpO1xyXG4gICAgfSxcclxuICB9O1xyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVQsT0FBT0EsWUFBVztBQUNyVSxPQUFPLFNBQVM7OztBQ0QyUixT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
