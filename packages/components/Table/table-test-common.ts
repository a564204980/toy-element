import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import Table from "./Table.vue";
import TableColumn from "./TableColumn.vue";

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
