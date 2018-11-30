<template>
  <div class="collect">
    <Header></Header>
    <van-tabs v-model="active" swipeable  :class="{bg_white:active===1}">
      <van-tab title="贷款产品">
        <Loan></Loan>
      </van-tab>
      <van-tab title="信用卡">
        <CreditCard></CreditCard>
      </van-tab>
      <van-tab title="发现">
        <Find></Find>
      </van-tab>
    </van-tabs>
    <!-- <div class="nav bgfff">
      <p :class="{on:sortModel==='default'}" @click="cutSortModel('default')">贷款产品</p>
      <p :class="{on:sortModel==='success'}" @click="cutSortModel('success')">信用卡</p>
      <p :class="{on:sortModel==='speed'}" @click="cutSortModel('speed')">发现</p>
    </div> -->
    <!-- <div class="nav bgfff">
      <p :class="{on:sortModel==='default'}" @click="cutSortModel('default')">贷款产品</p>
      <p :class="{on:sortModel==='success'}" @click="cutSortModel('success')">信用卡</p>
      <p :class="{on:sortModel==='speed'}" @click="cutSortModel('speed')">发现</p>
    </div> -->
  </div>
</template>
<script>
import Loan from './Loan'
import CreditCard from './CreditCard'
import Find from './Find'
import Header from '@/components/Header'
export default {
  components: {
    Loan, CreditCard, Find, Header
  },
  data () {
    return {
      listBox: 'loan',
      active: 0,
      article: [],
      credit: [],
      product: []
    }
  },
  watch: {
    active (val) {
      console.log(val)
    }
  },
  created () {
  },
  methods: {
    getCollection () {
      this.fetch.collection({}).then(res => {
        this.product = res.data.product
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.collect{
  position: relative;
  height: 100vh;
  overflow: hidden;
  .header{
    border-bottom: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0rem;
    height: .88rem;
    justify-content: center;
  }
  //复制
  .nav{
    position: absolute;
    top: .8rem;
    left: 0;
    right: 0;
    z-index: 3;
    height: 1.05rem;
    line-height: 1.05rem;
    padding: 0 .4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .26rem;
    letter-spacing: .01rem;
    color: #101d37;
    border-bottom: .01rem solid #edeff5;
    p{
      &.on{
        color: #2e6eec;
        border-bottom: .02rem solid #2e6eec;
      }
    }
    }
  }
.list_box{
  padding-top: .88rem;
}
</style>
