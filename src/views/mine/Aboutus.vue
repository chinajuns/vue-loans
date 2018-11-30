<template>
    <div class="aboutUs bgfff pd40">
         <Header></Header>
          <van-popup v-model="show" position="bottom" :overlay="true">
            <p>呼叫<span v-text="tel"></span></p>
            <p @click="show = !show" class="callOff">取消</p>
          </van-popup> 
          <div v-html="content">内容 </div>
           <!-- <div class="phone"></div> -->
           <!-- <div class="phone" @click="call"></div> -->
           <p class="tel" :class="{'none':opbtn}">联系电话：<span v-text="tel" @click="call"></span></p>
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
      content: '',
      show: false,
      tel: 0,
      opbtn: true
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.fetch.about({}).then(res => {
        this.tel = res.data.company_phone
        this.content = res.data.content
        document.getElementsByClassName('ellipsis')[0].innerHTML = res.data.title
        this.opbtn = false
      })
    },
    call () {
      this.show = !this.show
    }
  }
}
</script>
<style lang="scss">
  .aboutUs{
    height: 100vh;
    img{
      width: 100%;
      padding: 0;
    }
    .phone{
      background: red;
      opacity: 0;
      width: 3rem;
      height: .5rem;
      position: relative;
      left: 3rem;
      bottom: .85rem
    }
    .van-modal{
      background-color: rgba(0,0,0,.5);
    }
    .van-popup{
      background:none;
      box-sizing: border-box;
      // opacity: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 .2rem;
      p{
        width: 7.1rem;
        // width: 90%;
        height: 1.14rem;
        font-size: .36rem;
        line-height: 1.14rem;
        border-radius: .2rem;
        letter-spacing: .01rem;
        color: #2e6eec;
        text-align: center;
        margin-bottom: .2rem;
        background-color: #fff;
      }
      .callOff{
        font-weight: 700;
      }
    }
    .tel{
      font-size: .26rem;
      letter-spacing: .01rem;
      color: #7f8799;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      span{
        color: #2e6eec;
      }
    }
  }
</style>
