<script setup lang="ts">
import { ref } from 'vue';
const tableData = ref([
  { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', id: 1 },
  { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', id: 2 },
])


const rowClassName = ({ row, rowIndex }: { row: any; rowIndex: number }) => {
  return rowIndex === 0 ? "highlight-row" : "";
};

const cellClassName = ({ row, columnIndex }: { row: any; columnIndex: number }) => {
  if (columnIndex === 0) return "my-cell";
  if (row.date === "2016-05-02") return "high-value-cell";
  return "";
};
</script>
<template>

  <er-table :data="tableData" border style="width: 800px" :cellClassName="cellClassName" :selectOnIndeterminate="false">
    <er-table-column type="selection" label="Index" width="80" />
    <er-table-column prop="date" label="Date" width="180" />
    <er-table-column prop="name" label="Name" width="180" />
    <er-table-column prop="address" label="Address" />
  </er-table>
</template>