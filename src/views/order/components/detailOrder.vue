<template>
  <div class="detail-order">
    <el-table :data="currentOrderData" style="width: 100%">
      <el-table-column prop="date" label="时间" width="150"/>
      <el-table-column prop="type" label="交易类型" width="90"/>
      <el-table-column prop="market" label="市场"/>
      <el-table-column prop="price" label="价格"/>
      <el-table-column prop="number" label="数量"/>
      <el-table-column prop="total" label="委托总额"/>
      <el-table-column prop="deal" label="已成交"/>
      <el-table-column prop="average" label="成交均价"/>
      <el-table-column prop="status" label="状态"/>
      <el-table-column prop="id" label="操作"/>
    </el-table>
    <div class="co-pagination">
      <el-pagination
        :total="90"
        layout="prev, pager, next"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailOrder',
  data() {
    return {
      currentOrderData: [
        { id: '0', date: '2018-10-05 02:13:30', type: '卖出', 	market: 'BTC_USDT', price: '10069.47300000', number: '0.10000000', total:	'1006.24243689',	deal: '0.00000000',	average: '0.00000000', status: '交易中' },
        { id: '1', date: '2018-10-05 02:13:30', type: '卖出', 	market: 'BTC_USDT', price: '10069.47300000', number: '0.10000000', total:	'1006.24243689',	deal: '0.00000000',	average: '0.00000000', status: '交易中' },
        { id: '2', date: '2018-10-05 02:13:30', type: '卖出', 	market: 'BTC_USDT', price: '10069.47300000', number: '0.10000000', total:	'1006.24243689',	deal: '0.00000000',	average: '0.00000000', status: '交易中' },
        { id: '3', date: '2018-10-05 02:13:30', type: '卖出', 	market: 'BTC_USDT', price: '10069.47300000', number: '0.10000000', total:	'1006.24243689',	deal: '0.00000000',	average: '0.00000000', status: '交易中' },
        { id: '4', date: '2018-10-05 02:13:30', type: '卖出', 	market: 'BTC_USDT', price: '10069.47300000', number: '0.10000000', total:	'1006.24243689',	deal: '0.00000000',	average: '0.00000000', status: '交易中' },
        { id: '5', date: '2018-10-05 02:13:30', type: '卖出', 	market: 'BTC_USDT', price: '10069.47300000', number: '0.10000000', total:	'1006.24243689',	deal: '0.00000000',	average: '0.00000000', status: '交易中' },
        { id: '6', date: '2018-10-05 02:13:30', type: '卖出', 	market: 'BTC_USDT', price: '10069.47300000', number: '0.10000000', total:	'1006.24243689',	deal: '0.00000000',	average: '0.00000000', status: '交易中' },
        { id: '7', date: '2018-10-05 02:13:30', type: '卖出', 	market: 'BTC_USDT', price: '10069.47300000', number: '0.10000000', total:	'1006.24243689',	deal: '0.00000000',	average: '0.00000000', status: '交易中' },
        { id: '8', date: '2018-10-05 02:13:30', type: '卖出', 	market: 'BTC_USDT', price: '10069.47300000', number: '0.10000000', total:	'1006.24243689',	deal: '0.00000000',	average: '0.00000000', status: '交易中' },
        { id: '9', date: '2018-10-05 02:13:30', type: '卖出', 	market: 'BTC_USDT', price: '10069.47300000', number: '0.10000000', total:	'1006.24243689',	deal: '0.00000000',	average: '0.00000000', status: '交易中' }
      ]
    }
  }
}
</script>

<style lang="scss">
  @import "../../../assets/custom-theme/theme";
  .detail-order {
    .el-table {
      // background-color: #1b1e2e;
    }
    .el-table--border {
      // border-color: #1f2943;
      th {
        &.gutter {
          &:last-of-type {
            // border-color: #1f2943;
          }
        }
      }
    }
    .el-table--enable-row-hover {
      .el-table__body {
        tr {
          &:hover {
            & > td {
              // background-color: #1b1e2e !important;
            }
          }
        }
      }
    }
    .el-table th, .el-table tr {
      // background-color: #1b1e2e;
      // color: #c7cce6;

    }
    .el-table td, .el-table th.is-leaf {
      // border-color: #1f2943;
      font-size: 12px;
    }
    .el-table--border::after, .el-table--group::after{
      display: none;
    }
    .el-table::before {
      display: none;
    }
    .el-table td, .el-table th {
      padding: 8px 0;
      text-align: center;
    }
    .co-pagination {
      height: 60px;
      }
    .el-pagination {
      width: 250px;
      margin:25px auto auto;
      .el-pager li {
        background-color: transparent;
        color: $hbColor;
      }
      .btn-prev, .btn-next {
        background-color: transparent;
        color: $hbColor;
      }
    }
  }

</style>
