<template>
  <div class="infoDetail">
    <Header></Header>
    <div class="main">
      <p class="title" v-text="msg.title">贷贷狐安卓上架贷贷狐，安卓上架贷贷狐安卓上架贷狐安,上架!</p>
      <p class="date">{{ msg.created_at | YTD('')}}</p>
      <div class="content" v-html="msg.content">意见反馈内容：用户反馈的内容在这里展示用户反馈的内容在这里展示,用户反馈的内容在这里展示用户反馈的内容在这里展示用户反馈的内容在这里展示用户反馈的内容在这里展示。用户反馈的内容在这里展示用户反馈的内容在这里展示。</div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  },
  data () {
    return {
      msg: {created_at:new Date()}
    }
  },
  created () {
    this.getMsgId()
  },
  methods:{
    getMsgId () {
      this.fetch.messageId(this.$route.params.id, {}).then((res) => {
        if (res.code === 200) {
          console.log(res);
           document.getElementsByClassName('ellipsis')[0].innerHTML = res.data.title // 修改标题
          this.msg = res.data
        } else if (res.code === 2004) {
          // 没有数据
        }
      })
    },
     // 系统消息变更
    messageSet () {
      const params = {
        id:this.$route.params.id,
        action:'read'
      }
      this.fetch.messageSet(params).then((res) => {
        if (res.code === 200) {
          console.log('系统消息变更', res)
         
        } else if (res.code === 2004) {
          // 没有数据
        }
      })
    }
  }
}
</script>
<style lang="scss"> 
.infoDetail{
  .content img{
  width: 100%;
  display: block;
  }
  .main {
    height: calc(100vh - .88rem);
    padding: .4rem .4rem 0;
    box-sizing: border-box;
    background-color: #fff;
    letter-spacing: .01rem;
    .title{
      font-size: .3rem;
      line-height: .46rem;
      color: #101d37;
      font-weight: bold;
    }
    .date{
      text-align: right;
      font-size: .24rem;
      color: #8a9099;
      margin: .15rem 0 .3rem 0;
    }
    .content{
      word-break: break-all;
      word-wrap: break-word;
      display: block;
      font-size: .28rem;
      line-height: .42rem;
      color: #101d37;
    
    }
  }
}

</style>
