<template>
  <div>
    <Header></Header>
    <div class="main">
      <div class="text_left">
        <img src="../../images/yonghutouxiang@2x.png" alt="">
        <div>
          <p class="date">{{msg.parent.created_at | YTD('')}}</p>
          <div class="content" v-if="msg.message_type==='comment_reply'">
            <p><span>评论内容：</span><span v-text="msg.parent.content">用户反馈的内容在这里展示用户反馈的内容在这里展示。</span></p>
          </div>
          <div class="content" v-if="msg.message_type==='feedback_reply'">
            <p class="feedback"><span>反馈类型：</span><span v-text="msg.parent.category_name">产品链接混乱</span></p>
            <p><span>反馈内容：</span><span v-text="msg.parent.content">用户反馈的内容在这里展示用户反馈的内容在这里展示。</span></p>
          </div>
        </div>
      </div>
      <div class="text_Right">
        <img src="../../images/dai_dai_hu_tou_xiang@2x.png" alt="">
        <div>
          <p class="date">{{msg.created_at | YTD('')}}</p>
          <div class="content">
            <p><span>贷贷狐回复：</span> <span v-text="msg.content">贷贷狐回复的内容在这里展示，贷贷狐回复的内容在这里展示贷贷狐回复的内容在这里展示，贷贷狐回复的内容在这里展示，贷贷狐回复的内容在这里展示。</span></p>
          </div>
        </div>
      </div>
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
      msg:{ content: '',parent: {content: '',created_at: '',category_name: ''}},
      msgType: {comment_reply: '评论回复', feedback_reply: '意见反馈回复'}
    }
  },
  created () {
    this.getMsgId()
    this.messageSet()
  },
  methods: {
    getMsgId () {
      this.fetch.messageId(this.$route.params.id, {}).then((res) => {
        if (res.code === 200) {
          this.msg = res.data
          console.log(this.msg.message_type)
          document.getElementsByClassName('ellipsis')[0].innerHTML = this.msgType[this.msg.message_type]
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
<style lang="scss" scoped>
.main{
  padding: .4rem;
}
.text_left,.text_Right{
  display: flex;
  font-size: .26rem;
  letter-spacing: .01rem;
  margin-bottom: .8rem;
  img{
    width: .84rem;
    height: .84rem;
    margin-right: .2rem;
  }
  .date{
    font-size: .24rem;
    color: #8a9099;
  }
  .content{
    width: 4.88rem;
    padding: .2rem;
    margin-top: .2rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0px .16rem .16rem .16rem;
    p{
      line-height: .4rem;
      color: #101d37;
      span{
        font-weight: bold;
      }
    }
    .feedback{
      margin-bottom: .2rem;
    }
  }
}
.text_Right{
  flex-direction: row-reverse;
  img{
    margin-left: .2rem;
    margin-right: 0;
  }
  .date{
    text-align: right;
  }
  .content{
    border-radius: .16rem 0px .16rem .16rem;
  }
}
</style>
