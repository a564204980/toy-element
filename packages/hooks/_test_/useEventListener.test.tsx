import { describe, expect, it, vi } from "vitest";
import { ref, defineComponent } from "vue";
import { mount } from "@vue/test-utils"; // 将 Vue 组件挂载到测试环境的虚拟 DOM 中

import useEventListener from "../useEventListener";

// 定义一个测试套件，描述要测试的模块
describe("hooks/useEventListener", () => {
  it("当目标是 HTMLElement（DOM 元素）时，应该添加和移除事件监听器", async () => {
    const target = document.createElement("button");
    const handler = vi.fn(); // 创建一个模拟函数，用于跟踪是否被调用

    // 挂载 Vue 组件
    const wrapper = mount(
      // 定义一个 Vue 组件，用于测试
      defineComponent({
        setup() {
          // 测试hooks
          useEventListener(target, "click", handler);
          return () => <div id="container"></div>;
        },
      })
    );

    // 模拟将目标元素添加到 DOM 中
    wrapper.get("#container").element.appendChild(target);

    await target.click();

    expect(handler).toHaveBeenCalledOnce(); // 事件处理函数应该被调用一次

    await wrapper.unmount();
    await target.click(); // 验证事件移除成功
  });

  it("当目标是 Ref<HTMLElement>（指向 DOM 元素的响应式引用）时，应该添加和移除事件监听器", async () => {
    const target = ref<HTMLElement | void>();
    const handler = vi.fn();

    mount(
      defineComponent({
        setup() {
          useEventListener(target, "click", handler);
          return () => <button id="container" ref={target}></button>;
        },
      })
    );

    await document.getElementById("container")?.click();
    await target.value?.click();

    expect(handler).toHaveBeenCalledOnce(); // 事件处理函数应该被调用一次

    target.value = document.createElement("div");
    await document.getElementById("container")?.click();
    expect(handler).toHaveBeenCalledOnce();
  });
});
