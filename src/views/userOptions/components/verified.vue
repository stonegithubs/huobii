<template>
  <el-card class="box-card verify">
    <div slot="header" class="clearfix">
      <span>{{ $t('navbar.user.verify') }}</span>
    </div>
    <!-- v-if="auditFlag === 2||auditFlag === null" -->
    <el-form v-if="getVerifyInfo === false||auditFlag === '2'" ref="verifyForm" :model="verifyForm" label-position="top" label-width="80px">
      <el-form-item :label="$t('userOptions.familyName')" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]" prop="familyName">
        <el-input v-model="verifyForm.familyName"/>
      </el-form-item>
      <el-form-item :label="$t('userOptions.givenName')" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]" prop="givenName">
        <el-input v-model="verifyForm.givenName"/>
      </el-form-item>
      <el-form-item :label="$t('userOptions.idNo')" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]" prop="idNo">
        <el-input v-model="verifyForm.idNo"/>
      </el-form-item>
      <el-form-item :label="$t('userOptions.type')" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]" prop="type">
        <el-input v-model="verifyForm.type"/>
      </el-form-item>
      <!-- <el-form-item :label="$t('captcha')" prop="captcha" :rules="[{ required: true, message: 'this field is required', trigger: 'blur' }]">
            <el-input v-model="verifyForm.captcha"></el-input>
          </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="beforeSubmit('verifyForm')">{{ $t('submit') }}</el-button>
      </el-form-item>
    </el-form>
    <div v-else class="ct">
      <h3 v-if=" auditFlag === '1'|| auditFlag >'2'"><i style="color: #55a532" class="el-icon-success"/> {{ $t('userOptions.verifyPassed') }}</h3>
      <h3 v-if=" auditFlag === '0'"><i style="color: dodgerblue" class="el-icon-info"/> {{ $t('userOptions.verifing') }}</h3>
      <h3 v-if=" auditFlag === '2'"><i style="color: red" class="el-icon-warning"/>{{ $t('userOptions.verifyFailed') }} </h3>
      <div class="vd-inner">
        <div class="verify-info">
          <span>{{ $t('userOptions.givenName') }}</span><span>
            {{ getVerifyInfo.name }}</span>
        </div>
        <div class="verify-info">
          <span>{{ $t('userOptions.familyName') }}</span><span>{{ getVerifyInfo.surName }}</span>
        </div>
        <div class="verify-info">
          <span>{{ $t('userOptions.idNo') }}</span><span>{{ getVerifyInfo.cardNo }}</span>
        </div>
      </div>
    </div>
    <el-dialog :before-close="handleClose" :title="$t('userOptions.yourCaptcha')" :visible.sync="smsDialog" width="300px">
      <el-input v-model="verifyForm.captcha"/>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button style="" @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="handleResubmit('verifyForm')">{{ $t('confirm') }}</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import {
  normalVerify,
  sendCaptcha1,
  getCaptcha
} from '../../../api/user'
import {sendUserCode} from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'Verified',
  data() {
    return {
      // auditFlag: 0,
      smsDialog: false,
      verifyForm: {
        familyName: '',
        givenName: '',
        idNo: '',
        type: '',
        captcha: ''
      },
      captchaVisible: false
    }
  },
  computed: {
     ...mapGetters(["getVerifyInfo"]),
    auditFlag() {
      if (this.getVerifyInfo === false) {
        return "0";
      } else {
        return this.getVerifyInfo.auditFlag;
      }
    },
  },
  
  created() {
      this.$store.dispatch('GetVerifyInfo').then(responese => {}).catch(_ => {})
  },
  methods: {
    beforeSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          sendUserCode(this)
        }
      })
    },
    handleResubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          formData.append('familyName', this.verifyForm.familyName),
          formData.append('givenName', this.verifyForm.givenName),
          formData.append('idNo', this.verifyForm.idNo),
          formData.append('type', this.verifyForm.type),
          formData.append('captcha', this.verifyForm.captcha),
          normalVerify(formData).then(responese => {
            if (responese.code === '200') {
              this.$notify.success(responese.message)
              this.$router.go(-1)
            }
          }).catch(err => {
            this.$notify.error(err.message)
          })
        } else {}
      })
    },
    handleClose(done) {
      this.$confirm(this.$t('confirmToClose'))
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style lang="scss" scoped>
  .verify {
    .ct {
      text-align: center;
    }
    h3 {
      font-size: 26px;
      display: inline-block;
      margin-bottom: 40px;
    }
    p {
      line-height: 24px;
      height: 24px;
      font-size: 14px;
    }
    .verify-info {
      padding: 20px 70px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
