<template>
  <div class="vd">
    <h3 v-if="getStatus === 'success'"><i style="color: #55a532" class="el-icon-success"></i> 您已经通过了实名认证</h3>
    <h3 v-else-if="getStatus === 'pending'"><i style="color: dodgerblue" class="el-icon-info"></i> 您提交的信息正在审核中</h3>
    <h3 v-else><i style="color: red" class="el-icon-warning"></i> 审核未通过</h3>
    <div class="vd-inner">
      <p><span>name</span><span>{{ this.$store.state.user.verifyInfo.name }}</span></p>
      <p><span>surname</span><span>{{ this.$store.state.user.verifyInfo.surName }}</span></p>
      <p><span>idNo</span><span>{{ this.$store.state.user.verifyInfo.cardNo }}</span></p>
      <el-button v-if="getStatus === 'failed'" @click="handleResubmit" type="primary" style="width: 250px;margin-top: 30px" >重新提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "verified",
  data(){
    return {
      status: 'failed'   //todo:状态写死 应该再create中拉取信息 存入vuex
    }
  },
  methods:{
    handleResubmit(){
      //重新提交
    }
  },
  computed: {
    getStatus(){
      if(this.status === 'pending'){
        return 'pending'
      }else if(this.status ==='success'){
        return 'success'
      }else {
        return 'failed'
      }
    },
  }
}
</script>

<style lang="scss">
  .vd {
    /*width: 600px;*/
    /*margin: auto;*/
    text-align: center;
    height: 400px;
    h3 {
      font-size: 26px;
      display: inline-block;
      margin-bottom: 40px;
    }
    .vd-inner {
      height: 400px;
      p{
        line-height: 56px;
        color: #c7cce6;
        width: 100%;
        :first-child{
          display: inline-block;
          float: left;
          width: 530px;
          margin-right: 60px;
          color: #61688a;
          text-align: right;
        }
        :last-child {
          display: inline-block;
          float: right;
          width: 530px;
          color: #c7cce6;
          text-align: left;
        }
      }
    }
  }

</style>
