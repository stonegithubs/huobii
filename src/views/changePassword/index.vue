<template>
    <div class="change-password">
      <div class="cp-title">
        <span>修改登录密码
</span>
      </div>
      <div class="cp-body">
        <div class="cb-title">
           <i class="el-icon-warning"></i> 密码修改后24小时内不可提现
        </div>
        <div class="cb-inner">
          <change-password-form></change-password-form>
        </div>
      </div>
    </div>
</template>

<script>
  import changePasswordForm from './components/changePasswordForm'
export default {
  name: "change-password",
  components: {
    changePasswordForm
  },
  data(){
  }
}
</script>

<style lang="scss">
  .change-password {
    width: 1200px;
    margin: auto;
    .cp-title {
      font-size: 20px;
      height: 60px;
      line-height: 60px;
      margin: 20px 0;
      border-radius: 3px;
      padding: 0 30px;
      background-color: #1b1e2e;
    }
    .cp-body{
      margin-top: 20px;
      background-color: #1b1e2e;
      /*padding: 20px 30px;*/
      font-size: 14px;
      .cb-title {
        height: 48px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
        background-color: #1b1e2e;
        font-size: 14px;
        line-height: 48px;
        padding-left: 20px;
      }
      .cb-inner {
        padding: 30px;
      }
    }
  }
</style>
