import { describe, it, expect, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import Table from "../Table.vue";
import TableColumn from "../TableColumn.vue";
import type { SpanMethodProps } from "../types";
import { doubleWait } from "./table-test-common";
import { triggerTableColumnCalculation } from "./table-test-common";

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("table行或列的合并", () => {
  const testData = [
    { id: 1, name: "Tom", age: 18, address: "Beijing" },
    { id: 2, name: "Jerry", age: 20, address: "Shanghai" },
    { id: 3, name: "Alice", age: 22, address: "Guangzhou" },
    { id: 4, name: "Bob", age: 24, address: "Shenzhen" },
  ];

  it("数组格式返回值,[rowspan, colspan]", async () => {
    const spanMethod = ({ rowIndex, columnIndex }: SpanMethodProps) => {
      if (rowIndex === 0 && columnIndex === 0) {
        return [1, 2];
      }
      if (rowIndex === 0 && columnIndex === 1) {
        return [0, 0];
      }
    };

    // 参照现有测试用例的写法,使用 data() 而不是 setup()
    const wrapper = mount({
      components: { Table, TableColumn },
      template: `
        <Table :data="testData" border :span-method="spanMethod">
          <TableColumn prop="id" label="ID" />
          <TableColumn prop="name" label="姓名" />
          <TableColumn prop="age" label="年龄" />
          <TableColumn prop="address" label="地址" />
        </Table>
      `,
      data() {
        return {
          testData,
          spanMethod,
        };
      },
    });

    await doubleWait();
    await triggerTableColumnCalculation(wrapper);

    const firstRowCells = wrapper.findAll("tbody tr:nth-child(1) td");

    expect(firstRowCells.length).toBeGreaterThan(0);
    expect(firstRowCells[0].attributes("colspan")).toBe("2");
    expect(firstRowCells[1].attributes("style")).toContain("display: none");
  });

  it("对象返回格式 {rowspan, colspan}", async () => {
    const spanMethod = ({ rowIndex, columnIndex }: SpanMethodProps) => {
      if (rowIndex === 0 && columnIndex === 0) {
        return { rowspan: 2, colspan: 1 };
      }
      if (rowIndex === 1 && columnIndex === 0) {
        return { rowspan: 0, colspan: 0 };
      }
    };

    const wrapper = mount({
      setup() {
        return () => (
          <Table data={testData} span-method={spanMethod}>
            <TableColumn prop="id" label="ID" />
            <TableColumn prop="name" label="姓名" />
            <TableColumn prop="age" label="年龄" />
            <TableColumn prop="address" label="地址" />
          </Table>
        );
      },
    });

    await doubleWait();
    await triggerTableColumnCalculation(wrapper);

    const firstRowFirstCell = wrapper.find(
      "tbody tr:nth-child(1) td:nth-child(1)",
    );
    expect(firstRowFirstCell.attributes("rowspan")).toBe("2");

    const secondRowFirstCell = wrapper.find(
      "tbody tr:nth-child(2) td:nth-child(1)",
    );
    expect(secondRowFirstCell.attributes("style")).toContain("display: none");

    wrapper.unmount();
  });
});
