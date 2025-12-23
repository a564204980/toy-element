import type { ExtractPropTypes } from "vue";

// 表格props
export const tableProps = {
  data: {
    type: Array,
    default: () => [],
  }, // 表格数据
  stripe: Boolean, // 是否显示斑马纹
  border: Boolean, // 是否显示纵向边框
  height: {
    type: [String, Number],
    default: "",
  }, // 表格高度
} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;

// 列配置props
export const tableColumnProps = {
  prop: String, // 对应列内容的字段名
  label: String, // 列头 label
  width: String, // 列的宽度
  minWidth: String, // 列的最小宽度
  align: {
    type: String,
    value: ["left", "center", "right"],
    default: "left",
  }, // 列的对齐方式
} as const;

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>;

// 内部列配置（包含运行时数据）
export interface TableColumn extends TableColumnProps {
  id: string;
}
