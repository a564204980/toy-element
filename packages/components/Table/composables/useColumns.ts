import {
  computed,
  nextTick,
  ref,
  watch,
  type ComputedRef,
  type Ref,
} from "vue";
import type { TableColumn } from "../types";
import { convertToRows, parseWidth } from "../utils";
import { debounce } from "lodash-es";

// 列管理
export interface UseColumnsOptions {
  tableRef: Ref<HTMLElement | undefined>;
  fit: Ref<boolean>;
  onColumnWidthsCalculated?: () => void;
}

// 返回值
export interface UseColumnsReturn {
  // 数据
  columns: Ref<TableColumn[]>; // 列配置
  calculatedColumns: Ref<TableColumn[]>; // 计算后的列配置，主要是宽度
  flattenLeafColumns: ComputedRef<TableColumn[]>; // 展平后的叶子节点
  headerRows: ComputedRef<TableColumn[][]>; // 表头行数据（多级表头）
  tableWidth: Ref<number>; // 表格宽度
  tableContentWidth: Ref<number>; // 表格内容的真实宽度

  // 计算属性
  fixedLeftColumnsLength: ComputedRef<number>; // 左固定列列数
  fixedRightColumnsLength: ComputedRef<number>; // 右固定列列数

  // 方法
  registerColumn: (column: TableColumn, index?: number) => number; // 注册子列方法
  unregisterColumn: (index: number) => void; // 注销子列方法
  calculateColumnWidths: () => void; // 计算列宽度
}

export const useColumns = (options: UseColumnsOptions): UseColumnsReturn => {
  const { tableRef, fit, onColumnWidthsCalculated } = options;

  const tableWidth = ref(0);
  const tableContentWidth = ref(0);
  const columns = ref<TableColumn[]>([]);
  const calculatedColumns = ref<TableColumn[]>([]);

  /**
   * 注册列的方法
   * @param column - 列配置
   * @param index - 可选，插入位置
   * @returns 返回列在数组中的索引
   */
  const registerColumn = (column: TableColumn, index?: number) => {
    if (index !== undefined) {
      columns.value.splice(index, 0, column);
      return index;
    } else {
      columns.value.push(column);
      return columns.value.length - 1;
    }
  };

  const unregisterColumn = (index: number) => {
    if (index >= 0 && index < columns.value.length) {
      columns.value.splice(index, 1);
    }
  };

  /**
   * 展平后的叶子节点
   */
  const flattenLeafColumns = computed(() => {
    let result: TableColumn[] = [];

    const flatten = (cols: TableColumn[]) => {
      cols.forEach((col) => {
        if (col.children && col.children.length > 0) {
          flatten(col.children);
        } else {
          col.isLeaf = true; // 标记叶子节点
          result.push(col);
        }
      });
    };

    flatten(columns.value);

    return result;
  });

  /**
   * 表头行数据（多级表头）
   */
  const headerRows = computed(() => {
    return convertToRows(columns.value);
  });

  /**
   * 左固定列数
   */
  const fixedLeftColumnsLength = computed(() => {
    return columns.value.filter(
      (col) => col.fixed === true || col.fixed === "left",
    ).length;
  });

  /**
   * 右固定列数
   */
  const fixedRightColumnsLength = computed(() => {
    return columns.value.filter((col) => col.fixed === "right").length;
  });

  // 计算列宽
  const calculateColumnWidths = debounce(() => {
    if (!tableRef.value) return;

    const containerWidth = tableRef.value.offsetWidth;
    tableWidth.value = containerWidth;

    // 统计有固定宽度的列和无宽度的列
    let flexCount = 0; // 无宽度列的数量
    let fixedWidth = 0; // 固定宽度总和
    const minFlexWidth = 80;

    flattenLeafColumns.value.forEach((col) => {
      if (col.width) {
        fixedWidth += parseWidth(col.width);
      } else {
        flexCount++;
      }
    });

    // 计算剩余空间
    const remainingWidth = containerWidth - fixedWidth;

    // 计算每个弹性列的宽度
    let flexWidth = minFlexWidth;

    if (fit.value) {
      flexWidth =
        flexCount > 0
          ? Math.max(Math.floor(remainingWidth / flexCount), minFlexWidth)
          : 0;
    } else {
      flexWidth = minFlexWidth;
    }

    let totalWidth = 0; // 总宽

    // 分配最终宽度
    calculatedColumns.value = flattenLeafColumns.value.map((col) => {
      let finalWidth;
      if (col.width) {
        finalWidth = parseWidth(col.width);
      } else {
        finalWidth = flexWidth;
      }

      totalWidth += finalWidth;

      return {
        ...col,
        width: `${finalWidth}px`,
        realWidth: finalWidth,
      };
    });

    tableContentWidth.value = totalWidth;

    nextTick(() => {
      onColumnWidthsCalculated?.();
    });
  }, 100);

  watch(
    columns,
    async () => {
      await nextTick();
      calculateColumnWidths();
    },
    { deep: true },
  );

  return {
    registerColumn,
    unregisterColumn,
    flattenLeafColumns,
    headerRows,
    fixedLeftColumnsLength,
    fixedRightColumnsLength,
    columns,
    calculatedColumns,
    tableWidth,
    calculateColumnWidths,
    tableContentWidth,
  };
};
