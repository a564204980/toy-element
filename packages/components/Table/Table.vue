<script setup lang="ts">
import { ref, watch, provide, nextTick, computed, onMounted, onBeforeUnmount } from "vue";
import { tableProps, type TableColumn, tableEmits } from "./types";
import { getScrollBarWidth, throttle } from "@toy-element/utils"
import { parseWidth, getFixedColumnsClass, convertToRows, getRealColumnPosition, getCurrentColumns } from "./utils"
import { debounce } from "lodash-es"
import { ErScrollbar } from "../Scrollbar";
import type { ScrollEventData } from "../Scrollbar/types"

defineOptions({
  name: "ErTable",
});

const props = defineProps(tableProps);

const emits = defineEmits(tableEmits);

// 存储列配置
const columns = ref<TableColumn[]>([]);

const hasScrollbar = ref(false);
const scrollbarWidth = ref(0);

const tableRef = ref<HTMLElement>()
const tableWidth = ref(0)
const calculatedColumns = ref<TableColumn[]>([]) // 计算后的列配置

const bodyWrapperRef = ref<HTMLElement>()
const headerWrapperRef = ref<HTMLElement>()
const scrollbarRef = ref<InstanceType<typeof ErScrollbar>>()

const currentRow = ref<any>(null) // 当前选中的行

/**
 * 注册列的方法
 * @param column - 列配置
 * @param index - 可选，插入位置
 * @returns 返回列在数组中的索引
 */
const registerColumn = (column: TableColumn, index?: number) => {
  if (index !== undefined) {
    columns.value.splice(index, 0, column);
    return index;
  } else {
    columns.value.push(column);
    return columns.value.length - 1;
  }
};

const unregisterColumn = (index: number) => {
  if (index >= 0 && index < columns.value.length) {
    columns.value.splice(index, 1);
  }
};

// 提供给子组件使用
provide("ErTable", {
  registerColumn,
  unregisterColumn,
});

// 计算表格类名
const tableClass = computed(() => {
  return [
    "er-table",
    {
      "er-table--stripe": props.stripe,
      "er-table--border": props.border,
    },
  ];
});

// 计算表格样式
const tableStyle = computed(() => {
  if (props.height) {
    return {
      height:
        typeof props.height === "number" ? `${props.height}px` : props.height,
    };
  }

  if (props.maxHeight) {
    const heightValue = typeof props.maxHeight === "number" ? `${props.maxHeight}px` : props.maxHeight
    return {
      maxHeight: heightValue,
      height: heightValue
    }
  }
  return {};
});

// 展平后的叶子节点
const flattenLeafColumns = computed(() => {
  let result: TableColumn[] = []

  const flatten = (cols: TableColumn[]) => {
    cols.forEach(col => {
      if (col.children && col.children.length > 0) {
        flatten(col.children)
      } else {
        col.isLeaf = true
        result.push(col)
      }
    })
  }

  flatten(columns.value)

  return result
})

// 表头行数据（多级表头）
const headerRows = computed(() => {
  return convertToRows(columns.value)
})


// 左固定列列数
const fixedLeftColumnsLength = computed(() => {
  return columns.value.filter(col => col.fixed === true || col.fixed === "left").length
})

// 右固定列列数
const fixedRightColumnsLength = computed(() => {
  return columns.value.filter(col => col.fixed === "right").length
})



// 获取单元格对齐样式
const getCellAlign = (align?: string) => {
  return align ? { textAlign: align as "left" | "center" | "right" } : {};
};

// 检查是否有纵向滚动条
const checkScrollbar = () => {
  if (!bodyWrapperRef.value) {
    hasScrollbar.value = false;
    return;
  }

  hasScrollbar.value = bodyWrapperRef.value.scrollHeight > bodyWrapperRef.value.clientHeight;
};


/**
 * 获取单元格的 class 名称
 * @param columnIndex - 列索引
 * @param column - 列配置
 * @param headerRows - 表头行数据
 * @returns class 名称
*/
const getCellClass = (columnIndex: number, column: TableColumn, headerRows: TableColumn[]) => {

  const { start } = getRealColumnPosition(columnIndex, headerRows, flattenLeafColumns.value)


  const classes = getFixedColumnsClass(
    start,
    column,
    flattenLeafColumns.value.length,
    fixedLeftColumnsLength.value,
    fixedRightColumnsLength.value
  );

  if (column.isLeaf) {
    classes.push("is-leaf")
  }

  return classes.join(" ")
}

/**
 * 固定列样式计算，距离左边或右边的距离
 * @param column - 列配置
 * @param columnIndex - 列索引
 * @param headerRow - 表头行数据
 * @param isHeader - 是否是表头
 * @returns 样式对象
*/
const getCellFixedStyle = (column: TableColumn, columnIndex: number, headerRow: TableColumn[], isHeader: boolean = false) => {
  if (!column.fixed) return {}

  if (column.fixed === true || column.fixed === "left") {
    let left = 0
    // 遍历当前行中，当前列之前的所有列，并计算它们实际占用的宽度
    for (let i = 0; i < columnIndex; i++) {
      const col = headerRow[i]
      if (col.fixed === true || col.fixed === "left") {
        // 获取这一列对应的所有叶子列
        const leafColumns = getCurrentColumns(col)
        // 累加所有叶子列的宽度
        leafColumns.forEach(leaf => {
          left += parseWidth(leaf.width)
        })
      }
    }
    return { left: `${left}px` }
  }

  if (column.fixed === "right") {
    let right = 0

    for (let i = columnIndex + 1; i < columns.value.length; i++) {
      const col = columns.value[i]
      if (col.fixed === "right") {
        right += parseWidth(col.width)
      }
    }

    if (hasScrollbar.value && isHeader) {
      right += scrollbarWidth.value
    }

    return { right: `${right}px` };
  }

  return {};
}

/**
 * 获取行的 class
 * @param row - 行数据
 */
const getRowClass = (row: any) => {
  const classes: string[] = []

  if (props.highlightCurrentRow && currentRow.value === row) {
    classes.push("current-row")
  }

  return classes.join(" ")
}

/**
 * 处理行点击事件
 * @param row - 被点击的行数据
*/
const handleRowClick = (row: any) => {
  if (!props.highlightCurrentRow) return

  const oldRow = currentRow.value
  currentRow.value = row

  emits("current-change", row, oldRow)
}

/**
 * 设置当前选中的行
 * @param row - 要选中的行数据，如果为 undefined 则清除选择
 */
const setCurrentRow = (row?: any) => {
  const oldRow = currentRow.value
  currentRow.value = row || null

  if (props.highlightCurrentRow) {
    emits("current-change", currentRow.value, oldRow)
  }
}



// 监听表体滚动事件
const handleScroll = throttle((scrollData: ScrollEventData) => {
  if (!scrollbarRef.value || !headerWrapperRef.value) return

  // 同步表头滚动
  headerWrapperRef.value.scrollLeft = scrollData.scrollLeft
}, 16)


/**
 * 计算列宽
 */
const calculateColumnWidths = debounce(() => {
  if (!tableRef.value) return

  const containerWidth = tableRef.value.offsetWidth
  tableWidth.value = containerWidth

  // 统计有固定宽度的列和无宽度的列
  let fixedWidth = 0 // 固定宽度总和
  let flexCount = 0 // 无宽度列的数量
  const minFlexWidth = 80;

  flattenLeafColumns.value.forEach(col => {
    if (col.width) {
      fixedWidth += parseWidth(col.width)
    } else {
      flexCount++
    }
  })

  // 计算剩余空间
  const remainingWidth = containerWidth - fixedWidth

  // 计算每个弹性列的宽度
  const flexWidth = flexCount > 0 ? Math.max(Math.floor(remainingWidth / flexCount), minFlexWidth) : 0

  // 分配最终宽度
  calculatedColumns.value = flattenLeafColumns.value.map(col => {
    if (col.width) {
      // 保持原有宽度
      return { ...col };
    } else {
      // 分配计算后的宽度
      return { ...col, width: `${flexWidth}px` };
    }
  });


  nextTick(() => {
    checkScrollbar();
    scrollbarRef.value?.update() // 强制更新一次
  })
}, 100)

watch(() => props.data, async () => {
  await nextTick();
  checkScrollbar()
  scrollbarRef.value?.update()
}, { deep: true })

watch(columns, async () => {
  await nextTick();
  calculateColumnWidths();
}, { deep: true })

onMounted(async () => {
  scrollbarWidth.value = getScrollBarWidth();  // 获取浏览器滚动条宽度

  nextTick(() => {
    calculateColumnWidths();
    checkScrollbar();
  })

  if (tableRef.value) {
    const resizeObserver = new ResizeObserver(() => {
      calculateColumnWidths()
      checkScrollbar()
    })

    resizeObserver.observe(tableRef.value)

    onBeforeUnmount(() => {
      resizeObserver.disconnect();
    });
  }
});

defineExpose({
  columns,
  calculatedColumns,
  flattenLeafColumns,
  fixedLeftColumnsLength,
  fixedRightColumnsLength,
  getCellFixedStyle,
  getCellClass,
  headerRows,
  setCurrentRow,
  currentRow
});


</script>

<template>
  <div ref="tableRef" :class="tableClass" :style="tableStyle">
    <div class="er-table__inner-wrapper">
      <!-- 表头 -->
      <div class="er-table__header-wrapper" ref="headerWrapperRef">
        <table class="er-table__header">
          <colgroup>
            <col v-for="column in calculatedColumns" :key="column.id"
              v-bind="column.width ? { width: column.width } : {}">
            </col>
            <col v-if="hasScrollbar" :style="{ width: scrollbarWidth + 'px' }">
            </col>
          </colgroup>
          <thead>
            <tr v-for="(row, rowIndex) in headerRows" :key="rowIndex">
              <th v-for="(column, columnIndex) in row" :key="column.id" :rowspan="column.rowSpan"
                :colspan="column.colSpan" :class="getCellClass(columnIndex, column, row)"
                :style="getCellFixedStyle(column, columnIndex, row, true)">
                <div class="er-table__cell">
                  <div class="er-table__header-label">
                    {{ column.label }}
                  </div>
                </div>
              </th>
              <th v-if="hasScrollbar" class="gutter" :style="{ width: scrollbarWidth + 'px' }"></th>
            </tr>
          </thead>
        </table>
      </div>

      <!-- 表体 -->
      <div class="er-table__body-wrapper" ref="bodyWrapperRef">
        <er-scrollbar ref="scrollbarRef" @scroll="handleScroll">
          <table class="er-table__body">
            <colgroup>
              <col v-for="column in calculatedColumns" :key="column.id"
                v-bind="column.width ? { width: column.width } : {}">
              </col>
            </colgroup>
            <tbody>
              <tr v-for="(row, index) in props.data" :key="index" :class="getRowClass(row)"
                @click="handleRowClick(row)">
                <td v-for="(column, colIndex) in calculatedColumns" :key="column.id"
                  :class="getCellClass(index, column, calculatedColumns)" :style="{
                    ...getCellAlign(column.align),
                    ...getCellFixedStyle(column, colIndex, calculatedColumns)
                  }">
                  <div class="er-table__cell">
                    <div class="er-table__cell-content">
                      {{ row[column.prop || ''] }}
                    </div>
                  </div>
                </td>
              </tr>

              <!-- 空状态 -->
              <tr v-if="props.data.length === 0">
                <td :colspan="calculatedColumns.length">
                  <div class="er-table__cell">
                    <div class="er-table__cell-content">暂无数据</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </er-scrollbar>
      </div>
    </div>
    <div style="display: none;">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@import "./style.scss";
</style>
