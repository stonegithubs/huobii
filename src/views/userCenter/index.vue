<template>
  <div class="user-center">
    <div class="uc-title">
      <span>账号安全</span>
    </div>
    <base-info/>
    <!-- <advanced-verify></advanced-verify> -->
    <user-history/>
  </div>
</template>

<script>
import baseInfo from './components/baseInfo'
import advancedVerify from './components/advancedVerify'
import userHistory from './components/userHistory'
export default {
  name: 'Index',
  components: {
    baseInfo,
    advancedVerify,
    userHistory
  },
  created() {
    if (this.$store.state.user.token === null) {
      this.$router.push('/login')
    } else {
      // this.$store.dispatch('GetUserInfo').then( msg => {
      //     this.$message.success(msg)
      //   }).catch( err => {
      //     this.$message(err)
      //   })
      // this.$store.dispatch('GetVerifyInfo').then( msg => {
      //     this.$message.success(msg)
      //   }).catch( err => {
      //     this.$message(err)
      //   })
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-center {
    width: 1200px;
    margin: auto;
    .uc-title {
      font-size: 20px;
      height: 60px;
      line-height: 60px;
      margin: 20px 0;
      border-radius: 3px;
      padding: 0 30px;
      background-color: #1b1e2e;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
    }
  }
</style>
