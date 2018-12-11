<template>
  <vue-recaptcha ref="invisibleRecaptcha" sitekey="6LdoLXkUAAAAANF3D7WorL31LhnwBJk3KSnmCnJu" @verify="onSubmit"/>
</template>

<script type="text/ecmascript-6">
import VueRecaptcha from 'vue-recaptcha'
import axios from 'axios'
import Qs from 'qs'
export default {
  name: 'GoogleVerify',
  components: { VueRecaptcha },
  props: {},
  computed: {

  },
  methods: {
    onSubmit(response) {
      // let form = new URLSearchParams()
      // form.append('response',response)
      // form.append('secret','6LdoLXkUAAAAACYr4Wc7_ZjV_LsNTubcwRKMUEpU')
      axios({
        methods: 'post',
        url: 'https://www.google.com/recaptcha/api/siteverify',
        // data:Qs.stringify({'response':response,'secret':'6LdoLXkUAAAAACYr4Wc7_ZjV_LsNTubcwRKMUEpU'})
        params: {
          'response': response,
          'secret': '6LdoLXkUAAAAACYr4Wc7_ZjV_LsNTubcwRKMUEpU'
        }
      }).then(response => {
        if (response && response.success) {
          return true
        } else {
          return false
        }
      })
      // axios.post()
      // console.log(response)
    }
  }
}
</script>

<style lang='scss'>

</style>
