import { describe, it, expect, vi, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import { doubleWait, createBasicTable, getTestData } from "./table-test-common";
import Table from "../Table.vue";
import TableColumn from "../TableColumn.vue";
import { nextTick } from "vue";

// 第一个参数是要mock的模块名，第二个参数是mock内容
vi.mock("lodash-es", async () => {
  // 获取原始的、未被 mock 的 lodash-es 模块
  const actual = await vi.importActual("lodash-es");
  return {
    ...actual,
    debounce: (fn: Function) => fn, // // 只覆盖debounce
  };
});

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
        tableVm.columns,
      );
      const rightFixedColumn = tableVm.columns[2];
      const rightStyle = tableVm.getCellFixedStyle(
        rightFixedColumn,
        0,
        tableVm.columns,
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
        return { testData: getTestData() };
      },
    });

    await doubleWait();

    expect(wrapper.find(".caret-wrapper").exists()).toBe(true);
    expect(wrapper.find(".sort-caret.ascending").exists()).toBe(true);
    expect(wrapper.find(".sort-caret.descending").exists()).toBe(true);

    wrapper.unmount();
  });

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
          testData: [{ age: 30 }, { age: 20 }, { age: 25 }],
        };
      },
    });

    await doubleWait();

    const th = wrapper.find("th");
    await th.find(".er-table__cell").trigger("click");
    await nextTick();

    expect(wrapper.find(".sort-caret.ascending").classes()).toContain(
      "is-active",
    );

    const cells = wrapper.findAll("tbody td");
    expect(cells[0].text()).toBe("20");
    expect(cells[1].text()).toBe("25");
    expect(cells[2].text()).toBe("30");

    wrapper.unmount();
  });

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

    await doubleWait();
    const cell = wrapper.find(".er-table__cell");

    await cell.trigger("click");
    await nextTick();
    expect(wrapper.find(".sort-caret.ascending").classes()).toContain(
      "is-active",
    );

    await cell.trigger("click");
    await nextTick();
    expect(wrapper.find(".sort-caret.descending").classes()).toContain(
      "is-active",
    );

    await cell.trigger("click");
    await nextTick();
    expect(wrapper.find(".is-active").exists()).toBe(false);
  });

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
            { name: "A", age: 20 },
            { name: "B", age: 30 },
            { name: "C", age: 25 },
          ],
        };
      },
    });

    await doubleWait();

    expect(wrapper.find(".sort-caret.descending.is-active").exists()).toBe(
      true,
    );

    const cells = wrapper.findAll("tbody tr td:nth-child(2)");
    expect(cells[0].text()).toBe("30");
    expect(cells[1].text()).toBe("25");
    expect(cells[2].text()).toBe("20");
  });

  it("排序时应该触发sort-change事件", async () => {
    const sortCallback = vi.fn();
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
          sortCallback(payload);
        },
      },
    });

    await doubleWait();
    await wrapper.find(".er-table__cell").trigger("click");
    await nextTick();

    expect(sortCallback).toHaveBeenCalledTimes(1);
    // 模拟函数被调用时传入的参数
    expect(sortCallback).toHaveBeenCalledWith(
      // 预期传入的对象参数需要满足的条件
      expect.objectContaining({
        prop: "age",
        order: "ascending",
      }),
    );

    wrapper.unmount();
  });

  it('sortable="custom" 应该触发事件但不排序数据', async () => {
    const originalData = [{ age: 30 }, { age: 20 }, { age: 25 }];

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
        handleSort() {},
      },
    });
    await doubleWait();
    await wrapper.find(".er-table__cell").trigger("click");
    await nextTick();

    // 保持原顺序
    const cells = wrapper.findAll("tbody td");
    expect(cells[0].text()).toBe("30");
    expect(cells[1].text()).toBe("20");
    expect(cells[2].text()).toBe("25");

    wrapper.unmount();
  });
});

describe("插槽功能", () => {
  it("应该正确渲染默认插槽内容", async () => {
    const wrapper = mount({
      components: { Table, TableColumn },
      template: `
        <Table :data="testData">
          <TableColumn prop="name" label="姓名">
            <template #default="{ row }">
              <span class="custom-name">自定义: {{ row.name }}</span>
            </template>
          </TableColumn>
          <TableColumn prop="age" label="年龄" />
        </Table>
      `,
      data() {
        return {
          testData: [
            { name: "张三", age: 25 },
            { name: "李四", age: 30 },
          ],
        };
      },
    });

    await doubleWait();

    const customCells = wrapper.findAll(".custom-name");
    expect(customCells.length).toBe(2);
    expect(customCells[0].text()).toBe("自定义: 张三");
    expect(customCells[1].text()).toBe("自定义: 李四");

    const ageCells = wrapper.findAll("tbody tr td:nth-child(2)");
    expect(ageCells[0].text()).toBe("25");
    expect(ageCells[1].text()).toBe("30");

    wrapper.unmount();
  });

  it("应该向插槽传递完整的参数", async () => {
    const slotProps = vi.fn();

    const wrapper = mount({
      components: { Table, TableColumn },
      template: `
      <Table :data="testData">
        <TableColumn prop="name" label="姓名">
          <template #default="slotData">
            {{ captureSlotProps(slotData) }}
            <span>{{ slotData.row.name }}</span>
          </template>
        </TableColumn>
      </Table>
    `,
      data() {
        return {
          testData: [{ name: "测试用户", age: 28 }],
        };
      },
      methods: {
        captureSlotProps(data: any) {
          slotProps(data);
          return "";
        },
      },
    });
    await doubleWait();

    expect(slotProps).toHaveBeenCalled();

    // 获取插槽内容
    const passedProps =
      slotProps.mock.calls[slotProps.mock.calls.length - 1][0];

    expect(passedProps).toHaveProperty("row");
    expect(passedProps).toHaveProperty("column");
    expect(passedProps).toHaveProperty("$index");
    expect(passedProps).toHaveProperty("store");

    // row参数是否正确，toEqual是用比较两个值是否相等严格类型
    expect(passedProps.row).toEqual({ name: "测试用户", age: 28 });

    expect(passedProps.column).toHaveProperty("prop", "name");
    expect(passedProps.column).toHaveProperty("label", "姓名");

    expect(passedProps.$index).toBe(0);

    expect(passedProps.store).toHaveProperty("states");

    wrapper.unmount();
  });
});

describe("展开行功能", () => {
  it("应该正确渲染展开列和展开按钮", async () => {
    const wrapper = mount({
      components: { Table, TableColumn },
      template: `
        <Table :data="testData">
          <TableColumn type="expand">
            <template #default="{ row }">
              <div class="expand-content">
                <p>详细信息：{{ row.name }}</p>
              </div>
            </template>
          </TableColumn>
          <TableColumn prop="name" label="姓名" />
          <TableColumn prop="address" label="地址" />
        </Table>
      `,
      data() {
        return {
          testData: [
            { id: 1, name: "张三", address: "北京" },
            { id: 2, name: "李四", address: "上海" },
          ],
        };
      },
    });

    await doubleWait();

    const expandButtons = wrapper.findAll(".er-table__expand-icon");
    expect(expandButtons.length).toBe(2);

    const firstButton = expandButtons[0];
    expect(firstButton.find(".arrow-right").exists()).toBe(true);
    expect(firstButton.find(".arrow-down").exists()).toBe(false);

    wrapper.unmount();
  });

  it("点击展开按钮应该显示展开内容", async () => {
    const wrapper = mount({
      components: { Table, TableColumn },
      template: `
        <Table :data="testData">
          <TableColumn type="expand">
            <template #default="{ row }">
              <div class="expand-content">
                <p>姓名：{{ row.name }}</p>
                <p>地址：{{ row.address }}</p>
              </div>
            </template>
          </TableColumn>
          <TableColumn prop="name" label="姓名" />
        </Table>
      `,
      data() {
        return {
          testData: [{ id: 1, name: "张三", address: "北京市朝阳区" }],
        };
      },
    });

    await doubleWait();

    expect(wrapper.find(".er-table__expand-row").exists()).toBe(false);

    const expandButton = wrapper.find(".er-table__expand-icon");
    await expandButton.trigger("click");
    await doubleWait();

    const expandRow = wrapper.find(".er-table__expand-row");
    expect(expandRow.exists()).toBe(true);
    expect(expandRow.text()).toContain("张三");
    expect(expandRow.text()).toContain("北京市朝阳区");

    expect(expandButton.find(".arrow-right").exists()).toBe(false);
    expect(expandButton.find(".arrow-down").exists()).toBe(true);

    wrapper.unmount();
  });

  it("展开行应该横跨所有列", async () => {
    const wrapper = mount({
      components: { Table, TableColumn },
      template: `
      <Table :data="testData">
        <TableColumn type="expand">
          <template #default="{ row }">
            <div>展开内容</div>
          </template>
        </TableColumn>
        <TableColumn prop="name" label="姓名" />
        <TableColumn prop="age" label="年龄" />
        <TableColumn prop="address" label="地址" />
      </Table>
    `,
      data() {
        return {
          testData: [{ id: 1, name: "张三", age: 25, address: "北京" }],
        };
      },
    });
    await doubleWait();

    await wrapper.find(".er-table__expand-icon").trigger("click");
    await nextTick();

    const expandCell = wrapper.find(
      ".er-table__expand-row .er-table__expand-cell",
    );
    expect(expandCell.exists()).toBe(true);

    const colspan = expandCell.attributes("colspan");
    expect(colspan).toBe("4");
  });

  it("展开/收起时应该触发expand-change事件", async () => {
    const expandCallback = vi.fn();

    const wrapper = mount({
      components: { Table, TableColumn },
      template: `
      <Table :data="testData" @expand-change="handleExpandChange">
        <TableColumn type="expand">
          <template #default="{ row }">
            <div>展开内容</div>
          </template>
        </TableColumn>
        <TableColumn prop="name" label="姓名" />
      </Table>
    `,
      data() {
        return {
          testData: [{ id: 1, name: "张三" }],
        };
      },
      methods: {
        handleExpandChange(row: any, expanded: boolean) {
          expandCallback(row, expanded);
        },
      },
    });

    await doubleWait();

    await wrapper.find(".er-table__expand-icon").trigger("click");
    await nextTick();

    expect(expandCallback).toHaveBeenCalledTimes(1);

    expect(expandCallback).toHaveBeenCalledWith({ id: 1, name: "张三" }, true);

    await wrapper.find(".er-table__expand-icon").trigger("click");
    await nextTick();

    expect(expandCallback).toHaveBeenCalledTimes(2);
    expect(expandCallback).toHaveBeenCalledWith({ id: 1, name: "张三" }, false);

    wrapper.unmount();
  });

  it("应该通过组件实例访问展开状态", async () => {
    const wrapper = mount({
      components: { Table, TableColumn },
      template: `
        <Table :data="testData" ref="tableRef">
          <TableColumn type="expand">
            <template #default="{ row }">
              <div>展开内容</div>
            </template>
          </TableColumn>
          <TableColumn prop="name" label="姓名" />
        </Table>
      `,
      data() {
        return {
          testData: [
            { id: 1, name: "张三" },
            { id: 2, name: "李四" },
          ],
        };
      },
    });

    await nextTick();

    const tableVm = wrapper.findComponent(Table).vm as any;
    // 初始状态没有展开
    expect(tableVm.isRowExpanded({ id: 1, name: "张三" })).toBe(false);

    tableVm.toggleRowExpansion({ id: 1, name: "张三" });
    await nextTick();

    expect(tableVm.isRowExpanded({ id: 1, name: "张三" })).toBe(true);
    expect(wrapper.find(".er-table__expand-row").exists()).toBe(true);

    wrapper.unmount();
  });
});

const treeData = [
  {
    id: 1,
    name: "浙江省",
    count: 100,
    children: [
      { id: 11, name: "杭州市", count: 50 },
      { id: 12, name: "宁波市", count: 50 },
    ],
  },
  {
    id: 2,
    name: "江苏省",
    count: 200,
    children: [
      { id: 21, name: "南京市", count: 100 },
      { id: 22, name: "苏州市", count: 100 },
    ],
  },
];

const lazyData = [
  { id: 1, name: "节点1", hasChildren: true },
  { id: 2, name: "节点2", hasChildren: true },
];

describe("Tree", () => {
  it("应该正确渲染树形数据", async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <Table data={treeData} row-key="id">
            <TableColumn prop="name" label="姓名" />
            <TableColumn prop="count" label="数量" />
          </Table>
        );
      },
    });

    await doubleWait();

    const rows = wrapper.findAll(".er-table__body tbody tr");
    expect(rows.length).toBe(2);

    const treeIcon = wrapper.findAll(".er-table__tree-expand-icon");
    expect(treeIcon.length).toBe(2);

    wrapper.unmount();
  });

  it("点击图标后，子节点应该显示/隐藏", async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <Table data={treeData} row-key="id">
            <TableColumn prop="name" label="名称" />
          </Table>
        );
      },
    });

    await doubleWait();

    let rows = wrapper.findAll(".er-table__body tbody tr");
    expect(rows.length).toBe(2);

    const firstIcon = wrapper.find(".er-table__tree-expand-icon");
    await firstIcon.trigger("click");
    await nextTick();

    rows = wrapper.findAll(".er-table__body tbody tr");
    expect(rows.length).toBe(4);

    const indents = wrapper.findAll(".er-table__indent");
    expect(indents.length).toBeGreaterThan(0); // 大于0

    await firstIcon.trigger("click");
    await nextTick();

    rows = wrapper.findAll(".er-table__body tbody tr");
    expect(rows.length).toBe(2);

    wrapper.unmount();
  });

  it("展开/折叠时应该触发事件", async () => {
    const onExpandChange = vi.fn();

    const wrapper = mount({
      setup() {
        return () => (
          <Table data={treeData} row-key="id" onExpand-change={onExpandChange}>
            <TableColumn prop="name" label="名称"></TableColumn>
          </Table>
        );
      },
    });

    await doubleWait();

    const firstIcon = wrapper.find(".er-table__tree-expand-icon");
    await firstIcon.trigger("click");
    await nextTick();

    expect(onExpandChange).toHaveBeenCalled();
    expect(onExpandChange).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1 }), // row
      true, // expanded
    );

    wrapper.unmount();
  });

  it("设置default-expand-all之后，所有节点应该展开", async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <Table data={treeData} rowKey="id" defaultExpandAll>
            <TableColumn prop="name" label="名称" />
          </Table>
        );
      },
    });

    await doubleWait();

    const rows = wrapper.findAll(".er-table__body tbody tr");
    expect(rows.length).toBe(6);

    wrapper.unmount();
  });

  it("只展开指定的节点", async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <Table
            data={treeData}
            rowKey="id"
            expandRowKeys={[1]} // 只展开 id=1 的节点
          >
            <TableColumn prop="name" label="名称" />
          </Table>
        );
      },
    });

    await doubleWait();

    const rows = wrapper.findAll(".er-table__body tbody tr");
    expect(rows.length).toBe(4);

    wrapper.unmount();
  });

  it("点击懒加载节点，应该调用load函数", async () => {
    const loadFn = vi.fn((row, treeNode, resolve) => {
      setTimeout(() => {
        resolve([
          { id: `${row.id}-1`, name: `${row.name}的子节点1` },
          { id: `${row.id}-2`, name: `${row.name}的子节点2` },
        ]);
      }, 100);
    });
  });
});
