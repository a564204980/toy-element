import { resolve } from "path";
import { defineConfig } from "vite";
import { last, split, first, includes } from "lodash-es";
import { hooksPlugin as hooks } from "@toy-element-clone/vite-plugins";

import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      include: ["./**/*.ts"], // 指定需要处理的文件范围
      exclude: ["./vite.config.ts"], // 排除
    }),
    hooks({
      rmFiles: ["./dist"],
    }),
  ],
  build: {
    minify: false, // 是否开启压缩
    lib: {
      entry: resolve(__dirname, "./index.ts"), // 入口文件
      name: "hooks",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue", "lodash-es", "vue3-i18n"], // 外部依赖 不会被打进最终的包里面
      output: {
        manualChunks(id) {
          if (includes(id, "/packages/hooks/use"))
            return first(split(last(split(id, "/")), "."));
        },
      },
    },
  },
});
