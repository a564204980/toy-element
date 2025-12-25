import { ErTable } from ".";
import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { doubleWait, getTestData, createBasicTable } from "./table-test-common";

import Table from "./Table.vue";
import TableColumn from "./TableColumn.vue";
import { template } from "lodash-es";

const createTableData = () => [
  { id: 1, name: "岳绮罗", address: "北京" },
  { id: 2, name: "谢霆锋", address: "上海" },
  { id: 3, name: "潘玮柏", address: "广州" },
];

/**
 * 基础渲染测试
 */
describe("Table组件测试", () => {
  describe("基础渲染", () => {
    it("应该正确渲染表格结构", async () => {
      const wrapper = createBasicTable();
      await doubleWait();

      expect(wrapper.find("table").exists()).toBe(true);

      expect(wrapper.find("div").classes()).toContain("er-table");
      expect(wrapper.find("thead").exists()).toBe(true);
      expect(wrapper.find("tbody").exists()).toBe(true);

      // 清理
      wrapper.unmount();
    });

    it("应该支持border属性", async () => {
      const wrapper = createBasicTable([], {
        border: true,
      });
      await doubleWait();

      expect(wrapper.find(".er-table").classes()).toContain("er-table--border");
    });
  });

  describe("属性配置", () => {
    it("应该支持stripe条纹属性", async () => {
      const wrapper = createBasicTable(getTestData(), { stripe: true });
      await doubleWait();

      expect(wrapper.find("div").classes()).toContain("er-table--stripe");
      wrapper.unmount();
    });

    it("应该支持height属性（数字）", async () => {
      const wrapper = createBasicTable(getTestData(), {
        height: 300,
      });

      await doubleWait();

      expect(wrapper.find(".er-table").attributes("style")).toContain(
        "height: 300px"
      );
      wrapper.unmount();
    });

    it("应该支持height属性（字符串）", async () => {
      const wrapper = createBasicTable(getTestData(), {
        height: "300px",
      });

      await doubleWait();

      expect(wrapper.find(".er-table").attributes("style")).toContain(
        "height: 300px"
      );
      wrapper.unmount();
    });
  });

  describe("空数据处理", () => {
    it("空数据时tbody应该没有数据行", async () => {
      const wrapper = mount(Table, {
        props: {
          data: [],
        },
      });
      await doubleWait();

      const rows = wrapper.find("tbody").findAll("tr");

      expect(rows.length).toBe(1);
      expect(rows[0].classes()).toContain("er-table__empty-row");
    });

    it("空数据时应该显示空状态提示", () => {
      const wrapper = mount(Table, {
        props: {
          data: [],
        },
      });

      expect(wrapper.text()).toContain("暂无数据");
    });
  });

  describe("数据渲染", () => {
    it("应该渲染正确数量的数据行", async () => {
      const wrapper = createBasicTable(getTestData());
      await doubleWait();

      const rows = wrapper
        .find("tbody")
        .findAll("tr")
        .filter((row) => !row.classes().includes("er-table__empty-row"));

      expect(rows.length).toBe(getTestData().length);
    });

    it("应该正确渲染单元格数据", async () => {
      const wrapper = createBasicTable(getTestData());
      await doubleWait();

      const firstRow = wrapper.find("tbody").findAll("tr")[0];

      expect(firstRow.text()).toContain("岳绮罗");
      expect(firstRow.text()).toContain("北京");
    });

    it("应该响应数据变化", async () => {
      const wrapper = mount({
        components: { Table, TableColumn },
        template: `
            <Table :data="testData">
                <TableColumn prop="name" label="姓名" />
            </Table>
        `,
        data() {
          return { testData: [{ name: "张三" }] };
        },
      });

      await doubleWait();

      let rows = wrapper
        .findAll("tbody tr")
        .filter((row) => !row.classes().includes("er-table__empty-row"));

      expect(rows.length).toBe(1);

      await wrapper.setData({
        testData: [{ name: "张三" }, { name: "李四" }],
      });

      await doubleWait();

      rows = wrapper
        .findAll("tbody tr")
        .filter((row) => !row.classes().includes("er-table__empty-row"));

      expect(rows.length).toBe(2);

      wrapper.unmount();
    });
  });

  describe("列配置", () => {
    it("应该渲染列标题", async () => {
      const wrapper = mount({
        components: { Table, TableColumn },
        template: `
          <Table :data="testData">
            <TableColumn prop="name" label="姓名" />
            <TableColumn prop="address" label="地址" />
          </Table>
        `,
        data() {
          return { testData: getTestData() };
        },
      });

      await doubleWait();

      const headers = wrapper.find("thead").findAll("th");
      expect(headers.length).toBe(2);
      expect(headers[0].text()).toBe("姓名");
      expect(headers[1].text()).toBe("地址");

      wrapper.unmount();
    });

    it("列宽应该正确应用", async () => {
      const wrapper = mount({
        components: { Table, TableColumn },
        template: `
          <Table :data="testData">
            <TableColumn prop="name" label="姓名" width="200px" />
          </Table>
        `,
        data() {
          return { testData: getTestData() };
        },
      });

      await doubleWait();

      const headers = wrapper.find("thead th");
      expect(headers.attributes("style")).toContain("width: 200px");
    });

    it("应该支持center对齐", async () => {
      const wrapper = mount({
        components: { Table, TableColumn },
        template: `
                <Table :data="testData">
                <TableColumn prop="name" label="姓名" align="center" />
                </Table>
            `,
        data() {
          return { testData: getTestData() };
        },

      });

      await doubleWait();

      const th = wrapper.find("thead th");
      const td = wrapper.find("tbody td");

      expect(th.exists()).toBe(true);
      expect(td.exists()).toBe(true);

      expect(th.attributes("style") || "").toContain("text-align: center");
      expect(td.attributes("style") || "").toContain("text-align: center");

      wrapper.unmount();
    });
  });

  describe("table事件", () => {
    it("应该触发row-click事件", async () => {
      const handleRowClick = vi.fn();
      const wrapper = mount({
        components: { Table, TableColumn },
        template: `
        <Table :data="testData" @row-click="handleRowClick">
            <TableColumn prop="name" label="姓名" />
        </Table>
        `,
        data() {
          return { testData: getTestData() };
        },
        methods: {
          handleRowClick, // 绑定事件到模拟函数中
        },
      });

      await doubleWait();

      const firstRow = wrapper.find("tbody tr");
      await firstRow.trigger("click");

      // expect().toHaveBeenCalledTimes() 断言函数被调用的次数
      expect(handleRowClick).toHaveBeenCalledTimes(1);
      // mock.calls 间谍函数的调用记录，存储每次调用的参数数组
      // - mock.calls[0] 表示第一次调用的参数数组；
      // - mock.calls[0][0] 表示第一次调用的第一个参数（即表格行数据）；
      // - toEqual 是“深度相等”断言，验证参数是否和测试数据第一条完全一致。
      expect(handleRowClick.mock.calls[0][0]).toEqual(getTestData()[0]);
    });
  });
});
