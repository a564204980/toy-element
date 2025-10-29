import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";
import { readdirSync } from "fs"; // 同步读取目录
import { filter, map } from "lodash-es";

const getDirectoriesSync = (basePath: string) => {
  const entries = readdirSync(basePath, { withFileTypes: true });

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
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") return "index.css";
          return chunkInfo.name as string;
        },
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/utils")) {
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
  },
});
