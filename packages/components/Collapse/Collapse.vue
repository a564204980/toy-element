<script setup lang="ts">
import { debugWarn } from "@toy-element/utils";
import { COLLAPSE_CTX_KEY } from "./constants";
import { provide, ref, watch, watchEffect } from "vue";
import type { CollapseEmits, CollapseProps, CollapseItemName } from "./types";

const COMP_NAME = "ErCollapse";

defineOptions({
  name: "ErCollapse",
});

const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();

const activeNames = ref(props.modelValue);

if (props.accordion && props.modelValue.length > 1) {
  console.warn("手风琴模式下，modelValue最多只能有一个值");
}

const handleItemClick = (item: CollapseItemName) => {
  let _activeNames = [...activeNames.value];

  if (props.accordion) {
    // 判断当前点击的项是否已经处于展开状态
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

const updateActiveNames = (newNames: CollapseItemName[]) => {
  activeNames.value = newNames;
  emits("update:modelValue", newNames);
  emits("change", newNames);
};

watchEffect(() => {
  if (props.accordion && activeNames.value.length > 1) {
    debugWarn(COMP_NAME, "手风琴模式下，modelValue最多只能有一个值");
  }
});

watch(
  () => props.modelValue,
  (newNames) => {
    updateActiveNames(newNames);
  }
);

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick,
});
</script>

<template>
  <div class="er-collapse">
    <slot></slot>
  </div>
</template>

<style scoped>
@import "./style.scss";
</style>
