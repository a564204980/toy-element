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
      { id: 11, name: `${row.name} 的子节点1`, count: 10 },
      { id: 12, name: `${row.name} 的子节点2`, count: 20 }
    ]
    resolve(children)
  }, 1000)
}

const handleColoseExpanded = async () => {
  await nextTick()

  tableRef.value.collapseAllTreeNodes()
}

const handleExpandedRows = async () => {
  await nextTick()
  console.log(tableRef.value.getExpandedRows())
}

const handleSelectionChange = (selection) => {
  console.log("我触发了", selection)
}

const testCheckStrictly = () => {
  const selection = [];
  const row = {
    id: 1,
    name: '父节点',
    children: [
      { id: 11, name: '子节点1' },
      { id: 12, name: '子节点2' }
    ]
  };
  // 模拟严格模式
  const checkStrictly = true;
  selection.push(row);
  console.log('严格模式 - 选中:', selection.map(r => r.name));
  // 输出: ['父节点'] - 子节点不会被选中
  // 模拟关联模式
  selection.length = 0;
  const checkStrictlyFalse = false;
  selection.push(row);
  if (!checkStrictlyFalse) {
    row.children.forEach(child => selection.push(child));
  }
  console.log('关联模式 - 选中:', selection.map(r => r.name));
  // 输出: ['父节点', '子节点1', '子节点2']
};

onMounted(() => {
  console.log("2222", tableRef.value)
})
</script>
<template>
  <er-table ref="tableRef" default-expand-all :data="lazyData" row-key="id" :lazy="true" :load="loadChildren"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren', checkStrictly: false }" @expand-change="(row, expanded) => {
      console.log(row, expanded)
    }" @selection-change="handleSelectionChange">
    <er-table-column type="selection" width="55" />
    <er-table-column prop="name" label="名称" />
    <er-table-column prop="count" label="数量" />
  </er-table>
  <er-button type="primary" @click="handleColoseExpanded">点击关闭</er-button>
  <er-button type="danger" @click="handleExpandedRows">查看已展开的节点</er-button>
</template>