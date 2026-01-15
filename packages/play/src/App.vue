<script setup>
import { ref } from 'vue'
const tableData = ref([
  { name: '商品1', count: 10, price: 100 },
  { name: '商品2', count: 5, price: 200 },
  { name: '商品3', count: 8, price: 150 }
])
// 自定义合计方法
const getSummaries = ({ columns, data }) => {
  const sums = []

  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '总价'
      return
    }

    if (column.prop === 'count') {
      // 数量：求和
      const total = data.reduce((sum, item) => sum + item.count, 0)
      sums[index] = `共 ${total} 件`
      return
    }

    if (column.prop === 'price') {
      // 价格：求平均值
      const total = data.reduce((sum, item) => sum + item.price, 0)
      const avg = total / data.length
      sums[index] = `均价 ${avg.toFixed(2)}`
      return
    }

    sums[index] = '-'
  })

  return sums
}
</script>
<template>
  <er-table :data="tableData" show-summary :summary-method="getSummaries">
    <er-table-column prop="name" label="商品名称" />
    <er-table-column prop="count" label="数量" />
    <er-table-column prop="price" label="价格" fixed="right" />
  </er-table>
</template>