<template>
  <div class="trader">
    <div class="wrapper hidden-xs-only">
      <div class="base-info">
        <div class="top-info">
          <div class="span-text">
            <div class="avatar-container" :class="getAvatarColor(id)">
              <em class="name">{{r_name}}</em>
            </div>
            <div>{{userName}}</div></div>
          <div class="trade-info">
            <div class="trade-item">
              <p>{{ensuranceMoney}} {{ensuranceCoin}}</p>
              <p>商家保证金</p>
            </div>
            <div class="trade-item">
              <p>{{recentDealRate}}%</p>
              <p>30日成交率</p>
            </div>
            <div class="trade-item">
              <p>{{orderTotal}} 次</p>
              <p>成交总数</p>
            </div>
            <div class="trade-item">
              <p>{{recentOrder}} 次</p>
              <p>30日成交总数</p>
            </div>
            <div class="trade-item">
              <p>{{averageDealTime}} 分钟</p>
              <p>平均放行时间</p>
            </div>

          </div>
        </div>
        <div class="down-info">
          <div class="register-time">
            注册时间： {{registerTime}}
          </div>
          <div class="auth-info">
            <div class="auth-item" :class="{ 'done': verifyList.email}">
              邮箱认证 <i class="el-icon-success"></i>
            </div>
            <div class="auth-item" :class="{ 'done': verifyList.phone}">
              手机认证 <i class="el-icon-success "></i>
            </div>
            <div class="auth-item" :class="{ 'done': verifyList.true_name}">
              实名认证 <i class="el-icon-success "></i>
            </div>
            <div class="auth-item" :class="{ 'done': verifyList.adVerify}">
              高级认证 <i class="el-icon-success "></i>
            </div>
          </div>
        </div>
      </div>
      <div class="user-ad">
        <div class="t-sell">
          <div class="ad-title">在线出售</div>
          <el-table
            :data="sellList"
            style="width: 100%">
            <el-table-column
              label="币种">
              <template slot-scope="scope">
                <i :class="'iconfont'+' '+'icon-'+  scope.row.coinType" ></i>
                <span style="margin-left: 10px; font-weight: 700;">{{ scope.row.coinType }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="number"
              label="数量">
              <template slot-scope="scope">
                <span> {{ scope.row.coinType }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="限额">
              <template slot-scope="scope">
                <span>{{ scope.row.limit.min }}-{{ scope.row.limit.max }} {{ scope.row.priceType}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="单价">
              <template slot-scope="scope">
                <span style="color:#489972;font-weight: 700;">{{ scope.row.price}} {{ scope.row.priceType}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="支付方式">
              <template slot-scope="scope">
                <el-tooltip v-for="item in scope.row.payment_list"  class="item" effect="dark" :content="item" placement="bottom">
                  <img :src=getIcon(item) alt="">
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column
              label="支付方式">
              <template slot-scope="scope">
                <el-button type="primary" @click="handleOrder(scope.row)">购买{{ scope.row.coinType}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="t-buy">
          <div class="ad-title">在线购买</div>
          <el-table
            :data="buyList"
            style="width: 100%">
            <el-table-column
              label="币种">
              <template slot-scope="scope">
                <i :class="'iconfont'+' '+'icon-'+  scope.row.coinType" ></i>
                <span style="margin-left: 10px; font-weight: 700;">{{ scope.row.coinType }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="number"
              label="数量">
              <template slot-scope="scope">
                <span> {{ scope.row.coinType }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="限额">
              <template slot-scope="scope">
                <span>{{ scope.row.limit.min }}-{{ scope.row.limit.max }} {{ scope.row.priceType}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="单价">
              <template slot-scope="scope">
                <span style="color:#489972;font-weight: 700;">{{ scope.row.price}} {{ scope.row.priceType}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="支付方式">
              <template slot-scope="scope">
                <el-tooltip v-for="item in scope.row.payment_list"  class="item" effect="dark" :content="item" placement="bottom">
                  <img :src="getIcon(item)" alt="">
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column
              label="支付方式">
              <template slot-scope="scope">
                <el-button type="primary" @click="handleOrder(scope.row)">出售{{ scope.row.coinType}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
   <div class="m-wrapper hidden-sm-and-up">
     <div class="base-info">
       <div class="m-user-info">
         <div class="avatar-container">
           <em class="name">{{r_name}}</em>
         </div>
         <div>
           <span>{{userName}}</span>
           <p>注册时间： {{registerTime}}</p>
         </div>
         </div>
       <div class="m-credit-info">
         <div class="baseInfo-in">
           <p><span class="text-box">商家保证金</span><span>{{ensuranceMoney}} {{ensuranceCoin}}</span></p>
           <p><span class="text-box">30日完成率</span><span>{{recentDealRate}}%</span></p>
           <p><span class="text-box">总成交</span><span>{{orderTotal}}次</span></p>
           <p><span class="text-box">30日成交</span><span>{{recentOrder}}次</span></p>
           <p><span class="text-box">平均放行</span><span>{{averageDealTime}}分钟</span></p>
         </div>
         <div class="verify-info">
           <div class="auth-item" :class="{ 'done': verifyList.email}">
             邮箱认证 <i class="el-icon-success"></i>
           </div>
           <div class="auth-item" :class="{ 'done': verifyList.phone}">
             手机认证 <i class="el-icon-success "></i>
           </div>
           <div class="auth-item" :class="{ 'done': verifyList.true_name}">
             实名认证 <i class="el-icon-success "></i>
           </div>
           <div class="auth-item" :class="{ 'done': verifyList.adVerify}">
             高级认证 <i class="el-icon-success "></i>
           </div>
       </div>
     </div>
   </div>
     <div class="ad-info">
        <div>
          <p>在线出售</p>
          <div class="ad-list" v-for="item in sellList">
            <div class="trader-logo">
              <div>
                <i :class="'iconfont'+' '+'icon-'+  item.coinType" style="font-size: 30px; margin-right: 10px" ></i>
            </div>
              <div>
                <span>{{ item.coinType }}</span></div>
            </div>
            <div class="list">
              <p>
                <span class="ad-detail">数量：</span>
                <span>{{item.number}} {{item.coinType}}</span>
              </p>
            </div>
            <div class="list">
              <span class="ad-detail">限额：</span>
              <span>{{item.limit.min}}-{{item.limit.max}} {{item.priceType}}</span>
            </div>
            <div class="list">
              <span class="ad-detail">单价：</span>
              <span style="color: #489972;font-weight: 700;">{{item.price}}{{item.priceType}}</span>
            </div>
            <div class="pay-box">
              <div style="padding-left: 40px">
                <el-tooltip v-for="i in item.payment_list"  class="item" effect="dark" :content="i" placement="bottom"  style="margin-right: 5px">
                  <img :src="getIcon(i)" alt="">
                </el-tooltip>
              </div>
              <el-button type="primary" @click="handleOrder(item)">出售{{ item.coinType}}</el-button>
            </div>
          </div>
        </div>
        <div style="margin-top: 40px">
          <p>在线购买</p>
          <div class="ad-list" v-for="item in buyList">
            <div class="trader-logo">
              <div>
                <i :class="'iconfont'+' '+'icon-'+  item.coinType" style="font-size: 30px; margin-right: 10px" ></i>
            </div>
              <div>
                <span>{{ item.coinType }}</span></div>
            </div>
            <div class="list">
              <p>
                <span class="ad-detail">数量：</span>
                <span>{{item.number}} {{item.coinType}}</span>
              </p>
            </div>
            <div class="list">
              <span class="ad-detail">限额：</span>
              <span>{{item.limit.min}}-{{item.limit.max}} {{item.priceType}}</span>
            </div>
            <div class="list">
              <span class="ad-detail">单价：</span>
              <span style="color: #489972;font-weight: 700;">{{item.price}}{{item.priceType}}</span>
            </div>
            <div class="pay-box">
              <div style="padding-left: 40px">
                <el-tooltip v-for="i in item.payment_list"  class="item" effect="dark" :content="i" placement="bottom"  style="margin-right: 5px">
                  <img :src="getIcon(i)" alt="">
                </el-tooltip>
              </div>
              <el-button type="primary" @click="handleOrder(item)">购买{{ item.coinType}}</el-button>
            </div>
          </div>
        </div>
     </div>
  </div>
  </div>
</template>

<script>
  import { getAvatarColor } from '../../utils/index'
export default {
  name: "trader",
  data() {
    return {
      id: this.$route.params.id,
      userName: '测试名',        //用户名
      r_name: '姓',              //用户名首字母
      ensuranceMoney: 5000,     //保证金
      ensuranceCoin: '测试币种', //保证金种类
      orderTotal: 13221,       //成交单总数
      recentDealRate: 98,       //30日成交率
      recentOrder: 122,         //30日成交
      averageDealTime: 121,     //平均放行时间（分钟）
      verifyList:{
        email:true,
        phone:true,
        true_name:false,
        adVerify: true
      },
      registerTime: '2017-12-11测试时间',//注册时间
      sellList:[
        { id:98, coinType:"BTC", number:15.87653, limit:{ min: 300, max: 1789},price:21334, priceType: "CNY", payment_list:["alipay","wechat","bank"]},
        { id:91, coinType:"USDT", number:15.87653, limit:{ min: 301230, max: 125789},price:21334, priceType: "CNY", payment_list:["wechat","bank"]},
        { id:90, coinType:"EOS", number:15.87653, limit:{ min: 300, max: 621789},price:21334, priceType: "CNY", payment_list:["alipay","wechat"]},
        { id:11, coinType:"HT", number:15.87653, limit:{ min: 300, max: 1265789},price:21334, priceType: "CNY", payment_list:["alipay","bank"]},
        { id:99, coinType:"BTC", number:15.87653, limit:{ min: 12000, max: 65789},price:21334, priceType: "CNY", payment_list:["alipay","wechat","bank"],}
      ],
      buyList:[
        { id:98, coinType:"BTC", number:15.87653, limit:{ min: 300, max: 1789},price:21334, priceType: "CNY", payment_list:["alipay","wechat","bank"]},
        { id:91, coinType:"USDT", number:15.87653, limit:{ min: 301230, max: 125789},price:21334, priceType: "CNY",  payment_list:["wechat","bank"]},
        { id:90, coinType:"EOS", number:15.87653, limit:{ min: 300, max: 621789},price:21334, priceType: "CNY", payment_list:["alipay","wechat"]},
        { id:11, coinType:"HT", number:15.87653, limit:{ min: 300, max: 1265789},price:21334, priceType: "CNY", payment_list:["alipay","bank"]},
        { id:99, coinType:"BTC", number:15.87653, limit:{ min: 12000, max: 65789},price:21334, priceType: "CNY", payment_list:["alipay","wechat","bank"],}
      ],

    }
  },
  methods: {
    handleOrder(orderInfo){
      console.log(orderInfo)
    },
    getIcon(iconName){
      return this.$store.getters.getPaymentIcon(iconName)
    },
    getAvatarColor(id){
      return getAvatarColor(id)
    }

  }
}
</script>

<style lang="scss" scoped>
  .trader{
    margin: auto;
    @media (min-width: 768px) {
      min-width: 800px;
      width: 70%;

    }
    .wrapper {
      .base-info {
        margin-top: 80px;
        .top-info {
          padding-bottom: 20px;
          border-bottom: 1px solid hsla(0,0%,85%,.5);
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .span-text {
            margin-left: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 12px;
            color: #000;
            .avatar-container {
              height: 40px;
              width: 40px;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              position: relative;
              margin-right: 20px;
              .name {
                color: white;
              }
            }

          }
          .trade-info {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            .trade-item {
              padding-left: 32px;
              text-align: center;
              p {
                font-size: 12px;
                margin-bottom: 5px;
              }
              :last-child {
                color: #999;
              }
            }
          }
        }
        .down-info {
          padding-top: 24px;
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          color: #999;

          .register-time {
            font-size: 12px;
          }
          .done {
            color: black;
            i{
              color: #94e3bd;
            }
          }
          .auth-item {
            display: inline-block;
            padding-left: 16px;
            font-size: 12px;
          }
        }
      }
      .user-ad {
        margin-top: 80px;
        .el-table /deep/  {
          .cell{
            line-height: 40px;
          }
        }
        .el-button /deep/ {
          width: 80px;
          height: 33px;
          line-height: 33px;
          padding: 0;
        }
        i:before {
          font-size: 30px;
        }
        .ad-title {
          margin-top: 60px;
          margin-bottom: 10px;
        }
      }
    }
    .m-wrapper {
      padding: 0 24px;
      margin: auto;
      .m-user-info {
        margin-top: 56px;
        display: flex;
        justify-content: flex-start;
        /*align-items: center;*/
        .avatar-container {
          background-color: #e35744;
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
        span {
          display: flex;
          padding-left: 10px;

        }
        p {
          padding-left: 10px;
          color:#999;
          font-size: 12px;
        }
      }
      .m-credit-info {
        .baseInfo-in {
          border-top: 1px solid #ececec;
          border-bottom: 1px solid #ececec;
          margin-top: 10px;
          padding: 20px 0;
          p {
            margin-bottom: 5px;
            font-size: 14px;
          }
          span {

          }
          .text-box {
            display: inline-block;
            margin-right: 60px;
            width: 111px;
            color: #999;
          }
        }
        .verify-info {
          display: flex;
          flex-wrap: wrap;
          margin-top: 20px;
          .auth-item {
            width: 50%;
            flex-shrink:0;
            margin-bottom: 10px;
            font-size: 14px;
            color: #999999;
            i {
              margin-left: 5px;
            }
          }
          .done {
            color: black;
            i{
              color: #94e3bd;
            }
          }
        }
      }
      .ad-info {
        margin-top: 32px;
        .ad-list {
          border-bottom: 1px solid hsla(0, 0%, 85%, .5);
          padding-bottom: 20px;
          .pay-box {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            .el-button /deep/ {
              width: 80px;
              height: 33px;
              line-height: 33px;
              padding: 0;

            }
          }
        }
        .trader-logo {
          display: flex;
          align-items: center;
        }
        .list {
          margin-left: 40px;

          p {
            margin: 0;
          }
          .ad-detail {
            font-size: 14px;
            color: #999;
            width: 111px;
            margin-right: 60px;
          }
        }
      }

    }



  }

</style>
