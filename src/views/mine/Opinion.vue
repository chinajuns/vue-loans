<template>
    <div>
        <Header></Header>
        <div class="type bgfff mt20 pd40">
            <h3>反馈类型</h3>
            <div class="btnList">
                <button :class="{'active':item.id==cate_type}" v-for="(item, ind) in cate_types" :key="ind" @click="category(item)" v-text="item.name"></button>
            </div>
        </div>
        <div class="content bgfff">
             <h3>反馈内容</h3>
             <textarea @input="textNum_" v-model="textarea" maxlength="300" placeholder="简单描述你要反馈的问题和意见">
             </textarea>
             <p>{{textNum}}/300</p>
        </div>
        <!-- 按钮 -->
        <div class="affirm pd40">
             <p @click="affirmData" :class="{ 'haveInput' :textarea.length}">确定反馈</p>
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
      textNum: 0,
      textarea: '',
      cate_types: [],
      cate_type: ''
    }
  },
  created () {
    this.feedbackcate()
  },
  methods: {
    textNum_ () {
      this.textNum = this.textarea.length
    },
    //  确定反馈
    affirmData () {
      if (!this.cate_type) {
        this.active = !this.active
        // this.$toast('选择反馈类型', 2000, 1)
        return
      }
      if (!this.textarea) {
        // this.$toast('请输入评价内容', 2000, 1)
        return
      }
      this.fetch.feedback({
        feedback_category_id: this.cate_type,
        content: this.textarea
      }).then(res => {
        if (res.code === 200) {
          let time = 1e3
          this.throttle(() => { // 信息提示2为成功的icon
            this.$toast('反馈提交成功', time, 2)
          }, time)
          this.$router.back(-1)
        }
        else{
           this.throttle(() => { // 信息提示2为成功的icon
            this.$toast('反馈提交失败', time, 1)
          }, time)
        }
      })
    },
    // 获取反馈类型
    feedbackcate () {
      this.fetch.feedbackcate({}).then(res => {
        this.cate_types = res.data
      })
    },
    // 切换反馈类型
    category (item) {
      this.cate_type = item.id
    }
  }
}
</script>

<style lang="scss" scoped>
 // 输入激活样式
  .affirm .haveInput{
   background-color: #2e6eec;
   opacity: 1;
  }
// 类型
.type{
    h3{
      font-size: .3rem;
      font-weight: 700;
      margin-bottom: .3rem;
      letter-spacing: .01rem;
    }
    .btnList{
       // 激活样式
        .active{
          color: #2e6eec;
          border: 1px solid #2e6eec;
        }
        & button{
           font-size: .26rem;
            background-color: #fff;
            border: 1px solid #a1a8b2;
            border-radius: .06rem;
            margin-right: .2rem;
            padding: .18rem .2rem;
            color: #a1a8b2;
            margin-bottom: .05rem;
        }
       & button:last-child{
           margin-right: 0;
       }
    }
}
// 内容
.content{
    padding: 0 .4rem;
    h3{
      font-size: .3rem;
      font-weight: 700;
      margin-bottom: .3rem;
      padding-top: .4rem;
      border-top: 1px solid #edeff5;
      letter-spacing: .01rem;
    }
    & textarea{
        width: 100%;
        font-size: .26rem;
        height: 4rem;
    }
    & p{
        text-align: right;
        padding-bottom: .2rem;
        font-size: .26rem;
        letter-spacing: .02rem;
        color: #c2c5cc;
    }
}
// 按钮
.affirm{
    text-align: center;
    display: flex;
    justify-content: center;
    padding-top: .8rem;
   & p{
    width: 6.7rem;
    height: .9rem;
    line-height: .9rem;
    background-color: #2e6eec;
    opacity: 0.5;
    border-radius: .1rem;
    font-size: .3rem;
    color: #fff;
    letter-spacing: .01rem;
   }
}
.back{
  margin-right: .2rem;
}
</style>
