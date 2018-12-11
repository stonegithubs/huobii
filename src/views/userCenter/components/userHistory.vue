<template>
  <div class="user-history">
    <div class="uh-title">
      <span>登陆历史</span>
    </div>
    <div class="ul-inner">
      <el-table :data="userHistory" style="width: 100%">
        <el-table-column prop="date" label="时间" />

        <el-table-column prop="name" label="内容" />

        <el-table-column prop="address" label="IP地址"/>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserHistory',
  data() {
    return {
      userHistory: []
    }
  }
}
</script>

<style lang="scss">
  .user-history {
    margin-top: 20px;
    .uh-title {
      box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
      font-size: 16px;
      height: 48px;
      line-height: 48px;
      padding: 0 30px;
      border-radius: 3px 3px 0 0;
      position: relative;
      background-color: #1b1e2e;
    }
    .ul-inner {
      padding: 20px;
      background-color: #1b1e2e;
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
      }

    }
  }
</style>
