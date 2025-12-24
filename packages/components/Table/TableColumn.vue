<script setup lang="ts">
import { inject, onMounted, getCurrentInstance } from "vue";
import { tableColumnProps } from "./types";

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

onMounted(() => {
  console.log("ErTable", table);
  if (table && table.registerColumn) {
    table.registerColumn({
      id: instance?.uid.toString() || Math.random().toString(),
      prop: props.prop,
      label: props.label,
      width: props.width,
      minWidth: props.minWidth,
      align: props.align,
    });
  }
});
</script>
