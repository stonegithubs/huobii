<template>
  <div class="vd">
    <h3 v-if="getStatus === 'success'"><i style="color: #55a532" class="el-icon-success"></i> 您已经通过了实名认证</h3>
    <h3 v-else-if="getStatus === 'pending'"><i style="color: dodgerblue" class="el-icon-info"></i> 您提交的信息正在审核中</h3>
    <h3 v-else><i style="color: red" class="el-icon-warning"></i> 审核未通过</h3>
    <div class="vd-inner">
      <p><span>name</span><span>{{ this.$store.state.user.verifyInfo.name }}</span></p>
      <p><span>surname</span><span>{{ this.$store.state.user.verifyInfo.surName }}</span></p>
      <p><span>idNo</span><span>{{ this.$store.state.user.verifyInfo.cardNo }}</span></p>
      <el-button v-if="getStatus === 'failed'" @click="verifiedDiaVible = true" type="primary" style="width: 250px;margin-top: 30px">重新提交</el-button>
    </div>
    <el-dialog :modal="true" style="width:70%;margin:auto" title="实名认证" :visible.sync="verifiedDiaVible" :lock-scroll="true" center :modal-append-to-body="false">
      <div style="text-align: center;">
        <div class="dialog-info">
          <el-form label-width="80px" :model="verifyForm" ref='verifyForm'>
            <el-form-item label="familyName" prop="familyName" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]">
              <el-input v-model="verifyForm.familyName"></el-input>
            </el-form-item>
            <el-form-item label="givenName" prop="givenName" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]">
              <el-input v-model="verifyForm.givenName"></el-input>
            </el-form-item>
            <el-form-item label="idNo" prop="idNo" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]">
              <el-input v-model="verifyForm.idNo"></el-input>
            </el-form-item>
            <el-form-item label="type" prop="type" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]">
              <el-input v-model="verifyForm.type"></el-input>
            </el-form-item>
            <el-form-item label="captcha" prop="captcha" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]">
              <el-input v-model="verifyForm.captcha"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleResubmit('verifyForm')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { normalVerify } from "../../../api/user";
export default {
  name: "verified",
  data() {
    return {
      status: 'failed', //todo:状态写死 应该再create中拉取信息 存入vuex
      verifiedDiaVible: false,
      verifyForm: {
        familyName: '',
        givenName: '',
        idNo: '',
        type: '',
        captcha: ''
      }
    }
  },
  methods: {
    handleResubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = new FormData();
          formData.append('familyName', this.verifyForm.familyName),
          formData.append('givenName',this.verifyForm.givenName),
          formData.append('idNo', this.verifyForm.idNo),
          formData.append('type',this.verifyForm.type ),
          formData.append('captcha',this.verifyForm.captcha ),
          normalVerify(formData).then(responese=>{
              this.$notify.success(responese.message)
              alert(responese.message)
          }).catch(err=>{
            this.$notify.error(err.message)
            alert(err.messages)
          })
        } else {

        }
      });
    }
  },
  created() {
    if (this.$store.state.verifyInfo === null) {
      this.$store.dispatch('GetVerifyInfo').then(_ => {}).catch(_ => {
        this.$notify.error(_.message)
      })
    }
  },
  computed: {
    getStatus() {
      if (this.status === 'pending') {
        return 'pending'
      } else if (this.status === 'success') {
        return 'success'
      } else {
        return 'failed'
      }
    },
  }
}

</script>
<style lang="scss" scoped>
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

    p {
      line-height: 56px;
      color: #c7cce6;
      width: 100%;

      :first-child {
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

  .dialog-info {
    padding: 10px 50px;
  }
  .el-input {
    width:80%;
  }
}

</style>
