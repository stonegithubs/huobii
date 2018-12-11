<template>
  <div class="user-option">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'UserOptions',
  data() {
    return {}
  },
  created() {}
}
</script>
<style lang="scss" scoped>
.user-option {
  margin: auto;
  min-height: 800px;
    background-color: #242e47;
    padding-top: 50px;
    padding-bottom: 40px;
.box-card /deep/ {
  width: 500px;
  margin: auto;
  .el-card__body {
      padding: 20px 50px;
  }
    .el-card__header {
        font-size: 22px;
        text-align: center;
        font-weight: 500;
    }
    .el-form-item__label {
        padding: 0;
        line-height: unset;
    }
    .el-input {

    }
    .el-button {
        margin-top: 24px;
        width: 100%;
    }
}
}
// .change-password {
//   width: 1200px;
//   margin: auto;
//   .cp-title {
//     font-size: 20px;
//     height: 60px;
//     line-height: 60px;
//     margin: 20px 0;
//     border-radius: 3px;
//     padding: 0 30px;
//     // background-color: #1b1e2e;
//   }

//   .cp-body {
//     margin-top: 20px;
//     // background-color: #1b1e2e;
//     /*padding: 20px 30px;*/
//     font-size: 14px;

//     .cb-title {
//       height: 48px;
//       box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
//       // background-color: #1b1e2e;
//       font-size: 14px;
//       line-height: 48px;
//       padding-left: 20px;
//     }

//     .cb-inner {
//       padding: 30px;
//     }
//   }

//   // .change-password-form,
//   // .change-trade-pwd /deep/ {
//   // }
// }
</style>
