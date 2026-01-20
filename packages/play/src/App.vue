<script setup>
import { nextTick, onMounted, ref } from 'vue'

const tableRef = ref()
const lazyData = ref([
  {
    id: 1, name: '节点1',
    hasChildren: true
  },
  {
    id: 2, name: '节点2', children: [
      { id: 21, name: '节点2-1' },
      { id: 22, name: '节点2-2' },
      {
        id: 23, name: '节点2-2', children: [
          { id: 231, name: '节点2-3-1' },
          { id: 232, name: '节点2-3-2' }
        ]
      }
    ]
  }
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
  }, 10000)
}

const handleColoseExpanded = async () => {
  await nextTick()

  tableRef.value.collapseAllTreeNodes()
}

const handleExpandedRows = async () => {
  await nextTick()
  console.log(tableRef.value.getExpandedRows())
}

onMounted(() => {
  console.log("2222", tableRef.value)
})
</script>
<template>
  <er-table ref="tableRef" default-expand-all :data="lazyData" row-key="id" :lazy="true" :load="loadChildren"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" @expand-change="(row, expanded) => {
      console.log(row, expanded)
    }">
    <er-table-column prop="name" label="名称" />
    <er-table-column prop="count" label="数量" />
  </er-table>
  <er-button type="primary" @click="handleColoseExpanded">点击关闭</er-button>
  <er-button type="danger" @click="handleExpandedRows">查看已展开的节点</er-button>
</template>