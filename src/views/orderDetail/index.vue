<template>
    <div class="trade-order">
      <div class="to-info">
        <span class="ti-order-id">
          订单：{{this.orderInfo.order_id}}
        </span>
        <div class="ti-order-message">
          您向{{orderInfo.target_user.name}}购买{{orderInfo.number}}{{orderInfo.coinType}}
        </div>
        <div class="ti-price">
          <span>单价:</span>{{orderInfo.price}} {{ orderInfo.coinType }}
        </div>
        <div class="ti-total">
          <span>总价:</span>{{orderInfo.total}}
        </div>
      </div>
      <div class="to-payment">
        <div class="tp-tip">
          <span>卖方收款方式 </span>
          <hr/>
          <span  v-for="item in orderInfo.ensure.ensureVerify" class="tq-verify"><i class="el-icon-success"></i> {{item.type}}认证</span>
        </div>
        <div class="tp-list" v-if="orderInfo.isPending">
          <div v-for="item in orderInfo.target_user.payment_list">
            <span>{{item.name}}</span>{{item.payname}}{{item.cardNo}}
          </div>
        </div>
        <p class="payment-canceled" v-if="orderInfo.isCanceled">订单已失效 支付方式无法查看</p>
        <p class="payment-success" v-if="orderInfo.isSuccess">订单已放行</p>
      </div>
      <div class="to-service">
        <div class="ts-tip">
          <span>增值保障服务</span>
          <hr/>
        </div>
        <div  class="ts-inner"  v-if="orderInfo.isPending">
          <span> <a :href="this.law_service.link"></a>服务协议</span>
        </div>
      </div>
      <div class="to-pay" v-if="orderInfo.isPending">
        <p>待支付，请于{{ orderInfo.timeLeft }}秒内向{{ orderInfo.target_user.name }}支付 <span class="tp-price">{{ orderInfo.total }}</span>  ,付款参考号: <span class="tp-flag">{{orderInfo.flagNumber}}</span></p>
        <div  class="tp-pay">
          <el-button type="primary" @click="handlePay">立即支付</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </div>
      </div>
      <p class="payment-canceled" v-if="orderInfo.isCanceled">订单已失效 无法支付</p>
      <p class="payment-success" v-if="orderInfo.isSuccess">订单已放行</p>
      <div class="to-question">
        <div class="tq-user">
          <div v-if="this.orderInfo.ensure">
            <p v-if="this.orderInfo.ensure.ensureMoney" class="ensure-money"><i class="el-icon-success"></i> 对方已缴纳 {{orderInfo.ensure.ensureMoney.number}} {{orderInfo.ensure.ensureMoney.type}}</p>
          </div>
        </div>
        <div class="tq-title">
          <span>常见问题</span>
        </div>
        <el-collapse v-model="activeNames" >
          <el-collapse-item v-for="item in question_list" :key="item.id" :title="item.title" :name="item.id">
            <div>{{item.des}}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
</template>

<script>
export default {
  name: "order-detail",
  data(){
    return {
      orderInfo:{       //订单信息
        order_id: this.$route.params.id,   //订单号
        isCanceled: false,            // TODO: 写死失效订单
        isSuccess: true,             //TODO: 写死 订单放行
        isPending: false,              //
        flagNumber: '12345',        // 付款参考号
        target_user:{
          id: -1,
          name: '测试名字',
          payment_list:[
            { payment_id: 1, name: '支付宝', payname:'赵海鹏', cardNo:'765789876789878'},
            { payment_id: 2, name: '微信', payname:'赵海鹏',cardNo:'878678909087'},
            { payment_id: 3, name: '银行卡', payname:'赵海鹏',cardNo:'9876546789876'},
          ],
        },    //交易对象
        ensure:{
          ensureMoney:{ type: '测试币种', number:'00000' },  //保证金
          ensureVerify:[
            { type: 'email'},
            { type: 'phone'},
            { type: 'trueName'},
          ]
        },      //保证金 认证信息
        price: 0,       //单价
        coinType: '测试币种',   //币种
        number: 0,      //购买个数
        total: 0,       //总价
        timeLeft: 900    //订单剩余时间 写死！
      },
      law_service:{
        link:'www.baidu.com'
      },
      orderForm: {

      },
      question_list: [
        { id: 1, title:'buyy8oihb',des:'测试问题测试问题测试问题测试问题', link:'www.baidu.com' },
        { id: 2, title:'b测试测试b',des:'测试问题测试问题测试问题', link:'www.baidu.com' },
        { id: 3, title:'hasbas',des:'测试问65789090876ghm,', link:'www.baidu.com' },
        { id: 4, title:'buyy8oihb',des:'测试问题hvgujb9809题测试问题', link:'www.baidu.com' },
      ], //常见问题列表
      activeNames: ['1']
    }
  },
  methods: {
    handlePay(){

    },
    handleCancel(){

    },
  },
  mounted(){
    setInterval(()=>{
      this.orderInfo.timeLeft--
    },1000)
  }
}
</script>

<style lang="scss" scoped>
  .trade-order {
    width: 70%;
    margin: auto;
    .payment-canceled {
      background-color: #d9d9d9;
      color: #fff;
      display: inline-block;padding: 2px 8px;
      margin: 24px 0;
    }
    .payment-success{
      background-color: rgba(103, 194, 56, 0.6);
      color: #fff;
      display: inline-block;padding: 2px 8px;
      border-radius: 10px;
      margin: 45px 0;
    }
    @media (max-width: 768px){
      width: 80%;
    }
    .to-info{
      margin-top: 40px;
      .ti-order-id {
        font-size: 12px;
        color: darkgrey;
      }
      .ti-order-message {
        font-size: 26px;
        line-height: 60px;
        color: black;
      }
      .ti-price,.ti-total {
        span {
          font-weight: 800;
          margin-right: 40px;
        }
      }
      .ti-total {
        color: #55a532;
        font-weight: 700;
        span {
          color: black;
        }
      }
    }
    .to-payment {
      margin-top: 20px;
      .tp-tip {
        margin-bottom: 20px;
        span {
          color: darkgrey;
          font-size: 12px;
        }
        hr {
          margin: 5px 0;
        }
        .tq-verify {
          font-size: 12px;
          font-weight: 600;
          color: #55a532;
          margin-right: 20px;
        }
      }

    }
    .to-service {
      margin-top: 30px;
      .ts-tip {
        font-size: 12px;
        color: darkgrey;
        hr {
          margin-top: 10px;
        }
      }
      .ts-inner {
        span {
          color: #7a98f7;
          font-size: 14px;
        }
      }
    }
    .to-pay {
       p {
        font-size: 18px;
        line-height: 40px;
        font-weight: 700;
         .tp-price {
           color: #55a532;
         }
         .tp-flag {
           color: #dab863;
         }
      }
      .tp-pay {
        button {
          width: 180px;
          margin-bottom: 30px;
        }
        .el-button+.el-button {
          margin-left: 0 ;
          margin-right: 10px;
        }
      }

    }
    .to-question {
      .tq-user {
        font-size: 12px;
        font-weight: 600;
        color: #55a532;
        .ensure-money {
          margin-bottom: 5px;
        }
        .tq-verify {
          margin-top: 0;
          margin-right: 20px;
        }
      }
      .tq-title {
        margin-top: 30px;
        margin-bottom: 10px;
        font-size: 12px;
        color: darkgrey;
      }
    }
  }
</style>
