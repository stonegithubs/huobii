<template>
  <div class="coin-icon">
    <img :width="width" :height="height" :src="iconName===undefined? '':require(`@/assets/svg/${this.iconName.toLowerCase()}.svg`)" alt="">
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'coin-icon',
  props: {
    iconName: {
      type: String
    },
    width:{
        type: String,
        default: '40px'
    },
    height:{
        type: String,
        default: '40px'
    }

  },
  computed: {
  
  }
}
</script>
