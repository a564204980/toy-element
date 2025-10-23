import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3-vite";
import { fn, within, userEvent, expect } from "storybook/test";

import { ErButton } from "toy-element";

type Story = StoryObj<typeof ErButton> & { argTypes: ArgTypes };

const meta: Meta<typeof ErButton> = {
  title: "基础组件/Button 按钮",
  component: ErButton,
  tags: ["autodocs"], // 启用自动文档
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    size: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    useThrottle: {
      control: "boolean",
    },
    throttleDuration: {
      control: "number",
    },
    autofocus: {
      control: "boolean",
    },
    tag: {
      control: { type: "select" },
      options: ["button", "a", "div"],
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset", ""],
    },
    icon: {
      control: { type: "text" },
    },
    loadingIcon: {
      control: { type: "text" },
    },
  },
  args: { onClick: fn() },
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
    components: { ErButton }, // 注册组件
    setup() {
      return { args };
    },
    template: container(`
      <ErButton v-bind="args">{{ args.content }}</ErButton>
    `),
  }),

  play: async ({
    canvasElement, // 渲染组件的dom容器
    args, // story的参数包含所有参数值
    step, // 用于组织测试步骤
  }: {
    canvasElement: HTMLElement;
    args: any;
    step: any;
  }) => {
    const canvas = within(canvasElement);
    // 执行交互测试
    await step("点击按钮", async () => {
      // userEvent.click 模拟用户点击
      // 在画布中查找角色为 "button" 的元素
      await userEvent.click(canvas.getByRole("button"));
    });

    // expect模拟函数，然后toHaveBeenCalled 验证函数是否被调用
    expect(args.onClick).toHaveBeenCalled();
  },
};

export default meta;
