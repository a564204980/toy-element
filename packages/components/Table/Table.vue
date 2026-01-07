<script setup lang="ts">
import { ref, watch, provide, nextTick, computed, onMounted, onBeforeUnmount } from "vue";
import { tableProps, tableEmits } from "./types";
import { getScrollBarWidth } from "@toy-element/utils"

import { ErScrollbar } from "../Scrollbar";
import {
  useColumns,
  useScrollbar,
  useFixed,
  useCurrentRow
} from "./composables"

defineOptions({
  name: "ErTable",
});

const props = defineProps(tableProps);

const emits = defineEmits(tableEmits);



const tableRef = ref<HTMLElement>()

const bodyWrapperRef = ref<HTMLElement>()
const headerWrapperRef = ref<HTMLElement>()
const scrollbarRef = ref<InstanceType<typeof ErScrollbar>>()

const {
  hasScrollbar,
  scrollbarWidth,
  checkScrollbar,
  handleScroll,
} = useScrollbar({ bodyWrapperRef, headerWrapperRef, scrollbarRef })

const {
  columns,
  calculatedColumns,
  flattenLeafColumns,
  headerRows,
  fixedLeftColumnsLength,
  fixedRightColumnsLength,
  registerColumn,
  unregisterColumn,
  calculateColumnWidths,
} = useColumns({
  tableRef,
  onColumnWidthsCalculated: () => {  // ✅ 传入回调
    checkScrollbar();
    scrollbarRef.value?.update();
  }
})

const {
  getCellClass,
  getCellFixedStyle,
} = useFixed({
  columns,
  flattenLeafColumns,
  fixedLeftColumnsLength,
  fixedRightColumnsLength,
  hasScrollbar,
  scrollbarWidth,
})

const {
  currentRow,
  getRowClass,
  handleRowClick,
  setCurrentRow,
} = useCurrentRow({
  highlightCurrentRow: props.highlightCurrentRow,
  emit: emits,
})




// 提供给子组件使用
provide("ErTable", {
  registerColumn,
  unregisterColumn,
})

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

// 获取单元格对齐样式
const getCellAlign = (align?: string) => {
  return align ? { textAlign: align as "left" | "center" | "right" } : {};
};





watch(() => props.data, async () => {
  await nextTick();
  checkScrollbar()
  scrollbarRef.value?.update()
}, { deep: true })

onMounted(async () => {
  scrollbarWidth.value = getScrollBarWidth();  // 获取浏览器滚动条宽度

  nextTick(() => {
    calculateColumnWidths();
    checkScrollbar();
    scrollbarRef.value?.update()
  })

  if (tableRef.value) {
    const resizeObserver = new ResizeObserver(() => {
      calculateColumnWidths()
      checkScrollbar()
      scrollbarRef.value?.update()
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
})

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
                    {{ column.label || (column.type === "index" ? "序号" : "") }}
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
                  :class="getCellClass(colIndex, column, calculatedColumns)" :style="{
                    ...getCellAlign(column.align),
                    ...getCellFixedStyle(column, colIndex, calculatedColumns)

                  }">
                  <div class="er-table__cell">
                    <div class="er-table__cell-content">
                      {{
                        column.type === "index"
                          ? (typeof column.index === 'function'
                            ? column.index(index)
                            : typeof column.index === 'number'
                              ? column.index + index
                              : index + 1)
                          : row[column.prop || '']
                      }}
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
