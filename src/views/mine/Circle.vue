<template>
    <div class="circle">
         <Header></Header>
         <ul class="pd40">
           <li v-for="(it,i) in list" :key="i">
             <img :src="imgUrl+it.url" alt="" class="twoCode">
             <div class="text"><span>微信公众号：</span><span class="blue">“{{it.copy_content}}”</span></div>
             <p>{{it.intro}}</p>
             <div class="copyBtn" v-clipboard:copy="it.copy_content" v-clipboard:success="onCopy">
               复制账号
             </div>
           </li>
         </ul>
           <!-- 点击提示 -->
      <div class="apply_hint ls1" v-show="apply_hint" @click="apply_hint=false">
        <div class="hint_box bgfff pd40" @click.stop="">
          <img src="../../images/wei_xin_gong_zong_hao@2x.png" alt="" class="wxPic">
          <div class="hint_info">已复制微信公众号“{{curCopyWx.text}}” </div>
          <a href="javascript:;" @click="goWx('weixin://')" class="fwb">立即去微信</a>
          <div class="close_hint">
            <p class="bgfff"></p>
            <img src="../../images/tui_chu@2x.png" alt="" @click="apply_hint=false">
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
      list: [],
      apply_hint: false, // 申请提示弹窗
      collect: false, // 收藏
      curCopyWx: '' // 当前复制的微信
    }
  },
  created () {
    this.getCicleData()
  },
  methods: {
    onCopy (e) {
      this.curCopyWx = e
      this.apply_hint = true
    },
    // 获取圈子数据
    getCicleData () {
      this.fetch.circle({}).then(res => {
        if (res.code===200){
          this.list = res.data
        }else if(res.code===2004){
           this.$toast('暂无圈子', 2000, 1)
        }
      })
    },
    goWx (url) {
      var timeout, t = 1000, hasApp = true
      // setTimeout(function () {
      //   if (!hasApp) {
      //   // 没有安装微信
      //   var r = confirm("您没有安装微信，请先安装微信!")
      //   if (r === true) {
      //     location.href="http://weixin.qq.com/"
      //   }
      //   } else {
      //   // 安装微信
      //   }
      //   document.body.removeChild(ifr)
      // }, 2000)
      if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
        confirm("当前已在微信")
        return
      }
      var t1 = Date.now()
      var ifr = document.createElement("iframe")
      ifr.setAttribute('src', url)
      ifr.setAttribute('style', 'display:none')
      document.body.appendChild(ifr)
      timeout = setTimeout(function () {
        var t2 = Date.now()
        if (!t1 || t2 - t1 < t + 100) {
          hasApp = false
        } 
      }, t)
    }
  }
}
</script>

<style lang="scss" scoped>
// 圈子
.circle{
  .apply_hint .hint_info{
    margin: .4rem 0 .8rem 0;
    color: #101d37;
     font-size: .26rem;
    text-align: center;
  }
}
.blue{
  color: #2e6eec;
}
ul{
  & li{
    background-color: #fff;
    box-shadow: 0 .04rem .16rem 0 rgba(0, 0, 0, 0.1);
    border-radius: .1rem;
    padding: .8rem .4rem .4rem .4rem;
    margin-bottom: .4rem;
    & .twoCode{
      width: 2.64rem;
      display: block;
      margin: 0 auto;
      text-align: center;
    }
    & .text{
      text-align: center;
      font-size: .3rem;
      letter-spacing: .01rem;
      font-weight: 700;
      margin: .8rem 0 .38rem 0;
    }
    & p{
      line-height: .4rem;
      font-size: .26rem;
      letter-spacing: .01rem;
	    color: #101d37;
    }
    & .copyBtn{
      width: 3.2rem;
      height: .9rem;
      background-image: linear-gradient(-90deg,#2e6eec 0%,#6699ff 100%),linear-gradient(#9fa5b3,#9fa5b3);
      background-blend-mode: normal,normal;
      border-radius: .1rem;
      font-size: .3rem;
      color: #fff;
      line-height: .9rem;
      letter-spacing: .01rem;
      margin: .8rem auto 0;
      text-align: center;
    }
  }
}
.wxPic{
  width: .88rem;
  display: block;
  margin: 0 auto;
  text-align: center;
  margin-top: .4rem;
}
</style>
