<template>
  <div class="guest-option">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'guestOption',
    data() {
      return {
      }
    },
    created() {}
  }
</script>
<style lang="scss">
  .guest-option  {
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
      .el-input {}
      .el-button {
        margin-top: 24px;
        width: 100%;
      }
    }
  }
</style>
