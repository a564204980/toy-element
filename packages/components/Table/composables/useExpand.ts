import { ref } from "vue";

interface UseExpandOptions {
  emit: (event: "expand-change", ...args: any[]) => void;
  rowKey?: string; // 行Key
}

export const useExpand = (options: UseExpandOptions) => {
  const { emit, rowKey = "id" } = options;

  // 存储展开的行
  const expandedRows = ref<Set<string | number>>(new Set());

  // 检查某一行是否展开
  const isRowExpanded = (row: any) => {
    const key = row[rowKey];
    return expandedRows.value.has(key);
  };

  // 切换
  const toggleRowExpansion = (row: any) => {
    const key = row[rowKey];

    // 收起
    if (expandedRows.value.has(key)) {
      expandedRows.value.delete(key);
      emit("expand-change", row, false);
    } else {
      // 展开
      expandedRows.value.add(key);
      emit("expand-change", row, true);
    }
  };

  return {
    expandedRows,
    isRowExpanded,
    toggleRowExpansion,
  };
};
