import { describe, it, expect, vi, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import { doubleWait, createBasicTable, getTestData } from "./table-test-common";
import Table from "./Table.vue";
import TableColumn from "./TableColumn.vue";
import { nextTick } from "vue";

// 等待指定的毫秒数
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("Table - 组件", () => {
  describe("基础开发", () => {
    it("应该正确渲染表格结构", async () => {
      const wrapper = createBasicTable();

      await doubleWait();

      expect(wrapper.find(".er-table").exists()).toBe(true);
      expect(wrapper.find(".er-table__header").exists()).toBe(true);
      expect(wrapper.find(".er-table__body").exists()).toBe(true);

      const headers = wrapper.findAll("thead th");
      expect(headers.length).toBe(3);
      expect(headers[0].text()).toBe("姓名");
      expect(headers[1].text()).toBe("年龄");
      expect(headers[2].text()).toBe("地址");

      const rows = wrapper.findAll("tbody tr");
      expect(rows.length).toBe(3);

      wrapper.unmount();
    });

    it("应该支持border属性", async () => {
      const wrapper = createBasicTable(undefined, { border: true });

      await doubleWait();

      expect(wrapper.find(".er-table").classes()).toContain("er-table--border");

      wrapper.unmount();
    });

    it("应该支持stripe属性", async () => {
      const wrapper = createBasicTable(undefined, { stripe: true });

      await doubleWait();

      expect(wrapper.find(".er-table").classes()).toContain("er-table--stripe");

      wrapper.unmount();
    });
  });

  describe("多级表头", () => {
    it("应该正确计算rowspan和colspan", async () => {
      const wrapper = mount({
        components: { Table, TableColumn },
        template: `
          <Table :data="testData">
            <TableColumn prop="date" label="日期" />
            <TableColumn label="配送信息">
              <TableColumn prop="name" label="姓名" />
              <TableColumn label="地址信息">
                <TableColumn prop="state" label="省份" />
                <TableColumn prop="city" label="城市" />
              </TableColumn>
            </TableColumn>
          </Table>
        `,
        data() {
          return { testData: getTestData() };
        },
      });

      await doubleWait();
      await nextTick();
      await nextTick();
      await nextTick();

      const headerRows = wrapper.findAll("thead tr");

      expect(headerRows.length).toBe(3);

      const firstRowCells = headerRows[0].findAll("th");
      // 第一列的 rowspan 应该是 3 横跨3行
      expect(firstRowCells[0].attributes("rowspan")).toBe("3");
      // 第二列的 colspan 应该是 3 横跨3列
      expect(firstRowCells[1].attributes("colspan")).toBe("3");

      wrapper.unmount();
    });

    it("应该正确应用固定列样式", async () => {
      const wrapper = mount({
        components: { Table, TableColumn },
        template: `
          <Table :data="testData">
            <TableColumn prop="name" label="姓名" fixed="left" width="120" />
            <TableColumn prop="address" label="地址" />
            <TableColumn prop="email" label="邮箱" fixed="right" />
          </Table>
        `,
        data() {
          return { testData: getTestData() };
        },
      });

      await doubleWait();

      // 获取组件实例
      const tableVm = wrapper.findComponent(Table).vm as any;

      console.log("tableVm", tableVm);

      expect(tableVm.columns.length).toBe(3);
      expect(tableVm.columns[0].fixed).toBe("left");
      expect(tableVm.columns[2].fixed).toBe("right");

      expect(tableVm.fixedLeftColumnsLength).toBe(1);
      expect(tableVm.fixedRightColumnsLength).toBe(1);

      const leftFixedColumn = tableVm.columns[0];
      const leftStyle = tableVm.getCellFixedStyle(
        leftFixedColumn,
        0,
        tableVm.columns
      );
      const rightFixedColumn = tableVm.columns[2];
      const rightStyle = tableVm.getCellFixedStyle(
        rightFixedColumn,
        0,
        tableVm.columns
      );

      // toHaveProperty 是否包含
      expect(leftStyle).toHaveProperty("left");
      expect(leftStyle.left).toBe("0px");

      expect(rightStyle).toHaveProperty("right");
      expect(rightStyle.right).toBe("0px");

      wrapper.unmount();
    });
  });

  describe("滚动功能", () => {
    it("应该正确同步表头滚动", async () => {
      const wrapper = mount({
        components: { Table, TableColumn },
        template: `
          <Table :data="testData" maxHeight="200px">
            <TableColumn prop="name" label="姓名" width="200px" />
            <TableColumn prop="address" label="地址" width="400px" />
            <TableColumn prop="city" label="城市" width="200px" />
          </Table>
        `,
        data() {
          return { testData: getTestData() };
        },
      });

      await doubleWait();

      const scrollbar = wrapper.findComponent({ name: "ErScrollbar" });

      // 模拟滚动
      if (scrollbar.exists()) {
        await scrollbar.vm.$emit("scroll", { scrollLeft: 100, scrollTop: 0 });
        await nextTick();

        const headerWrapper = wrapper.find(".er-table__header-wrapper");

        if (headerWrapper.exists()) {
          expect(headerWrapper.element.scrollLeft).toBe(100);
        }
      }

      wrapper.unmount();
    });
  });
});
