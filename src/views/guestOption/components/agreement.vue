<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ $t('login.agreementTitle') }}</span>
    </div>
    <div class="agreement-body">
        <span v-html="html_decode(agreementConent)"></span>
        <!-- {{agreementConent}} -->
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
      if(response && response.code === '200'){
        this.agreementConent = response.content.records[0].content
      }
    }).catch(err => {})
  },
  methods: {
    html_decode(str) {
      let s = "";
      if (str.length == 0) return "";
      s = str.replace(/&amp;/g, "&");
      s = s.replace(/&lt;/g, "<");
      s = s.replace(/&gt;/g, ">");
      s = s.replace(/&nbsp;/g, " ");
      s = s.replace(/&#39;/g, "'");
      s = s.replace(/&quot;/g, '"');
      s = s.replace(/<br\/>/g, "\n");
      return s;
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
    width: 1000px;
    margin: auto
    
}
</style>
