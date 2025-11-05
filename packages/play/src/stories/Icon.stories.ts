import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3-vite";
import { fn, within, userEvent, expect, clearAllMocks } from "storybook/test";

import { ErIcon } from "toy-element-cli-clone";

type Story = StoryObj<typeof ErIcon>;

const meta: Meta<typeof ErIcon> = {
  title: "基础组件/Icon 图标",
  component: ErIcon,
  parameters: {
    docs: {
      description: {
        component: "Toy-Element 提供了一套常用的图标集合。",
      },
    },
  },
  tags: ["autodocs"],
  // 全局默认值 - 所有 Story 都会继承这些默认值
  args: {
    icon: "user",
    color: "",
    size: "sm",
  },
  argTypes: {
    icon: {
      name: "图标名称",
      description: "图标名称",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "user" },
      },
    },
    color: {
      name: "颜色",
      control: { type: "color" },
      description: "自定义图标颜色",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "-" },
      },
    },
    size: {
      name: "尺寸",
      control: { type: "select" },
      options: ["xs", "sm", "lg", "xl", "2x", "3x"],
      description: "图标尺寸",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "-" },
      },
    },
    spin: {
      name: "旋转",
      control: { type: "boolean" },
      description: "旋转动画",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    pulse: {
      name: "脉冲",
      control: { type: "boolean" },
      description: "脉冲动画",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    bounce: {
      name: "弹跳",
      control: { type: "boolean" },
      description: "弹跳动画",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    shake: {
      name: "摇摆",
      control: { type: "boolean" },
      description: "摇摆动画",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    beat: {
      name: "心跳",
      control: { type: "boolean" },
      description: "心跳动画",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    fade: {
      name: "淡入淡出",
      control: { type: "boolean" },
      description: "淡入淡出动画",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    rotation: {
      name: "旋转角度",
      control: { type: "number" },
      description: "旋转角度",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
  },
};

// 容器组件，用于包裹按钮组件
const container = (val: string) => `
  <div style="margin: 5px">${val}</div>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: `
## 基础用法

最简单的用法，通过 \`icon\` 属性指定图标名称。

\`\`\`vue
<template>
  <div>
    <ErIcon icon="user" />
    <ErIcon icon="edit" />
    <ErIcon icon="delete" />
  </div>
</template>
\`\`\`

你也可以设置图标的大小和颜色：

\`\`\`vue
<template>
  <div>
    <!-- 设置大小 -->
    <ErIcon icon="user" size="lg" />
    
    <!-- 设置颜色 -->
    <ErIcon icon="user" color="#409EFF" />
    
    <!-- 同时设置大小和颜色 -->
    <ErIcon icon="user" size="xl" color="#67C23A" />
  </div>
</template>
\`\`\`

### TypeScript类型定义

\`\`\`typescript
interface IconProps {
  icon: string | object | Array<string>;
  size?: "xs" | "sm" | "lg" | "xl" | "2x" | "3x";
  color?: string;
  type?: "primary" | "success" | "warning" | "danger" | "info";
  rotateBy: boolean;
}
\`\`\`
        `,
      },
    },
  },

  render: (args: any) => ({
    components: { ErIcon },
    setup() {
      return { args };
    },
    template: container(`
      <ErIcon v-bind="args"></ErIcon>
    `),
  }),
};

export const Animations: Story = {
  args: {
    spin: false,
  },

  parameters: {
    docs: {
      description: {
        story: `
## 动画效果

Icon 组件支持多种动画效果，通过设置不同的动画属性来实现。

### 旋转动画

\`\`\`vue
<template>
  <div>
    <ErIcon icon="spinner" spin />
    <ErIcon icon="circle-notch" pulse />
  </div>
</template>
\`\`\`

### 其他动画效果

\`\`\`vue
<template>
  <div>
    <!-- 弹跳动画 -->
    <ErIcon icon="heart" bounce />
    
    <!-- 抖动动画 -->
    <ErIcon icon="exclamation-triangle" shake />
    
    <!-- 心跳动画 -->
    <ErIcon icon="heart" beat />
    
    <!-- 淡入淡出动画 -->
    <ErIcon icon="eye" fade />
  </div>
</template>
\`\`\`

        `,
      },
    },
  },

  render: (args: any) => ({
    components: { ErIcon },
    setup() {
      return { args };
    },
    template: container(`
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <ErIcon icon="spinner" spin size="lg" />
        <ErIcon icon="circle-notch" pulse size="lg" />
        <ErIcon icon="heart" bounce size="lg" color="#e74c3c" />
        <ErIcon icon="exclamation-triangle" shake size="lg" color="#f39c12" />
        <ErIcon icon="heart" beat size="lg" color="#e74c3c" />
        <ErIcon icon="eye" fade size="lg" color="#3498db" />
      </div>
    `),
  }),
};

export default meta;
