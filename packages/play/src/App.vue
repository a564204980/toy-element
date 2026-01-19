<script setup>
import { ref } from 'vue'
const lazyData = ref([
  { id: 1, name: '节点1', hasChildren: true },
  { id: 2, name: '节点2', hasChildren: true }
])
// 模拟异步加载
const loadChildren = (row, treeNode, resolve) => {
  console.log('加载子节点:', row.name)
  setTimeout(() => {
    const children = [
      { id: `${row.id}-1`, name: `${row.name} 的子节点1`, count: 10 },
      { id: `${row.id}-2`, name: `${row.name} 的子节点2`, count: 20 }
    ]
    resolve(children)
  }, 1000)
}
</script>
<template>
  <er-table :data="lazyData" row-key="id" lazy :load="loadChildren"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
    <er-table-column prop="name" label="名称" />
    <er-table-column prop="count" label="数量" />
  </er-table>
</template>