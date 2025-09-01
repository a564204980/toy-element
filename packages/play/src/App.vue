<template>
  <div>
    <er-button-group>
      <er-button type="danger" round icon="face-smile"></er-button>
      <er-button type="warning" round></er-button>
      <er-button type="primary" round icon="search"></er-button>
    </er-button-group>

    <er-collapse v-model="activeNames" :accordion="true">
      <er-collapse-item name="1">
        <template #title> 🚀 热重载测试 - 标题已更新！ </template>
        ✅ 这是热重载测试内容 - 无需打包即可看到变化！
      </er-collapse-item>
      <er-collapse-item name="2">
        <template #title> 📝 第二个面板 </template>
        这是第二个面板的内容，用于测试多面板功能。
      </er-collapse-item>
    </er-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeNames = ref(["1"]);

const handleClick = (e: MouseEvent) => {
  console.log("这是点击事件", e);
};
</script>

<style scoped></style>
