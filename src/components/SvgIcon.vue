<template>
  <!-- <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use> -->
    <div>
      <img :src="require(`../assets/svg/${this.iconName}.svg`)" alt="">
    </div>
  <!-- </svg> -->
</template>

<script type="text/ecmascript-6">
export default {
  name: 'svg-icon',
  props: {
    iconName: {
      type: String
    }
    // iconClass: {
    //   type: String,
    //   required: true
    // },
    // className: {
    //   type: String
    // }
  },
  computed: {
    // iconName () {
    //   return require(`../assets/svg/${this.iconName}.svg`)
    //   // return `#icon-${this.iconClass}`
    // },
    // svgClass () {
    //   if (this.className) {
    //     return 'svg-icon ' + this.className
    //   } else {
    //     return 'svg-icon'
    //   }
    // }
  }
}
</script>

<style lang='scss'>

.svg-icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
  }
</style>