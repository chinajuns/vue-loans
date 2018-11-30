<template>
  <div class="login bgfff ls1">
    <header class="h88 pl40 pr40">
      <img src="../../images/guan_bi@2x.png" alt="" @click="$router.back(-1)">
      <router-link to="/login/Register" replace>注册</router-link>
    </header>
    <div class=" pl40 pr40">
      <p class="title fwb">手机快捷登录</p>
      <div class="item bor_b">
        <input type="tel" v-model="phone" maxlength="13" @focus="close=true" @blur="close=false" @keyup="telNum($event)" placeholder="请输入手机号">
        <p>
          <img src="../../images/qingchu@2x.png" class="close" v-show="close" @click="phone=''" alt="">
        </p>
      </div>
      <div class="item bor_b">
        <input type="text" v-model="code" :readonly="readonly_" placeholder="请输入验证码" maxlength="6">
        <span class="get_code" :class="{on: phone}" @click="getCode" v-text="getCodeText"></span>
      </div>
      <p class="login_btn " :class="{on: phone&&code&&protocol}" @click="login">登录</p>
      <p class="login_type mt40">
        <router-link to="/login/PwdLogin" replace>账号密码登录</router-link>
      </p>
    </div>
    <div class="protocol"  v-bind:class="{'nav-hide': hideClass }">
      <span @click="protocol=protocol?false:true">
        <img v-show="protocol" src="../../images/fuxuankuang_xuanze@2x.png" alt="">
        </span>
      登录即表示您同意
      <router-link to="/login/Protocol" replace>《注册协议》</router-link>
    </div>
  </div>
</template>
<script>
import { phoneNumber } from '@/utils/check'
export default {
  data () {
    return {
      phone: '',
      code: null,
      readonly_: true, // 验证码默认禁止输入
      close: false, // 清除按钮
      protocol: true, // 协议勾选状态
      isGetCode: true, // 获取验证码按钮防止重复点击
      getCodeText: '获取验证码',
      docmHeight: document.documentElement.clientHeight,  //一开始的屏幕高度
      showHeight: document.documentElement.clientHeight,   //一开始的屏幕高度
      hideClass: false
    }
  },
  watch:{
    showHeight: 'inputType',
    phone(newValue, oldValue) {
        // 具体的代码在这里实现
      this.phone = newValue.length > oldValue.length ? newValue.replace(/\s*/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3') : this.phone.trim()
    }
  },
  mounted () {
  // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
          window.screenHeight = document.body.clientHeight;
          this.showHeight = window.screenHeight;
      })()
    }
  },
  methods: {
    // 检测屏幕高度变化
     inputType() {
        if (!this.timer) {
           this.timer = true
           let that = this
           setTimeout(() => {
              if (that.docmHeight > that.showHeight) {
              //显示class
                 this.hideClass = true;
              } else if (that.docmHeight <= that.showHeight) {
               //显示隐藏
                 this.hideClass = false;
              }
              that.timer = false;
           }, 10)
        }
     },
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
    getCode () { // 获取验证码
      let ph = this.phone
      ph = ph.replace(/\s*/g, "")
      if (phoneNumber(ph)) {
        const params = {
          phone: ph,
          msg_sign: 0, //  0  =>贷贷狐 , 1=>惠融易
          verify_type: 'verify' // register=>注册 , verify=>快捷登录 , retrieve=>找回密码
        }
        if (this.isGetCode) {
          this.isGetCode = false
          this.fetch.getCode(params).then((res) => {
            let _time = 60
            let $this = this
            if (res.code === 200) {
              this.readonly_ = false
              $this.getCodeText = `(${_time}s)重新获取`
              const setTime = setInterval(() => {
                _time = _time - 1
                $this.getCodeText = `(${_time}s)重新获取`
                if (_time === 0) {
                  clearInterval(setTime)
                  this.isGetCode = true
                  $this.getCodeText = '重新获取'
                }
              }, 1e3)
            }
          })
        }
      } else {
        let time = 2e3
        this.throttle(() => { // 信息提示
          this.$toast('请输入正确的手机号', time, 1)
        }, time)
      }
    },
    login () {
      let ph = this.phone
      ph = ph.replace(/\s*/g, "")
      if (ph && this.code && this.protocol) {
        const params = {
          phone: ph,
          package: 'ddh', // 所操作的包名: ddh | hry
          verification: this.code, // 验证码内容
          verify_type: 'verify', // 验证码类型 : register=>注册 , verify=>快捷登录 , retrieve=>找回密码
          product_id: localStorage.product_id_ || 0, // 注册时产品id (通过产品详情进行注册时产生,非必传)
          credit_id: localStorage.credit_id_ || 0, // 注册时信用卡id (通过信用卡详情进行注册时产生,非必传
          page_id: localStorage.page_id || 0 // 注册时分发页id(用户通过分发页进行注册时产生,非必传)
        }
        this.fetch.verifyLogin(params).then((res) => {
          if (res.code === 200) {
            let time = 1e3
            sessionStorage.userPhone = res.data.nick
            localStorage.removeItem('product_id_')
            localStorage.removeItem('credit_id_')
            this.throttle(() => { // 信息提示
              this.$toast(res.info, time, 2)
            }, time)
            setTimeout(() => {
              this.$router.replace(localStorage.fromUrl)
            }, 1e3)
          } else {
            let time = 1e3
            this.throttle(() => { // 信息提示
              this.$toast(res.info, time, 1)
            }, time)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
