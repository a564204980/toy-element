import { defineConfig } from "vitepress";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Toy-UI",
  description: "基于Vue3 高仿 element-ui 组件库",
  appearance: false, // 关闭 darkMode @todo 深色模式完成后打开
  base: "/toy-element/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "开始使用", link: "/get-started" },
      { text: "组件", link: "/components/button" },
    ],
    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: "指南",
        collapsed: false, // 不折叠
        items: [{ text: "快速开始", link: "/get-started" }],
      },
      {
        text: "基础组件",
        collapsed: false,
        items: [{ text: "Button 按钮", link: "components/button" }],
      },
      {
        text: "反馈组件",
        collapsed: false, // 不折叠
        items: [{ text: "Tooltip 提示框", link: "components/tooltip" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/a564204980/toy-element" },
    ],
  },
  markdown: {
    config(md) {
      md.use(containerPreview); // 代码预览
      md.use(componentPreview); // 组件预览
    },
  },
});
