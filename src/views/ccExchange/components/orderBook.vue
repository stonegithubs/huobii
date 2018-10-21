<template>
    <div class="order-book">
      <div class="header">
        <div>最新价 <span>0.033692 BTC</span> <span class="about">≈ 1516.60 cny</span></div>
      </div>
      <div class="inner">
        <el-table :data="orderBookData"    style="width: 100%">
          <el-table-column
            prop="type"
            width="60"
            label="买/卖">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格(BTC)">
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量(ETH)"
           >
          </el-table-column>
          <el-table-column
            prop="total"
            label="累计(ETH)">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
export default {
  name: "order-book",
  data() {
    return {
      orderBookData: [
        {type: 'sell',price: 0.033712, number: '2.0000', total: 22.9933},
        {type: 'sell',price: 0.033712, number: '2.0000', total: 22.9933},
        {type: 'sell',price: 0.033712, number: '2.0000', total: 22.9933},
        {type: 'sell',price: 0.033712, number: '2.0000', total: 22.9933},
        {type: 'sell',price: 0.033712, number: '2.0000', total: 22.9933},
        {type: 'sell',price: 0.033712, number: '2.0000', total: 22.9933},
        {type: 'sell',price: 0.033712, number: '2.0000', total: 22.9933},
        {type: 'sell',price: 0.033712, number: '2.0000', total: 22.9933},
        {type: 'sell',price: 0.033712, number: '2.0000', total: 22.9933},
        {type: 'sell',price: 0.033712, number: '2.0000', total: 22.9933},
        {type: 'sell',price: 0.033712, number: '2.0000', total: 22.9933},
        {type: 'sell',price: 0.033712, number: '2.0000', total: 22.9933},
        {type: 'sell',price: 0.033712, number: '2.0000', total: 22.9933},
        {type: 'sell',price: 0.033712, number: '2.0000', total: 22.9933},
      ]
    }
  }
}
</script>

<style lang="scss">
  @import "../../../assets/custom-theme/theme";

  .order-book {
    width: 356px;
    height: 490px;
    .header {
      box-shadow: 0 3px 6px rgba(1,1,1,.3);
      background-color: $tabColor;
      height: 48px;
      padding-left: 20px;
      line-height: 48px;
      font-size: 14px;
      color: $hbColor;
      .about {
        font-size: 12px;
        text-transform: uppercase;
        color: $lightColor;
      }

    }
    .inner{
      background-color:#1b1e2a ;
      .el-table th, .el-table tr {
        background-color: #1b1e2a;
        color: $hbColor;
        font-size: 12px;
        text-align: center;
      }
      .el-table {
        height: 441px;
        background-color: #1b1e2a;

      }
      .el-table td, .el-table th.is-leaf, .el-table--border, .el-table--group {
        border: none
      }

      .el-table--border::after, .el-table--group::after, .el-table::before {
        display: none;
      }
      .el-table td, .el-table th {
        padding: 3px 0;
      }
      .el-table--enable-row-hover {
        .el-table__body {
          tr {
            &:hover {
              & > td {
                background-color: #1b1e2a !important;
              }
            }
          }
        }
      }
      /*.order-book .inner .el-table, .order-book .inner .el-table__expanded-cell {*/
        /*background-color: ;*/
      /*}*/
    }
  }
</style>
