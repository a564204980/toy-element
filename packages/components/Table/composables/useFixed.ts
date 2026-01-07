import type { ComputedRef, Ref } from "vue";
import type { TableColumn } from "../types";
import {
  getCurrentColumns,
  getFixedColumnsClass,
  getRealColumnPosition,
  parseWidth,
} from "../utils";

export interface UseFixedOptions {
  columns: Ref<TableColumn[]>; // 列配置
  flattenLeafColumns: ComputedRef<TableColumn[]>; // 展平后的叶子节点
  fixedLeftColumnsLength: ComputedRef<number>; // 左固定列列数
  fixedRightColumnsLength: ComputedRef<number>; // 右固定列列数
  hasScrollbar: Ref<boolean>; // 是否有纵向滚动条
  scrollbarWidth: Ref<number>; // 滚动条宽度
}

export interface UseFixedReturn {
  getCellClass: (
    columnIndex: number,
    column: TableColumn,
    headerRows: TableColumn[]
  ) => string;

  getCellFixedStyle: (
    column: TableColumn,
    columnIndex: number,
    headerRows: TableColumn[],
    isHeader?: boolean
  ) => { left?: string; right?: string };
}

export const useFixed = (options: UseFixedOptions): UseFixedReturn => {
  const {
    columns,
    flattenLeafColumns,
    fixedLeftColumnsLength,
    fixedRightColumnsLength,
    hasScrollbar,
    scrollbarWidth,
  } = options;

  /**
   * 获取单元格的 class 名称
   * @param columnIndex - 列索引
   * @param column - 列配置
   * @param headerRows - 表头行数据
   * @returns class 名称
   */
  const getCellClass = (
    columnIndex: number,
    column: TableColumn,
    headerRows: TableColumn[]
  ) => {
    const { start } = getRealColumnPosition(
      columnIndex,
      headerRows,
      flattenLeafColumns.value
    );

    const classes = getFixedColumnsClass(
      start,
      column,
      flattenLeafColumns.value.length,
      fixedLeftColumnsLength.value,
      fixedRightColumnsLength.value
    );

    if (column.isLeaf) {
      classes.push("is-leaf");
    }

    if (column.type === "index") {
      classes.push("is-index");
    }

    return classes.join(" ");
  };

  /**
   * 固定列样式计算，距离左边或右边的距离
   * @param column - 列配置
   * @param columnIndex - 列索引
   * @param headerRow - 表头行数据
   * @param isHeader - 是否是表头
   * @returns 样式对象
   */
  const getCellFixedStyle = (
    column: TableColumn,
    columnIndex: number,
    headerRow: TableColumn[],
    isHeader: boolean = false
  ) => {
    if (!column.fixed) return {};

    if (column.fixed === true || column.fixed === "left") {
      let left = 0;
      // 累加前面所有左固定列的宽度
      for (let i = 0; i < columnIndex; i++) {
        const col = headerRow[i];
        if (col && (col.fixed === true || col.fixed === "left")) {
          // 获取这一列对应的所有叶子列
          const leafColumns = getCurrentColumns(col);
          // 累加所有叶子列的宽度
          leafColumns.forEach((leaf) => {
            left += parseWidth(leaf.width);
          });
        }
      }
      return { left: `${left}px` };
    }

    if (column.fixed === "right") {
      let right = 0;

      for (let i = columnIndex + 1; i < columns.value.length; i++) {
        const col = columns.value[i];
        if (col && col.fixed === "right") {
          right += parseWidth(col.width);
        }
      }

      if (hasScrollbar.value && isHeader) {
        right += scrollbarWidth.value;
      }

      return { right: `${right}px` };
    }

    return {};
  };

  return {
    getCellClass,
    getCellFixedStyle,
  };
};
