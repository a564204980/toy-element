import { describe, it, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import Icon from "./Icon.vue";

const hexToRgb = (hex: string) => {
  const h = hex.replace("#", "");
  const isShort = h.length === 3;
  const r = parseInt(isShort ? h[0] + h[0] : h.slice(0, 2), 16);
  const g = parseInt(isShort ? h[1] + h[1] : h.slice(2, 4), 16);
  const b = parseInt(isShort ? h[2] + h[2] : h.slice(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

// Icon组件测试套件
describe("Icon.vue", () => {
  // 基础渲染测试
  it("应该正确渲染基础图标", () => {
    const wrapper = mount(Icon, {
      props: {
        icon: "user",
      },
    });

    expect(wrapper.find(".er-icon").exists()).toBe(true);
    expect(wrapper.findComponent({ name: "FontAwesomeIcon" }).exists()).toBe(
      true
    );
  });

  it.each([
    ["primary", "er-icon--primary"],
    ["success", "er-icon--success"],
    ["warning", "er-icon--warning"],
    ["danger", "er-icon--danger"],
    ["info", "er-icon--info"],
  ])("当设置type为%s时，应该具有正确的类名", (type, expectedClass) => {
    const wrapper = mount(Icon, {
      props: {
        icon: "user",
        type: type as any,
      },
    });

    // 期望组件根元素的类名列表中包含 expectedClass 这个类名
    expect(wrapper.classes()).toContain(expectedClass);
  });

  it("当设置color属性时，应该应用自定义颜色样式", () => {
    const customColor = "#ff6b6b";
    const wrapper = mount(Icon, {
      props: {
        icon: "heart",
        color: customColor,
      },
    });

    const iconElement = wrapper.find(".er-icon");
    const expected = hexToRgb(customColor);
    // attributes 获取元素的样式属性值
    expect(iconElement.attributes("style")).toContain(`color: ${expected}`);
  });

  it.each([
    ["xs", "xs"],
    ["sm", "sm"],
    ["lg", "lg"],
    ["xl", "xl"],
    ["2x", "2x"],
    ["3x", "3x"],
  ])(
    "当设置size为%s时，应该正确传递给FontAwesome组件",
    (size, expectedSize) => {
      const wrapper = mount(Icon, {
        props: {
          icon: "star",
          size: size as any,
        },
      });

      const fontAwesomeIcon = wrapper.findComponent({
        name: "FontAwesomeIcon",
      });
      // 获取 FontAwesomeIcon 组件的 size 属性 并断言其值是否等于 expectedSize
      expect(fontAwesomeIcon.props("size")).toBe(expectedSize);
    }
  );

  // 动画属性测试
  it.each([
    ["spin", true],
    ["pulse", true],
    ["bounce", true],
    ["shake", true],
    ["beat", true],
    ["fade", true],
  ])(
    "当设置%s动画属性时，应该正确传递给FontAwesome组件",
    (animationProp, value) => {
      const wrapper = mount(Icon, {
        props: {
          icon: "spinner",
          [animationProp]: value,
        },
      });

      const fontAwesomeIcon = wrapper.findComponent({
        name: "FontAwesomeIcon",
      });
      expect(fontAwesomeIcon.props(animationProp)).toBe(value);
    }
  );
});
