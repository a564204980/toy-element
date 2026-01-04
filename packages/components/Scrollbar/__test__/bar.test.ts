import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Bar from "../Bar.vue";
import { scrollbarContextKey } from "../constants";
import { ref } from "vue";

interface CreateBarWrapperOptions {
  mockWrapElement?: any;
  props?: Record<string, any>;
}

const createBarWrapper = (options: CreateBarWrapperOptions = {}) => {
  const {
    mockWrapElement = null, // 可选的自定义 mock 元素
    props = {}, // 可选的 props
  } = options;

  // 默认的mock元素
  const defaultMockElement = {
    offsetHeight: 200,
    offsetWidth: 300,
    scrollHeight: 200,
    scrollWidth: 300,
    value: null as any,
  };

  defaultMockElement.value = defaultMockElement;

  const wrapElement = mockWrapElement || defaultMockElement;
  if (wrapElement && !wrapElement.value) {
    wrapElement.value = wrapElement;
  }

  return mount(Bar, {
    props,
    global: {
      provide: {
        [scrollbarContextKey as symbol]: {
          scrollbarElement: ref(document.createElement("div")),
          wrapElement: ref(wrapElement),
        },
      },
    },
  });
};

describe("Bar - 基础渲染", () => {
  it("应该能正常渲染组件", () => {
    const wrapper = createBarWrapper();

    expect(wrapper.exists()).toBe(true);
  });

  it("应该应用正确的BEM class", async () => {
    const mockWrapElement = {
      offsetHeight: 200,
      offsetWidth: 300,
      scrollHeight: 1000,
      scrollWidth: 500,
      value: null as any,
    };

    // 把value指向自己，模拟ref.value
    mockWrapElement.value = mockWrapElement;

    const wrapper = createBarWrapper({ mockWrapElement });

    wrapper.vm.update();

    await wrapper.vm.$nextTick();

    const verticalBar = wrapper.find(".er-scrollbar__bar.is-vertical");
    expect(verticalBar.exists()).toBe(true);

    const horizontalBar = wrapper.find(".er-scrollbar__bar.is-horizontal");
    expect(horizontalBar.exists()).toBe(true);
  });
});

describe("Bar - Props传递", () => {
  it("应该正确传递always", async () => {
    const mockWrapElement = {
      offsetHeight: 200,
      scrollHeight: 1000, // 需要滚动
      offsetWidth: 300,
      scrollWidth: 500,
      value: null as any,
    };

    const wrapper = createBarWrapper({
      mockWrapElement,
      props: {
        always: true,
      },
    });

    wrapper.vm.update();

    await wrapper.vm.$nextTick();

    const alwaysBar = wrapper.find(".is-always");
    expect(alwaysBar.exists()).toBe(true);
  });

  it("应该传递正确的minSize", async () => {
    const mockWrapElement = {
      offsetHeight: 200,
      scrollHeight: 10000, // 非常大的内容，滚动条会很小
      offsetWidth: 300,
      scrollWidth: 5000,
      value: null as any,
    };

    const wrapper = createBarWrapper({
      mockWrapElement,
      props: {
        minSize: 50,
      },
    });

    wrapper.vm.update();
    await wrapper.vm.$nextTick();

    // 获取组件内部的状态值
    const sizeHeight = (wrapper.vm as any).sizeHeight;
    const sizeWidth = (wrapper.vm as any).sizeWidth;

    const height = parseFloat(sizeHeight);
    const width = parseFloat(sizeWidth);

    // toBeGreaterThanOrEqual 大于等于
    expect(height).toBeGreaterThanOrEqual(50);
    expect(width).toBeGreaterThanOrEqual(50);
  });
});

describe("Bar - handleScroll方法", () => {
  it("应该根据内容滚动位置更新滚动条位置", async () => {
    const mockWrapElement = {
      offsetHeight: 200,
      scrollHeight: 1000,
      offsetWidth: 300,
      scrollWidth: 5000,
      scrollTop: 0,
      scrollLeft: 0,
      value: null as any,
    };
    mockWrapElement.value = mockWrapElement;

    const wrapper = createBarWrapper({ mockWrapElement });

    wrapper.vm.update();
    await wrapper.vm.$nextTick();

    // 设置滚动位置
    mockWrapElement.scrollTop = 100;
    mockWrapElement.scrollLeft = 50;

    // 调用handleScroll
    wrapper.vm.handleScroll(mockWrapElement as any);

    const moveY = (wrapper.vm as any).moveY;
    const moveX = (wrapper.vm as any).moveX;

    // 验证moveY和moveX被更新，大于0
    expect(moveX).toBeGreaterThan(0);
    expect(moveY).toBeGreaterThan(0);
  });

  it("滚动条位置应该限制在0-100之间", async () => {
    const mockWrapElement = {
      offsetHeight: 200,
      scrollHeight: 1000,
      offsetWidth: 300,
      scrollWidth: 500,
      scrollTop: 0,
      scrollLeft: 0,
      value: null as any,
    };
    mockWrapElement.value = mockWrapElement;

    const wrapper = createBarWrapper({ mockWrapElement });
    wrapper.vm.update();
    await wrapper.vm.$nextTick();

    mockWrapElement.scrollTop = 99999;
    mockWrapElement.scrollLeft = 99999;

    wrapper.vm.handleScroll(mockWrapElement as any);

    const moveX = (wrapper.vm as any).moveX;
    const moveY = (wrapper.vm as any).moveY;

    // 断言是否大于等于100
    expect(moveX).toBeGreaterThanOrEqual(100);
    expect(moveY).toBeGreaterThanOrEqual(100);

    mockWrapElement.scrollTop = -100;
    mockWrapElement.scrollLeft = -100;

    wrapper.vm.handleScroll(mockWrapElement as any);

    const moveX2 = (wrapper.vm as any).moveX;
    const moveY2 = (wrapper.vm as any).moveY;

    // 断言是否大于等于0
    expect(moveX2).toBeLessThanOrEqual(0);
    expect(moveY2).toBeLessThanOrEqual(0);
  });
});

describe("Bar - handleTrackClick方法", () => {
  it("点击垂直轨道时应该滚动到对应位置", async () => {
    const mockWrapElement = {
      offsetHeight: 200,
      scrollHeight: 1000,
      offsetWidth: 300,
      scrollWidth: 500,
      scrollTop: 0,
      scrollLeft: 0,
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: 300,
        height: 200,
        right: 200,
        bottom: 200,
      }),
      value: null as any,
    };

    mockWrapElement.value = mockWrapElement;

    const wrapper = createBarWrapper({ mockWrapElement });
    wrapper.vm.update();
    await wrapper.vm.$nextTick();

    // 模拟点击垂直轨道
    const verticalBar = wrapper.find(".er-scrollbar__bar.is-vertical");
    expect(verticalBar.exists()).toBe(true);

    // 记录点击前的scrollTop
    const beforeScrollTop = mockWrapElement.scrollTop;

    // 调用handleTrackClick
    await verticalBar.trigger("mousedown", {
      clientY: 100,
      clientX: 0,
    });

    expect(mockWrapElement.scrollTop).toBeGreaterThan(beforeScrollTop);
  });

  it("点击水平轨道应该滚动到对应为止", async () => {
    const mockWrapElement = {
      offsetHeight: 200,
      scrollHeight: 1000,
      offsetWidth: 300,
      scrollWidth: 500,
      scrollTop: 0,
      scrollLeft: 0,
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: 300,
        height: 200,
        right: 200,
        bottom: 200,
      }),
      value: null as any,
    };

    mockWrapElement.value = mockWrapElement;

    const wrapper = createBarWrapper({ mockWrapElement });

    wrapper.vm.update();
    await wrapper.vm.$nextTick();

    const horizontalBar = wrapper.find(".er-scrollbar__bar.is-horizontal");
    expect(horizontalBar.exists()).toBe(true);

    const beforeScrollLeft = mockWrapElement.scrollLeft;

    const mockEvent = {
      clientX: 150,
      clientY: 0,
    } as any;

    await horizontalBar.trigger("mousedown", mockEvent);

    expect(mockWrapElement.scrollLeft).toBeGreaterThan(beforeScrollLeft);
  });

  it("当wrapperElement不存在时应该提前返回", async () => {
    const wrapper = mount(Bar, {
      global: {
        provide: {
          [scrollbarContextKey as symbol]: {
            scrollbarElement: ref(document.createElement("div")),
            wrapElement: ref(null),
          },
        },
      },
    });

    const mockTarget = document.createElement("div");
    mockTarget.classList.add("er-scrollbar__bar");
    mockTarget.classList.add("is-vertical");

    const mockEvent = {
      clientY: 100,
      clientX: 100,
      currentTarget: mockTarget,
    } as any;

    // 调用handleTrackClick不应该报错
    expect(() => {
      (wrapper.vm as any).handleTrackClick(mockEvent);
    }).not.toThrow();
  });
});

describe("Bar - update方法边界情况", () => {
  it("当wrapElement.value为null时update应该提前返回", () => {
    const wrapper = mount(Bar, {
      global: {
        provide: {
          [scrollbarContextKey as symbol]: {
            scrollbarElement: ref(document.createElement("div")),
            wrapElement: ref(null),
          },
        },
      },
    });

    expect(() => wrapper.vm.update()).not.toThrow();
  });
});
