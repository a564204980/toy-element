import { describe, it, expect, vi } from "vitest";
import Alert from "./Alert.vue";
import Icon from "../Icon/Icon.vue";
import { mount } from "@vue/test-utils";
import { ErAlert } from "./index"
import type { AlertType } from "./types";
import { withInstall } from "@toy-element/utils";

describe("Alert.vue", () => {
  const title = "这是一条提示信息" as const;
  const desc = "这是一条测试描述信息" as const;
  it("应该使用默认属性值正常渲染Alert组件", () => {
    const wrapper = mount(Alert, {
      props: {
        title,
      },
      slots: {
        default: desc,
      },
      global: {
        stubs: ["ErIcon"],
      },
    });
    expect(wrapper.text()).toContain(title);
    expect(wrapper.text()).toContain(desc);

    const iconElement = wrapper.findComponent(Icon);
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.attributes("icon")).toBe("xmark");

    const wrapper2 = mount(() => (
      <Alert title={title} description={desc}></Alert>
    ));

    expect(wrapper2.text()).toContain(title);
    expect(wrapper2.text()).toContain(desc);
  });

  it.each([
    ["info", "circle-info"],
    ["success", "check-circle"],
    ["warning", "circle-exclamation"],
    ["danger", "circle-xmark"],
    ["error", "circle-xmark"],
    ["non-compliance", "circle-info"], // 不符合type定义的
  ])("当设置 %s 类型时，组件具有正确的图标", (type, iconName) => {
    const wrapper = mount(Alert, {
      props: {
        title,
        closable: false,
        showIcon: true,
        type: type as AlertType,
      },
      slots: {
        default: desc,
      },
      global: {
        stubs: ["ErIcon"],
      },
    });

    const iconElement = wrapper.findComponent(Icon);
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.attributes("icon")).toBe(iconName);
  });

  it("当点击关闭图标时，应当触发一个close事件", () => {
    const onClose = vi.fn();

    const wrapper = mount(Alert, {
      props: {
        title,
        closable: true,
        showIcon: false,
        onClose,
      },
      slots: {
        default: desc,
      },
      global: {
        stubs: ["ErIcon"],
      },
    });
    wrapper.findComponent(Icon).trigger("click");
    expect(onClose).toHaveBeenCalled(); // 断言close事件被调用
  });

  it("组件应该支持通过插槽slots传入自定义内容", () => {
    const wrapper = mount(Alert, {
      prop: {
        title: "测试标题",
      },
      slots: {
        default: desc,
        title,
      },
    });
    expect(wrapper.text()).toContain(title);
    expect(wrapper.text()).toContain(desc);
    expect(wrapper.text()).not.toContain("测试标题");
  });

  it("文本应该居中", () => {
    const wrapper = mount(Alert, {
      props: {
        title,
        desciption: desc,
        center: true,
      },
    });
    const rootNode = wrapper.find(".er-alert");
    expect(rootNode.classes()).toContain("text-center");
  });

  it("当closable为false时，不应该渲染关闭图标", () => {
    const wrapper = mount(Alert, {
      props: {
        closable: false,
      },
    });
    expect(wrapper.find(".er-alert__close").exists()).toBe(false);
  });

  it("当调用open或close方法时，组件应该切换显示状态", async () => {
    const wrapper = mount(Alert, {
      props: { title, closable: false },
    });
    await wrapper.vm.close();
    expect(wrapper.find(".er-alert").attributes().style).toBe("display: none;");
    await wrapper.vm.open();
    expect(wrapper.find(".er-alert").attributes().style).toBe("");
  });
});

describe("Alert/index", () => {
  it("该组件应该具有install方法", () => {
    expect(ErAlert.install).toBeDefined()
  })

  it("组件应该被导出", () => {
    expect(ErAlert).toBe(Alert)
  })

  it("应当增强 Alert 组件", () => {
    const enhanceAlert = withInstall(Alert)
    // 增强后的组件 ≡ 项目导出的 ErAlert 组件
    expect(enhanceAlert).toBe(ErAlert)
  })

  it("特定的增强逻辑被正确应用", () => {
    const enhanceAlert = withInstall(Alert)
    // toHaveProperty校验目标对象是否存在指定的属性
    expect(enhanceAlert).toHaveProperty("install")
  })
})
