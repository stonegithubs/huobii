<template>
  <div class="change-password">
    <div class="cp-title">
      <span v-if="this.$route.name=='change_password'">修改登录密码</span>
      <span v-if="this.$route.name=='change_trade_password'">修改交易密码</span>
      <span v-if="this.$route.name=='change_phone'">修改手机号</span>
      <span v-if="this.$route.name=='bind_email'">绑定邮箱</span>
      <span v-if="this.$route.name=='verify'">实名认证</span>
    </div>
    <div class="cp-body">
      <div class="cb-title">
        <span v-if="this.$route.name=='change_password'" >
        <i class="el-icon-warning"></i> 密码修改后24小时内不可提现
        </span>
      </div>
      <div class="cb-inner">
        <change-password-form v-if="this.$route.name=='change_password'"></change-password-form>
        <changeTradePwd v-if="this.$route.name=='change_trade_password'"></changeTradePwd>
        <changePhone v-if="this.$route.name=='change_phone'"></changePhone>
        <bindEmail v-if="this.$route.name=='bind_email'"></bindEmail>
        <verified  v-if="this.$route.name=='verify'"></verified>
      </div>
    </div>
  </div>
</template>
<script>
import changePasswordForm from "./components/changePasswordForm";
import changeTradePwd from "./components/changeTradePwd";
import changePhone from "./components/changePhone";
import bindEmail from "./components/bindEmail";
import verified from "./components/verified";

export default {
  name: "user-options",
  components: {
    changePasswordForm,
    changeTradePwd,
    bindEmail,
    changePhone,
    verified
  },
  data() {
    return {};
  },
  created() {}
};
</script>
<style lang="scss" scoped>
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

  .cp-body {
    margin-top: 20px;
    background-color: #1b1e2e;
    /*padding: 20px 30px;*/
    font-size: 14px;

    .cb-title {
      height: 48px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
      background-color: #1b1e2e;
      font-size: 14px;
      line-height: 48px;
      padding-left: 20px;
    }

    .cb-inner {
      padding: 30px;
    }
  }

  // .change-password-form,
  // .change-trade-pwd /deep/ {
  // }
}
</style>
