<template>
    <div class="invite">
      <div class="i-banner" :style="{ background: 'url('+ BackgroundURL +') center no-repeat'}">
        <h2>
          邀请好友注册火币，轻松获得交易返佣
        </h2>
        <p>
          当日即得手续费30%返佣福利
        </p>
      </div>
      <invite-rank></invite-rank>

      <div class="i-way">
        <div class="title">我的分享方式</div>
        <div class="iw-inner">
          <div>
            <span>我的二维码</span>
            <a>点击获取</a>
          </div>
          <div>
            <span>我的邀请码</span>
            <el-input type="text" class="i-code" readonly :value=inviteCode>

              <template slot="suffix"><span class="code" :data-clipboard-text="inviteCode" @click="copyCode">复制邀请码</span></template>
            </el-input>
          </div>
          <div>
            <span>我的邀请链接</span>
            <el-input class="i-link" type="text" readonly :value=inviteLink>
              <template slot="suffix">
                <span class="link-text" :data-clipboard-text="inviteLink" @click="copyLink">点击复制链接</span>
              </template>
            </el-input>
          </div>
        </div>
      </div>
      <div class="i-info">
        <div class="ii-number">
          <h3>邀请人数</h3>
          <p>邀请总人数<span>{{ inviteNumber }}</span></p>
        </div>
        <div class="ii-money">
          <h3>获得返佣</h3>
          <p>USDT <span>{{ inviteMoney }}</span></p>
        </div>
      </div>
      <div class="i-history">
        <div class="title">
          <span>邀请记录</span>
        </div>
        <div class="ih-inner">
          <el-table :data="inviteList" style="width: 100%">
            <el-table-column prop="date" label="受邀者账号"/>
            <el-table-column prop="type" label="时间" />
            <el-table-column prop="" label="状态" />
            <el-table-column prop="" label="佣金"/>
          </el-table>
        </div>
      </div>
      <div class="i-detail">
        <div class="title">
          <span>活动细则</span>
        </div>
        <div class="id-inner">
          <p v-for="(item,index) in inviteRule">{{ index+1 }}、 {{ item.text }}</p>
        </div>
      </div>
    </div>
</template>

<script>
  import Clipboard from 'clipboard'
  import inviteRank from './components/inviteRank'
export default {
    name: "index",
  components: {
    inviteRank
  },
  created(){
    if(!this.$store.state.user.token){
      this.$router.push('/login')
    }
  },
  methods:{
    copyCode(){
      let clipboard = new Clipboard('.code')
      clipboard.on('success', e => {
        this.$message({
          message: '复制成功',
          type: 'success'
        })
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$message({
          message: '复制失败，请您手动复制',
          type: 'success'
        })
        clipboard.destroy()
      })
    },
    copyLink(){
      let clipboard = new Clipboard('.link-text')
      clipboard.on('success', e => {
        this.$message({
          message: '复制成功',
          type: 'success'
        })
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$message({
          message: '复制失败，请您手动复制',
          type: 'success'
        })
        clipboard.destroy()
      })
    }
  },
  data() {
      return {
        BackgroundURL: require('../../assets/imgs/invite_banner.jpg'),
        inviteCode:'asdasasdasasdasasd',
        inviteLink: 'https://baidu.com/',
        inviteNumber: 0,  // 邀请数量
        inviteMoney:0, // 佣金
        inviteList: [],  // 受邀列表
        inviteRule:[
          {text:'好友接受邀请后，每产生一笔真实交易手续费，会产生相应比例的返佣。'},
          {text:'返佣的形式以USDT或点卡的形式返佣到您的交易账户，USDT返佣比例为30%，点卡返佣比例为30%。'},
          {text:'邀请人享受好友交易返佣有效时长以被邀请人实际注册的时间开始进行计算，到达有效时长（90天）后您将不享受该邀请人交易产生手续费的返佣.'},
          {text:'平台将以每5分钟取一次市价进行相应币种的USDT实时换算，返佣金额以实际返佣金额为准。'},
          {text:'好友接受邀请后，每产生一笔真实交易手续费，会产生相应比例的返佣。'},
          {text:'返佣的形式以USDT或点卡的形式返佣到您的交易账户，USDT返佣比例为30%，点卡返佣比例为30%。'},
          {text:'邀请人享受好友交易返佣有效时长以被邀请人实际注册的时间开始进行计算，到达有效时长（90天）后您将不享受该邀请人交易产生手续费的返佣.'},
          {text:'平台将以每5分钟取一次市价进行相应币种的USDT实时换算，返佣金额以实际返佣金额为准。'},
          {text:'如被邀请人违反邀请返佣的相应风控规则，其手续费将不能返还给邀请人，同时，被邀请人的邀请状态变成【已无效】并且产生的返佣记录状态变成【返佣无效】' },
        ]
      }
  }

}
</script>

<style lang="scss">
  @import "../../assets/custom-theme/theme";
  .invite {
    .i-banner {
      height: 650px;
      text-align: center;
      /*padding-top: 30px;*/
      position: relative;
      h2 {
        font-size: 40px;
        display: inline-block;
        position: absolute;
        transform: translate(-50%,-50%);
        top: 250px;
      }
      p {
        font-size: 28px;
        display: inline-block;
        position: absolute;
        transform: translate(-50%,-50%);
        top: 360px;
        font-weight: lighter;

      }
    }
    .title {
      height: 48px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
      background-color: #1b1e2e;
      font-size: 16px;
      line-height: 48px;
      padding-left: 20px;
    }
   .invite-rank {
     margin-top: 20px;

   }
    .i-way {
      width: 1200px;
      margin: auto;
      margin-top: 20px;
      .iw-inner {
        height: 140px;
        padding: 20px 40px;
        background-color: #181b2a;
        >div {
          float: left;
          width: 350px;
          height: 170px;
        }
        span {
          display: block;
          font-size: 12px;
          color: #61688a ;
          margin-bottom: 20px;

        }
        a{
          display: inline-block;
          height: 48px;
          width: 280px;
          text-align: center;
          border-radius: 5px;
          font-size: 16px;
          line-height: 48px;
            color:white;
          background-color: rgb(122, 152, 247)
        }
        input{
          height: 48px;
          line-height: 48px;
          background-color:#262a42;
          border: 1px solid #4e5b85;
          color:#c7cce6 ;
          font-size: 16px;
          width: 282px;
        }
        .code {
          display:block;
          cursor:pointer;
          width:100%;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-size: 14px;
          color: #7a98f7;
          height: 48px;
          line-height: 48px;
          margin-right: 180px;
        }
        .code:before {
          content: '|';
          color: #4e5b85;
          margin-right: 40px;
        }
        .i-link input{
          width: 430px ;
        }
        .i-link span {
          display: block;
          cursor: pointer;
          width: 141px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          color: #7a98f7;
          height: 29px;
          margin-top: 4px;
          margin-right: -82px;
          background-color: #262a42;
        }
          .link-text:before{
            content: '|';
            color: #4e5b85;
            display:inline-block;
            margin-right: 22px;

          }
      }
    }
    .i-info {
      width: 1200px;
      height: 150px;
      margin:20px  auto;
      background-color: #181b2a;
      padding: 30px;
      .ii-number{
        margin-left: 30px;
        float: left;
        height: 120px;
        width: 50%;
        h3{
          font-size: 20px;
          margin-bottom: 60px;
        }
        p {
          color: #4e5b85 ;
          font-size: 14px;
          span {
            margin-left: 30px;
            font-size: 22px;
            color: #c7cce6;
          }
        }
      }
      .ii-money {
        margin-left: 40px;
        h3{
          font-size: 20px;
          margin-bottom: 60px;
        }
        p {
          color: #4e5b85 ;
          font-size: 14px;
          span {
            margin-left: 30px;
            font-size: 22px;
            color: #c7cce6;
          }
        }
      }
    }
    .i-history {
      width: 1200px;
      margin: auto;
      .ih-inner {
        padding: 10px;
        background-color: #181b2a;
        .el-table {
          background-color: #181b2a;
        }
        .el-table--border {
          border-color: #1f2943;
          th {
            &.gutter {
              &:last-of-type {
                border-color: #1f2943;
              }
            }
          }
        }
        .el-table--enable-row-hover {
          .el-table__body {
            tr {
              &:hover {
                & > td {
                  background-color: #1b1e2e !important;
                }
              }
            }
          }
        }
        .el-table th, .el-table tr {
          background-color: #1b1e2e;
          color: #c7cce6;

        }
        .el-table td, .el-table th.is-leaf {
          border-color: #181b2a;
          background-color: #181b2a;
          font-size: 12px;
        }
        .el-table--border::after, .el-table--group::after{
          display: none;
        }
        .el-table::before {
          display: none;
        }
        .el-table td, .el-table th {
          padding: 8px 0;
          /*text-align: center;*/
        }
        .co-pagination {
          height: 60px;
        }
        .el-pagination {
          width: 250px;
          margin:25px auto auto;
          .el-pager li {
            background-color: transparent;
            color: $hbColor;
          }
          .btn-prev, .btn-next {
            background-color: transparent;
            color: $hbColor;
          }
        }
      }
    }
    .i-detail {
      width: 1200px;
      margin: 20px auto;
      .id-inner {
        background-color: #181b2a;
        padding: 20px;
        p{
          font-size: 14px;
          color: #61688a;
        }
      }
    }
  }

</style>
