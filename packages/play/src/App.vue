<script setup lang="ts">
import { ref, watch } from "vue";
const activeNames = ref(["a"]);
const closable = ref(false);

watch(activeNames, (newNames) => {
  console.log("watch触发了", newNames);
});

const handleAlert = () => {
  closable.value = !closable.value;
  console.log("closable", closable.value);
};
</script>

<template>
  <!--
    <er-button-group>
      <er-button type="primary" size="small" :round="true">默认按钮</er-button>
      <er-button type="primary" size="small">默认按钮</er-button>
      <er-button type="primary" size="small">默认按钮</er-button>
    </er-button-group>
  -->
  <!-- <er-icon icon="house" rotateBy style="--fa-rotate-angle: 190deg"></er-icon> -->

  <!-- <er-collapse v-model="activeNames" accordion>
    <er-collapse-item title="标题1" name="a"> 内容1 </er-collapse-item>
    <er-collapse-item title="标题2" name="b"> 内容2 </er-collapse-item>
  </er-collapse> -->
  <er-button @click="handleAlert">按钮</er-button>
  <er-alert :closable="true" title="这是标题" center type="success"
    >这是内容</er-alert
  >
</template>

<style scoped></style>
