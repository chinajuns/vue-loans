<template>
  <div class="apply">
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
    <van-tabs v-model="active" swipeable :class="{bor_b:active===1}">
      <van-tab title="贷款">
        <Loan></Loan>
      </van-tab>
      <van-tab title="信用卡">
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
      active: this.$route.params.index
    }
  }
}
</script>
<style lang="scss" scoped>
.apply{
  position: relative;
  height: calc(100vh - 1rem);
  overflow: hidden;
  box-sizing: border-box;
}
// header{
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   z-index: 3;
//   .head{
//     display: flex;
//     justify-content: center;
//     p{
//       margin: 0 .4rem;
//       box-sizing: border-box;
//       font-size: .36rem;
//       color: #101d37;
//       font-weight: bold;
//       &.on{
//         color: #2e6eec;
//         border-bottom: .02rem solid #2e6eec;
//       }
//     }
//   }
// }
.list_box{
  padding-top: .88rem;
}
</style>
