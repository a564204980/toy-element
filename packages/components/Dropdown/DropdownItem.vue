<template>
  <li v-if="divided" role="separator" class="divide-placeholder"></li>
  <li
    :id="`dropdown-item-${command ?? useId().value}`"
    :class="{
      'er-dropdown__item': true,
      ['er-dropdown__item--' + size]: size,
      'is-disabled': disabled,
      'is-divided': divided,
    }"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </li>
</template>

<script lang="ts" setup>
import { inject, computed } from "vue";
import { DROPDOWN_CTX_KEY } from "./constants";
import { useId } from "@toy-element-clone/hooks";
import type { DropdownItemProps } from "./types";

defineOptions({
  name: "ErDropdownItem",
});

const props = withDefaults(defineProps<DropdownItemProps>(), {
  disabled: false,
  divided: false,
  command: useId().value,
});

const ctx = inject(DROPDOWN_CTX_KEY);
const size = computed(() => ctx?.size.value);

const handleClick = () => {
  if (props.disabled) return;
  ctx?.handleItemClick(props);
};
</script>

<style scoped>
@import "./style.css";
</style>
