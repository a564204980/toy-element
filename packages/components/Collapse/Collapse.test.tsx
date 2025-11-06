import { beforeAll, describe, expect, test, vi } from "vitest";
import { mount, DOMWrapper, type VueWrapper } from "@vue/test-utils";

import Collapse from "./Collapse.vue";
import CollapseItem from "./CollapseItem.vue";

const onChange = vi.fn();

let wrapper: VueWrapper,
  headers: DOMWrapper<Element>[],
  contents: DOMWrapper<Element>[];

let firstHeader: DOMWrapper<Element>,
  secondHeader: DOMWrapper<Element>,
  disabledHeader: DOMWrapper<Element>,
  firstContent: DOMWrapper<Element>,
  secondContent: DOMWrapper<Element>,
  disabledContent: DOMWrapper<Element>;

describe("Collapse.vue", () => {
  beforeAll(() => {
    wrapper = mount(
      () => (
        <Collapse modelValue={["a"]} {...{ onChange }}>
          <CollapseItem name="a" title="标题1">
            面板1
          </CollapseItem>
          <CollapseItem name="b" title="标题2">
            面板2
          </CollapseItem>
          <CollapseItem name="c" title="标题3" disabled>
            面板3 (禁用)
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ["ErIcon"],
        },
        attachTo: document.body, // 挂载到body
      }
    );

    headers = wrapper.findAll(".er-collapse-item__header");
    contents = wrapper.findAll(".er-collapse-item__wapper");

    firstHeader = headers[0];
    secondHeader = headers[1];
    disabledHeader = headers[2];

    firstContent = contents[0];
    secondContent = contents[1];
    disabledContent = contents[2];
  });

  test("测试基础结构以及对应文本", () => {
    expect(headers.length).toBe(3);
    expect(contents.length).toBe(3);

    expect(firstHeader.text()).toBe("标题1");

    expect(firstHeader.classes()).toContain("is-active");
    // isVisible() 是否可见 toBeTruthy() 判断一个值是否为真值
    expect(firstContent.isVisible()).toBeTruthy();
    expect(secondHeader.classes()).not.toContain("is-active"); // 第二个标题不应该有 is-active 类名
    // toBeFalsy() 判断一个值是否为假值
    expect(secondContent.isVisible()).toBeFalsy(); // 第二个内容应该不可见
    expect(firstContent.text()).toBe("面板1");
    expect(secondContent.text()).toBe("面板2");
  });

  test("点击已展开的面板标题应折叠内容", async () => {
    await firstHeader.trigger("click");
    expect(firstContent.isVisible()).toBeFalsy();
    await secondHeader.trigger("click");
    expect(secondHeader.classes()).toContain("is-active");
    expect(secondHeader.isVisible()).toBeTruthy();
    expect(firstContent.classes()).not.toContain("is-active");
    expect(firstContent.isVisible()).toBeFalsy();
  });

  test("发送正确的事件", () => {
    expect(onChange).toHaveBeenCalledTimes(2); // 触发了2次change事件，分别是展开和折叠
    expect(onChange).toHaveBeenCalledWith([]); // 第一次change事件参数为[]
    expect(onChange).toHaveBeenLastCalledWith(["b"]); // 最后一次change事件参数为["a"]
  });

  test("点击禁用的面板标题不应改变状态", async () => {
    expect(disabledHeader.classes()).toContain("is-disabled");
    onChange.mockClear(); // 清空change事件
    await disabledHeader.trigger("click"); // 点击禁用的标题
    expect(disabledContent.isVisible()).toBeFalsy(); // 禁用的内容应该不可见
    expect(onChange).not.toHaveBeenCalled(); // change事件没有被触发
  });

  test("modelValue 变更", async () => {
    // setValue 方法 用于设置组件的属性值，参数为属性值和属性名
    wrapper.setValue(["b"], "modelValue");
    await wrapper.vm.$nextTick();

    const secondItem = wrapper.findAllComponents(CollapseItem)[1];
    console.log("333333", secondItem.vm);

    expect(secondHeader.classes()).toContain("is-active");
    expect(firstHeader.classes()).not.toContain("is-active");
  });

  test("手风琴模式下，展开新面板应自动折叠旧面板", async () => {
    onChange.mockClear();
    wrapper = mount(
      () => (
        <Collapse accordion modelValue={["b"]} {...{ onChange }}>
          <CollapseItem name="a" title="标题1">
            内容1
          </CollapseItem>
          <CollapseItem name="b" title="标题2">
            内容2
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ["ErIcon"],
        },
        attachTo: document.body, // 挂载到body
      }
    );

    headers = wrapper.findAll(".er-collapse-item__header");
    contents = wrapper.findAll(".er-collapse-item__wapper");

    firstHeader = headers[0];
    secondHeader = headers[1];

    firstContent = contents[0];
    secondContent = contents[1];

    await firstHeader.trigger("click"); // 先点击第一个
    await secondHeader.trigger("click"); // 再点击第二个
    expect(onChange).toHaveBeenCalledTimes(2); // 触发了2次change事件，分别是展开和折叠
    // toHaveBeenCalledWith() 是否有过一次调用匹配预期参数
    expect(onChange).toHaveBeenCalledWith(["b"]);
    expect(firstHeader.classes()).not.toContain("is-active");
    expect(secondHeader.classes()).toContain("is-active");
  });

  test("手风琴模式 错误处理", () => {
    // 监视 console.warn
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    wrapper = mount(
      () => (
        <Collapse accordion modelValue={["a", "b"]} {...{ onChange }}>
          <CollapseItem name="a" title="title a">
            content a
          </CollapseItem>
          <CollapseItem name="b" title="title b">
            content b
          </CollapseItem>
          <CollapseItem name="c" title="title c" disabled>
            content c
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ["ErIcon"],
        },
      }
    );
    // 应当发出警告，而不是抛出异常
    expect(warn).toHaveBeenCalled();
    expect(warn).toHaveBeenCalledWith(
      "手风琴模式下，modelValue最多只能有一个值"
    );
  });

  test("手风琴模式下点击已激活项目应关闭该项目", async () => {
    wrapper = mount(
      () => (
        <Collapse accordion modelValue={["a"]} {...{ onChange }}>
          <CollapseItem name="a" title="标题1">
            内容1
          </CollapseItem>
          <CollapseItem name="b" title="标题2">
            内容2
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ["ErIcon"],
        },
        attachTo: document.body,
      }
    );

    const headers = wrapper.findAll(".er-collapse-item__header");
    const firstHeader = headers[0];

    onChange.mockClear();
    await firstHeader.trigger("click");

    expect(onChange).toHaveBeenCalledWith([""]);
    expect(firstHeader.classes()).not.toContain("is-active");
  });

  test("测试非手风琴模式下的展开和折叠行为", async () => {
    wrapper = mount(
      () => (
        <Collapse modelValue={["a"]}>
          <CollapseItem name="a" title="标题1">
            内容1
          </CollapseItem>
          <CollapseItem name="b" title="标题2">
            内容2
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ["ErIcon"],
        },
        attachTo: document.body,
      }
    );

    const headers = wrapper.findAll(".er-collapse-item__header");
    const contents = wrapper.findAll(".er-collapse-item__wapper");
    const firstHeader = headers[0];
    const secondHeader = headers[1];
    const firstContent = contents[0];
    const secondContent = contents[1];

    // 测试点击已展开项目进行折叠
    await firstHeader.trigger("click");
    expect(firstContent.isVisible()).toBeFalsy();

    // 测试点击未展开项目进行展开
    await secondHeader.trigger("click");
    expect(secondContent.isVisible()).toBeTruthy();
  });
});

describe("");
