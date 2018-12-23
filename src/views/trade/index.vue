<template>
  <el-container class="trade">
    <div class="trade-wrapper">
      <!-- <tradeSelect/> -->
      <!-- <tradeContent/> -->
      <merchant-list></merchant-list>  
    </div>
    <!-- <el-dialog :modal="false" :visible.sync="verifyVisible" :lock-scroll="true" :modal-append-to-body="false" title="设置昵称与交易密码">
      <div style="margin: 20px 0">为保证交易安全，请您耐心完善以下信息</div>
      <el-form ref="verifyForm" :model="verifyForm" :rules="verifyRule" background-color="#f2f3f8">
        <el-form-item label="昵称" prop="nick_name">
          <el-input v-model="verifyForm.nick_name" autocomplete="off" placeholder="建议不要使用您的真实姓名，设置后不可更改"/>
        </el-form-item>
        <el-form-item label="安全密码" prop="safe_password">
          <el-input v-model="verifyForm.safe_password" type="password" autocomplete="off" placeholder="用于保护您的资产安全"/>
        </el-form-item>
        <el-form-item label="确认安全密码" prop="password_confirm">
          <el-input v-model="verifyForm.password_confirm" type="password" autocomplete="off" placeholder="请您确认资金密码"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="handleVerify">完成</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :modal="false" :visible.sync="verifySuccessVisible" :lock-scroll="true" :modal-append-to-body="false" title="认证成功" center>
      <div style="text-align: center;">
        <i class="el-icon-success" style="color: #55a532; font-size: 30px"/>
        <div class="dialog-info">
          <div style="margin: 20px 0;font-weight: 700;"><span>您已经通过认证！</span></div>
          <div style="margin: 20px 0"><span>通过高级认证可以进行大额交易</span></div>
          <el-button type="primary" @click="this.advancedVerifyVisible = true">高级认证</el-button>
          <el-button @click="verifySuccessVisible=false">跳过</el-button>
          todo:高级认证未完成
        </div>
      </div>
    </el-dialog>
    <el-dialog :modal="true" :visible.sync="advancedVerifyVisible" :lock-scroll="true" :modal-append-to-body="false" title="高级认证" center>
      <div style="text-align: center;">
        <div class="dialog-info">
          <div style="margin: 20px 0;font-weight: 700;"><span>交易额超过单笔 {{ normalUserMax }}{{ this.currencyType }} 或累计 {{ normalUserTotal }}{{ this.currencyType }} 需进行高级认证！</span></div>
          <el-upload
            ref="upload"
            :limit="3"
            :on-success="advanceNext"
            :on-error="handleAdvanceError"
            :before-upload="beforeAvatarUpload"
            :on-exceed="handleExceed" 
            class="upload-demo" 
            :file-list="fileList" 
            action="/api/v1/user/verify_advanced" 
            :headers="{'token': this.$store.state.user.token}"
            :auto-upload="false"
            list-type="picture">
            todo:token名字在这里写死了
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button size="small" type="primary" @click="handleAdvancedVerify">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">请上传身份证正反面照片</div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2mb</div>
          </el-upload>
        </div>
      </div>
    </el-dialog>
    高级认证需要测试 视频上传待定-->
  </el-container> 
</template>

<script>
import tradeContent from './components/tradeContent'
import merchantList from './components/merchantList'

// import tradeSelect from './components/tradeSelect'
import ElContainer from 'element-ui/packages/container/src/main'
export default {
  name: 'Trade',
  components: {
    ElContainer,
    // tradeSelect,
    tradeContent,
    merchantList
  },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入安全密码'))
      } else if (value !== this.verifyForm.safe_password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      tradeInfoVisible: false, // 交易表单可视
      verifyVisible: false, // 验证个人信息表单可视
      advancedVerifyVisible: false, // 高级认证表单可视
      verifySuccessVisible: false, // 初级认证成功表单可视
      currentTrade: {},
      currencyType: 'CNY', // 写死 现金种类
      currentPrice: 1, // 当前交易单价
      normalUserMax: 2000, // 普通用户单笔最大交易额
      normalUserTotal: 50000, // 普通用户累计最大交易额
      currentTotal: 0, // 写死 用户累计交易额 用于对比
      isVerified: true, // todo: 写死 需要请求后台 没验证昵称 安全密码 不可以购买
      isAdvanceVerified: false, // 同样写死  是否高级认证
      tradeForm: {
        // password: "",
        number: 0,
        currency: 0
        // payment: ""
      },
      verifyForm: {
        nick_name: '',
        safe_password: '',
        password_confirm: ''
      },
      fileList: [
        // 高级认证照片上传
      ],
      tradeRule: {
        password: [{
          required: true,
          message: '请输入安全密码',
          trigger: 'blur'
        }],
        number: [{
          required: true,
          message: '请输入交易数量',
          trigger: 'blur'
        }],
        currency: [{
          required: true,
          message: '请输入交易金额',
          trigger: 'blur'
        }],
        payment: [{
          required: true,
          message: '请选择支付方式',
          trigger: 'blur'
        }]
      },
      verifyRule: {
        nick_name: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        }],
        safe_password: [{
          required: true,
          message: '请输入安全密码',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 20,
          message: '安全密码至少为6个字符',
          trigger: 'blur'
        }
        ],
        password_confirm: [{
          required: true,
          message: '请再次输入安全密码',
          trigger: 'blur'
        },
        {
          validator: validatePass2,
          trigger: 'blur'
        }
        ]
      }
    }
  },
  methods: {
    handleVerify() {
      this.$refs['verifyForm'].validate(valid => {
        if (valid) {
          alert('submit!') // todo:发送
          this.advancedVerifyVisible = true // 打开高级认证面板
          this.verifyVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //  高级认证模块
    handleAdvancedVerify() {
      // console.log(this.$refs.upload)
      this.$refs.upload.submit()
    },
    advanceNext(response, file, fileList) {
      this.advancedVerifyVisible = false
      this.$message.success('认证已经提交，请耐心等待')
    },
    handleAdvanceError(response, file, fileList) {
      this.$message.error(response.data.data.message)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传3个文件`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .trade /deep/ {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;

    .trade-wrapper {
      width: 1200px;
      min-height: 800px;
      margin: auto;
    }
    // .trade-select{

    // }
  }
</style>
