<template>
  <div class="er-button-group">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { ButtonGroupProps } from "./type";
import { provide, reactive, toRef } from "vue";
import { BUTTON_GROUP_CTX_KEY } from "./contants";

defineOptions({
  name: "ErButtonGroup",
});

const props = defineProps<ButtonGroupProps>();

provide(
  BUTTON_GROUP_CTX_KEY,
  reactive({
    size: toRef(props, "size"),
    type: toRef(props, "type"),
    disabled: toRef(props, "disabled"),
  })
);
</script>

<style scoped>
@import "./style.css";
</style>
