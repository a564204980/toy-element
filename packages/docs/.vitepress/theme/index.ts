import type { App } from "vue";
import { ElementPlusContainer } from "vitepress-preview-component";
import DefaultTheme from "vitepress/theme";
import toyElementClone from "toy-element-clone";

import "vitepress-preview-component/style.css";
import "toy-element-clone/dist/index.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component("demo-preview", ElementPlusContainer);
    app.use(toyElementClone);
  },
};
