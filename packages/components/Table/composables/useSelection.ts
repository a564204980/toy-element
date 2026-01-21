import { computed, ref } from "vue";

export interface UseSelectionOptions {
  data: () => any[];
  emit: (...args: any[]) => void;
  selectable?: () => ((row: any, index: number) => boolean) | undefined; // 是否选中
  treeProps: () => {
    // 树形数据配置
    children?: string;
    hasChildren?: string;
    checkStrictly?: boolean;
  };
  rowKey?: () => string | ((row: any) => string);
}

export const useSelection = (options: UseSelectionOptions) => {
  const { data, emit, selectable, treeProps } = options;

  const selection = ref<any[]>([]); // 已选中的数据
  const treeConfig = treeProps?.();
  const childrenKey = treeConfig?.children || "children";
  const checkStrictly = treeConfig?.checkStrictly ?? false;

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
    const isSelection = index === -1; // true选中，false取消选中

    if (isSelection) {
      selection.value = [...selection.value, row];
      // 不是严格模式选中子节点
      if (!checkStrictly) {
        const descendants = getAllDescendantsInternal(row, childrenKey);
        // 如果没有选中就设置选中
        descendants.forEach((child) => {
          if (!selection.value.includes(child)) {
            selection.value.push(child);
          }
        });
      }
    } else {
      // 取消当前选中行
      selection.value = selection.value.filter((r) => r !== row);

      if (!checkStrictly) {
        const descendants = getAllDescendantsInternal(row, childrenKey);
        selection.value = selection.value.filter(
          (r) => !descendants.includes(r),
        );
      }
    }

    emit("selection-change", [...selection.value]);
  };

  /**
   * 是否全部选中
   */
  const isAllSelected = computed(() => {
    const rows = data();
    if (rows.length === 0) return false;

    const allSelectedRows: any[] = [];
    const selectableFn = selectable?.();

    // 收集所有可选行
    const collectSelectableRows = (list: any[], index = 0) => {
      list.forEach((row) => {
        if (!selectableFn || selectableFn(row, index)) {
          allSelectedRows.push(row);
        }

        if (!checkStrictly) {
          const children = row[childrenKey];
          if (Array.isArray(children)) {
            collectSelectableRows(children);
          }
        }
      });
    };

    collectSelectableRows(rows);

    if (allSelectedRows.length === 0) return false;
    // 测试数组中的所有元素是否都通过某个条件
    return allSelectedRows.every((row) => selection.value.includes(row));
  });

  /**
   * 是否半选状态
   */
  const isIndeterminate = computed(() => {
    const allSelectableRows: any[] = [];
    const selectableFn = selectable?.();
    const rows = data();

    // 收集所有可以被选中的子节点
    const collectSelectableRows = (list: any[]) => {
      list.forEach((row, index) => {
        if (!selectableFn || selectableFn(rows, index)) {
          allSelectableRows.push(row);
        }

        if (!checkStrictly) {
          const children = row[childrenKey];
          if (Array.isArray(children)) {
            collectSelectableRows(children);
          }
        }
      });
    };

    collectSelectableRows(rows);

    const selectedCount = selection.value.filter((row) =>
      allSelectableRows.includes(row),
    ).length;
    return selectedCount > 0 && selectedCount < allSelectableRows.length;
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

      // 收集所有子节点
      const allRows: any[] = [];
      const collectRows = (list: any[]) => {
        list.forEach((row, index) => {
          // 只有可以被选中的才会添加起来
          if (!selectableFn || selectableFn(row, index)) {
            allRows.push(row);
          }

          if (!checkStrictly) {
            const children = row[childrenKey];
            if (Array.isArray(children)) {
              collectRows(children);
            }
          }
        });
      };

      collectRows(rows);
      selection.value = [...allRows];
    }

    emit("select-all", [...selection.value]);
    emit("selection-change", [...selection.value]);
  };

  const clearSelection = () => {
    selection.value = [];
    emit("selection-change", []);
  };

  /**
   * 获取所有后代节点
   */
  const getAllDescendantsInternal = (row: any, childrenKey: string): any[] => {
    const result: any[] = [];
    const children = row[childrenKey];

    if (Array.isArray(children)) {
      children.forEach((child) => {
        result.push(child);
        result.push(...getAllDescendantsInternal(child, childrenKey));
      });
    }

    return result;
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
