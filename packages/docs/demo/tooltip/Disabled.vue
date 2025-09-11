<template>
  <er-tooltip
    :disabled="disabled"
    content="点击关闭提示框的功能"
    placement="bottom"
  >
    <er-button @click="disabled = !disabled">{{
      `点击${disabled ? "激活" : "关闭"}提示框的功能`
    }}</er-button>
  </er-tooltip>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const disabled = ref(false);
</script>
