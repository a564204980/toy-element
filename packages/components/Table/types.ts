import type { ExtractPropTypes, PropType } from "vue";

// 表格props
export const tableProps = {
  data: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  }, // 表格数据
  stripe: Boolean, // 是否显示斑马纹
  border: Boolean, // 是否显示纵向边框
  height: {
    type: [String, Number] as PropType<string | number>,
    default: "",
  }, // 表格高度
  rowClassName: {
    // 行状态样式
    type: [String, Function] as PropType<
      string | ((data: { row: any; rowIndex: number }) => string)
    >,
    default: "",
  },
} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;

// 列配置props
export const tableColumnProps = {
  prop: String, // 对应列内容的字段名
  label: String, // 列头 label
  width: String, // 列的宽度
  minWidth: String, // 列的最小宽度
  align: {
    type: String as PropType<"left" | "center" | "right">,
    values: ["left", "center", "right"],
    default: "left",
  }, // 列的对齐方式
  fixed: {
    type: [Boolean, String] as PropType<boolean | "left" | "right">,
    default: false,
  }, // 固定列
} as const;

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>;

// 内部列配置（包含运行时数据）
export interface TableColumn extends TableColumnProps {
  id: string;
}
