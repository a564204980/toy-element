<script setup>
import { ref } from 'vue'
const tableData = ref([
  { name: '商品1', count: 10, price: 100, id: 1 },
  { name: '商品2', count: 5, price: 200, id: 2 },
  { name: '商品3', count: 8, price: 150, id: 3 }
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
  <er-table :data="tableData" @expand-change="(row, isExpanded) => console.log(row, isExpanded)">
    <er-table-column type="expand">
      <template #default="{ row }">
        <div style="padding: 20px; background: #f0f9ff; border-left: 4px solid #3b82f6;">
          <h4 style="margin: 0 0 10px 0;">商品详情</h4>
          <p><strong>名称：</strong>{{ row.name }}</p>
          <p><strong>数量：</strong>{{ row.count }} 件</p>
          <p><strong>价格：</strong>¥{{ row.price }}</p>
          <p><strong>总价：</strong>¥{{ row.count * row.price }}</p>
        </div>
      </template>
    </er-table-column>
    <er-table-column prop="name" label="商品名称" />
    <er-table-column prop="count" label="数量" />
    <er-table-column prop="price" label="价格" />
  </er-table>
</template>