<script setup lang="ts">
import { ref, provide, computed } from "vue";
import { tableProps, type TableColumn } from "./types";

defineOptions({
  name: "ErTable",
});

const props = defineProps(tableProps);

// 存储列配置
const columns = ref<TableColumn[]>([]);

// 注册列的方法
const registerColumn = (column: TableColumn) => {
  columns.value.push(column);
};

// 提供给子组件使用
provide("ErTable", {
  registerColumn,
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
</script>

<template>
  <div :class="tableClass" :style="tableStyle">
    <table class="er-table__inner">
      <!-- 表头 -->
      <thead class="er-table__header">
        <tr>
          <th
            v-for="column in columns"
            :key="column.id"
            :style="{
              width: column.width,
              minWidth: column.minWidth,
              ...getCellAlign(column.align),
            }"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <!-- 表体 -->
      <tbody class="er-table__body">
        <tr v-for="(row, rowIndex) in props.data" :key="rowIndex">
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
