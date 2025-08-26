import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { readdirSync } from "fs";
import vue from "@vitejs/plugin-vue";
import { includes, filter, map } from "lodash-es";

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
    dts({
      tsconfigPath: "../../tsconfig.build.json", // 配置文件路径
      outDir: "dist/types",
    }),
  ],
  build: {
    outDir: "dist/es",
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
          if (assetInfo.name === "style.css") return "index.css";
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
