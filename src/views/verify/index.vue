<template>
    <div class="verify">
      <div class="v-title">
        <span>身份认证</span>
      </div>
      <div class="v-body">
        <div class="vb-title">
          <span>个人身份认证</span>
        </div>
        <!--<div v-if="auditFlag===''" class="vb-inner"> 问一下接口返回的是什么 否则下面ture为手动操作 -->
        <div v-if="false" class="vb-inner">
            <verify-form> </verify-form>
        </div>
        <div v-else class="vb-inner">
          <verified> </verified>
        </div>

      </div>
    </div>
</template>

<script>
import verifyForm from './components/verifyForm'
import verified from './components/verified'
export default {
  name: "verify",
  components: {
    verifyForm,
    verified
  },
  data(){
    return {
      // verifyInfo:{
      //   name: null || this.$store.state.user.verifyInfo.name,
      //   surname: null || this.$store.state.user.verifyInfo.surname,
      //   cardNo: null || this.$store.state.user.verifyInfo.cardNo,
      //   cardType: null || this.$store.state.user.verifyInfo.cardType, //todo: 接口中写了账号类型但是前台注册没写
      //   auditFlag: null || this.$store.state.user.verifyInfo.auditFlag,  //也许是审核标志 改成bool？ 状态有1未实名 2审核中 3通过
      // }
    }
  },
  created(){
     if(this.$store.state.user.verifyInfo === null){
       this.$store.dispatch('GetVerifyInfo').then(() => {

       }).catch(err => {
         this.$message.error(err)
       })
     }
  }
}
</script>

<style lang="scss">
.verify {
  width: 1200px;
  margin: auto;
  .v-title {
    font-size: 20px;
    height: 60px;
    line-height: 60px;
    margin: 20px 0;
    border-radius: 3px;
    padding: 0 30px;
    background-color: #1b1e2e;
  }
  .v-body{
    margin-top: 20px;
    background-color: #1b1e2e;
    /*padding: 20px 30px;*/
    font-size: 14px;
    .vb-title {
      height: 48px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
      background-color: #1b1e2e;
      font-size: 16px;
      line-height: 48px;
      padding-left: 20px;
    }
    .vb-inner {
      padding: 30px;
    }
  }
}
</style>
