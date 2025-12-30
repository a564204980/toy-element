<script lang="ts" setup>
import thumb from "./Thumb.vue";
import { useNamespace } from "@toy-element/hooks";

defineOptions({
  name: "ErScrollbarBar",
});

const ns = useNamespace("scrollbar");

/**
 * 当内容滚动时，计算滚动条应该移动到的位置
 */
const handleScroll = (wrap: HTMLDivElement) => {
  console.log("打印", wrap);
};

defineExpose({
  handleScroll,
});
</script>

<template>
  <div :class="[ns.e('bar'), ns.is('vertical')]">
    <thumb size="100px" :move="0" vertical></thumb>
  </div>
</template>

<style></style>
