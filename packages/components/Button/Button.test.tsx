import { describe, it, expect, vi, test } from "vitest";
import { mount } from "@vue/test-utils";

import Button from "./Button.vue";
import Icon from "../Icon/Icon.vue";
import ButtonGroup from "./ButtonGroup.vue";

// 分组测试，第一个参数是组件名，第二个参数是测试用例
describe("Button.vue", () => {
  it("当设置了 type 属性时，组件应该具有正确的类型类名", () => {
    const types = ["primary", "success", "warning", "danger", "info"];
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { type: type as any },
      });
      // expect 断言
      // wrapper.classes() 是 Vue Test Utils 提供的一个方法，用于获取被挂载组件根元素的所有 CSS 类名
      // toContain 是否包含
      // 断言数组中是否包含指定类名
      expect(wrapper.classes()).toContain(`er-button--${type}`);
    });
  });

  it("当设置了 size 属性时，组件应该具有正确的尺寸类名", () => {
    const sizes = ["small", "large", "default"];
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size: size as any },
      });
      expect(wrapper.classes()).toContain(`er-button--${size}`);
    });
  });

  it.each([
    ["plain", "is-plain"],
    ["round", "is-round"],
    ["circle", "is-circle"],
    ["disabled", "is-disabled"],
    ["loading", "is-loading"],
  ])("当设置了 %s 属性时，组件应该具有正确的类名", (prop, className) => {
    const wrapper = mount(Button, {
      props: { [prop]: true },
      global: {
        // stub（替换）ErIcon 组件，避免子组件干扰测试
        stubs: ["ErIcon"],
      },
    });

    expect(wrapper.classes()).toContain(className);
  });

  it("当设置了 native-type 属性时，组件应该具有正确的原生 type 属性", () => {
    // 挂载组件并传递 nativeType 属性
    const wrapper = mount(Button, {
      props: { nativeType: "submit" },
    });

    // wrapper.element 指组件渲染后的根 DOM 元素，tagName 是元素的标签名 返回大写的
    // toBe 断言方法 严格相等
    // 断言组件根元素是原生 <button> 标签
    expect(wrapper.element.tagName).toBe("BUTTON");
    expect((wrapper.element as any).type).toBe("submit");
  });

  it.each([
    ["withoutThrottle", false], // 不使用节流
    ["withThrottle", true], // 使用节流
  ])("当 %s 属性被设置时，应该正确处理节流逻辑", async (_, useThrottle) => {
    // 创建模拟点击事件，主要作用是追踪函数的调用情况
    const clickSpy = vi.fn();
    // 通过mount挂载组件
    const wrapper = mount(() => {
      return (
        <Button
          onClick={clickSpy}
          {...{ useThrottle, throttleDuration: 400 }}
        ></Button>
      );
    });

    await wrapper.get("button").trigger("click");
    await wrapper.get("button").trigger("click");
    await wrapper.get("button").trigger("click");

    expect(clickSpy).toBeCalledTimes(useThrottle ? 1 : 3);
  });

  it("当 tag 属性被设置时，应该渲染自定义标签", () => {
    const wrapper = mount(Button, {
      props: { tag: "a" },
    });
    expect(wrapper.element.tagName.toLowerCase()).toBe("a");
  });

  it("当按钮被点击时，应该触发一个点击事件", async () => {
    const wrapper = mount(Button, {});
    // trigger 模拟用户操作
    await wrapper.trigger("click");
    // wrapper.emitted() 获取组件触发的所有事件，返回的是一个对象，在获取click属性 返回的是一个数组
    // toHaveLength 断言数组长度是否为 1
    expect(wrapper.emitted().click).toHaveLength(1);
  });

  it("当按钮处于加载 loading 状态时，应该显示加载图标，且不触发点击事件", async () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      global: {
        stubs: ["ErIcon"],
      },
    });

    // 图标元素变量
    const iconElement = wrapper.findComponent(Icon);

    // 断言加载图标是否存在 wrapper.find 查找css类，exists 检查该元素是否存在dom中，toBe(true) 断言是否为true
    expect(wrapper.find(".loading-icon").exists()).toBe(true);
    // 断言图标元素是否存在，toBeTruthy 断言是否为true
    expect(iconElement.exists()).toBeTruthy();
    // 检查图标类型  iconElement.attributes("icon") 获取图标组件的 icon 属性值，断言为spinner
    expect(iconElement.attributes("icon")).toBe("spinner");
    // 模拟点击
    await wrapper.trigger("click");
    // 断言点击事件不存在 ,wrapper.emitted获取组件的click事件，toBeUndefined 断言是否为undefined
    expect(wrapper.emitted("click")).toBeUndefined();
  });

  test("当按钮组件传入 icon 属性时，应正确渲染指定图标的图标组件", () => {
    const wrapper = mount(Button, {
      props: {
        icon: "arrow-up",
      },
      slots: {
        default: "icon button",
      },
      global: {
        stubs: ["ErIcon"],
      },
    });

    const iconElement = wrapper.findComponent(Icon);
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.attributes("icon")).toBe("arrow-up");
  });
});

describe("ButtonGroup.vue", () => {
  test("基础按钮组", () => {
    const wrapper = mount(() => (
      <ButtonGroup>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ));

    // wrapper.classes 返回组件上所有的class类名
    expect(wrapper.classes()).toContain("er-button-group");
  });

  test("按钮组尺寸", () => {
    const sizes = ["large", "default", "small"];
    sizes.forEach((size) => {
      const wrapper = mount(() => (
        <ButtonGroup size={size as any}>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ));

      const buttonWrapper = wrapper.findComponent(Button);
      expect(buttonWrapper.classes()).toContain(`er-button--${size}`);
    });
  });

  test("按钮组类型", () => {
    const types = ["primary", "success", "warning", "danger", "info"];
    types.forEach((type) => {
      const wrapper = mount(() => (
        <ButtonGroup type={type as any}>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ));

      const buttonWrapper = wrapper.findComponent(Button);
      expect(buttonWrapper.classes()).toContain(`er-button--${type}`);
    });
  });

  test("按钮组禁用", () => {
    const wrapper = mount(() => (
      <ButtonGroup disabled>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ));

    const buttonWrapper = wrapper.findComponent(Button);
    expect(buttonWrapper.classes()).toContain(`is-disabled`);
  });
});
