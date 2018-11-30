<template>
  <div>
    <header>
      <router-link to="/city" class="city">{{cityName}}<img src="../images/cheng_shi_xia_la@2x.png" alt=""></router-link>
      <a href="javascript:;" @click="goInfo" class="info">
        <img src="../images/xin_xi@2x.png" alt="">
        <span v-if="msg_num>0" v-text="msg_num">0</span>
      </a>
    </header>
    <div class="main">
      <!-- banner -->
      <div class="banner">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(item, ind) in banner" :key="ind">
            <a v-if="item.redirect_type==='outside'" :href="item.redirect_url">
              <p class="picbox">
                <img :src="item.url" alt="">
              </p>
            </a>
            <a @click="bannerGo(item)" href="javescript:;" v-else-if="item.redirect_type==='inside'">
              <p class="picbox">
                <img :src="item.url" alt="">
              </p>
            </a>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- classify -->
      <div class="classify clearfix">
        <div @click="topspeed_(item)" v-for="( item, ind ) in category" :key="ind">
          <p class="imgicon">
            <img :src="item.icon"  alt="">
          </p>
          <span>{{item.name}}</span>
        </div>
      </div>
      <!-- broadcast -->
      <div class="broadcast">
        <p>
          <span class="la_ba_max">实时播报</span>
          <img class="la_ba_min" src="../images/la_ba.png" alt="">
          累计借款<em v-text="homeData.all"></em>人,今日借款<em v-text="homeData.today">50</em>人
        </p>
      </div>
      <!-- loanList -->
      <div class="loanList">
        <div v-for="( item, ind ) in homeData.column" :key="ind">
          <p class="listName bor_b" v-text="item.name" v-if="item.column_product.length">人气推荐</p>
          <ul class="listBox">
            <li  v-for="(oitem, oind) in item.column_product" :key="oind">
              <div @click="columnGoDetail(oitem,item.id)">
              <div v-if="showImg">
                <img v-if="oitem.mark&&oitem.mark.url" class="zuixin" :src="imgUrl+oitem.mark.url" alt="">
              </div>
              <div class="list_item">
                <p class="head">
                  <img class="logo" :src="imgUrl+oitem.logo" alt="">
                  <span v-text="oitem.name">优借</span>
                  <em v-for="(imgitem,oimgind) in oitem.market_element" :key="oimgind" >
                      <img v-if="imgitem==='fire'" class="effect" src="../images/huo.gif" alt="">
                      <img v-if="imgitem==='money'" class="effect" src="../images/hongbao.gif" alt="">
                  </em>
                </p>
                <div class="loan_msg clearfix">
                  <div class="left money">
                    <p v-text="oitem.quota_min + '-' + oitem.quota_max">3000-300000</p>
                    <span>可贷金额(元)</span>
                  </div>
                  <p class="rightLine"> </p>
                  <div class="left tag">
                    <p v-for="(oit, oi) in oitem.tags.slice(0,3)" :key="oi" v-text="oit">白条信用贷</p>
                  </div>
                  <div class="right apply">
                    立即申请
                  </div>
                </div>
              </div>
              <p class="describe" v-text="oitem.slogan">三十秒批，一分钟下款，无需下载</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
       <!-- 广告位 -->
      <div class="advertisie_hint ls1" v-show="advertisie_hint">
        <div class="hint_box">
            <a v-if="ads.redirect_type==='outside'" :href="ads.redirect_url" class="advImg">
              <img :src="ads.url" alt="" >
            </a>
            <router-link :to="ads.inpath" class="advImg" v-else-if="ads.redirect_type==='inside'">
               <img :src="ads.url" alt="" >
            </router-link>
          <div class="close_hint">
            <p class="bgfff"></p>
            <img src="../images/tui_chu@2x.png" alt="" @click="advertisie_hint=false">
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
// import server from '@/api'
import BMap from '@/map.js'
import imgDeflut from '@/utils/base64'
export default {
  data () {
    return {
      advertisie_hint: true, // 广告位弹窗
      cityName: sessionStorage.cityName,
      homeData: {},
      banner:[{url:imgDeflut.banner,redirect_type:'outside'}], // banner
      category:[{icon:imgDeflut.category},{icon:imgDeflut.category},{icon:imgDeflut.category},{icon:imgDeflut.category}], // category
      showImg: true,
      msg_num: 0,
      advertiseList: [],
      ads: {url: imgDeflut.ad,redirect_type:'outside'} // 广告
    }
  },
  // beforeCreate () {
  //   this.getHomeAd()
  // },
  created () {
    this.getHomeAd()
    if (!this.cityName) {
      this.location_()
    } else {
      this.getHomeData()
    }
    if (!sessionStorage.advertisie_hint) {
      this.advertisie_hint = true
      sessionStorage.advertisie_hint = true
    } else {
      this.advertisie_hint = false
    }
    if (sessionStorage.userPhone) {
      this.getMsg()
    }
   
  },
  methods: {
    // 去我的消息
    goInfo () {
      if(sessionStorage.userPhone){
        this.$router.push('/info')
      }else{
        this.$router.replace('/login')
      }
    },
    // 人气推荐去 贷款详情
    columnGoDetail (item,column_id) {
      localStorage.page_from = 'column'
      localStorage.page_from_column_id = column_id
      this.$router.push('/LoanDetail/0/' + item.id)
    },
    // banner 跳转
    bannerGo (item) {
      if(item.node === 'product' || item.node === 'credit'){
        localStorage.page_from = 'banner'
      }
      this.$router.push(item.inpath)
    },
    //获取消息
    getMsg () {
      this.fetch.messageNew({}).then(res => {
        if (res.code === 200 ) {
          this.msg_num = res.data.has_new
        }
      })
    },
    //  获取首页数据
    getHomeData (city) {
      this.fetch.home({city: city || sessionStorage.cityName}).then(res => {
        if (res.code === 200) {
          this.homeData = res.data
          this.banner = res.data.banner
          this.category = res.data.category
          for(let i = 0;i< this.banner.length;i++){
            this.banner[i].url = this.imgUrl + this.banner[i].url
            if (this.banner[i].redirect_type === 'inside') { // 如果是内联
              if (this.banner[i].node === 'product') {
                // 产品 0 为列表；否则为id产品详情
                this.banner[i]['inpath'] = (this.banner[i].node_id === '0' ? '/apply/0' : `/LoanDetail/0/${this.banner[i].node_id}`)
              }else if (this.banner[i].node === 'credit') {
                // 信用卡 0 为列表；否则为id信用卡详情
                this.banner[i]['inpath'] = (this.banner[i].node_id === '0' ? '/apply/1' : `/CardDetail/${this.banner[i].node_id}`)
              }else if (this.banner[i].node === 'article') {
                // 资讯  0 为列表；否则为id资讯详情
                this.banner[i]['inpath'] = (this.banner[i].node_id === '0' ? '/find' : `/findDetails/${this.banner[i].node_id}`)
              }else if (this.banner[i].node === 'help') {
                // 新手帮助 新手帮助详情
                this.banner[i]['inpath'] = `/mine/Newhelp`
              }else if (this.banner[i].node === 'about') {
                // 关于我们 关于我们
                this.banner[i]['inpath'] = `/mine/Aboutus`
              }
            }
          }
          // console.log(this.banner)
          for(let i = 0;i< this.category.length;i++){
            this.category[i].icon = this.imgUrl + this.category[i].icon
          }
        }
      })
    },
    // 获取首页广告
     getHomeAd () {
      this.fetch.homeBase({}).then(res => {
        // debugger
        if (res.code === 200) {
          this.advertiseList = res.data
          this.ads = res.data.ads[0]
          this.ads.url = this.imgUrl + this.ads.url
          if (this.ads.redirect_type === 'inside') { // 如果是内联
            if (this.ads.node === 'product') {
              // 产品 0 为列表；否则为id产品详情
              this.ads['inpath'] = (this.ads.node_id === '0' ? '/apply/0' : `/LoanDetail/0/${this.ads.node_id}`)
            }else if (this.ads.node === 'credit') {
              // 信用卡 0 为列表；否则为id信用卡详情
              this.ads['inpath'] = (this.ads.node_id === '0' ? '/apply/1' : `/CardDetail/${this.ads.node_id}`)
            }else if (this.ads.node === 'article') {
              // 资讯  0 为列表；否则为id资讯详情
              this.ads['inpath'] = (this.ads.node_id === '0' ? '/find' : `/findDetails/${this.ads.node_id}`)
            }else if (this.ads.node === 'help') {
              // 新手帮助 新手帮助详情
              this.ads['inpath'] = `/mine/Newhelp`
            }else if (this.ads.node === 'about') {
              // 关于我们 关于我们
              this.ads['inpath'] = `/mine/Aboutus`
            }
          }
        }
      })
    },
    topspeed_ (item) {
      this.$router.push({
        path: `/topspeed/${item.id}`,
        query: {
          title: item.name
        }
      })
    },
    location_ () { // 定位
      let vm = this
      BMap.init().then((BMap) => {
        var myCity = new BMap.LocalCity()
        myCity.get(myFun)
        function myFun (res) {
          // console.log(res)
          vm.cityName = res.name
          vm.getHomeData(res.name)
          sessionStorage.cityName = res.name
        }
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false
    next()
  }
}
</script>

<style lang="scss" scoped>
  header{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: .88rem;
    line-height: .88rem;
    background-color: #fff;
    z-index: 2;
    display: flex;
    padding: 0 .4rem;
    justify-content: space-between;
    .city{
      letter-spacing: .01rem;
      color: #101d37;
      font-size: .36rem;
      font-weight: bold;
      img{
        width: .12rem;
        margin-left: .1rem;
      }
    }
    .info{
      img{
        width: .38rem;
        vertical-align: middle;
      }
      span {
        position: absolute;
        top: .1rem;
        right: .1rem;
        background-color: #ff3336;
        height: .34rem;
        line-height: .34rem;
        border-radius: .17rem;
        color: #fff;
        font-size: .22rem;
        padding: 0 .1rem;
        border: 1px solid #fff;
      }
    }
  }
  .main{
    padding-top: .68rem;
    background-color: #fff;
    // 轮播
    .banner{
      width: 100%;
      height: 3.16rem;
      margin: 0.4rem auto 0;
      text-align: center;
      border-radius: .16rem;
      overflow: hidden;
      .picbox{
        width: 7.1rem;
        height: 3rem;
        text-align: center;
        border-radius: .16rem;
        margin: 0 .2rem .18rem;
      }
      img{
        display: inline-block;
        box-shadow: 3px 1px 11px 1px rgba(0, 0, 0, 0.2);
        width: 6.9rem;
        height: 3rem;
        border-radius: .16rem;
        
      }
    }
    .classify{
      // display: flex;
      // justify-content: space-between;
      padding: 0 .4rem;
      height: 1.45rem;
      margin-top: 0.3rem;
      div{
        text-align: center;
        float: left;
        margin-right: 13%;
        .imgicon{
          margin: 0 auto .2rem;
          width: 1rem;
          height: 1rem;
          &.default-image {
            background: url('../images/zhanweitu_leimu@2x.png') no-repeat;
            background-size: 100% 100%;
          }
          img{
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        span{
          font-size: .24rem;
          color: #101d37;
          font-weight: bold;
        }
      }
    div:last-child{
      margin-right: 0;
    }
    }
    .broadcast{
      margin-top: .4rem;
      padding: 0 .4rem;
      p{
        padding: .2rem;
        background-color: rgba(255, 61, 36, 0.04);
        font-size: .26rem;
        color: #101d37;
        letter-spacing: .01rem;
        .la_ba_min {
          margin-right: .2rem;
          display: none;
        }
        span{
          padding: .03rem .06rem;
          border-radius: .04rem;
          border: solid 1px #ff3d24;
          font-size: .22rem;
          color: #ff3d24;
          margin-right: .2rem;
        }
        em{
          color: #ff3d24;
        }
      }
      @media screen and (max-width: 321px) {
       p {
         .la_ba_max {
          display: none;
        }
         .la_ba_min {
          display: inline-block;
        }

        }
      }
    }
  }
</style>
