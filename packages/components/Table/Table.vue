<script setup lang="ts">
import { ref, watch, useId, provide, nextTick, computed, onMounted, onBeforeUnmount } from "vue";
import { tableProps, tableEmits, type TableColumn } from "./types";
import { getScrollBarWidth } from "@toy-element/utils"
import { useExpand } from "./composables/useExpand"
import { ErScrollbar } from "../Scrollbar";
import {
  useColumns,
  useScrollbar,
  useFixed,
  useCurrentRow,
  useSelection
} from "./composables"
import { useSort } from "./composables/useSort";
import { useTree } from "./composables/useTree";

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


const { sortedData, handleSort, sortProp, sortOrder } = useSort({
  data: () => props.data,
  columns: () => calculatedColumns.value,
  defaultSort: computed(() => props.defaultSort),
  emit: emits
})

const { expandedRows,
  isRowExpanded,
  toggleRowExpansion, } = useExpand({ emit: emits, rowKey: 'id' })

const { flattenedData,
  getRowKey: getTreeRowKey, toggleRowExpansion: toggleTreeExpansion, hasChildren, getTreeNode } = useTree({
    data: () => props.data,
    rowKey: () => props.rowKey,
    treeProps: () => props.treeProps,
    lazy: () => props.lazy,
    load: props.load,
    indent: () => props.indent,
    defaultExpandAll: () => props.defaultExpandAll,
    expandRowKeys: () => props.expandRowKeys,
    emit: emits
  })

// 最终渲染的数据
const displayData = computed(() => {
  if (props.rowKey) {
    console.log("树形数据", flattenedData.value)
    return flattenedData.value
  }

  return sortedData.value
})

// 提供给子组件使用
provide("ErTable", {
  registerColumn,
  unregisterColumn,
})


// 给slot插槽使用
const store = computed(() => ({
  states: {
    currentRow: currentRow.value,
    selection: [],
    sortProp: sortProp.value,
    sortOrder: sortOrder.value,
  }
}))

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

// 判断是否是第一个数据列，用于显示树形图标
const isFirstColumn = (column: TableColumn) => {
  const firstDataColumn = calculatedColumns.value.find(col => !["selection", "index", "expand"].includes(col.type || ""))
  return column.id === firstDataColumn?.id
}

// 获取缩进大小
const getIndentSize = (row: any) => {
  const treeNode = getTreeNode(row)
  return treeNode ? treeNode.level * props.indent : 0
}



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

// 计算合计行数据
const summaryData = computed(() => {
  if (!props.showSummary) return []

  if (props.summaryMethod) {
    return props.summaryMethod({
      columns: calculatedColumns.value,
      data: props.data
    })
  }

  const sums: (string | number)[] = []

  calculatedColumns.value.forEach((column, columnIndex) => {
    if (columnIndex === 0) {
      sums[columnIndex] = props.sumText || ""
      return
    }


    if (!column.prop) {
      sums[columnIndex] = ""
      return
    }

    const values = props.data.map(item => Number(item[column.prop!]))
    const sum = values.reduce((preve, curr) => {
      const value = Number(curr)
      return isNaN(value) ? preve : preve + value
    }, 0)

    sums[columnIndex] = isNaN(sum) ? "" : sum
  })

  return sums
})







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
  currentRow,
  isRowExpanded,
  toggleRowExpansion
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
                <div class="er-table__cell" @click="column.sortable && handleSort(column)">
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
                    <template v-if="column.renderHeader">
                      <component :is="{
                        render: () => column.renderHeader!({ row, column, $index: columnIndex })
                      }" />
                    </template>
                    <template v-else>
                      <span class="er-table__header-label">
                        {{ column.label || (column.type === "index" ? "序号" : "") }}
                      </span>
                    </template>

                    <!-- 排序图标 -->
                    <span v-if="column.sortable" class="caret-wrapper">

                      <i class="sort-caret ascending" :class="{
                        'is-active': sortProp === column.prop && sortOrder === 'ascending'
                      }"></i>
                      <i class="sort-caret descending" :class="{
                        'is-active': sortProp === column.prop && sortOrder === 'descending'
                      }"></i>

                    </span>
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
              <template v-for="(row, index) in displayData" :key="index">
                <!-- 数据行 -->
                <tr :class="getRowClass(row)" @click="handleRowClick(row)">
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
                                :disabled="column.selectable && !column.selectable(row, index)"
                                :checked="isSelected(row)" @change="toggleRowSelection(row)" />
                              <span class="er-checkbox__inner"></span>
                            </span>
                          </label>
                        </template>
                        <template v-else-if="column.type === 'index'">
                          {{ typeof column.index === "function" ? column.index(index) : (column.index ? column.index +
                            index : index + 1) }}
                        </template>
                        <template v-else-if="column.type === 'expand'">
                          <!-- 展开按钮 -->
                          <button class="er-table__expand-icon" @click.stop="toggleRowExpansion(row)">
                            <i :class="isRowExpanded(row) ? 'arrow-down' : 'arrow-right'"></i>
                          </button>
                        </template>
                        <template v-else>
                          <!-- 树形展开图标 -->
                          <span v-if="props.rowKey && isFirstColumn(column)" class="er-table__indent"
                            :style="{ paddingLeft: getIndentSize(row) + 'px' }">
                            <span v-if="hasChildren(row)" class="er-table__tree-expand-icon"
                              @click.stop="toggleTreeExpansion(row)">
                              <template v-if="getTreeNode(row)?.loading">
                                <i class="er-table__icon-loading"></i>
                              </template>
                              <template v-else>
                                <i :class="getTreeNode(row)?.expanded ? 'arrow-down' : 'arrow-right'"></i>
                              </template>
                            </span>
                            <span v-else class="er-table__placeholder"></span>
                          </span>
                          <!-- 自定义插槽内容 -->
                          <template v-if="column.renderCell">
                            <component :is="{
                              render: () => column.renderCell!({ row, column, $index: index, store })
                            }" />
                          </template>
                          <!-- 默认显示 -->
                          <template v-else>
                            {{ row[column.prop || ""] }}
                          </template>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>

                <!-- 展开行内容 -->
                <tr v-if="isRowExpanded(row)" class="er-table__expand-row">
                  <!-- 需要合并整行 -->
                  <td :colspan="calculatedColumns.length" class="er-table__expand-cell">
                    <div class="er-table__expand-content">
                      <template v-for="column in calculatedColumns" :key="column.id">
                        <template v-if="column.type === 'expand'">
                          <component :is="{
                            render: () => column.renderCell!({ row, column, $index: index, store })
                          }" />
                        </template>
                      </template>
                    </div>
                  </td>
                </tr>
              </template>

              <!-- 空状态 -->
              <tr v-if="props.data.length === 0">
                <td :colspan="calculatedColumns.length">
                  <div class="er-table__cell">
                    <div class="er-table__cell-content">暂无数据</div>
                  </div>
                </td>
              </tr>
            </tbody>
            <!-- 合计行 -->
            <tfoot v-if="showSummary">
              <tr>
                <td v-for="(column, colIndex) in calculatedColumns" :key="column.id"
                  :class="getCellClass(colIndex, column, calculatedColumns)" :style="{
                    ...getCellAlign(column.align),
                    ...getCellFixedStyle(column, colIndex, calculatedColumns)

                  }">
                  <div class="er-table__cell">
                    <div class="er-table__cell-content">
                      {{ summaryData[colIndex] }}
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
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
@import "./scss/checkbox.scss";
@import "./scss/sort.scss"
</style>
