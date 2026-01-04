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
 * 将列树结构转换为表头行数组
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
