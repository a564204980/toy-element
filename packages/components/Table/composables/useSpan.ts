import type { SpanMethodProps, SpanMethodResult, TableColumn } from "../types";

export interface UseSpanOptions {
  spanMethod?: (props: SpanMethodProps) => SpanMethodResult;
}

export const useSpan = (options: UseSpanOptions) => {
  const { spanMethod } = options;

  /**
   * 获取单元格的 rowspan 和 colspan
   * @param row 当前行数据
   * @param column 当前列配置
   * @param rowIndex 行索引
   * @param columnIndex 列索引
   * @returns { rowspan, colspan } 行数和列数
   */
  const getCellSpan = (
    row: any,
    column: TableColumn,
    rowIndex: number,
    columnIndex: number,
  ) => {
    let rowspan = 1;
    let colspan = 1;

    if (spanMethod) {
      const result = spanMethod({ row, column, rowIndex, columnIndex });

      if (result) {
        if (Array.isArray(result)) {
          rowspan = result[0];
          colspan = result[1];
        } else if (typeof result === "object") {
          rowspan = result.rowspan;
          colspan = result.colspan;
        }
      }
    }

    return { rowspan, colspan };
  };

  /**
   * 判断单元格是否应该隐藏
   * @param rowspan 行合并数
   * @param colspan 列合并数
   */
  const shouldHideCell = (rowspan: number, colspan: number) => {
    return rowspan === 0 || colspan === 0;
  };

  return {
    getCellSpan,
    shouldHideCell,
  };
};
