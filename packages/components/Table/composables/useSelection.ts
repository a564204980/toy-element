import { computed, ref } from "vue";

export interface UseSelectionOptions {
  data: () => any[];
  emit: (...args: any[]) => void;
  selectable?: (row: any, index: number) => boolean;
}

export const useSelection = (options: UseSelectionOptions) => {
  const { data, emit } = options;

  const selection = ref<any[]>([]); // 已选中的数据
  const selectableFn = ref<((row: any, index: number) => boolean) | null>(null); // 某行是否可选中

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

    // every()方法测试数组中的所有元素是否都通过了指定函数的测试
    // return rows.every((row) => selection.value.includes(row));

    // 过滤出可选中的行
    const selectableRows = rows.filter((row, index) => {
      return !selectableFn.value || selectableFn.value(row, index);
    });

    if (selectableRows.length === 0) return;
    return selectableRows.every((row) => selection.value.includes(row));
  });

  /**
   * 是否半选状态
   */
  const isIndeterminate = computed(() => {
    const rows = data();
    const selectableRows = rows.filter((row, index) => {
      return !selectableFn.value || selectableFn.value(row, index);
    });
    const selectedCount = selection.value.length;
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
      const selectableRows = rows.filter((row, index) => {
        return !selectableFn.value || selectableFn.value(row, index);
      });
      selection.value = [...selectableRows];
    }

    emit("select-all", [...selection.value]);
    emit("selection-change", [...selection.value]);
  };

  /**
   * 设置某一行是否可选中
   */
  const setSelectable = (fn: ((row: any, index: number) => boolean) | null) => {
    selectableFn.value = fn;
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
    setSelectable,
    clearSelection,
  };
};
