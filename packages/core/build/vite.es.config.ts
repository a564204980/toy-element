import shell from "shelljs";
import { resolve } from "path";
import dts from "vite-plugin-dts"; // 生成类型声明文件
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { readdirSync, readdir } from "fs";
import terser from "@rollup/plugin-terser";
import { hooksPlugin as hooks } from "@toy-element-clone/vite-plugins";
import { includes, filter, map, delay, defer } from "lodash-es";

const TRY_MOVE_STYLES_DELAY = 800;
// 环境变量
const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

const moveStyles = () => {
  readdir("./dist/es/theme", (err) => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.mv("./dist/es/theme", "./dist"));
  });
};

// 获取目录下的所有目录名
const getDirectoriesSync = (basePath: string) => {
  // 返回包含文件信息的对象
  const entries = readdirSync(basePath, { withFileTypes: true });
  // item.isDirectory()  当前是否为目录
  return map(
    filter(entries, (item) => item.isDirectory()),
    (entry) => entry.name
  );
};

export default defineConfig({
  plugins: [
    vue(),
    // 生成类型声明文件
    dts({
      tsconfigPath: "../../tsconfig.build.json", // 配置文件路径
      outDir: "dist/types",
    }),
    hooks({
      // 构建前需要删除的文件目录
      rmFiles: ["./dist/es", "./dist/types", "./dist/theme"],
      // 构建后执行moveStyles这个函数
      afterBuild: moveStyles,
    }),
    // 压缩配置
    terser({
      // 代码压缩优化
      compress: {
        sequences: isProd, // 生产环境：合并连续语句
        arguments: isProd, // 生产环境：优化函数参数（如删除未使用的参数）
        drop_console: isProd && ["log"], // 生产环境：移除 console.log
        drop_debugger: isProd, // 生产环境：移除 debugger 语句
        passes: isProd ? 4 : 1, // 生产环境：压缩次数增加到 4 次
        global_defs: {
          // 全局常量替换（编译时替换代码中的 @DEV 等标识）
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
      // 输出代码格式化控制
      format: {
        semicolons: false, // 不强制添加分号
        shorthand: isProd, // 生产环境：使用短路表达式等简写（如 a=a||b → a||=b）
        braces: !isProd, // 开发环境：强制为块级语句添加大括号（如 if(a){...}）
        beautify: !isProd, // 开发环境：美化代码（换行、缩进），生产环境压缩为一行
        comments: !isProd, // 开发环境：保留注释，生产环境删除注释
      },
      // 变量名混淆
      mangle: {
        toplevel: isProd, // 生产环境：混淆顶层变量（如模块内的全局变量）
        eval: isProd, // 生产环境：允许混淆 eval 中的变量
        keep_classnames: isDev, // 开发环境：保留类名（方便调试类相关逻辑）
        keep_fnames: isDev, // 开发环境：保留函数名（方便堆栈跟踪和调试）
      },
    }),
  ],
  build: {
    outDir: "dist/es",
    minify: false, // 是否开启压缩代码
    cssCodeSplit: true, // 开启css资源拆分

    lib: {
      entry: resolve(__dirname, "../index.ts"),
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
      ], // 外部依赖，不打包进库文件
      output: {
        globals: {
          vue: "Vue",
        },

        assetFileNames: (assetInfo) => {
          // Vite 自动合并所有 CSS 后生成的默认文件 style.css 会被命名为 index.css
          if (assetInfo.name === "style.css") return "index.css";

          // 类型是静态文件并且是 css 文件，就放到theme文件下
          if (
            assetInfo.type === "asset" &&
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            // [ext] 保留原文件后缀
            return "theme/[name].[ext]";
          }
          return assetInfo.name as string;
        },
        // 分包
        manualChunks: (id) => {
          if (includes(id, "node_modules")) return "vendor";

          if (includes(id, "/packages/hooks")) return "hooks";

          if (
            includes(id, "/packages/utils") ||
            includes(id, "plugin-vue:export-helper")
          )
            return "utils";

          for (const item of getDirectoriesSync("../components")) {
            if (id.includes(`/packages/components/${item}`)) {
              return item;
            }
          }
        },
      },
    },
  },
});
