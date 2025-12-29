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
