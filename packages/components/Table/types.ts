import type { ExtractPropTypes, PropType, VNode } from "vue";

// 表格props
export const tableProps = {
  // 表格数据
  data: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
  // 是否显示斑马纹
  stripe: Boolean,
  // 是否显示纵向边框
  border: Boolean,
  height: {
    type: [String, Number] as PropType<string | number>,
    default: "",
  },
  // 表格高度
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
    default: "",
  },
  // 行状态样式
  rowClassName: {
    type: [String, Function] as PropType<
      string | ((data: { row: any; rowIndex: number }) => string)
    >,
    default: "",
  },
  // 当前行是否高亮
  highlightCurrentRow: {
    type: Boolean,
    default: false,
  },
  // 默认排序
  defaultSort: {
    type: Object as PropType<{
      prop: string; // 字段名
      order: "ascending" | "descending"; // 排序方式
    }>,
  },
  // 是否显示表尾合计行
  showSummary: {
    type: Boolean,
    default: false,
  },
  // 合计行的文本
  sumText: {
    type: String,
    default: "合计",
  },
  summaryMethod: {
    type: Function as PropType<SummaryMethod>,
  },
} as const;

export type TableProps = ExtractPropTypes<typeof tableProps>;

// 合计方法的参数类型
export interface SummaryMethodParams {
  columns: TableColumn[];
  data: any[];
}

// 合计方法类型
export type SummaryMethod = (params: SummaryMethodParams) => (string | VNode)[];

// 列配置props
export const tableColumnProps = {
  prop: String, // 对应列内容的字段名
  label: String, // 列头 label
  width: String, // 列的宽度
  minWidth: String, // 列的最小宽度
  align: {
    // 列的对齐方式
    type: String as PropType<"left" | "center" | "right">,
    values: ["left", "center", "right"],
    default: "left",
  },
  fixed: {
    // 固定列
    type: [Boolean, String] as PropType<boolean | "left" | "right">,
    default: false,
  },
  type: {
    // 列类型
    type: String as PropType<"index" | "selection" | "expand">,
  },
  index: {
    // 索引起始值或计算函数
    type: [Number, Function] as PropType<number | ((index: number) => number)>,
  },
  selectable: {
    // 是否可选
    type: Function as PropType<(row: any, index: number) => boolean>,
  },
  reserveSelection: {
    // 是否保留选择
    type: Boolean,
    default: false,
  },
  sortable: {
    // 是否排序，custom为远程排序
    type: [Boolean, String] as PropType<boolean | "custom">,
    default: false,
  },
  sortMethod: {
    // 自定义排序方法
    type: Function as PropType<(a: any, b: any) => number>,
  },
  sortBy: {
    // 指定排序时使用的属性
    type: [String, Function, Array] as PropType<
      string | ((row: any, index: number) => string) | string[]
    >,
  },
  sortOrders: {
    // 排序循序
    type: Array as PropType<("ascending" | "descending" | null)[]>,
    default: () => ["ascending", "descending", null],
  },
} as const;

export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>;

// 内部每列的配置（包含运行时数据，如果是组件内部自动处理的就放在这里）
export interface TableColumn extends TableColumnProps {
  id: string;
  children?: TableColumn[]; // 子列数组，用于嵌套表头
  level?: number; // 列所在层级
  colSpan?: number; // 计算后的列跨度
  rowSpan?: number; // 计算后的行跨度
  parent?: TableColumn; // 父列引用
  isLeaf?: boolean; // 是否为子节点
  order?: "ascending" | "descending" | null; // 当前排序状态
  renderCell?: (scope: {
    row: any;
    column: TableColumn;
    $index: number;
    store: any;
  }) => VNode[];
  renderHeader?: (scope: {
    row: any;
    column: TableColumn;
    $index: number;
  }) => VNode[];
}

// 表格方法
export const tableEmits = {
  "current-change": (_currentRow: any, _oldCurrentRow: any) => true,
  "selection-change": (_selection: any[]) => true, // 选择项发生变化时触发
  select: (_selection: any[], _row: any) => true,
  "select-all": (_selection: any[]) => true,
  "sort-change": (_sortInfo: {
    // 排序发生变化时触发
    column: any;
    prop: string;
    order: "ascending" | "descending" | null;
  }) => true,
  "expand-change": (_row: any, _expanded: boolean) => true,
};

export type TableEmits = typeof tableEmits;
