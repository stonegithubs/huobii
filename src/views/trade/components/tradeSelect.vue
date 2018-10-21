<template>
  <div class="trade-select">
    <div class="trade-menu hidden-xs-only">
      <div class="menu-list">
        <p>购买</p>
        <a v-for="item in supportedCoin" @click="handleCoinChoose(item.id, 'buy')" href="javascript:;">{{ item.name }}</a>
      </div>
      <div class="menu-list">
        <p>出售</p>
        <a v-for="item in supportedCoin" @click="handleCoinChoose(item.id, 'sell')" href="javascript:;">{{ item.name }}</a>
      </div>
    </div>
    <div class="m-trade-menu hidden-sm-and-up">
        <el-radio-group  v-model="tradeType" size="small">
          <el-radio-button label="购买" ></el-radio-button>
          <el-radio-button label="出售"></el-radio-button>
        </el-radio-group>
      <div class="ts-coin-list">
        <a v-for="item in supportedCoin" @click="handleCoinChoose(item.id, tradeType)" href="javascript:;">{{ item.name }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "trade-select",
  data(){
      return {
        tradeType: '购买',
        supportedCoin: [
          { id: 0, name: 'ADE'},
          { id: 1, name: 'QC'},
          { id: 2, name: 'USDT'},
          { id: 3, name: 'ETH'}
        ],
        trade_data:  [
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
      }]
      }
  },
  methods: {
    handleCoinChoose(id, type){
      if(type === 'sell'|| type==='出售'){
        console.log('麦',id)
      }
      if(type === 'buy'|| type==='购买'){
        console.log('买',id)
      }
    }
  }
}
</script>

<style lang="scss">
  .trade-select {
    width: 90%;
    margin: auto auto 50px;
    .trade-menu {
      margin-top: 56px;
      .menu-list {
        display: inline-block;
        border-right: 1px solid #ececec;
        p {
          padding-bottom: 14px;
          font-weight: 600;
          font-size: 14px;
          color: #333;
        }
        a {
          margin-right: 32px;
          line-height: 19px;
          color: #638bd4 !important;
          font-size: 16px;
          background: transparent;
          text-decoration: none;
          outline: none;
          cursor: pointer;
          transition: color .2s ease;
          &:active {
            border-bottom: 2px solid #333;
            font-weight: 600;
            color: #333 !important;
          }
        }
      }
      >:last-child {
        margin-left: 32px;
        border-right: none;
      }
    }
    .m-trade-menu {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 100px;
      .el-radio-group {
        margin-top: 70px;
      }
      .ts-coin-list {
        margin-top: 20px;

        a {
          margin: 0 10px;
          color: #2d8cf0 !important;
          padding: 6px 0;
          display: inline-block;
          line-height: 16px;
          font-size: 16px;
          text-decoration: none;
          &:active {
            border-bottom: 2px solid #333;
            color: #333!important;
          }
        }
      }
    }
  }
</style>
