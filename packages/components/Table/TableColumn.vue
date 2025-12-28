<script setup lang="ts">
import { tableColumnProps } from "./types";
import { inject, onMounted, getCurrentInstance, onBeforeUnmount } from "vue";

defineOptions({
  name: "ErTableColumn",
  render() {
    return null;
  },
});

const props = defineProps(tableColumnProps);

// 注入父组件提供的注册方法
const table = inject<any>("ErTable");

// 获取组件实例ID
const instance = getCurrentInstance();
let columnIndex: number | null = null;

onMounted(() => {
  if (table && table.registerColumn) {
    columnIndex = table.registerColumn({
      id: instance?.uid.toString() || Math.random().toString(),
      prop: props.prop,
      label: props.label,
      width: props.width,
      minWidth: props.minWidth,
      align: props.align,
      fixed: props.fixed,
    });
  }
});

// 组件卸载时注销列
onBeforeUnmount(() => {
  if (table && table.unregisterColumn && columnIndex !== null) {
    table.unregisterColumn(columnIndex);
  }
});
</script>
