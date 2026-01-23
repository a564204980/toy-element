import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import Table from "../Table.vue";
import TableColumn from "../TableColumn.vue";

/**
 * 双重等待函数
 * 等待两次 nextTick，确保组件完全渲染
 * 第一次 nextTick：等待 Table 组件渲染
 * 第二次 nextTick：等待 TableColumn 注册完成
 */
export const doubleWait = async () => {
  await nextTick();
  await nextTick();
};

/**
 * 创建测试数据的工厂函数
 */
export const getTestData = () => [
  { id: 1, name: "岳绮罗", address: "北京" },
  { id: 2, name: "谢霆锋", address: "上海" },
  { id: 3, name: "潘玮柏", address: "广州" },
];

/**
 * 创建基础表格的工厂函数
 * @param data - 表格数据
 * @param props - 表格属性
 * @returns 挂载后的 wrapper 对象
 */
export const createBasicTable = (data = getTestData(), props = {}) => {
  return mount({
    components: { Table, TableColumn },
    template: `
      <Table :data="data" v-bind="tableProps">
        <TableColumn prop="name" label="姓名" />
        <TableColumn prop="age" label="年龄" />
        <TableColumn prop="address" label="地址" />
      </Table>
    `,
    data() {
      return {
        data,
        tableProps: props,
      };
    },
  });
};

// 等待表体单元格渲染完成
export const waitForTableBody = async (wrapper: any, maxAttempts = 20) => {
  for (let i = 0; i < maxAttempts; i++) {
    await nextTick();
    const cells = wrapper.findAll(".er-table__cell-content");
    if (cells.length > 0) {
      return cells;
    }
  }
  throw new Error("Table body cells not rendered");
};

/**
 * 手动触发表格列宽计算并等待完成
 * 用于测试中确保 calculatedColumns 被正确计算
 * @param wrapper - 包含 Table 组件的 wrapper
 * @returns Table 组件的 vm 实例
 */
export const triggerTableColumnCalculation = async (wrapper: any) => {
  const tableVm = wrapper.findComponent(Table).vm as any;

  // 手动触发列宽计算
  tableVm.calculateColumnWidths();

  await new Promise((resolve) => setTimeout(resolve, 150));
  await nextTick();

  return tableVm;
};
