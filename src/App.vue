<template>
  <div id="app">
    <Content :class="[{footerOn: $route.meta.isFooter},{headerOn: $route.meta.isHeader}]"></Content>
    <Footer v-if="$route.meta.isFooter"></Footer>
  </div>
</template>

<script>
import checkurl from './utils/checkurl'
import Content from './views/Content'
import Footer from './views/Footer'

document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
export default {
  name: 'App',
  components: {
    Footer, Content
  },
  beforeCreate () {
   
  }
}
</script>

<style lang='scss'>
  @import './style/base.scss';
  @import './style/vant.scss';
  #app{
    height: 100%;
  }
</style>
