<template>
  <div class="agreement">
    <div class="ag-title">
      <span>用户协议</span>
    </div>
    <div class="ag-inner">
      <pre>{{ agreementConent }}</pre>
    </div>
  </div>
</template>

<script>
import { getAgreement } from '../../api/cms'

export default {
  name: 'Index',
  data() {
    return {
      agreementConent: ''
    }
  },
  created() {
    getAgreement().then(response => {
      this.agreementConent = response.content
    }).catch(err => {
      this.$message({
        message: err,
        type: 'wrong'
      })
    })
  }
}
</script>

<style lang="scss">
  .agreement{
    width: 1200px;
    margin: auto;
    .ag-title {
      font-size: 20px;
      height: 60px;
      line-height: 60px;
      margin: 20px 0;
      border-radius: 3px;
      padding: 0 30px;
      background-color: #1b1e2e;

    }
    .ag-inner{
      margin-top: 20px;
      background-color: #1b1e2e;
      padding: 20px 30px;
      font-size: 14px;
    }
  }
</style>
