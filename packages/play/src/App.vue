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

    <ErAlert ref="alertRef"  center title="这是标题">
      这是文字22222
    </ErAlert>

    <er-tooltip content="这是一个提示文本" trigger="click" :disabled="disabled">
      <er-button @click="disabled = !disabled">鼠标悬停查看提示</er-button>
    </er-tooltip>

    
    <div ref="virtualRef">这是虚拟触发要展示的</div>

    <er-popconfirm
     
    >
     
    </er-popconfirm>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const disabled = ref(false)
const alertRef = ref()
const btnGroupRef = ref();
const activeNames = ref(["1"]);
const virtualRef = ref()

const handleClick = (e: MouseEvent) => {
  console.log("这是点击事件", alertRef.value.open());
};
</script>

<style scoped></style>
