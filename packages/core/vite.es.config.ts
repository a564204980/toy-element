import { resolve } from "path";
import { readdirSync } from "fs";
import { defineConfig } from "vite";
import { includes, filter, map, delay } from "lodash-es";
import dts from "vite-plugin-dts";
import shell from "shelljs";
import hooks from "./hooksPlugin";
import vue from "@vitejs/plugin-vue";

const TRY_MOVE_STYLES_DELAY = 800;

const moveStyles = () => {
  try {
    // 确保css 文件生成完成
    readdirSync("./dist/es/theme");
    // 移动到dist的根目录，确保可以直接引入到样式文件
    shell.mv("./dist/es/theme", "./dist");
  } catch (_) {
    delay(moveStyles, TRY_MOVE_STYLES_DELAY);
  }
};

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
      rmFiles: ["./dist/es", "./dist/types", "./dist/theme"],
      afterBuild: moveStyles,
    }),
  ],
  build: {
    outDir: "dist/es",
    minify: false, // 是否开启压缩代码
    cssCodeSplit: true, // 开启css资源拆分
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
