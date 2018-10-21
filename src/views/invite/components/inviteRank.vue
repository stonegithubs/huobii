<template>
    <div class="invite-rank">
      <div class="ir-title">
        <span>2018年10月邀请榜单</span>
      </div>
        <div class="ir-inner">
        <el-table
          :show-header="false"
          :highlight-current-row="false"
          :data="inviteRankList"
          height="200"
          style="width: 100%">
          <el-table-column width="500" prop="rank"></el-table-column>
          <el-table-column width="460" prop="id"></el-table-column>
          <el-table-column prop="money"></el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
export default {
    name: "invite-rank",
  data(){
      return {
        inviteRankList: [
          {rank: '1', id:'921****6353', money:'73851.53265422'},
          {rank: '2', id:'921****6353', money:'73851.53265422'},
          {rank: '3', id:'921****6353', money:'73851.53265422'},
          ]
      }
  }
}
</script>

<style lang="scss">
  .invite-rank {
    width: 1200px;
    margin: auto;
    height: 300px;
    .ir-title {
      height: 48px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
      background-color: #1b1e2e;
      font-size: 16px;
      line-height: 48px;
      padding-left: 20px;
    }
    .ir-inner {
      background-color: #181b2a;
      padding: 30px;
      .el-table {
        background-color: #1b1e2e;
      }
      .el-table th, .el-table tr {
        background-color: #1b1e2e;
        color:#c7cce6
      }
      .el-table td, .el-table th.is-leaf {
        border-color: #262a42;
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
      .el-table--border::after, .el-table--group::after, .el-table::before {
        display: none;
      }
    }
  }


</style>
