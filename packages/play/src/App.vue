<script setup>
import { nextTick, onMounted, ref } from 'vue'

const tableRef = ref()
const lazyData = ref([
  // {
  //   id: 1, name: '节点1',
  //   hasChildren: true
  // },
  // {
  //   id: 2, name: '节点2', count: 10, children: [
  //     { id: 21, name: '节点2-1', count: 10 },
  //     { id: 22, name: '节点2-2', count: 20 },
  //     {
  //       id: 23, name: '节点2-2', children: [
  //         { id: 231, name: '节点2-3-1', count: 30 },
  //         { id: 232, name: '节点2-3-2', count: 60 }
  //       ]
  //     }
  //   ]
  // },
  { id: 3, name: "节点3", count: 20 },
  { id: 4, name: "节点4", count: 20 },
  { id: 5, name: "节点5", count: 20 },
  { id: 6, name: "节点6", count: 20 },
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
    count: 10,
    children: [
      { id: 11, name: '子节点1', count: 30 },
      { id: 12, name: '子节点2', count: 60 }
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

const tableData = [
  { orderId: 'ORD001', product: '苹果', quantity: 10 },
  { orderId: 'ORD001', product: '香蕉', quantity: 5 },
  { orderId: 'ORD001', product: '橙子', quantity: 8 },
  { orderId: 'ORD002', product: '西瓜', quantity: 3 },
  { orderId: 'ORD002', product: '葡萄', quantity: 15 },
]

const spanMethod = ({ rowIndex, columnIndex }) => {
  // 只在第一行处理
  if (rowIndex === 0) {
    if (columnIndex === 0) {
      // 第1列横向占据2列
      return { rowspan: 1, colspan: 2 }
    } else if (columnIndex === 1) {
      // 第2列隐藏
      return { rowspan: 0, colspan: 0 }
    }
  }
}

onMounted(() => {
  console.log("2222", tableRef.value)
})
</script>
<template>
  <er-table ref="tableRef" :data="tableData" :span-method="spanMethod" border>
    <er-table-column prop="orderId" label="订单ID" />
    <er-table-column prop="product" label="产品" />
    <er-table-column prop="quantity" label="数量" />
  </er-table>
  <er-button type="primary" @click="handleColoseExpanded">点击关闭</er-button>
  <er-button type="danger" @click="handleExpandedRows">查看已展开的节点</er-button>
</template>