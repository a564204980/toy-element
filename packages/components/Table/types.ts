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
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
    default: "",
  },
  rowClassName: {
    // 行状态样式
    type: [String, Function] as PropType<
      string | ((data: { row: any; rowIndex: number }) => string)
    >,
    default: "",
  },
  highlightCurrentRow: {
    type: Boolean,
    default: false,
  }, // 当前行是否高亮
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

// 内部每列的配置（包含运行时数据）
export interface TableColumn extends TableColumnProps {
  id: string;
  children?: TableColumn[]; // 子列数组，用于嵌套表头
  level?: number; // 列所在层级
  colSpan?: number; // 计算后的列跨度
  rowSpan?: number; // 计算后的行跨度
  parent?: TableColumn; // 父列引用
  isLeaf?: boolean; // 是否为子节点
}

export const tableEmits = {
  "current-change": (_currentRow: any, _oldCurrentRow: any) => true,
};

export type TableEmits = typeof tableEmits;
