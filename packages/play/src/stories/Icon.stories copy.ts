import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3-vite";
import { fn, within, userEvent, expect, clearAllMocks } from "storybook/test";
import { set } from "lodash-es";

import { ErIcon } from "toy-element-cli-clone";

type Story = StoryObj<typeof ErIcon> & { argTypes: ArgTypes };

const meta: Meta<typeof ErIcon> = {
  title: "基础组件/Icon 图标",
  component: ErIcon,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: { type: "text" },
      description: "图标名称",
    },
    type: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info"],
      description: "图标类型",
    },
    color: {
      control: { type: "color" },
      description: "自定义图标颜色",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "lg", "xl", "2x", "3x"],
      description: "图标尺寸",
    },
    spin: {
      control: { type: "boolean" },
      description: "旋转动画",
    },
    pulse: {
      control: { type: "boolean" },
      description: "脉冲动画",
    },
    bounce: {
      control: { type: "boolean" },
      description: "弹跳动画",
    },
    shake: {
      control: { type: "boolean" },
      description: "摇摆动画",
    },
    beat: {
      control: { type: "boolean" },
      description: "心跳动画",
    },
    fade: {
      control: { type: "boolean" },
      description: "淡入淡出动画",
    },
    rotation: {
      control: { type: "select" },
      options: [90, 180, 270],
      description: "旋转角度",
    },
    flip: {
      control: { type: "select" },
      options: ["horizontal", "vertical", "both"],
      description: "翻转方向",
    },
  },
};

// 容器组件，用于包裹按钮组件
const container = (val: string) => `
  <div style="margin: 5px">${val}</div>
`;

export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
  // 设置组件的默认属性值
  args: {
    type: "primary",
    content: "Button",
  },

  // 渲染
  // args就是包含了上面定义的所有参数值
  render: (args: any) => ({
    components: { ErIcon }, // 注册组件
    setup() {
      return { args };
    },
    template: container(`
      <ErButton v-bind="args" data-testid="story-test-btn">{{ args.content }}</ErButton>
    `),
  }),
};

export default meta;

// // 基础用法
// export const Default: Story = {
//   args: {
//     icon: "user",
//   },
// };

// // 不同类型
// export const Types: Story = {
//   render: () => ({
//     template: `
//       <div style="display: flex; gap: 16px; align-items: center;">
//         <ErIcon icon="user" type="primary" />
//         <ErIcon icon="check" type="success" />
//         <ErIcon icon="exclamation-triangle" type="warning" />
//         <ErIcon icon="times" type="danger" />
//         <ErIcon icon="info-circle" type="info" />
//       </div>
//     `,
//   }),
// };

// // 不同尺寸
// export const Sizes: Story = {
//   render: () => ({
//     template: `
//       <div style="display: flex; gap: 16px; align-items: center;">
//         <ErIcon icon="star" size="xs" />
//         <ErIcon icon="star" size="sm" />
//         <ErIcon icon="star" />
//         <ErIcon icon="star" size="lg" />
//         <ErIcon icon="star" size="xl" />
//         <ErIcon icon="star" size="2x" />
//         <ErIcon icon="star" size="3x" />
//       </div>
//     `,
//   }),
// };

// // 自定义颜色
// export const CustomColor: Story = {
//   args: {
//     icon: "heart",
//     color: "#ff6b6b",
//   },
// };

// // 动画效果
// export const Animations: Story = {
//   render: () => ({
//     template: `
//       <div style="display: flex; gap: 16px; align-items: center;">
//         <ErIcon icon="spinner" spin />
//         <ErIcon icon="circle" pulse />
//         <ErIcon icon="arrow-up" bounce />
//         <ErIcon icon="bell" shake />
//         <ErIcon icon="heart" beat />
//         <ErIcon icon="star" fade />
//       </div>
//     `,
//   }),
// };

// // 旋转和翻转
// export const Transform: Story = {
//   render: () => ({
//     template: `
//       <div style="display: flex; gap: 16px; align-items: center;">
//         <ErIcon icon="arrow-right" />
//         <ErIcon icon="arrow-right" :rotation="90" />
//         <ErIcon icon="arrow-right" :rotation="180" />
//         <ErIcon icon="arrow-right" :rotation="270" />
//         <ErIcon icon="shield" flip="horizontal" />
//         <ErIcon icon="shield" flip="vertical" />
//         <ErIcon icon="shield" flip="both" />
//       </div>
//     `,
//   }),
// };

// // 可交互示例
// export const Interactive: Story = {
//   args: {
//     icon: "star",
//     type: "primary",
//     size: "lg",
//   },
//   argTypes: {
//     icon: {
//       control: { type: "text" },
//     },
//   },
// };
