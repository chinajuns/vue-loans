<template>
  <div>
    <Header></Header>
    <div class="main">
      <div class="gps bgfff">
        <p class="city" v-if="cityName"><span class="mr20">{{cityName}}</span><em>GPS定位</em></p>
        <p class="city" v-else><img src="../../images/wu_fa_ding_wei@2x.png" alt=""><span class="ml20">无法定位当前城市</span></p>
        <p class="anew" @click="location_">重新定位</p>
      </div>
      <div class="hot" id="hot">
        <p>热门城市</p>
        <ul>
          <li v-for="city in hotCity" :key="city" @click="selectCity(city)" :class="{on: cityName.indexOf(city) !== -1}">{{city}}</li>
        </ul>
      </div>
      <ul>
        <li class="city_list" v-for="(item, i) in msg" :key="i">
          <p class="h88 alphabet" :id="`${item.initial}`">{{item.initial}}</p>
          <ul class="bgfff">
            <li v-for="(it, i) in item.cities" :key="i" @click="selectCity(it.name)">{{it.name}}</li>
          </ul>
        </li>
      </ul>
      <ul class="nav">
        <li>#</li>
        <li :class="{on: 'hot' === activeCity}" @click="activeBtn('hot')">热</li>
        <li v-for="(item, i) in msg" :key="i" @click.stop="activeBtn(item.initial)" :class="{'on':item.initial === activeCity}">
          {{item.initial}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header'
import BMap from '@/map.js'
export default {
  components: {
    Header
  },
  data () {
    return {
      msg: {},
      activeCity: 'hot',
      cityName: sessionStorage.cityName,
      hotCity:[]
    }
  },
  created () {
    this.getCityList(),
    this.getHotCity()
  },
  mounted () {
    window.addEventListener('scroll', this.scroll_) // 加载scroll
  },
  methods: {
    getCityList () { // 获取城市数据
      const param = {
        type: 'sort'
      }
      this.fetch.district(param).then(res => {
        // console.log('城市',res)
        this.msg = res.data
      })
    },
      // 获取热门城市
    getHotCity () {
      this.fetch.hotCity({}).then(res => {
         if(res.code===200){
          // console.log('热门城市',res)
          this.hotCity = res.data
       }
      })
    },
    activeBtn (i) { // 选择城市首字母
    //   this.activeCity = i
    // console.log(this.activeCity, i)
      let _top = document.getElementById(i).offsetTop 
      window.scrollTo(0, _top)
    },
    location_ () { // 定位
      let time = 2e3
      this.throttle(() => { // 信息提示
        this.$toast('定位中...', time, 1)
      }, time)
      let vm = this
      BMap.init().then((BMap) => {
        var myCity = new BMap.LocalCity()
        myCity.get(myFun)
        function myFun (res) {
          vm.cityName = res.name
          sessionStorage.cityName = res.name
        }
      })
    },
    selectCity (city) { // 选择城市
      this.cityName = city
      sessionStorage.cityName = city
      this.$router.push('/')
    },
    scroll_ () { // 滑动列表右侧字母跟随
      let dom = document.getElementsByClassName('alphabet')
      let scrollT = document.documentElement.scrollTop || document.body.scrollTop + parseInt(0.88*(document.documentElement.clientWidth / 7.5))
      for (let i = 0; i < dom.length; i++) {
        if (dom[i].offsetTop < scrollT) {
          this.activeCity = dom[i].innerHTML
        }
      }
      if (dom[0] && dom[0].offsetTop > scrollT) {
        this.activeCity = 'hot'
      }
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.scroll_) // 销毁scroll
  }
}
</script>
<style lang="scss" scoped>
.main{
  letter-spacing: .01rem;
}
.gps{
  padding: 0 .4rem;
  height: .88rem;
  line-height: .88rem;
  display: flex;
  justify-content: space-between;
  .city{
    font-size: .3rem;
    color: #101d37;
    span{
      font-weight: bold;
    }
    em{
      font-size: .24rem;
      color: #7f8799;
    }
    img{
      width: .24rem;
    }
  }
  .anew{
    font-size: .24rem;
    color: #2e6eec;
  }
}
.hot{
  padding: .4rem .4rem 0;
  font-size: .24rem;
  color: #7f8799;
  ul{
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    li{
      width: 1.48rem;
      height: .6rem;
      line-height: .6rem;
      text-align: center;
      background-color: #ffffff;
      border-radius: .04rem;
      color: #101d37;
      margin-top: .26rem;
      margin-right: .26rem;
      &:nth-of-type(4n){
        margin-right: 0;
      }
      &.on{
        color: #2e6eec;
      }
    }
  }
}
.city_list{
  p{
    padding-left: .4rem;
    font-size: .24rem;
    color: #7f8799;
  }
  ul{
    padding: 0 .4rem;
    li{
      height: 1.08rem;
      line-height: 1.08rem;
      border-top: .01rem solid #edeff5;
      font-size: .3rem;
      color: #101d37;
      &:first-child{
        border: none;
      }
    }
  }
}
.nav{
  position: fixed;
  top: 2.1rem;
  right: .1rem;
  li{
    // margin-bottom: .2rem;
    width: .45rem;
    height: .37rem;
    line-height: .37rem;
    // line-height: .5rem;
    text-align: center;
    font-size: .2rem;
    color: #101d37;
    // padding-top: .05rem;
    &.on{
      color: #2e6eec;
    }
  }
}
</style>
