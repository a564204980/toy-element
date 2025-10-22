import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import Button from "./Button.vue";

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
});
