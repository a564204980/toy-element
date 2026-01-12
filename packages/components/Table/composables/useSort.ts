import { computed, ref, watch, type Ref } from "vue";
import type { TableColumn, TableProps } from "../types";
import { orderBy } from "../utils";

interface UseSortOptions {
  data: () => Record<string, any>[];
  columns: () => TableColumn[];
  defaultSort: Ref<TableProps["defaultSort"]>;
  emit: (
    event: "sort-change",
    payload: {
      column: TableColumn | null;
      prop: string;
      order: "ascending" | "descending" | null;
    }
  ) => void;
}

export const useSort = (options: UseSortOptions) => {
  const { data, columns, defaultSort, emit } = options;

  const sortingColumn = ref<TableColumn | null>(null); // 当前排序的列
  const sortProp = ref<string>(""); // 当前排序的属性
  const sortOrder = ref<"ascending" | "descending" | null>(null); // 当前排序的顺序

  const sortedData = computed(() => {
    if (!sortProp.value || !sortOrder.value) {
      return data();
    }

    const column = sortingColumn.value;
    // 远程排序
    if (column?.sortable === "custom") {
      return data();
    }

    return orderBy(
      [...data()],
      sortProp.value,
      sortOrder.value,
      column?.sortMethod,
      column?.sortBy
    );
  });

  /**
   * 切换排序
   * @param column 列
   */
  const handleSort = (column: TableColumn) => {
    if (!column.sortable) return;

    // 计算下一个排序状态
    const orders = column.sortOrders || ["ascending", "descending", null];
    const currentIndex = orders.indexOf(sortOrder.value);
    const nextIndex = (currentIndex + 1) % orders.length;
    const nextOrder = orders[nextIndex];

    sortingColumn.value = column;
    sortProp.value = column.prop || "";
    sortOrder.value = nextOrder;

    emit("sort-change", {
      column,
      prop: sortProp.value,
      order: sortOrder.value,
    });
  };

  watch(
    () => columns(),
    (newColumns) => {
      if (newColumns.length > 0 && defaultSort?.value && !sortProp.value) {
        const { prop, order } = defaultSort.value;
        const column = newColumns.find((col) => col.prop === prop);

        if (column) {
          sortingColumn.value = column;
          sortProp.value = prop;
          sortOrder.value = order;
        }
      }
    },
    { immediate: true }
  );

  return {
    sortingColumn,
    sortProp,
    sortOrder,
    handleSort,
    sortedData,
  };
};
