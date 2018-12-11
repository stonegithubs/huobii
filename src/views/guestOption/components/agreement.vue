<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ $t('login.agreementTitle') }}</span>
    </div>
    <div class="agreement-body">
        {{ content }}
    </div>
   </el-card>
</template>

<script>
import { getAgreement } from '../../../api/cms'

export default {
  name: 'agreement',
  data() {
    return {
      agreementConent: ''
    }
  },
  created() {
    getAgreement().then(response => {
      this.agreementConent = response.content
    }).catch(err => {})
  }
}
</script>

<style lang="scss" scoped>
.box-card {
    width: 1000px;
    margin: auto
}
</style>
