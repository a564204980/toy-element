<template>
  <div class="thumb" :style="thumbStyle"></div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { thumbProps } from "./types";

const props = defineProps(thumbProps);

const thumbStyle = computed(() => {
  return {
    height: props.size,
    transform: `translateY(${props.move}%)`,
  };
});
</script>
