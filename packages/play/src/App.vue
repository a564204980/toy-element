<script setup lang="ts">
import { ref, watch } from "vue";
import { throttle } from "@toy-element/utils";

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
  {
    id: 5,
    name: "赵七",
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

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: any;
  rowIndex: number;
}) => {
  if (rowIndex === 2) {
    return "warning-row";
  }
  return "";
};


const currentChange = (row: any, oldRow: any) => {
}

const handleSelectAll = (data: any) => {
  console.log("data", data)
}
</script>

<template>
  <div class="table">
    <er-table :data="tableData" :defaultSort="{ prop: 'age', order: 'descending' }" :row-class-name="tableRowClassName"
      stripe border maxHeight="300px" highlight-current-row @current-change="currentChange"
      @select-all="handleSelectAll">
      <er-table-column type="selection"></er-table-column>
      <er-table-column type="index" :index="10"></er-table-column>
      <er-table-column label="标题1" prop="name" align="center" fixed="left">
        <er-table-column label="嵌套列" prop="name" align="center"></er-table-column>

      </er-table-column>
      <er-table-column prop="name" label="姓名" sortable />
      <er-table-column prop="age" label="年龄" width="600px"></er-table-column>
      <er-table-column label="标题4" width="600px"></er-table-column>
      <er-table-column label="标题5" width="600px" fixed="right"></er-table-column>





    </er-table>
  </div>
  <!-- <er-scrollbar maxHeight="400px">
    <div v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]" :key="item"
      style="height: 50px; border: 1px solid #123412">
      123
    </div>
  </er-scrollbar> -->


</template>

<style lang="scss" scoped>
.table {
  :deep(.warning-row) {
    background-color: #fef3c7 !important;
  }
}
</style>
