<template>
  <div class="header">
      <!-- 返回 -->
      <div class="backClose" v-if="header_show">
        <img class="close" src="../images/shou_ye_02@2x.png"  @click="$router.push('/')" alt="">
      </div>
      <div class="backClose" v-else>
        <img class="back" src="../images/fan_hui@2x.png" v-if="!$route.meta.isBack" @click="$router.back(-1)" alt="">
        <img src="../images/guan_bi@2x.png" alt="" class="close"  v-if="$route.meta.isClose"  @click="$router.replace($route.meta.turnPath)">
        <img src="../images/guan_bi@2x.png" alt="" class="close"  v-if="ic==='1'"  @click="$router.replace('/')">
      </div>
       <!-- 标题 -->
      <p class="ellipsis">{{ $route.meta.title || $route.query.title }}</p>
      <!-- 收藏分享 -->
      <div class="colSahare">
        <router-link to="">
          <!-- 收藏 -->
          <span v-if="icon_col" class="iconCollect">
            <img src="../images/shou_cang_02@2x.png" alt="" @click="collect_" v-if="is_collection">
            <img src="../images/shou_cang_01@2x.png" alt="" @click="collect_" v-else>
          </span>
        </router-link>
          <span class="agree" v-if="agree" @click="agree_">同意</span>
      </div>
  </div>
</template>
<script>
import checkurl from '@/utils/checkurl'
export default {
  props: ['icon_col', 'is_collection','agree','ic'],
  data () {
    return {
      header_show: checkurl('type') === 'app' && checkurl('share') === '1' || checkurl('page_from') === 'distribute'
    }
  },
  created (){
    console.log(this.ic)
  },
  watch: {
    'is_collection': function (val) {
    }
  },
  methods: {
    collect_ () { // 收藏
      this.$emit('collect')
    },
    agree_ () { //同意
      this.$emit('agree')
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
  height: .88rem;
  line-height: .88rem;
  background-color: #fff;
  border-bottom: .01rem solid #edeff5;
  box-sizing: border-box;
  padding: 0 .4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .ellipsis{ // 标题
    width: 60%;
    box-sizing: border-box;
    font-size: .36rem;
    letter-spacing: .01rem;
    color: #101d37;
    font-weight: bold;
    text-align: center;
  }
  .colSahare{ // 分享收藏
   margin-top: .1rem;
   width: 20%;
   display: flex;
   justify-content: space-around;
   align-items: center;
   box-sizing: border-box;
   padding-left: .2rem;
    .iconCollect{
      width: .8rem;
      margin-left: .8rem;
      // margin-right: 1rem;
      img{
        width: .32rem;
      }
    }
    .agree{
      letter-spacing: .01rem;
      color: #2e6eec;
      font-size: .3rem;
    }
  }
  .backClose{ // 返回
    width: 20%;
    box-sizing: border-box;
    margin-top: .1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding-right: .5rem;
    .back{
        width: .2rem;
        height: .34rem;
        margin-bottom: .14rem;
        margin-right: .4rem;
    }
    .close{
        width: .32rem;
        margin-bottom: .12rem;
    }
  }
}
</style>
