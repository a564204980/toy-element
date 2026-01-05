import type { TableColumn } from "./types";

/**
 * 解析宽度值为数字
 * 将字符串类型的宽度（如 "120px" 或 "120"）转换为数字
 * @param width - 宽度值，可以是数字或字符串
 * @returns 返回数字类型的宽度值
 */
export const parseWidth = (width: string | number | undefined): number => {
  if (typeof width === "number") return width;
  if (!width) return 0;
  return parseInt(width);
};

/**
 * 获取固定列的class名称
 * @param columnIndex - 列索引
 * @param column - 列配置
 * @param totalColumn - 总列数
 * @param fixedLeftLength - 左固定列数
 * @param fixedRightLength - 右固定列数
 * @returns class名称数组
 */
export const getFixedColumnsClass = (
  columnIndex: number,
  column: TableColumn,
  totalColumn: number,
  fixedLeftLength: number,
  fixedRightLength: number
) => {
  const classes: string[] = [];
  const fixed = column.fixed;

  if (fixed === true || fixed === "left") {
    classes.push("is-fixed-left");

    // 是否是固定列的最后一列
    if (columnIndex === fixedLeftLength - 1) {
      classes.push("is-last-column");
    }
  } else if (fixed === "right") {
    classes.push("is-fixed-right");
  }

  // 是否是右固定列的第一列
  if (columnIndex === totalColumn - fixedRightLength) {
    classes.push("is-first-column");
  }

  return classes;
};

/**
 * 计算列树的最大深度（层级数）
 * @param columns - 列配置数组
 * @param currentLevel - 当前层级
 * @returns 最大层级数
 */
export const getMaxLevel = (
  columns: TableColumn[],
  currentLevel = 1
): number => {
  let maxLevel = currentLevel;

  columns.forEach((column) => {
    if (column.children && column.children.length > 0) {
      const childrenMaxLevel = getMaxLevel(column.children, currentLevel + 1);
      maxLevel = Math.max(maxLevel, childrenMaxLevel); // 用Math.max始终找最大值
    }
  });

  return maxLevel;
};

/**
 * 计算列的叶子节点总数，计算所有层级的跨度
 * @param column - 列配置
 * @returns 叶子节点总数
 */
export const getColSpan = (column: TableColumn): number => {
  if (!column.children || column.children.length === 0) return 1;

  return column.children.reduce((sum, child) => sum + getColSpan(child), 0);
};

/**
 * 将列树结构转换为表头行数组，表示表头有多少行
 * @param columns - 顶层列配置数组
 * @returns 二维数组，每个元素代表表头的一行
 */
export const convertToRows = (columns: TableColumn[]): TableColumn[][] => {
  const maxLevel = getMaxLevel(columns);
  const rows: TableColumn[][] = Array.from({ length: maxLevel }, () => []); // 初始化

  /**
   * 递归填充行数组
   * @param cols - 当前层级的列数组
   * @param level - 当前层级（从 0 开始）
   */
  const traverse = (cols: TableColumn[], level: number) => {
    cols.forEach((column) => {
      const colSpan = getColSpan(column); // 计算当前列的跨度

      const isLeaf = !column.children || column.children.length === 0; // 是否为叶子节点
      const rowSpan = isLeaf ? maxLevel - level : 1; // 计算行跨度

      const enhancedColumn: TableColumn = {
        ...column,
        colSpan,
        rowSpan,
        level,
        isLeaf, // 标记是否为叶子节点
      };

      rows[level].push(enhancedColumn);

      if (column.children && column.children.length > 0) {
        traverse(column.children, level + 1);
      }
    });
  };

  traverse(columns, 0);

  return rows;
};

/**
 * 递归获取当前列的所有叶子节点
 * @param column - 列配置
 * @returns 当前行的所有列
 */
export const getCurrentColumns = (column: TableColumn): TableColumn[] => {
  if (column.children && column.children.length > 0) {
    return column.children.flatMap(getCurrentColumns);
  } else {
    return [column];
  }
};

/**
 * 计算多级表头中列在叶子列数组中的真实位置
 * @param columnIndex - 当前行中的列索引
 * @param headerRow - 当前表头行的所有列
 * @param allLeafColumns - 所有叶子列数组
 * @returns { start: 起始位置, end: 结束位置 }
 */
export const getRealColumnPosition = (
  columnIndex: number,
  headerRow: TableColumn[],
  allLeafColumns: TableColumn[]
) => {
  const column = headerRow[columnIndex];

  // 获取当前列对应的所有叶子列
  const curLeafColumns = getCurrentColumns(column);

  console.log("所有叶子列", curLeafColumns);

  // 找到第一个叶子列在所有叶子列中的位置
  const firstLeafIndex = allLeafColumns.findIndex(
    (leaf) => leaf.id === curLeafColumns[0].id
  );

  return {
    start: firstLeafIndex, // 这一列的第一个叶子列在整个表格中的位置
    end: firstLeafIndex + curLeafColumns.length - 1, // 这一列的最后一个叶子列在整个表格中的位置
  };
};
