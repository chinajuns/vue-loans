<template>
  <div class="login bgfff ls1">
    <header class="h88 pl40 pr40">
      <img src="../../images/guan_bi@2x.png" alt="" @click="$router.back(-1)">
      <router-link to="/login/Register">注册</router-link>
    </header>
    <div class=" pl40 pr40">
      <p class="title fwb">账号密码登录</p>
      <div class="item bor_b">
        <input type="tel" v-model="phone" @focus="close=true" @blur="close=false"  maxlength="13" @keyup="telNum($event)" placeholder="请输入手机号">
        <p>
          <img src="../../images/qingchu@2x.png" class="close" v-show="close" @click="phone=''" alt="">
        </p>
      </div>
      <div class="item bor_b">
        <input :type="passwordType" v-model="password" @focus="close2=true" @blur="close2=false" maxlength="16" placeholder="请输入密码">
        <p class="eye_box ">
          <img src="../../images/qingchu@2x.png" class="close left" v-show="close2" @click="password=null" alt="">
          <img src="../../images/bukan_mima@2x.png" class="eye" v-show="!eye" @click="eye_(true)" alt="">
          <img src="../../images/kan_mima@2x.png" class="eye" v-show="eye" @click="eye_(false)" alt="">
        </p>
      </div>
      <p class="login_btn " :class="{on: phone&&password}" @click="login">登录</p>
      <p class="login_type mt40">
        <router-link to="/login" replace>手机快捷登录</router-link>
        <router-link to="/login/FindPwd" replace>忘记密码？</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import { phoneNumber } from '@/utils/check'
export default {
  data () {
    return {
      phone: '',
      password: null,
      passwordType: 'password',
      close: false, // 清除按钮
      close2: false, // 清除按钮
      eye: false, // 密码可见
      protocol: true, // 协议勾选状态
      getCodeFlag: true // 获取验证码按钮防止重复点击
    }
  },
  watch:{
    showHeight: 'inputType' ,
    phone(newValue, oldValue) {
        // 具体的代码在这里实现
      this.phone = newValue.length > oldValue.length ? newValue.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3') : this.phone.trim()
    }
  },
  methods: {
    // 输入带空格的手机号
    telNum (e) {
      let obj=e.target;
      if (e.keyCode == 8) return
        let value = obj.value;
        // console.log(value)
        value = value.replace(/\s*/g, "");
        let result = [];
        for (let i = 0; i < value.length; i++) {
            if (i == 3 || i == 7) {
                result.push(" " + value.charAt(i));
            } else {
                result.push(value.charAt(i));
            }
        }
        obj.value = result.join("");
    },
    login () { // 密码登录
    let ph = this.phone
      ph = ph.replace(/\s*/g, "")
      if (phoneNumber(ph) && this.password) {
        if (this.password.length > 5) {
          const params = {
            phone: ph,
            password: this.password
          }
          this.fetch.pwdLogin(params).then((res) => {
            if (res.code === 200) {
              let time = 1e3
              this.throttle(() => { // 信息提示
                this.$toast(res.info, time, 2)
              }, time)
              sessionStorage.userPhone = res.data.nick
              setTimeout(() => {
                this.$router.replace(localStorage.fromUrl)
              }, 1e3)
            } else {
              let time = 2e3
              this.throttle(() => { // 信息提示
                this.$toast(res.info, time, 1)
              }, time)
            }
          })
        } else {
          let time = 2e3
          this.throttle(() => { // 信息提示
            this.$toast('密码不能少于6位', time, 1)
          }, time)
        }
      }
    },
    eye_ (type_) { // 密码可见
      type_ ? this.passwordType = 'text' : this.passwordType = 'password'
      this.eye = type_
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
