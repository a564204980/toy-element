<template>
  <div>
    <er-button-group ref="btnGroupRef">
      <er-button
        type="danger"
        round
        icon="face-smile"
        :disabled="true"
      ></er-button>
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

    <er-button type="primary" @click="handleClick" ref="btnRef">
      点击我
    </er-button>

    </br>

    <ErAlert ref="alertRef" type="warning">
      这是一条警告信息
    </ErAlert>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const alertRef = ref()
const btnGroupRef = ref();
const activeNames = ref(["1"]);

const handleClick = (e: MouseEvent) => {
  console.log("这是点击事件", alertRef.value.open());
};
</script>

<style scoped></style>
