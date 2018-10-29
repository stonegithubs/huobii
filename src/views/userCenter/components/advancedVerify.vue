<template>
  <div class="advanced-verify">
    <el-dialog title="开启验证" :visible.sync="VerifyTableVisible">
      <span class="vf-info">修改验证后24小时内禁止提币</span>
      <el-input>
        <template slot="append">
          <a href="javascript:;" @click="sendVerifyCode">获取验证码</a>
        </template>
      </el-input>
      <el-button type="primary">确定</el-button>
    </el-dialog>
    <div class="av-title">
      <span>验证信息</span>
    </div>
    <div class="av-inner">
      <div class="ai-list">
        <span>安全等级：</span>
        <el-progress :percentage="figurePercentage" :color="progressColor"></el-progress>
      </div>
      <div class="ai-list">
        <span>邮箱：</span>{{email}}
        <div class="al-email">
          <router-link :to="{ name: 'bind_email' }">绑定</router-link>
          <!--todo:邮箱绑定后可否更换绑定-->
        </div>
      </div>
      <div class="ai-list">
        <span>手机：</span>{{ phone }}
        <div class="al-phone">
          <router-link :to="{ name: 'change_phone' }">修改</router-link>
          <a href="javascript:;" @click="VerifyTableVisible = true">开启验证</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "advanced-verify",
  data() {
    return {
      VerifyTableVisible: false,
      progressColor: 'red',
      email: 'unset' || this.$store.state.user.userInfo.email,
      phone: 'unset' || this.$store.state.user.userInfo.phone
    }
  },
  methods: {
    sendVerifyCode() {
      this.$message.success('验证码已发送') //回调结束
    },
  },
  computed: {
    figurePercentage() {
      let percentage = 20;
      if (this.$store.state.user.userInfo.phone) {
        percentage += 40;
        this.progressColor = '#409eff'
      }
      if (this.$store.state.user.userInfo.email) {
        percentage += 40;
        this.progressColor = '#67c23a'
      }
      return percentage;
    },
  },
created() {
  if (this.$store.state.user.verifyInfo === null) {
      this.$store.dispatch('GetVerifyInfo').then(response => {
      }).catch(err => {
        this.$notify.error(err.message)
      })
    }
}
}

</script>
<style lang="scss">
.advanced-verify {
  margin-top: 20px;

  .el-dialog {
    width: 460px;

    .vf-info {
      margin-bottom: 30px;
      display: block;
      font-size: 12px;
    }

    button {
      margin-left: 10px;
      margin-top: 20px;
      width: 90%;
    }
  }

  .av-title {
    box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
    font-size: 16px;
    height: 48px;
    line-height: 48px;
    padding: 0 30px;
    border-radius: 3px 3px 0 0;
    position: relative;
    background-color: #1b1e2e;
  }

  .av-inner {
    background-color: #181b2a;

    .ai-list {
      min-height: 48px;
      line-height: 48px;
      border-bottom: 1px solid #1f2943;
      position: relative;
      box-sizing: border-box;

      .al-email {
        position: absolute;
        right: 20px;
        bottom: 0;
      }
      a {
        color: #7a98f7;
        font-size:14px;
        &:hover {
          opacity: .9;
        }
      }
      span {
        color: #61688a;
        margin-left: 20px;
        width: 100px;
        margin-right: 60px;
        display: inline-block;
      }

      .el-progress {
        display: inline-block;
        width: 400px;
      }

      .al-phone {
        position: absolute;
        right: 20px;
        bottom: 0;
      }
    }
  }
}

</style>
