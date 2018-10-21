<template>
  <div class="trade-table">
    <el-table :data="myTrade" border style="width: 100%" height="300">
    <el-table-column prop="date"><span slot="label">时间</span></el-table-column>
    <el-table-column prop="type"><template slot="label">类型</template></el-table-column>
    <el-table-column prop="number"><template slot="label">数量</template></el-table-column>
    <el-table-column prop="price"> <template slot="label">单价</template></el-table-column>
    <el-table-column prop="sum"> <template slot="label">总价</template></el-table-column>
    <el-table-column prop="status"> <template slot="label">状态</template></el-table-column>
    <el-table-column prop="id"> <template slot="label">操作</template></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name: "trade-table",
  data(){
    return {
      myTrade:[
        { id: 1,date: '2018-09-20 11:41:20',type: '买入', number: 100.00, price: 6.72120, sum: 1212670.00, status: '已完成',},
        { id: 2,date: '2018-09-20 11:41:20',type: '买入', number: 100.00, price: 631.70, sum: 6701212.00, status: '已完成',},
        { id: 3,date: '2018-09-20 11:41:20',type: '买入', number: 100.00, price: 6.170, sum: 6703.00, status: '已完成',},
        { id: 4,date: '2018-09-20 11:41:20',type: '买入', number: 10022.00, price: 6.70, sum: 70.00, status: '待审核',},
        { id: 5,date: '2018-09-20 11:41:20',type: '买入', number: 1.00, price: 6.70, sum: 670.030, status: '已完成',},
        { id: 6,date: '2018-09-20 11:41:20',type: '买入', number: 100.20, price: 62.70, sum: 2.00, status: '待审核',},
        { id: 7,date: '2018-09-20 11:41:20',type: '买入', number: 100.0333, price: 6.170, sum: 6710.00, status: '已完成',},
        { id: 8,date: '2018-09-20 11:41:20',type: '买入', number: 1003131.00, price: 126.70, sum: 10.00, status: '已完成',},
      ]
    }
  },
}
</script>

<style lang="scss">
  .trade-table {
      .el-table {
      background-color: #1b1e2e;
      }
      .el-table--border {
        border-color: #1f2943;
      th {
      &.gutter {
      &:last-of-type {
         border-color: #1f2943;
       }
      }
      }
      }
      .el-tabs--border-card {
        border: none;
      }
      .el-table--enable-row-hover {
      .el-table__body {
      tr {
      &:hover {
      & > td {
          background-color: #1b1e2e !important;
        }
      }
      }
      }
      }
      .el-table th, .el-table tr {
        background-color: #1b1e2e;
        color: #c7cce6;
    }
      .el-table td, .el-table th.is-leaf {
        border-color: #1f2943;
      }
      .el-table--border::after, .el-table--group::after {
        display: none;
      }
      ::-webkit-scrollbar {
        width: 10px;
        background-color: #181b2a;
      }
      /*滚动条的轨道*/
      ::-webkit-scrollbar-track {
        background-color: #181b2a;
      }
      /*滚动条的滑块按钮*/
      ::-webkit-scrollbar-thumb {
        background-color: rgba(97, 104, 138, .15);
        border-radius: 10px;
      }
  }



</style>
