import type { Preview } from "@storybook/vue3-vite";
import "toy-element-cli-clone/dist/index.css";
// 添加语法高亮样式
import "prismjs/themes/prism-tomorrow.css";
// 替换 Docs ArgsTable 列头为中文
import "../src/storybook-i18n.css";

const preview: Preview = {
  parameters: {
    docs: {
      // 启用语法高亮
      source: {
        type: "code",
        language:
          "jsextra" |
          "jsx" |
          "json" |
          "yml" |
          "md" |
          "bash" |
          "css" |
          "html" |
          "tsx" |
          "typescript" |
          "graphql",
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
