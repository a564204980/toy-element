import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, createApp } from "vue";

import { makeInstaller, withInstall } from "../install";

const AppComp = defineComponent({
  setup() {
    return () => <div>CompA</div>;
  },
});

const compA = withInstall(
  defineComponent({
    name: "CompA",
    setup() {
      return () => <div>CompA</div>;
    },
  })
);

const compB = withInstall(
  defineComponent({
    name: "CompB",
    setup() {
      return () => <div>CompB</div>;
    },
  })
);

describe("install", () => {
  it("withInstall 应该能正常工作", () => {
    const wrapper = mount(() => <div id="app"></div>);
    const app = createApp(AppComp);

    // 将组件安装到app中
    app.use(compA).use(compB).mount(wrapper.element);

    expect(compA.install).toBeDefined();
    expect(compB.install).toBeDefined();
    expect(wrapper.findComponent(compA)).toBeTruthy();
    expect(wrapper.findComponent(compB)).toBeTruthy();
  });

  it("makeInstaller 应该能正常工作", () => {
    const wrapper = mount(() => <div id="app"></div>);
    const app = createApp(AppComp);
    const install = makeInstaller([compA, compB]);

    app.use(install).mount(wrapper.element);

    expect(install).toBeDefined();
    expect(wrapper.findComponent(compA)).toBeTruthy();
    expect(wrapper.findComponent(compB)).toBeTruthy();
  });
});
