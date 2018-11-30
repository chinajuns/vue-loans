<template>
  <div class="intention">
    <!-- <header class="bgfff">
      <div class="h88 head">
        <p class="on">贷款</p>
        <p>信用卡</p>
      </div>
    </header> -->
    <!-- <div class="list_box">
      <Loan v-show="listBox === 'loan'"></Loan>
      <CreditCard v-show="listBox === 'CreditCard'"></CreditCard>
    </div> -->
    <img class="back" src="../../images/fan_hui@2x.png" @click="$router.back(-1)" alt="">
    <van-tabs v-model="active" swipeable>
      <van-tab title="贷款意向">
        <Loan></Loan>
      </van-tab>
      <van-tab title="信用卡意向">
        <CreditCard></CreditCard>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Loan from './Loan'
import CreditCard from './CreditCard'
export default {
  components: {
    Loan, CreditCard
  },
  data () {
    return {
      listBox: 'loan',
      active: 0
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.intention{
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.back{
  position: fixed;
  left: .4rem;
  top: .26rem;
  width: .2rem;
  z-index: 100;
}
.list_box{
  padding-top: .88rem;
}
</style>
