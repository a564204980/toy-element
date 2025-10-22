import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3-vite";
import { fn } from "storybook/test";

import { ErButton } from "toy-element";

type Story = StoryObj<typeof ErButton> & { argTypes: ArgTypes };

const meta: Meta<typeof ErButton> = {
  title: "基础组件/Button",
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

const container = (val: string) => `
<div style="margin:5px">
  ${val}
</div>
`;
