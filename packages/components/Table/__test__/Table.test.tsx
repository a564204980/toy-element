import { describe, it, expect, vi, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import { doubleWait, createBasicTable, getTestData } from "./table-test-common";
import Table from "../Table.vue";
import TableColumn from "../TableColumn.vue";
import { nextTick } from "vue";

// 第一个参数是要mock的模块名，第二个参数是mock内容
vi.mock("lodash-es", async () => {
  // 获取原始的、未被 mock 的 lodash-es 模块
  const actual = await vi.importActual("lodash-es")
  return {
    ...actual,
    debounce: (fn: Function) => fn, // // 只覆盖debounce
  }
})


beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
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


describe("排序功能", () => {
  it("可排序列应该渲染排序图标", async () => {
    const wrapper = mount({
      components: { Table, TableColumn },
      template: `
        <Table :data="testData">
          <TableColumn prop="name" label="姓名" sortable />
          <TableColumn prop="age" label="年龄" />
        </Table>
      `,
      data() {
        return { testData: getTestData() }
      }
    })

    await doubleWait()

    expect(wrapper.find(".caret-wrapper").exists()).toBe(true)
    expect(wrapper.find(".sort-caret.ascending").exists()).toBe(true)
    expect(wrapper.find(".sort-caret.descending").exists()).toBe(true)

    wrapper.unmount()
  })

  it("点击列头应该触发排序", async () => {
    const wrapper = mount({
      components: { Table, TableColumn },
      template: `
      <Table :data="testData">
          <TableColumn prop="age" label="年龄" sortable />
        </Table>
      `,
      data() {
        return {
          testData: [
            { age: 30 },
            { age: 20 },
            { age: 25 },
          ]
        }
      }
    })

    await doubleWait()

    const th = wrapper.find('th');
    await th.find(".er-table__cell").trigger("click")
    await nextTick()

    expect(wrapper.find('.sort-caret.ascending').classes()).toContain('is-active');

    const cells = wrapper.findAll("tbody td")
    expect(cells[0].text()).toBe("20")
    expect(cells[1].text()).toBe("25")
    expect(cells[2].text()).toBe("30")

    wrapper.unmount()
  })

  it("多次点击应该循环切换排序状态", async () => {
    const wrapper = mount({
      components: { Table, TableColumn },
      template: `
      <Table :data="testData">
        <TableColumn prop="age" label="年龄" sortable />
      </Table>
    `,
      data() {
        return { testData: getTestData() };
      },
    });

    await doubleWait()
    const cell = wrapper.find(".er-table__cell")

    await cell.trigger("click")
    await nextTick()
    expect(wrapper.find(".sort-caret.ascending").classes()).toContain("is-active")

    await cell.trigger("click")
    await nextTick()
    expect(wrapper.find(".sort-caret.descending").classes()).toContain("is-active")

    await cell.trigger("click")
    await nextTick()
    expect(wrapper.find(".is-active").exists()).toBe(false)
  })

  it("应该支持default-sort", async () => {
    const wrapper = mount({
      components: { Table, TableColumn },
      template: `
      <Table :data="testData" :default-sort="{ prop: 'age', order: 'descending' }">
        <TableColumn prop="name" label="姓名" />
        <TableColumn prop="age" label="年龄" sortable />
      </Table>
    `,
      data() {
        return {
          testData: [
            { name: 'A', age: 20 },
            { name: 'B', age: 30 },
            { name: 'C', age: 25 },
          ]
        }
      }
    })

    await doubleWait()

    expect(wrapper.find(".sort-caret.descending.is-active").exists()).toBe(true)

    const cells = wrapper.findAll("tbody tr td:nth-child(2)")
    expect(cells[0].text()).toBe("30")
    expect(cells[1].text()).toBe("25")
    expect(cells[2].text()).toBe("20")
  })

  it("排序时应该触发sort-change事件", async () => {
    const sortCallback = vi.fn()
    const wrapper = mount({
      components: { Table, TableColumn },
      template: `
      <Table :data="testData" @sort-change="handleSort">
        <TableColumn prop="age" label="年龄" sortable />
      </Table>
    `,
      data() {
        return { testData: getTestData() };
      },
      methods: {
        handleSort(payload: any) {
          sortCallback(payload)
        }
      }
    })

    await doubleWait()
    await wrapper.find(".er-table__cell").trigger("click")
    await nextTick()

    expect(sortCallback).toHaveBeenCalledTimes(1)
    // 模拟函数被调用时传入的参数
    expect(sortCallback).toHaveBeenCalledWith(
      // 预期传入的对象参数需要满足的条件
      expect.objectContaining({
        prop: "age",
        order: "ascending"
      })
    )

    wrapper.unmount()
  })

  it('sortable="custom" 应该触发事件但不排序数据', async () => {
    const originalData = [
      { age: 30 },
      { age: 20 },
      { age: 25 },
    ];

    const wrapper = mount({
      components: { Table, TableColumn },
      template: `
      <Table :data="testData" @sort-change="handleSort">
        <TableColumn prop="age" label="年龄" sortable="custom" />
      </Table>
    `,
      data() {
        return { testData: [...originalData] };
      },
      methods: {
        handleSort() { },
      },
    });
    await doubleWait();
    await wrapper.find('.er-table__cell').trigger('click');
    await nextTick();

    // 保持原顺序
    const cells = wrapper.findAll('tbody td');
    expect(cells[0].text()).toBe('30');
    expect(cells[1].text()).toBe('20');
    expect(cells[2].text()).toBe('25');

    wrapper.unmount();
  });
})
