import { describe, it, expect, vi, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import Scrollbar from "../Scrollbar.vue";

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("Scrollbar - 基础渲染", () => {
  it("应该正确渲染组件", () => {
    const wrapper = mount(Scrollbar, {
      slots: {
        default: `<div>测试内容</div>`,
      },
    });

    expect(wrapper.find(".er-scrollbar").exists()).toBe(true);
    expect(wrapper.text()).toContain("测试内容");
  });

  it("应该应用正确的BEM class", () => {
    const wrapper = mount(Scrollbar);

    const scrollbar = wrapper.find(".er-scrollbar__wrap");
    expect(scrollbar.exists()).toBe(true);

    expect(scrollbar.classes()).toContain("er-scrollbar__wrap--hidden-default");
  });
});

describe("Scrollbar - Props传递", () => {
  it("应该正确应用height prop（数字和字符串）", () => {
    const wrapper1 = mount(Scrollbar, {
      props: {
        height: "400px",
      },
    });

    const wrap1 = wrapper1.find(".er-scrollbar__wrap");
    expect(wrap1.attributes("style")).toContain("height: 400px");

    const wrapper2 = mount(Scrollbar, {
      props: {
        height: 400,
      },
    });

    const wrap2 = wrapper2.find(".er-scrollbar__wrap");
    expect(wrap2.attributes("style")).toContain("height: 400px");
  });

  it("应该正确应用maxHeight prop（数字和字符串）", () => {
    const wrapper1 = mount(Scrollbar, {
      props: {
        maxHeight: "500px",
      },
    });

    const wrap1 = wrapper1.find(".er-scrollbar__wrap");
    expect(wrap1.attributes("style")).toContain("max-height: 500px");
    expect(wrap1.attributes("style")).toContain("height: 100%");

    const wrapper2 = mount(Scrollbar, {
      props: {
        maxHeight: 300,
      },
    });

    const wrap2 = wrapper2.find(".er-scrollbar__wrap");
    expect(wrap2.attributes("style")).toContain("max-height: 300px");
    expect(wrap2.attributes("style")).toContain("height: 100%");
  });

  it("native为true时不应该渲染自定义滚动条", () => {
    const wrapper = mount(Scrollbar, {
      props: {
        native: true,
      },
    });

    // 不应该有Bar组件
    expect(wrapper.findComponent({ name: "ErScrollbarBar" }).exists()).toBe(
      false
    );

    const wrap = wrapper.find(".er-scrollbar__wrap");
    expect(wrap.classes()).not.toContain("er-scrollbar__wrap--hidden-default");
  });

  it("always为true时应该传递给Bar组件", () => {
    const wrapper = mount(Scrollbar, {
      props: {
        always: true,
        height: "200px",
      },
      slots: {
        default: `<div style="height:1000px">长内容</div>`,
      },
    });

    // 验证 Bar 组件接收到 always prop
    const barComponent = wrapper.findComponent({ name: "ErScrollbarBar" });
    expect(barComponent.exists()).toBe(true);
    expect(barComponent.props("always")).toBe(true);
  });

  it("nresize为true的时候不应该监听尺寸的变化", () => {
    let observeCalled = false; // 记录调用事实

    const OriginaResizeObserver = global.ResizeObserver;
    global.ResizeObserver = class ResizeObserver {
      constructor(callback: Function) {}
      observe() {
        observeCalled = true;
      }
      unobserve() {}
      disconnect() {}
    };

    mount(Scrollbar, {
      props: {
        height: "200px",
        nresize: true,
      },
    });

    expect(observeCalled).toBe(false);

    global.ResizeObserver = OriginaResizeObserver;
  });
});

describe("Scrollbar - 滚动功能", () => {
  it("滚动内容应该更新滚动条位置", async () => {
    const onScroll = vi.fn();

    const wrapper = mount(Scrollbar, {
      props: {
        height: "200px",
        onScroll,
      },
      slots: {
        default: `<div style="height:1000px">长内容</div>`,
      },
    });

    await wrapper.vm.$nextTick();

    const wrap = wrapper.find(".er-scrollbar__wrap").element as HTMLElement;

    // 模拟滚动
    wrap.scrollTop = 100;
    // 手动触发滚动事件
    await wrap.dispatchEvent(new Event("scroll"));

    // onScroll至少被调用一次
    expect(onScroll).toHaveBeenCalled();
    // onScroll接收到的参数应该包含scrollTop和scrollLeft
    expect(onScroll).toHaveBeenCalledWith(
      expect.objectContaining({
        scrollTop: 100,
        scrollLeft: 0,
      })
    );
  });

  it("应该提供update方法供外部调用", () => {
    const wrapper = mount(Scrollbar, {
      props: {
        height: "200px",
      },
      slots: {
        default: `<div styke="height:1000px">长内容</div>`,
      },
    });

    expect(wrapper.vm.update).toBeDefined();
    expect(typeof wrapper.vm.update).toBe("function");

    // 需要用箭头函数延迟执行，如果直接调用，错误会在expect之前抛出
    expect(() => wrapper.vm.update()).not.toThrow();
  });

  it("应该提供setScrollTop和setScrollLeft方法", () => {
    const wrapper = mount(Scrollbar, {
      props: {
        height: "200px",
      },
      slots: {
        default: `<div styke="height:1000px">长内容</div>`,
      },
    });

    const wrap = wrapper.find(".er-scrollbar__wrap").element as HTMLElement;

    wrapper.vm.setScrollTop(50);
    expect(wrap.scrollTop).toBe(50);

    wrapper.vm.setScrollLeft(50);
    expect(wrap.scrollLeft).toBe(50);
  });

  // it("当内容尺寸变化时应该调用Bar的update方法", () => {
  //   let resizeCallback: Function | null = null;

  //   const OriginalResizeObserver = global.ResizeObserver;
  //   global.ResizeObserver = class ResizeObserver {
  //     constructor(callback: Function) {
  //       resizeCallback = callback; // ← 保存回调函数
  //     }
  //     observe() {}
  //     unobserve() {}
  //     disconnect() {}
  //   } as any;

  //   expect(resizeCallback).toBeDefined();

  //   resizeCallback!();

  //   global.ResizeObserver = OriginalResizeObserver;
  // });
});
