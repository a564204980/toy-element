<template>
  <div>
    <er-button-group>
      <er-button type="danger" round icon="face-smile"></er-button>
      <er-button type="warning" round></er-button>
      <er-button type="primary" round icon="search"></er-button>
    </er-button-group>
  </div>
</template>

<script setup lang="ts">
const handleClick = (e: MouseEvent) => {
  console.log("这是点击事件", e);
};
</script>

<style scoped></style>
