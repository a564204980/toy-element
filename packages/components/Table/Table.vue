<script setup lang="ts">
import { ref, provide, computed, onMounted } from "vue";
import { tableProps, type TableColumn } from "./types";
import { getScrollBarWidth } from "@toy-element/utils"

defineOptions({
  name: "ErTable",
});

const props = defineProps(tableProps);

// const emits = defineEmits(tableEmits);

// 存储列配置
const columns = ref<TableColumn[]>([]);

// 滚动条宽度
const scrollbarWidth = ref(0);

/**
 * 注册列的方法
 * @param column - 列配置
 * @param index - 可选，插入位置
 * @returns 返回列在数组中的索引
 */
const registerColumn = (column: TableColumn, index?: number) => {
  if (index !== undefined) {
    columns.value.splice(index, 0, column);
    console.log("进的时这里吧1", columns.value)
    return index;
  } else {
    columns.value.push(column);
    console.log("进的时这里吧2", columns.value)
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

// 检测 body 是否有滚动条
const hasScrollbar = computed(() => {
  // 需要在 DOM 更新后检测
  return props.data && props.data.length > 0;
});


onMounted(() => {
  scrollbarWidth.value = getScrollBarWidth();
});

</script>

<template>
  <div :class="tableClass" :style="tableStyle">
    <div class="er-table__inner-wrapper">
      <!-- 表头 -->
      <div class="er-table__header-wrapper">
        <table class="er-table__header">
          <colgroup>
            <col v-for="column in columns" :key="column.id" :width="column.width">
            </col>
          </colgroup>
          <thead>
            <tr>
              <th v-for="column in columns" :key="column.id">{{ column.label }}</th>
              <th v-if="hasScrollbar" class="gutter" :style="{ width: scrollbarWidth + 'px' }"></th>
            </tr>
          </thead>
        </table>
      </div>

      <!-- 表体 -->
      <div class="er-table__body-wrapper">
        <div class="er-table__body-scrollbar">
          <table class="er-table__body">
            <colgroup>
              <col v-for="column in columns" :key="column.id" :width="column.width">
              </col>
            </colgroup>
            <tbody>
              <tr v-for="(row, index) in props.data" :key="index">
                <td v-for="column in columns" :key="column.id" :style="getCellAlign(column.align)">
                  {{ row[column.prop || ''] }}
                </td>
              </tr>

              <!-- 空状态 -->
              <tr v-if="props.data.length === 0">
                <td :colspan="columns.length">暂无数据</td>
              </tr>
            </tbody>
          </table>
        </div>
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
