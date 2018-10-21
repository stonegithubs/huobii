<template>
    <div class="baseInfo">
        <div class="bf-title">
          <span>基本信息</span>
        </div>
      <div class="bf-inner">
        <div><span>账号</span>{{ this.$store.state.user.userInfo.mobile || ''}}</div>
        <div><span>UID</span>{{ this.$store.state.user.verifyInfo.userId || ''}}</div>
        <div><span>登陆密码</span>{{ this.$store.state.user.userInfo.password || ''}}</div>
        <div class="change-pwd"><router-link :to="{ name: 'change_password'}">修改</router-link></div>
      </div>
    </div>
</template>

<script>
export default {
  name: "base-info",
  data(){
    return {

    }
  }

}
</script>

<style lang="scss">
  .baseInfo {
    margin-top: 20px;
    .bf-title {
      box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
      font-size: 16px;
      height: 48px;
      line-height: 48px;
      padding: 0 30px;
      border-radius: 3px 3px 0 0;
      position: relative;
      background-color: #1b1e2e;

    }
    .bf-inner {
      background-color: #181b2a;
      position: relative;
      > div {
        min-height: 48px;
        line-height: 48px;
        border-bottom: 1px solid #1f2943;
        box-sizing: border-box;
        font-size: 14px;
        margin-left: 30px;
        span {
          display: inline-block;
          width: 200px;
          color:#61688a;
        }
      }
      .change-pwd {
        position: absolute;
        height: 20px;
        right: 30px;
        bottom: 0;
        a {
          color: #7a98f7;
          &:hover {
            opacity: .9;
          }
        }
      }
    }
  }
</style>
