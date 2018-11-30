<template>
  <div class="protocol bgfff">
    <Header @agree='agree' :agree='agree'></Header>
    <div class="content bgfff  pd40 rich-text" v-html="content"></div>
  </div>
</template>
<script>
import Header from '@/components/Header'
import checkurl from '@/utils/checkurl'
export default {
  components: {
    Header
  },
  data () {
    return {
      content: '',
      page_init:true,
    }
  },
  created () {
    this.getAgreement()
  },
  methods: {
    getAgreement () {
      this.fetch.agreement({}).then(res => {
        this.content = res.data.content
      })
    },
    agree () {
      let path = localStorage.router_from_path === '/' ? '/login' : localStorage.router_from_path
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="scss">
// .op0{
//   opacity: 0;
// }
// .op1{
//   opacity: 1;
// }
.protocol{
  // height: 100vh;
}
.rich-text img{
  width: 100%;
  height: auto;
}
.content{
  // font-size: .28rem;
  line-height: .42rem;
	letter-spacing: .01rem;
	color: #101d37;
}
</style>
