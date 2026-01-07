import { ref, type Ref } from "vue";

export interface UseCurrentRowOptions {
  highlightCurrentRow: boolean;
  emit: (event: "current-change", current: any, old: any) => void;
}

export interface UseCurrentRowReturn {
  currentRow: Ref<any>;
  getRowClass: (row: any) => string;
  handleRowClick: (row: any) => void;
  setCurrentRow: (row?: any) => void;
}

export const useCurrentRow = (
  options: UseCurrentRowOptions
): UseCurrentRowReturn => {
  const { highlightCurrentRow, emit } = options;

  const currentRow = ref<any>(null);

  /**
   * 获取行的 class
   */
  const getRowClass = (row: any) => {
    const classes: string[] = [];

    if (highlightCurrentRow && currentRow.value === row) {
      classes.push("current-row");
    }

    return classes.join(" ");
  };

  /**
   * 处理行点击事件
   */
  const handleRowClick = (row: any) => {
    if (!highlightCurrentRow) return;

    const oldRow = currentRow.value;
    currentRow.value = row;

    emit("current-change", row, oldRow);
  };

  /**
   * 设置当前选中的行
   */
  const setCurrentRow = (row?: any) => {
    const oldRow = currentRow.value;
    currentRow.value = row || null;

    if (highlightCurrentRow) {
      emit("current-change", currentRow.value, oldRow);
    }
  };

  return {
    currentRow,
    getRowClass,
    handleRowClick,
    setCurrentRow,
  };
};
