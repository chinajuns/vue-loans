<template>
  <div>
    <Header></Header>
    <div class="box_evaluate ls1">
      <div class="head">
        <!-- <img :src="imgUrl+product.logo" alt=""> -->
        <img :src="imgUrl+product.logo" alt="" :class="{cardImg:product.type='credit'}">
        <p class="mt20" v-text="product.name">借了吗</p>
        <p class="satisfaction mb40">综合满意度(必选)</p>
        <!-- 半星 -->
          <!-- <p class="xin">
          <em v-for="(item, ind) in star_all"  :key="ind">
            <img @click="selectStar(item, ind)" v-if="item===0" src="../../images/ping_jia_wei_xuan@2x.png" alt="">
            <img @click="selectStar(item, ind)" v-if="item===0.5" src="../../images/ping_jia_ban_xing.png" alt="">
            <img @click="selectStar(item, ind)" v-if="item===1" src="../../images/ping_jia_xuan_zhong@2x.png" alt="">
          </em>
        </p> -->
        <p class="xin">
          <img v-for="(item, i) in star_" :key="i+'i'+item" src="../../images/ping_jia_xuan_zhong@2x.png" @click="select_(i)" alt="">
          <img v-for="(item, i) in 5-star_" :key="i+item" src="../../images/ping_jia_wei_xuan@2x.png" @click="select_(star_+i)" alt="">
        </p>
      </div>
      <div class="textarea">
        <textarea class="shadow bgfff pd40" @input="textNum_" v-model="textarea" maxlength="100" placeholder="请输入本次贷款评价内容"></textarea>
        <p>{{textNum}}/100</p>
      </div>
      <div class="submit_">
        <p class= "mt40" @click="upDataEvaluate" :class="{ 'haveInput' :textarea.length}">提交评价</p>
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
      star_all: [0, 0, 0, 0, 0],
      star_: 0,
      show: false,
      textNum: 0,
      textarea: '',
      product: JSON.parse(this.$route.params.item)
    }
  },
  created () {
    this.product.logo = this.product.logo.replace(/_\*_/g, '/')
    console.log(JSON.parse(this.$route.params.item));
    console.log(this.product);
  },
  methods: {
    // 半星
    // selectStar (item, ind) {
    //   this.star_all = [0, 0, 0, 0, 0]
    //   for (let i = 0; i < ind; i++) {
    //     this.star_all[i] = 1
    //   }
    //   if (item === 0) {
    //     this.star_all[ind] = 0.5
    //   } else if (item === 0.5) {
    //     this.star_all[ind] = 1
    //   } else if (item === 1) {
    //     this.star_all[ind] = 1
    //   }
    //   this.star_all = this.star_all.concat([])
    // },
    // 整星
    select_ (i) {
      this.star_ = i + 1
    },
    textNum_ () {
      // if (this.textarea.trim().length >= 100) {
      //   this.textarea.trim() = this.textarea.trim().trim().slice(0, 100)
      // }
      // this.textNum = this.textarea.trim().length
      this.textNum = this.textarea.length
    },
    // 提交
    upDataEvaluate () {
      // let star_ = 0
      // for (let i = 0; i < 5; i++) {
      //   star_ += this.star_all[i]
      // }
      // if (star_ <= 0) {
      //     console.log(star_ )
      //   this.$toast('请选择满意度', 2000, 1)
      //   return
      // }
       if (this.star_ <= 0) {
        this.$toast('请选择满意度', 2000, 1)
        return
      }
      if (!this.textarea) {
        this.$toast('请输入评价内容', 2000, 1)
        return
      }
      // debugger
      this.fetch.comment({
        'type': JSON.parse(this.$route.params.item).type, // 评论类型: 贷款=>product , 信用卡=>credit
        'id': this.product.product_id || this.product.credit_id, // type=product时, id=>产品id
        'apply_id': this.product.id, // 申请id
        // 'name': this.product.name,
        // 'logo': this.product.logo,
        'content': this.textarea,
        'star': this.star_ 
      }).then(res => {
        if (res.code === 200) {
          this.$toast(res.info, 2000, 2) // 信息提示：2表示成功
          this.$router.back(-1) // 评论成功后跳转
        } else {
          this.$toast(res.info, 2000, 1)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

 // 输入激活样式
.submit_ .haveInput{
   opacity: 1!important;
  }
.box_evaluate{
  padding: .8rem .4rem;
  font-size: .26rem;
  .head{
    text-align: center;
    color: #101d37;
    img{
      width: .98rem;
      height: .98rem;
      border-radius: .2rem;
    }
    .cardImg{
      width: 1.77rem;
      height: 1.1rem;
      border-radius: .1rem;
    }
    .satisfaction{
      font-size: .28rem;
      color: #a1a8b2;
      margin-top: .78rem;
    }
    .xin{
      display: flex;
      justify-content: center;
      img{
        width: .38rem;
        height: .42rem;
        margin: 0 .1rem;
      }
    }
  }
  .textarea{
    width: 6.7rem;
    height: 5.08rem;
    margin-top: .8rem;
    position: relative;
    font-size: .26rem;
    p{
      position: absolute;
      right: .4rem;
      bottom: .4rem;
      color: #c2c5cc;
    }
  }
  textarea{
    width: 6.7rem;
    height: 5.08rem;
    line-height: .4rem;
    border-radius: .1rem;
    box-sizing: border-box;
    color: #101d37;
    letter-spacing: .01rem;
  }
  .submit_{
     text-align: center;
    & p{
      width: 6.7rem;
      height: .9rem;
      line-height: .9rem;
      background-color: #2e6eec;
      opacity: 0.5;
      border-radius: .1rem;
      font-size: .3rem;
      color: #fff;
      }
    }
}

</style>
