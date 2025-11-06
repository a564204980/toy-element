<script setup lang="ts">
import { ref, watch } from "vue";
const activeNames = ref(["a"]);

watch(activeNames, (newNames) => {
  console.log("watch触发了", newNames);
});
</script>

<template>
  <!--
    <er-button-group>
      <er-button type="primary" size="small" :round="true">默认按钮</er-button>
      <er-button type="primary" size="small">默认按钮</er-button>
      <er-button type="primary" size="small">默认按钮</er-button>
    </er-button-group>
  -->
  <er-icon icon="house" rotateBy style="--fa-rotate-angle: 190deg"></er-icon>

  <er-collapse v-model="activeNames" accordion>
    <er-collapse-item title="标题1" name="a"> 内容1 </er-collapse-item>
    <er-collapse-item title="标题2" name="b"> 内容2 </er-collapse-item>
  </er-collapse>
</template>

<style scoped></style>
