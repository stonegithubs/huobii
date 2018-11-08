<template>
  <div class="mFinance">
    <el-table cell-class-name='f-upper' :data="balanceList" style="width: 100%">
      <el-table-column label="币种">
        <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
</template>
      </el-table-column>
      <el-table-column  label="可用"> 
<template slot-scope="scope">
  <span>{{scope.row.coinBalance.toFixed(8)}}</span>
</template>
      </el-table-column>
      <el-table-column label="冻结"> 
<template slot-scope="scope">
  <span>{{scope.row.coinFrozen.toFixed(8)}}</span>
</template>
      </el-table-column>
      <el-table-column label="操作">
<template slot-scope="scope">
  <a @click="handleIn(scope.row)">充值</a>
  <a @click="handleOut(scope.row)">提币</a>
</template>
      </el-table-column>
    </el-table>
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

    <div class="co-pagination">
      <el-pagination layout="prev, pager, next" :total="90">
      </el-pagination>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: "mFinance",
    data() {
      return {
        dialogVisible: true,
        balanceList: [{
            "address": "111111111111111",
            "coinBalance": 0,
            "coinFrozen": 0,
            "coinId": "string",
            "currencyBalance": 0,
            "currencyFrozen": 0,
            "id": "string",
            "name": "string",
            "remarks": "string",
            "updateDate": "2018-11-07T15:21:23.370Z",
            "userId": "string"
          },
          {
            "address": "111111111111111",
            "coinBalance": 0,
            "coinFrozen": 0,
            "coinId": "string",
            "currencyBalance": 0,
            "currencyFrozen": 0,
            "id": "string",
            "name": "string",
            "remarks": "string",
            "updateDate": "2018-11-07T15:21:23.370Z",
            "userId": "string"
          }, {
            "address": "111111111111111",
            "coinBalance": 0,
            "coinFrozen": 0,
            "coinId": "string",
            "currencyBalance": 0,
            "currencyFrozen": 0,
            "id": "string",
            "name": "string",
            "remarks": "string",
            "updateDate": "2018-11-07T15:21:23.370Z",
            "userId": "string"
          }, {
            "address": "111111111111111",
            "coinBalance": 0,
            "coinFrozen": 0,
            "coinId": "string",
            "currencyBalance": 0,
            "currencyFrozen": 0,
            "id": "string",
            "name": "string",
            "remarks": "string",
            "updateDate": "2018-11-07T15:21:23.370Z",
            "userId": "string"
          }, {
            "address": "111111111111111",
            "coinBalance": 0,
            "coinFrozen": 0,
            "coinId": "string",
            "currencyBalance": 0,
            "currencyFrozen": 0,
            "id": "string",
            "name": "string",
            "remarks": "string",
            "updateDate": "2018-11-07T15:21:23.370Z",
            "userId": "string"
          }, {
            "address": "111111111111111",
            "coinBalance": 0,
            "coinFrozen": 0,
            "coinId": "string",
            "currencyBalance": 0,
            "currencyFrozen": 0,
            "id": "string",
            "name": "string",
            "remarks": "string",
            "updateDate": "2018-11-07T15:21:23.370Z",
            "userId": "string"
          },
        ]
      }
    },
    created() {
      this.$store.dispatch('GetCoinBalanceBoth').then(response => {
        // console.log(response)
      }).catch(err => {
        this.$notify.error(err.message)
      })
      if (this.$store.getters.getSupportCoin.length === 0) {
        this.$store.dispatch('getSupportCoin').then(response => {
          // console.log(response)
        }).catch(err => {
          this.$notify.error(err.message)
        })
      }
    },
    methods: {
      coinClassName() {
        return 'upper'
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/custom-theme/theme";
  .mFinance /deep/ {
    .f-upper {
      text-transform: uppercase;
    }
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
    .el-table--enable-row-hover {
      .el-table__body {
        tr {
          &:hover {
            &>td {
              background-color: #1b1e2e !important;
            }
          }
        }
      }
    }
    .el-table th,
    .el-table tr {
      background-color: #1b1e2e;
      color: #c7cce6;
    }
    .el-table td,
    .el-table th.is-leaf {
      border-color: #1f2943;
      font-size: 12px;
    }
    .el-table--border::after,
    .el-table--group::after {
      display: none;
    }
    .el-table::before {
      display: none;
    }
    .el-table td,
    .el-table th {
      padding: 8px 0;
      text-align: center;
    }
    .co-pagination {
      height: 60px;
    }
    .el-pagination {
      width: 250px;
      margin: 25px auto auto;
      .el-pager li {
        background-color: transparent;
        color: $hbColor;
      }
      .btn-prev,
      .btn-next {
        background-color: transparent;
        color: $hbColor;
      }
    }
  }
</style>
