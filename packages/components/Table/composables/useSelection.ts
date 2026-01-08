import { computed, ref } from "vue";

export interface UseSelectionOptions {
  data: () => any[];
  emit: (...args: any[]) => void;
  selectable?: () => ((row: any, index: number) => boolean) | undefined; // 是否选中
}

export const useSelection = (options: UseSelectionOptions) => {
  const { data, emit, selectable } = options;

  const selection = ref<any[]>([]); // 已选中的数据

  /**
   * 判断某一行是否被选中
   * @param row 当前行
   * @returns 是否被选中
   */
  const isSelected = (row: any): boolean => {
    return selection.value.includes(row);
  };

  /**
   * 切换某一行的选中状态
   * @param row 当前行
   */
  const toggleRowSelection = (row: any) => {
    const index = selection.value.indexOf(row);

    if (index === -1) {
      selection.value = [...selection.value, row];
    } else {
      selection.value = selection.value.filter((r) => r !== row);
    }

    emit("selection-change", [...selection.value]);
  };

  /**
   * 是否全部选中
   */
  const isAllSelected = computed(() => {
    const rows = data();
    if (rows.length === 0) return false;

    // 过滤出可选中的行
    const selectableFn = selectable?.();
    const selectableRows = rows.filter((row, index) => {
      return !selectableFn || selectableFn(row, index);
    });

    if (selectableRows.length === 0) return false;
    // 测试数组中的所有元素是否都通过某个条件
    return selectableRows.every((row) => selection.value.includes(row));
  });

  /**
   * 是否半选状态
   */
  const isIndeterminate = computed(() => {
    const rows = data();
    const selectableFn = selectable?.();
    const selectableRows = rows.filter((row, index) => {
      return !selectableFn || selectableFn(row, index);
    });
    const selectedCount = selection.value.filter((row) =>
      selectableRows.includes(row)
    ).length;
    return selectedCount > 0 && selectedCount < selectableRows.length;
  });

  /**
   * 切换全选
   */
  const toggleAllSelection = () => {
    const rows = data();
    if (isAllSelected.value) {
      selection.value = [];
    } else {
      const selectableFn = selectable?.();
      const selectableRows = rows.filter((row, index) => {
        return !selectableFn || selectableFn(row, index);
      });
      selection.value = [...selectableRows];
    }

    emit("select-all", [...selection.value]);
    emit("selection-change", [...selection.value]);
  };

  const clearSelection = () => {
    selection.value = [];
    emit("selection-change", []);
  };

  return {
    selection,
    isSelected,
    toggleRowSelection,
    isAllSelected,
    isIndeterminate,
    toggleAllSelection,
    clearSelection,
  };
};
