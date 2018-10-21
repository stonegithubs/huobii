<template>
  <div class="trade-content">
    <el-dialog :modal="false" title="交易详情" :visible.sync="tradeInfoVisible" :lock-scroll="true" :modal-append-to-body="false">
      <el-form :model="tradeForm" :rules="tradeRule" ref="tradeForm">
        <div class="trade-tab">
          <div class="trade-name">{{currentTrade.r_name}}</div>
          <div class="tt-num"><span>数量：</span>{{currentTrade.num}} {{currentTrade.coin_name}}</div>
          <div class="tt-limit"><span>限额：</span>{{currentTrade.min_amount}}-{{currentTrade.max_amount}}</div>
            <div class="tt-price"><span>单价：</span>{{currentTrade.price}}</div>
            <div class="tt-payment">
              <span>支付方式：</span>
              <div v-for="item in currentTrade.payment_list">
                <div v-if="item === '支付宝'"><i class="iconfont icon-alipay"></i>支付宝</div>
                <div v-if="item === '银行转账'"><i class="iconfont icon-yinhangqia"></i>银行转账</div>
                <div  v-if="item === '微信支付'"><i class="iconfont icon-wechat"></i>微信支付</div>
              </div>
            </div>
        </div>
        <el-form-item label="限额" prop="currency" >
          <el-input v-model.number="tradeForm.currency"  autocomplete="off" v-on:input="getNumber"></el-input>
        </el-form-item>
        <el-form-item label="下单数量" prop="number" >
          <el-input v-model.number="tradeForm.number" autocomplete="off" v-on:input="getCurrency"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="tradeForm.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付方式" prop="payment">
          <el-select v-model="tradeForm.payment" placeholder="请选择支付方式">
            <el-option label="支付宝" value="alipay"></el-option>
            <el-option label="微信" value="wechat"></el-option>
            <el-option label="银行卡" value="bank"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="handleOrder">下单</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
    <el-dialog :modal="false" title="设置昵称与交易密码" :visible.sync="verifyVisible" :lock-scroll="true" :modal-append-to-body="false">
      <div style="margin: 20px 0">为保证交易安全，请您耐心完善以下信息</div>
      <el-form :model="verifyForm" :rules="verifyRule" ref="verifyForm">
        <el-form-item label="昵称" prop="nick_name" >
          <el-input v-model="verifyForm.nick_name" autocomplete="off"  placeholder="建议不要使用您的真实姓名，设置后不可更改"></el-input>
        </el-form-item>
        <el-form-item label="安全密码" prop="safe_password">
          <el-input v-model="verifyForm.safe_password" type="password" autocomplete="off" placeholder="用于保护您的资产安全"></el-input>
        </el-form-item>
        <el-form-item label="确认安全密码" prop="password_confirm" >
          <el-input v-model="verifyForm.password_confirm" type="password" autocomplete="off" placeholder="请您确认资金密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="handleVerify">完成</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
    <el-dialog :modal="false" title="认证成功" :visible.sync="verifySuccessVisible" :lock-scroll="true" center :modal-append-to-body="false">
      <div style="text-align: center;">
        <i class="el-icon-success" style="color: #55a532; font-size: 30px"></i>
        <div class="dialog-info">
          <div style="margin: 20px 0;font-weight: 700;"><span>您已经通过认证！</span></div>
          <div style="margin: 20px 0"><span>通过高级认证可以进行大额交易</span></div>
          <el-button type="primary" @click="this.advancedVerifyVisible = true">高级认证</el-button>
          <el-button @click="verifySuccessVisible=false">跳过</el-button>
          <!--todo:高级认证未完成-->
        </div>

      </div>
    </el-dialog>
    <el-dialog :modal="true" title="高级认证"  :visible.sync="advancedVerifyVisible" :lock-scroll="true" center :modal-append-to-body="false" >
      <div style="text-align: center;">
        <div class="dialog-info">
          <div style="margin: 20px 0;font-weight: 700;"><span>交易额超过单笔 {{ normalUserMax }}{{ this.currencyType }} 或累计 {{ normalUserTotal }}{{this.currencyType}} 需进行高级认证！</span></div>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="/api/v1/user/verify_advanced"
            list-type="picture"
            :limit="3"
            :on-success="advanceNext"
            :on-error="handleAdvanceError"
            :before-upload="beforeAvatarUpload"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :headers="{'token': this.$store.state.user.token}"
            :auto-upload="false">
            <!--todo:token名字在这里写死了-->
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button size="small" type="primary" @click="handleAdvancedVerify">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">请上传身份证正反面照片</div>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2mb</div>
          </el-upload>
        </div>

      </div>
    </el-dialog>
    <!--高级认证需要测试 视频上传待定-->
    <el-table class="hidden-xs-only" :data="tradeData" style="width: 100%">
      <el-table-column prop="true_name" label="商家(订单数|完成率)" width="180">
        <template slot-scope="scope">
          <div class="avatar-container" :class="getAvatarColor(scope.row.id)">
            <em class="name">{{scope.row.r_name}}</em>
          </div>
          <div>
            <router-link :to="{ name: 'trader', params: {id: scope.row.id}}">
              <span class="user-info" style="margin-left: 10px">{{ scope.row.nick_name }} ({{scope.row.order_msg.finish}} | {{scope.row.order_msg.finish_rate}})</span>
            </router-link>
          </div>

        </template>
      </el-table-column>

      <el-table-column sortable prop="num" label="数量" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.num }} {{scope.row.coin_name}}</span>
        </template>
      </el-table-column>
        <!--todo:这里限额单价等需要单位 需要和后端协商-->
      <el-table-column   label="限额">
        <template slot-scope="scope">
          <span>{{ scope.row.min_amount }}-{{ scope.row.max_amount }}</span>
        </template>
      </el-table-column>

      <el-table-column sortable  prop="price"  label="单价" >
        <template slot-scope="scope">
          <span class="price">{{ scope.row.price }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="payment_list" label="支付方式">
        <template slot-scope="scope">
        <span v-for="icon in scope.row.payment_list">
        <el-tooltip  v-if="icon === '支付宝'" class="item" effect="dark" content="alipay" placement="bottom">
              <img :src="getIcon('alipay')">
            </el-tooltip>
             <el-tooltip  v-if="icon === '银行转账'" class="item" effect="dark" content="bank" placement="bottom">
              <img :src="getIcon('bank')">
            </el-tooltip>
             <el-tooltip  v-if="icon === '微信支付'" class="item" effect="dark" content="wechat" placement="bottom">
              <img :src="getIcon('wechat')">
            </el-tooltip>
        </span>
        </template>
      </el-table-column>

      <el-table-column prop="id" label="操作">
        <template slot-scope="scope">
          <span><el-button @click="handleTrade(scope.row)" type="primary">购买{{ scope.row.coin_name }}</el-button></span>
        </template>
      </el-table-column>

    </el-table>
    <div class="m-trade-list hidden-sm-and-up">
      <div class="trade-tab" v-for="item in tradeData">
        <div class="trade-name">
          <div class="avatar-container">
            <em class="name">{{item.r_name}}</em>
          </div>
          <div>
            <router-link :to="{ name: 'trader' }">
              {{item.nick_name}} ({{item.order_msg.finish}} | {{item.order_msg.finish_rate}})
            </router-link>
          </div>
        </div>
        <div class="tt-num"><span>数量：</span>{{item.num}} {{item.coin_name}}</div>
        <div class="tt-limit"><span>限额：</span>{{item.min_amount}}-{{item.max_amount}}</div>
        <div class="tt-price"><span>单价：</span>{{item.price}}</div>
        <div class="m-payment">
          <span>支付方式：</span>
          <span v-for="icon in item.payment_list">
            <el-tooltip  v-if="icon === '支付宝'" class="item" effect="dark" content="alipay" placement="bottom">
              <img :src="getIcon('alipay')">
            </el-tooltip>
             <el-tooltip  v-if="icon === '银行转账'" class="item" effect="dark" content="bank" placement="bottom">
              <img :src="getIcon('bank')">
            </el-tooltip>
             <el-tooltip  v-if="icon === '微信支付'" class="item" effect="dark" content="wechat" placement="bottom">
              <img :src="getIcon('wechat')">
            </el-tooltip>
          </span>
        </div>
          <el-button type="primary" @click="handleTrade(item)">购买{{item.coin_name}}</el-button>
      </div>
    </div>

    <div class="mpagination">
      <el-pagination class="hidden-xs-only"
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
      <el-pagination class="hidden-sm-and-up"
        small
        layout="prev, pager, next"
        :total="50">
      </el-pagination>

    </div>
  </div>
</template>

<script>
  import { getAvatarColor } from '../../../utils/index'
export default {
  name: "trade-content",
  data(){
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入安全密码'));
      } else if (value !== this.verifyForm.safe_password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      tradeData: [
      {
        "id": "30",
        "user_id": "176",
        "type": "0",
        "country": "\u7f8e\u56fd",
        "currency": "CNY",
        "premium": "5.00",
        "price": "684.60",
        "min_price": "0.00",
        "min_amount": "1000.00",
        "max_amount": "10000.00",
        "prompt": "60",
        "payment": "{\"wechat\":\"\\u5fae\\u4fe1\\u652f\\u4ed8\"}",
        "message": "~~~~",
        "coin_name": "ADE",
        "num": 9984.53929302,
        "status": "0",
        "add_time": "1536285398",
        "true_name": "x\u00b7X",
        "nick_name": "X",
        "r_name": "X",
        "payment_list":
          {
            "wechat": "\u5fae\u4fe1\u652f\u4ed8"
          },
        "order_msg":
          {
            "total": "9",
            "three": "0",
            "finish": "8",
            "finish_rate": "88.89",
            "appeal": 0,
            "success": 0,
            "fangxing": 0
          }
      },
      {
        "id": "18",
        "user_id": "1",
        "type": "0",
        "country": "\u4e2d\u56fd",
        "currency": "CNY",
        "premium": "10.00",
        "price": "717.20",
        "min_price": "0.00",
        "min_amount": "100.00",
        "max_amount": "1000.00",
        "prompt": "30",
        "payment": "{\"wechat\":\"\\u5fae\\u4fe1\\u652f\\u4ed8\",\"bank\":\"\\u94f6\\u884c\\u8f6c\\u8d26\",\"alipay\":\"\\u652f\\u4ed8\\u5b9d\"}",
        "message": "\u63a5\u54af\u4e86",
        "coin_name": "ADE",
        "num": 2,
        "status": "0",
        "add_time": "1535594888",
        "true_name": "\u738b\u5f3a",
        "nick_name": "",
        "r_name": "\u738b",
        "payment_list":
          {
            "wechat": "\u5fae\u4fe1\u652f\u4ed8",
            "bank": "\u94f6\u884c\u8f6c\u8d26",
            "alipay": "\u652f\u4ed8\u5b9d"
          },
        "order_msg":
          {
            "total": "41",
            "three": "0",
            "finish": "27",
            "finish_rate": "65.85",
            "appeal": 0,
            "success": 0,
            "fangxing": 0
          }
      },
      {
        "id": "68",
        "user_id": "197",
        "type": "0",
        "country": "\u4e2d\u56fd",
        "currency": "CNY",
        "premium": "10.00",
        "price": "717.20",
        "min_price": "0.00",
        "min_amount": "10.00",
        "max_amount": "717.00",
        "prompt": "30",
        "payment": "{\"bank\":\"\\u94f6\\u884c\\u8f6c\\u8d26\",\"wechat\":\"\\u5fae\\u4fe1\\u652f\\u4ed8\",\"alipay\":\"\\u652f\\u4ed8\\u5b9d\"}",
        "message": "111111111111111",
        "coin_name": "ADE",
        "num": 1,
        "status": "0",
        "add_time": "1536549081",
        "true_name": "123",
        "nick_name": "111",
        "r_name": "1",
        "payment_list":
          {
            "bank": "\u94f6\u884c\u8f6c\u8d26",
            "wechat": "\u5fae\u4fe1\u652f\u4ed8",
            "alipay": "\u652f\u4ed8\u5b9d"
          },
        "order_msg":
          {
            "total": "9",
            "three": "0",
            "finish": "4",
            "finish_rate": "44.44",
            "appeal": 0,
            "success": 0,
            "fangxing": 0
          }
      },
      {
        "id": "69",
        "user_id": "197",
        "type": "0",
        "country": "\u4e2d\u56fd",
        "currency": "CNY",
        "premium": "10.00",
        "price": "717.20",
        "min_price": "0.00",
        "min_amount": "10.00",
        "max_amount": "10000.00",
        "prompt": "30",
        "payment": "{\"bank\":\"\\u94f6\\u884c\\u8f6c\\u8d26\",\"wechat\":\"\\u5fae\\u4fe1\\u652f\\u4ed8\",\"alipay\":\"\\u652f\\u4ed8\\u5b9d\"}",
        "message": "111111111111",
        "coin_name": "ADE",
        "num": 1000,
        "status": "0",
        "add_time": "1536549215",
        "true_name": "123",
        "nick_name": "111",
        "r_name": "1",
        "payment_list":
          {
            "bank": "\u94f6\u884c\u8f6c\u8d26",
            "wechat": "\u5fae\u4fe1\u652f\u4ed8",
            "alipay": "\u652f\u4ed8\u5b9d"
          },
        "order_msg":
          {
            "total": "9",
            "three": "0",
            "finish": "4",
            "finish_rate": "44.44",
            "appeal": 0,
            "success": 0,
            "fangxing": 0
          }
      },
      {
        "id": "70",
        "user_id": "197",
        "type": "0",
        "country": "\u4e2d\u56fd",
        "currency": "CNY",
        "premium": "10.00",
        "price": "717.20",
        "min_price": "0.00",
        "min_amount": "10.00",
        "max_amount": "1000.00",
        "prompt": "30",
        "payment": "{\"bank\":\"\\u94f6\\u884c\\u8f6c\\u8d26\",\"wechat\":\"\\u5fae\\u4fe1\\u652f\\u4ed8\",\"alipay\":\"\\u652f\\u4ed8\\u5b9d\"}",
        "message": "12222222222",
        "coin_name": "ADE",
        "num": 1000,
        "status": "0",
        "add_time": "1536549279",
        "true_name": "123",
        "nick_name": "111",
        "r_name": "1",
        "payment_list":
          {
            "bank": "\u94f6\u884c\u8f6c\u8d26",
            "wechat": "\u5fae\u4fe1\u652f\u4ed8",
            "alipay": "\u652f\u4ed8\u5b9d"
          },
        "order_msg":
          {
            "total": "9",
            "three": "0",
            "finish": "4",
            "finish_rate": "44.44",
            "appeal": 0,
            "success": 0,
            "fangxing": 0
          }
      },
      {
        "id": "76",
        "user_id": "223",
        "type": "0",
        "country": "\u4e2d\u56fd",
        "currency": "CNY",
        "premium": "10.00",
        "price": "717.20",
        "min_price": "0.00",
        "min_amount": "10.00",
        "max_amount": "1000.00",
        "prompt": "30",
        "payment": "{\"bank\":\"\\u94f6\\u884c\\u8f6c\\u8d26\"}",
        "message": "\u6d4b\u8bd5\u5e7f\u544a\u53d1\u5e03",
        "coin_name": "ADE",
        "num": 1000,
        "status": "0",
        "add_time": "1537395972",
        "true_name": "\u5b87\u7fd4",
        "nick_name": "\u5b87\u7fd4",
        "r_name": "\u5b87",
        "payment_list":
          {
            "bank": "\u94f6\u884c\u8f6c\u8d26"
          },
        "order_msg":
          {
            "total": "3",
            "three": "0",
            "finish": "2",
            "finish_rate": "66.67",
            "appeal": 0,
            "success": 0,
            "fangxing": 0
          }
      },
      {
        "id": "55",
        "user_id": "13",
        "type": "0",
        "country": "\u4e2d\u56fd",
        "currency": "CNY",
        "premium": "13.00",
        "price": "736.76",
        "min_price": "0.00",
        "min_amount": "11.00",
        "max_amount": "99.00",
        "prompt": "30",
        "payment": "{\"bank\":\"\\u94f6\\u884c\\u8f6c\\u8d26\",\"wechat\":\"\\u5fae\\u4fe1\\u652f\\u4ed8\"}",
        "message": "456",
        "coin_name": "ADE",
        "num": 25,
        "status": "0",
        "add_time": "1536287609",
        "true_name": "\u738b\u5c0f\u59d0",
        "nick_name": "",
        "r_name": "\u738b",
        "payment_list":
          {
            "bank": "\u94f6\u884c\u8f6c\u8d26",
            "wechat": "\u5fae\u4fe1\u652f\u4ed8"
          },
        "order_msg":
          {
            "total": "10",
            "three": "0",
            "finish": "4",
            "finish_rate": "40.00",
            "appeal": 0,
            "success": 0,
            "fangxing": 0
          }
      }],
      tradeInfoVisible: false,    //交易表单可视
      verifyVisible: false,       //验证个人信息表单可视
      advancedVerifyVisible:false, //高级认证表单可视
      verifySuccessVisible: false, //初级认证成功表单可视
      currentTrade: {},
      currencyType: 'CNY',         //写死 现金种类
      currentPrice:1,           //当前交易单价
      normalUserMax: 2000,      //普通用户单笔最大交易额
      normalUserTotal:50000,    //普通用户累计最大交易额
      currentTotal:0,           //写死 用户累计交易额 用于对比
      isVerified: true,         //todo: 写死 需要请求后台 没验证昵称 安全密码 不可以购买
      isAdvanceVerified: false, //同样写死  是否高级认证
      tradeForm: {
        password: '',
        number: 0,
        currency: 0,
        payment:''
      },
      verifyForm: {
        nick_name: '',
        safe_password: '',
        password_confirm: ''
      },
      fileList:[      // 高级认证照片上传

      ],
      tradeRule:{
        password:[
          { required: true, message: '请输入安全密码', trigger: 'blur' },
        ],
        number:[
          { required: true, message: '请输入交易数量', trigger: 'blur' },
        ],
        currency:[
          { required: true, message: '请输入交易金额', trigger: 'blur' },
        ],
        payment:[
          { required: true, message: '请选择支付方式', trigger: 'blur' },
        ]

    },
      verifyRule:{
        nick_name:[
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        safe_password: [
          { required: true, message: '请输入安全密码', trigger: 'blur' },
          { min:6, max:20, message: '安全密码至少为6个字符', trigger: 'blur' },
        ],
        password_confirm:[
          { required: true, message: '请再次输入安全密码', trigger: 'blur' },
          { validator:validatePass2,  trigger: 'blur' },
        ]

      }
    }
  },
  created(){
  //   拉取交易信息
  //
  //

    if(this.$store.state.user.verifyInfo === null) {
      // 拉取实名信息
    }
  },
  methods: {
    // 交易面板模块
    getCurrency(){
      this.tradeForm.currency = this.tradeForm.number*this.currentPrice
    },
    getNumber(){
      this.tradeForm.number =  this.tradeForm.currency/this.currentPrice
    },
    handleTrade(row){
      this.currentTrade = row;
      if(this.$store.state.user.token){
        //已登录
        if(this.isVerified){
          //已普通验证
            this.tradeInfoVisible = true;
            this.currentPrice = row.price;
        } else {
          //未验证
          this.verifyVisible = true
        }
      }else {
        //未登录
        this.$router.push('/login')
        this.$message.info('请先登录')
      }


    },
    handleOrder(){
      this.$refs['tradeForm'].validate((valid) => {
        if (valid) {
          if((this.tradeForm.currency >= this.normalUserMax || this.currentTotal >= this.normalUserTotal) && !this.isAdvanceVerified ){
            //大额交易未高级认证
            this.advancedVerifyVisible = true; //打开认证窗口
          }else{
            alert('submit!');  //todo:发送
            this.tradeInfoVisible=false
            this.$router.push('/trade_order')
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })    },
    handleVerify(){
      this.$refs['verifyForm'].validate((valid) => {
        if (valid) {
          alert('submit!');  //todo:发送
          this.advancedVerifyVisible = true  //打开高级认证面板
          this.verifyVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },

    //  高级认证模块
    handleAdvancedVerify(){
      // console.log(this.$refs.upload)
      this.$refs.upload.submit();
    },
    advanceNext(response, file, fileList){
      this.advancedVerifyVisible = false
      this.$message.success('认证已经提交，请耐心等待')
    },
    handleAdvanceError(response, file, fileList){
      this.$message.error(response.data.data.message)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传3个文件`);
    },

    //界面
    getIcon(iconName){
      return this.$store.getters.getPaymentIcon(iconName)
    },
    getAvatarColor(id){
     return getAvatarColor(id)
    }

  },
}
</script>

<style lang="scss" >
  .trade-content {
    width: 90%;
    .el-table /deep/{
      .cell {
        display: flex;
        align-items: center;
      }
    }
    .avatar-container {
      height: 40px;
      width: 40px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      position: relative;
      .name {
        color: white;
      }
    }
    .el-input__inner {
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      padding: 0 15px;
      -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
    }
    .iconfont {
      font-size: 18px;
    }
    .icon-alipay {
      color: deepskyblue;
    }
    .icon-wechat {
      color: forestgreen;
    }
    .icon-yinhangqia {
      color: yellowgreen;
    }
    .price {
      color: #489972;
      font-size: 16px;
      font-weight: 600;
    }
    .user-info {
      color: #3b68bb;
    }
    .trade-tab {
      span {
        display: inline-block;
        margin-right: 40px;
        color: #999
      }
      .tt-price {
        color: #489972;
        font-weight: 700;
        span {
          font-weight: 400;
        }
      }
      .trade-name {
        font-weight: 500;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .avatar-container {
          margin-right: 20px;
        }
        a {
          color: #3b68bb;
        }
      }
    }
    .m-trade-list {
      .trade-tab{
        padding: 45px 0;
        border-bottom: 1px solid hsla(0,0%,85%,.5);
        width: 100%;
        position: relative;
      }
      .m-payment{
        span{
          margin-right: 5px;
        }
        .pay-list {
          i {
            display: inline-block;
          }
        }
      }
      .el-button {
        position: absolute;
        right: 0;
        bottom: 0;
        span {
          color: white;
          margin: auto;
        }
        margin-bottom: 20px;
      }
    }
    .el-dialog{
      z-index: 2001;
      position: relative;
      @media (max-width: 768px) {
        width: 90%;
      }
      /*i {*/
        /*font-size: 30px;*/
        /*color: #55a532;*/
      /*}*/

    }
    .mpagination {
      display: flex;
      margin-top: 40px;
      width: 100%;
      /*align-content: center;*/
      /*align-items: center;*/

      .el-pagination {
        margin: auto;
      }
    }

  }
</style>
