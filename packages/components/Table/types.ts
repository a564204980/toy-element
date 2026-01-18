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
  // 行数据的key
  rowKey: {
    type: [String, Function] as PropType<string | ((row: any) => string)>,
    default: "",
  },
  // 树形配置
  treeProps: {
    type: Object as PropType<{
      children?: string; // 指定子节点数据的字段名，默认查找children字段
      hasChildren?: string; // 指定是否有子节点的标识字段，用于懒加载，点击时在加载数据，子节点数据暂时没有
    }>,
    default: () => ({ children: "children", hasChildren: "hasChildren" }),
  },
  // 是否懒加载
  lazy: {
    type: Boolean,
    default: false,
  },
  // 懒加载函数
  load: {
    type: Function as PropType<
      (row: any, treeNode: any, resolve: (data: any[]) => void) => void
    >,
  },
  // 缩进大小
  indent: {
    type: Number,
    default: 16,
  },
  // 默认展开所有行
  defaultExpandAll: {
    type: Boolean,
    default: false,
  },
  // 默认展开的行，通过row-key数组指定
  expandRowKeys: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
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
  // 列的对齐方式
  align: {
    type: String as PropType<"left" | "center" | "right">,
    values: ["left", "center", "right"],
    default: "left",
  },
  // 固定列
  fixed: {
    type: [Boolean, String] as PropType<boolean | "left" | "right">,
    default: false,
  },
  // 列类型
  type: {
    type: String as PropType<"index" | "selection" | "expand">,
  },
  // 索引起始值或计算函数
  index: {
    type: [Number, Function] as PropType<number | ((index: number) => number)>,
  },
  // 是否可选
  selectable: {
    type: Function as PropType<(row: any, index: number) => boolean>,
  },
  // 是否保留选择
  reserveSelection: {
    type: Boolean,
    default: false,
  },
  // 是否排序，custom为远程排序
  sortable: {
    type: [Boolean, String] as PropType<boolean | "custom">,
    default: false,
  },
  // 自定义排序方法
  sortMethod: {
    type: Function as PropType<(a: any, b: any) => number>,
  },
  // 指定排序时使用的属性
  sortBy: {
    type: [String, Function, Array] as PropType<
      string | ((row: any, index: number) => string) | string[]
    >,
  },
  // 排序循序
  sortOrders: {
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
