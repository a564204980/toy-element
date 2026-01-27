import { ref, watch, type Ref } from "vue";
import { get } from "lodash-es";

export interface UseCurrentRowOptions {
  highlightCurrentRow: boolean;
  currentRowKey: Ref<string | number | undefined | null>;
  rowKey: Ref<string | ((row: any) => string) | undefined>;
  data: Ref<any[]>;
  emit: (event: "current-change", current: any, old: any) => void;
}

export interface UseCurrentRowReturn {
  currentRow: Ref<any>;
  getRowClass: (row: any) => string;
  handleRowClick: (row: any) => void;
  setCurrentRow: (row?: any) => void;
}

export const useCurrentRow = (
  options: UseCurrentRowOptions,
): UseCurrentRowReturn => {
  const { highlightCurrentRow, emit, currentRowKey, rowKey, data } = options;

  console.log("currentRowKey", currentRowKey.value);

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

  watch(
    () => currentRowKey.value,
    (key) => {
      if (!highlightCurrentRow || !rowKey.value || !data.value) return;

      if (key === undefined || key === null) {
        setCurrentRow(null);
        return;
      }

      const targetRow = data.value.find((row) => {
        let rKey;
        console.log(
          'typeof rowKey.value === "string"',
          typeof rowKey.value === "string",
        );
        if (typeof rowKey.value === "function") {
          rKey = rowKey.value(row);
        } else if (typeof rowKey.value === "string") {
          rKey = get(row, rowKey.value);
        }

        return rKey === key;
      });

      console.log("targetRow", targetRow);

      if (targetRow) {
        setCurrentRow(targetRow);
      }
    },
    { immediate: true },
  );

  return {
    currentRow,
    getRowClass,
    handleRowClick,
    setCurrentRow,
  };
};
