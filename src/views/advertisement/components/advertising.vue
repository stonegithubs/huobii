<template>
  <div class="ad-wrapper" ref="dd">
    <div class="ad-inner">
      <el-tabs v-model="tradeForm.coinId" @tab-click="chooseCoin">
        <el-tab-pane
          v-for="coin in getSupportCoin"
          :label="coin.abbr.toUpperCase()"
          :name="coin.id"
          :key="coin.id"
          :value="coin.abbr"
        >
          <div>
            <h3>{{$t('order.submitTip1')}}{{coin.abbr.toUpperCase()}}{{$t('order.submitTip1_1')}}</h3>
            <li>{{$t('order.submitTip2')}}{{coin.abbr.toUpperCase()}} {{$t('order.submitTip2_2')}}{{coin.abbr.toUpperCase()}}{{$t('order.submitTip2_3')}}</li>
            <li>{{$t('order.submitTip4')}}</li>
            <li>{{$t('order.submitTip5')}}</li>
            <li>{{$t('order.submitTip6')}}</li>
            <li>{{$t('order.submitTip7')}}</li>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="trade-type">
        <h3>{{$t('order.orderType')}}</h3>
        <el-form
          label-position="left"
          label-width="160px"
          :rules="advRule"
          ref="tradeFrom"
          :model="tradeForm"
        >
          <el-form-item
            :label="$t('order.direction')"
            prop="direction"
          >
            <el-radio-group v-model="tradeForm.direction">
              <el-radio label="0">{{$t('order.buyOnline')}}{{getCoinNameByIDUp(tradeForm.coinId)}}</el-radio>
              <el-radio label="1">{{$t('order.sellOnline')}}{{getCoinNameByIDUp(tradeForm.coinId)}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            :label="$t('order.coinType')"
            prop="cashId"
          >
            <el-select
              style="width: 400px;"
              v-model="tradeForm.cashId"
              :placeholder="$t('order.coinTip')"
            >
              <el-option
                v-for="cash in getSupportCash"
                :label="upper(cash.abbr)"
                :value="cash.id"
                :key="cash.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="price" :label="$t('exchange.main.price')">
            <!-- :rules="[,
            ]"-->
            <!-- { type: 'number', message: $t('order.numberTip'),trigger: 'blur'} -->
            <el-input v-model="tradeForm.price" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item
            prop="min"
            :label="$t('order.min')"
          >
            <el-input v-model="tradeForm.min" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item
            prop="max"
            :label="$t('order.max')"
          >
            <el-input v-model="tradeForm.max" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item
            prop="expire"
            :label="$t('order.expire')"
          >
            <el-input v-model="tradeForm.expire" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item
            prop="amount"
            :label="$t('order.amount')"
          >
            <el-input v-model="tradeForm.amount" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item
            prop="payways"
            :label="$t('order.payways')"
          >
            <el-checkbox-group v-model="tradeForm.payways" style="width: 400px;">
              <el-checkbox
                v-for="payway in getPayway"
                :key="payway.id"
                :label="payway.id"
                name="type"
              >{{payway.payName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            prop="message"
            :label="$t('order.message')"
          >
            <el-input type="textarea" v-model="tradeForm.message" style="width: 400px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="submitTrade('tradeFrom')"
              type="primary"
              style="width: 400px;"
            >{{$t('order.submitNow')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { fbSubmit } from "../../../api/coin_trade";
export default {
  // 发布广告
  name: "Advertising",
  data() {
    // 价格验证
    const priceValidate = (rule, value, callback) => {
      value = value.trim()
      if (!value) {
        callback(new Error(this.$t('order.priceTip')));
        return;
      }
      value = Number(value);
      if (typeof value === "number" && !isNaN(value)) {
        if (value < 0) {
          callback(new Error(this.$t('order.priceType')));
        } else {
          callback();
        }
      } else {
        callback(new Error(this.$t('order.wrongType')));
      }
    };
            // <!-- :rules="[{ required: true, message: $t('order.minTip'), trigger: 'blur' }]" -->
 const minValidate = (rule, value, callback) => {
      value = value.trim()
      if (!value) {
        callback(new Error(this.$t('order.minTip')));
        return;
      }
      value = Number(value);
      if (typeof value === "number" && !isNaN(value)) {
        if (value < 0) {
          callback(new Error(this.$t('order.priceType')));
        } if(value> this.tradeForm.max){
          callback(new Error(this.$t('order.minTip1')));
        }else {
          callback();
        }
      } else {
        callback(new Error(this.$t('order.wrongType')));
      }
    };
    const maxValidate = (rule, value, callback) => {
      value = value.trim()
      if (!value) {
        callback(new Error(this.$t('order.maxTip')));
        return;
      }
      value = Number(value);
      if (typeof value === "number" && !isNaN(value)) {
        if (value <= this.tradeForm.min) {
          callback(new Error(this.$t('order.maxTip1')));
        } else {
          callback();
        }
      } else {
        callback(new Error(this.$t('order.wrongType')));
      }
    };
    const expireValidate = (rule, value, callback) => {
      value = value.trim()
      if (!value) {
        callback(new Error(this.$t('order.expireTip')));
        return;
      }
      value = Number(value);
      if (typeof value === "number" && !isNaN(value)) {
        if (value <= 0) {
          callback(new Error(this.$t('order.timeTip1')));
        } else {
          callback();
        }
      } else {
        callback(new Error(this.$t('order.wrongType')));
      }
    };
    const amountValidate = (rule, value, callback) => {
      value = value.trim()
      if (!value) {
        callback(new Error(this.$t('order.amountTip')));
        return;
      }
      value = Number(value);
      if (typeof value === "number" && !isNaN(value)) {
        if (value <= 0) {
          callback(new Error(this.$t('order.amountTip1')));
        } else {
          callback();
        }
      } else {
        callback(new Error(this.$t('order.wrongType')));
      }
    };
    return {
      coin: { abbr: "usdt" },
      tradeForm: {
        direction: "",
        amount: "",
        price: "",
        coinId: "2",
        cashId: "",
        min: "",
        max: "",
        message: "",
        expire: "",
        payways: [],
        type: 0
      },
      advRule: {
        direction: [{ required: true, message:this. $t('order.directionTip'), trigger: 'blur' }],
        cashId:[{ required: true, message: this.$t('order.coinTip'), trigger: 'blur' }],
        price: [{ validator: priceValidate, trigger: "blur" },{ required: true, message: this.$t('exchange.main.priceTip'), trigger: 'blur' }],
        min: [{ validator: minValidate, trigger: "blur" },{ required: true, message: this.$t('order.minTip'), trigger: 'blur' }],
        max: [{ validator: maxValidate, trigger: "blur" },{ required: true, message: this.$t('order.maxTip'), trigger: 'blur' }],
        expire: [{ validator: expireValidate, trigger: "blur" },{ required: true, message: this.$t('order.expireTip'), trigger: 'blur' }],
        amount: [{ validator: amountValidate, trigger: "blur" },{ required: true, message: this.$t('order.amountTip'), trigger: 'blur' }],
        payways: [{ required: true, message: this.$t('order.paywaysTip'), trigger: 'blur' }],
        message: [{ required: true, message: this.$t('order.messageTip'), trigger: 'blur' }],
      }
    };
  },
  computed: {
    ...mapGetters([
      "getSupportCoin",
      "getSupportCash",
      "getPayway",
      "getCoinNameByIDUp"
    ]),
    ...mapState(["user"])
  },
  mounted() {},
  methods: {
    upper(s) {
      if (s !== undefined) {
        return s.toUpperCase();
      }
    },
    chooseCoin(item) {},
    submitTrade(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let f = this.tradeForm;
          fbSubmit(
            f.direction,
            f.amount,
            f.price,
            f.coinId,
            f.cashId,
            f.min,
            f.max,
            f.message,
            f.expire,
            "all",
            f.type
          )
            .then(res => {
              if (res.code === "200") {
                this.$notify.success(this.$t("order.submitSuccess"));
                this.$router.push({ name: "tradeOrder" });
              } else {
                this.$notify.error(this.$t("order.submitFailed"));
              }
            })
            .catch(_ => {
              this.$notify.error(this.$t("order.submitFailed"));
            });
        }
      });
    }
    // hasThisPayway(id){
    //   for()
    // }
  },
  beforeCreate() {
    if (!this.$store.state.user.token) {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang="scss" scoped>
.ad-wrapper {
  background-color: #fff;
  padding: 50px 0;
  min-height: 800px;
  .ad-inner {
    width: 1100px;
    margin: auto;
    h3 {
      font-size: 30px;
      color: #263b50;
      font-weight: 400;
      position: relative;
      margin: 40px 0 20px 0;
    }
    .el-tabs {
      li {
        list-style: unset;
        font-size: 14px;
        color: grey;
      }
    }
  }
}
</style>
