<template>
  <div class="er-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide } from "vue";
import { COLLAPSE_CTX_KEY } from "./contants.ts";
import type {
  CollapseProps,
  CollapseEmits,
  CollapseItemName,
} from "./types.ts";

defineOptions({
  name: "ErCollapse",
});

const emits = defineEmits<CollapseEmits>();
const props = defineProps<CollapseProps>();

const activeNames = ref(props.modelValue);

if (props.accordion && activeNames.value.length > 1) {
  console.warn("手风琴模式下只能有一个展开 - 热重载测试");
}

const updateActiveNames = (newNames: CollapseItemName[]) => {
  activeNames.value = newNames;
  emits("update:modelValue", newNames);
  emits("change", newNames);
};

watch(
  () => props.modelValue,
  (newVal) => {
    updateActiveNames(newVal);
  }
);

const handleItemClick = (item: CollapseItemName) => {
  let _activeNames = [...activeNames.value];

  if (props.accordion) {
    _activeNames = [_activeNames[0] === item ? "" : item];
    updateActiveNames(_activeNames);
    return;
  }

  const index = _activeNames.indexOf(item);
  if (index > -1) {
    _activeNames.splice(index, 1);
  } else {
    _activeNames.push(item);
  }
  updateActiveNames(_activeNames);
};

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick,
});
</script>

<style>
@import "./style.css";
</style>
