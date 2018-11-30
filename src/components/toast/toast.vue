<template>
  <transition name="fade">
    <div class="toast_box">
      <p class="toast" v-show="show">
        <img src="../../images/ti_shi@2x.png" v-show="type === 1" class="mr20" alt="">
        <img src="../../images/cheng_gong_ti_shi@2x.png" v-show="type === 2" class="mr20" alt="">
        <span>{{message}}</span>
      </p>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      message: '',
      type: 0
    }
  }
}
</script>
<style lang="scss" scoped>
.toast_box{
  position: fixed;
  top: 45%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.toast {
  box-sizing: border-box;
  padding: .4rem;
  line-height: .5rem;
  max-width: 6rem;
  min-width: 2rem;
  font-size: .3rem;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.86);
  border-radius: .2rem;
  z-index: 999;
  img{
    width: .38rem;
    height: .38rem;
    vertical-align: middle;
  }
  span{
    vertical-align: middle;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease-out;
}
.fade-enter {
  opacity: 0;
  transform: scale(1.2);
}
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
