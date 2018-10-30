<template>
    <div class="payment-icon">
      <i v-for="item in paymentList" :class="'iconfont '+this.supportedPaymentList[item.name]"></i>{{item.name}}
      </div>
</template>

<script>
import { getAvatarColor } from "../../../utils/index";
export default {
   name:"payment-icon",
  props: ["paymentList"],
  data() {
    return {
      supportedPaymentList: {
          "alipay": "icon-alipay-icon",
          "wechat": "icon-wechat-icon",
          "bank": "icon-zh-bank-icon",
          "QIWI": "icon-QIWI", 
          "paypal": "icon-paypal",
          "paynow": "icon-paynow",
          "SWIFT": "icon-SWIFT" ,
          "paytm": "icon-paytm" ,
          "interac": "icon-interac",
          "UPI": "icon-UPI" ,
          "IMPS": "icon-IMPS"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
