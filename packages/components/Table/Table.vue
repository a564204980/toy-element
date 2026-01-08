<script setup lang="ts">
import { ref, watch, useId, provide, nextTick, computed, onMounted, onBeforeUnmount } from "vue";
import { tableProps, tableEmits } from "./types";
import { getScrollBarWidth } from "@toy-element/utils"

import { ErScrollbar } from "../Scrollbar";
import {
  useColumns,
  useScrollbar,
  useFixed,
  useCurrentRow,
  useSelection
} from "./composables"

defineOptions({
  name: "ErTable",
});

const props = defineProps(tableProps);

const emits = defineEmits(tableEmits);

const checkboxId = useId()

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
  onColumnWidthsCalculated: () => {
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

const { isSelected, toggleRowSelection, isAllSelected, isIndeterminate, toggleAllSelection } = useSelection({
  data: () => props.data,
  emit: emits,
  // 因为calculatedColumns是延迟执行的，所以这里要用箭头函数包装一下延迟返回
  selectable: () => calculatedColumns.value.find(col => col.type === 'selection')?.selectable,
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
                  <template v-if="column.type === 'selection'">
                    <!-- <input type="checkbox" class="er-table__checkbox" :indeterminate="isIndeterminate"
                      :checked="isAllSelected" @change="toggleAllSelection" /> -->
                    <label class="er-checkbox">
                      <span class="er-checkbox__input" :class="{
                        'is-checked': isAllSelected,
                        'is-indeterminate': isIndeterminate,
                        'is-disabled': false
                      }">
                        <input :id="checkboxId" name="table-select-all" type="checkbox" class="er-checkbox__original"
                          :checked="isAllSelected" @change="toggleAllSelection" />
                        <span class="er-checkbox__inner"></span>
                      </span>

                    </label>
                  </template>
                  <template v-else>
                    <div class="er-table__header-label">
                      {{ column.label || (column.type === "index" ? "序号" : "") }}
                    </div>
                  </template>
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
                      <template v-if="column.type === 'selection'">
                        <!-- <input type="checkbox" class="er-table__row-checkbox"
                          :disabled="column.selectable ? !column.selectable(row, index) : false"
                          :checked="isSelected(row)" @change="toggleRowSelection(row)" /> -->
                        <label class="er-checkbox">
                          <span class="er-checkbox__input" :class="{
                            'is-checked': isSelected(row),
                            'is-disabled': column.selectable && !column.selectable(row, index)
                          }">
                            <input type="checkbox" class="er-checkbox__original"
                              :disabled="column.selectable && !column.selectable(row, index)" :checked="isSelected(row)"
                              @change="toggleRowSelection(row)" />
                            <span class="er-checkbox__inner"></span>
                          </span>
                        </label>
                      </template>
                      <template v-else-if="column.type === 'index'">
                        {{ typeof column.index === "function" ? column.index(index) : (column.index ? column.index +
                          index : index + 1) }}
                      </template>
                      <template v-else>
                        {{ row[column.prop || ''] }}
                      </template>
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
@import "./scss/style.scss";
@import "./scss/checkbox.scss"
</style>
