import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3-vite";
import { fn, within, userEvent, expect, clearAllMocks } from "storybook/test";
import { set } from "lodash-es";

import { ErButton, ErButtonGroup } from "toy-element-cli-clone";

type Story = StoryObj<typeof ErButton> & { argTypes: ArgTypes };

const meta: Meta<typeof ErButton> = {
  title: "基础组件/Button 按钮",
  component: ErButton,
  parameters: {
    docs: {
      description: {
        component: "常用的操作按钮。",
      },
    },
  },
  subcomponents: { ButtonGroup: ErButtonGroup }, // 注册子组件
  tags: ["autodocs"], // 启用自动文档
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
      description: "按钮类型",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "-" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
      description: "按钮尺寸",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    disabled: {
      control: "boolean",
      description: "是否禁用按钮",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    loading: {
      control: "boolean",
      description: "是否加载中状态",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    useThrottle: {
      control: "boolean",
      description: "是否使用节流",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    throttleDuration: {
      control: "number",
      description: "节流时长(ms)",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "500" },
      },
    },
    autofocus: {
      control: "boolean",
      description: "是否自动获取焦点",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    tag: {
      control: { type: "select" },
      options: ["button", "a", "div"],
      description: "按钮标签类型",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "button" },
      },
    },
    nativeType: {
      control: { type: "select" },
      options: ["button", "submit", "reset", ""],
      description: "原生 type 属性",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "button" },
      },
    },
    icon: {
      control: { type: "text" },
      description: "图标组件",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "-" },
      },
    },
    loadingIcon: {
      control: { type: "text" },
      description: "加载中状态图标组件",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "-" },
      },
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
      <ErButton v-bind="args" data-testid="story-test-btn">{{ args.content }}</ErButton>
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
    const btn = canvas.getByTestId("story-test-btn");

    await step(
      "当 useThrottle 被设置为 true 时，onClick 应该只被调用一次",
      async () => {
        // 启用节流
        set(args, "useThrottle", true); // 设置 args里面的 useThrottle 为 true
        await userEvent.tripleClick(btn); // 模拟用户点击

        expect(args.onClick).toHaveBeenCalledOnce(); // 验证 onClick 是否被调用一次（节流生效）
        clearAllMocks(); // 重置所有模拟函数的调用记录
      }
    );

    await step(
      "当 useThrottle 被设置为 false 时，onClick 应该被调用多次",
      async () => {
        set(args, "useThrottle", false);
        await userEvent.tripleClick(btn);

        expect(args.onClick).toHaveBeenCalledTimes(3);
        clearAllMocks();
      }
    );

    await step("当 disabled 为 true 时，onClick 不应该被调用", async () => {
      set(args, "disabled", true);
      await userEvent.click(btn);

      expect(args.onClick).toHaveBeenCalledTimes(0);
      set(args, "disabled", false);
      clearAllMocks();
    });

    await step("当 loading 为 true 时，onClick 不应该被调用", async () => {
      set(args, "loading", true);
      await userEvent.click(btn);

      expect(args.onClick).toHaveBeenCalledTimes(0);
      set(args, "loading", false);
      clearAllMocks();
    });

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

export const Autofocus: Story & { args: { content: string } } = {
  // 在控制面板中添加一个文本输入框
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
  // 设置组件的默认属性值
  args: {
    content: "Button",
    autofocus: true,
  },

  render: (args: any) => ({
    components: { ErButton },
    setup() {
      return { args };
    },
    template: container(`
        <p>请刷新浏览器来使得按钮自动获得焦点</p>
        <er-button data-testid="story-test-btn" v-bind="args">{{args.content}}</er-button>
      `),
  }),
  play: async ({ args }: { args: any }) => {
    await userEvent.keyboard("{enter"); // 模拟用户按下回车键

    expect(args.onClick).toHaveBeenCalledOnce();
    clearAllMocks();
  },
};

export const Group: Story & { args: { content1: string; content2: string } } = {
  argTypes: {
    groupType: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    groupSize: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    groupDisabled: {
      control: "boolean",
    },
    content1: {
      control: { type: "text" },
      defaultValue: "Button1",
    },
    content2: {
      control: { type: "text" },
      defaultValue: "Button2",
    },
  },
  args: {
    round: true,
    content1: "Button1",
    content2: "Button2",
  },
  render: (args: any) => ({
    components: { ErButton, ErButtonGroup },
    setup() {
      return { args };
    },
    template: container(`
       <er-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
         <er-button v-bind="args">{{args.content1}}</er-button>
         <er-button v-bind="args">{{args.content2}}</er-button>
       </er-button-group>
    `),
  }),
  play: async ({
    canvasElement,
    args,
    step,
  }: {
    canvasElement: HTMLElement;
    args: any;
    step: any;
  }) => {
    const canvas = within(canvasElement);
    await step("点击按钮1", async () => {
      await userEvent.click(canvas.getByText("Button1"));
    });
    await step("点击按钮2", async () => {
      await userEvent.click(canvas.getByText("Button2"));
    });
    expect(args.onClick).toHaveBeenCalled();
  },
};

export default meta;
