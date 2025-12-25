<script setup lang="ts">
import { ref, provide, computed } from "vue";
import { tableProps, tableEmits, type TableColumn } from "./types";

defineOptions({
  name: "ErTable",
});

const props = defineProps(tableProps);

const emits = defineEmits(tableEmits);

// 存储列配置
const columns = ref<TableColumn[]>([]);

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
  return {};
});

// 获取单元格对齐样式
const getCellAlign = (align?: string) => {
  return align ? { textAlign: align as "left" | "center" | "right" } : {};
};

/**
 * 获取行的 class 名称
 * @param row - 行数据
 * @param rowIndex - 行索引
 * @returns class 名称或对象
 */
const getRowClass = (row: any, rowIndex: number) => {
  const classes: any[] = [];

  if (props.rowClassName) {
    if (typeof props.rowClassName === "function") {
      const customClass = props.rowClassName({ row, rowIndex });
      if (customClass) classes.push(customClass);
    } else {
      classes.push(props.rowClassName);
    }
  }

  return classes;
};
</script>

<template>
  <div :class="tableClass" :style="tableStyle">
    <table class="er-table__inner">
      <!-- 表头 -->
      <div class="er-table__header-wrapper">
        <table class="er-table__inner">
          <thead class="er-table__header">
            <tr>
              <th v-for="column in columns" :key="column.id">
                {{ column.label }}
              </th>
            </tr>
          </thead>
        </table>
      </div>

      <!-- 表体 -->
      <tbody class="er-table__body">
        <tr
          v-for="(row, rowIndex) in props.data"
          :key="rowIndex"
          :class="getRowClass(row, rowIndex)"
        >
          <td
            v-for="column in columns"
            :key="column.id"
            :style="{
              width: column.width,
              minWidth: column.minWidth,
              ...getCellAlign(column.align),
            }"
          >
            {{ row[column.prop || ""] }}
          </td>
        </tr>

        <tr
          v-if="!props.data || props.data.length === 0"
          class="er-table__empty-row"
        >
          <td :colspan="columns.length" class="er-table__empty-cell">
            暂无数据
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <slot style="display: none" data-table-columns></slot>
  </div>
</template>

<style scoped>
@import "./style.scss";
</style>
