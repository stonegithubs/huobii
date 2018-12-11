<template>
  <div class="trade-table">
    <el-table :data="myTrade" style="width: 1200px" height="300">
      <el-table-column prop="date" label="时间"/>
      <el-table-column prop="type" label="类型"/>
      <el-table-column prop="number" label="数量"/>
      <el-table-column prop="price" label="单价"/>
      <el-table-column prop="sum" label="总价"/>
      <el-table-column prop="status" label="状态"/>
      <el-table-column prop="id" label="操作"/>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TradeTable',
  data() {
    return {
      myTrade: [
        { id: 1, date: '2018-09-20 11:41:20', type: '买入', number: 100.00, price: 6.72120, sum: 1212670.00, status: '已完成' },
        { id: 2, date: '2018-09-20 11:41:20', type: '买入', number: 100.00, price: 631.70, sum: 6701212.00, status: '已完成' },
        { id: 3, date: '2018-09-20 11:41:20', type: '买入', number: 100.00, price: 6.170, sum: 6703.00, status: '已完成' },
        { id: 4, date: '2018-09-20 11:41:20', type: '买入', number: 10022.00, price: 6.70, sum: 70.00, status: '待审核' },
        { id: 5, date: '2018-09-20 11:41:20', type: '买入', number: 1.00, price: 6.70, sum: 670.030, status: '已完成' },
        { id: 6, date: '2018-09-20 11:41:20', type: '买入', number: 100.20, price: 62.70, sum: 2.00, status: '待审核' },
        { id: 7, date: '2018-09-20 11:41:20', type: '买入', number: 100.0333, price: 6.170, sum: 6710.00, status: '已完成' },
        { id: 8, date: '2018-09-20 11:41:20', type: '买入', number: 1003131.00, price: 126.70, sum: 10.00, status: '已完成' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
