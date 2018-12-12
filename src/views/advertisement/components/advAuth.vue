<template>
  <div class="adv-auth">
    <div class="auth-title">
      <h3>{{ $t('advertisetment.businessAuth') }}</h3>
      <p>{{ $t('advertisetment.bussinessPrivilege') }}</p>
    </div>
    <div class="card-list">
      <el-card class="box-card">
        <img :src=" require('../../../assets/imgs/advertising.png')" alt="">
        <h4>{{ $t('advertisetment.advSubmit') }}</h4>
        <p>{{ $t('advertisetment.advPrivilege') }}</p>
      </el-card>
      <el-card class="box-card">
        <img :src=" require('../../../assets/imgs/vip.png')" alt="">
        <h4>{{ $t('advertisetment.ownFlag') }}
        </h4>
        <p>{{ $t('advertisetment.vipPri') }}
        </p>
      </el-card>
      <el-card class="box-card">
        <img :src=" require('../../../assets/imgs/icon_kefu.png')" alt="">
        <h4>{{ $t('advertisetment.o2oSerivce') }}
        </h4>
        <p>{{ $t('advertisetment.o2oPri') }}
        </p>
      </el-card>
    </div>
    <div class="auth-button">
      <el-button type="primary" @click="dialogVisible = true">{{ $t('advertisetment.appNow') }}</el-button>
    </div>
    <el-dialog
      title="No Verification During Testing Process"
     :visible.sync="dialogVisible"
      width="472px">
      
      <el-button width="100%" @click="goToAdvtising()">Click<strong> Here </strong>to Submit Advertisement</el-button>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AdvAuth',
  data() {
    return {
      dialogVisible: false
      // img1: require('../../../assets/imgs/advertising')
    }
  },
  beforeCreate() {

  },
  methods: {
    goToAdvtising(){
      this.$router.push({ name: 'advertising'})
    }
  }
}
</script>

<style lang="scss" scoped>
    .adv-auth {
        padding-top: 100px;
        .auth-title {
            margin: auto;
            margin-bottom: 40px;
            h3 {
                font-size: 28px;
                font-weight: 400;
                text-align: center;
                line-height: 40px;
            }
            p {
                margin-top: 30px;
                text-align: center;
                margin-top: 12px;
                line-height: 24px;
                font-size: 14px;
                color: #999
            }
        }
        .card-list {
            display: flex;
            justify-content: space-around;
            width: 1200px;
            margin: auto;
            .box-card {
                padding: 10px 28px;
                height: 344px;
                width: 275px;
                text-align: center;
                font-size: 14px;
                color: #999;
                img {
                    display: inline-block;
                    margin-left: 40px;
                    margin-right: 40px;
                    margin-top: 35px;
                }
                h4 {
                    font-size: 24px;
                    color: black;
                    margin-top: 30px;
                    margin-bottom: 30px;
                }
            }
        }
        .auth-button {
            margin-top: 85px;
            text-align: center;
        }
    }
</style>
