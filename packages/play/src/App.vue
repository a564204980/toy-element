<script setup lang="ts">
import { ref, watch } from "vue";
const activeNames = ref(["a"]);
const closable = ref(false);

const tableData = ref([
  {
    id: 1,
    name: "张三",
    age: 25,
    address: "北京市朝阳区",
    email: "zhangsan@example.com",
  },
  {
    id: 2,
    name: "李四",
    age: 30,
    address: "上海市浦东新区",
    email: "lisi@example.com",
  },
  {
    id: 3,
    name: "王五",
    age: 28,
    address: "广州市天河区",
    email: "wangwu@example.com",
  },
  {
    id: 4,
    name: "赵六",
    age: 35,
    address: "深圳市南山区",
    email: "zhaoliu@example.com",
  },
]);

watch(activeNames, (newNames) => {
  console.log("watch触发了", newNames);
});

const handleAlert = () => {
  closable.value = !closable.value;
  console.log("closable", closable.value);
};
</script>

<template>
  <er-button @click="handleAlert" type="success">按钮</er-button>
  <er-icon type="danger" icon="home"></er-icon>
  <er-alert :closable="true" title="这是标题" center type="warning"
    >这是内容</er-alert
  >

  <section class="demo-section">
    <er-table :data="tableData" stripe border>
      <er-table-column prop="name" label="姓名" width="120px" align="center" />
      <er-table-column prop="age" label="年龄" width="80px" align="center" />
      <er-table-column prop="address" label="地址" align="center" />
      <er-table-column prop="email" label="邮箱" align="center" />
    </er-table>
  </section>
</template>

<style scoped></style>
