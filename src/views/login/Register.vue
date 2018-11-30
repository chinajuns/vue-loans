<template>
  <div class="login bgfff ls1">
    <div class="header">
      <div class="backClose">
        <img class="back" src="../../images/fan_hui@2x.png"  @click="$router.replace('/login')" alt="">
      </div>
      <p class="ellipsis">注册</p>
      <div class="colSahare"></div>
    </div>
    <div class="pl40 pr40">
      <div class="item bor_b">
        <input type="tel" v-model="phone" @focus="close=true" @blur="close=false"  maxlength="13" @keyup="telNum($event)" placeholder="请输入手机号">
        <p>
          <img src="../../images/qingchu@2x.png" class="close" v-show="close" @click="phone=''" alt="">
        </p>
      </div>
      <div class="item bor_b">
        <input type="text" v-model="code" @input="setCode" :readonly="readonly_" placeholder="请输入验证码" maxlength="6">
        <span class="get_code" :class="{on: phone}" @click="getCode" v-text="getCodeText"></span>
      </div>
      <div class="item bor_b">
        <input :type="passwordType" v-model="password" @focus="close2=true" @blur="close2=false" placeholder="请输入密码（最少6位）">
        <p>
          <img src="../../images/qingchu@2x.png" class="close left" v-show="close2" @click="password=null" alt="">
          <img src="../../images/bukan_mima@2x.png" class="eye" v-show="!eye" @click="eye_(true)" alt="">
          <img src="../../images/kan_mima@2x.png" class="eye" v-show="eye" @click="eye_(false)" alt="">
        </p>
      </div>
      <p class="login_btn " :class="{on: phone&&code&&protocol&&password}" @click="register">注册</p>
    </div>
    <div class="protocol">
      <span @click="protocol=protocol?false:true"><img v-show="protocol" src="../../images/fuxuankuang_xuanze@2x.png" alt=""></span>
      注册即表示您同意
      <router-link to="/login/Protocol" replace>《注册协议》</router-link>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header'
import { phoneNumber } from '@/utils/check'
export default {
  components: {
    Header
  },
  data () {
    return {
      phone: '',
      password: null,
      code: null,
      readonly_: true, // 验证码默认禁止输入
      passwordType: 'password',
      close: false, // 清除按钮
      close2: false, // 清除按钮
      eye: false, // 密码可见
      protocol: true, // 协议勾选状态
      isGetCode: true, // 获取验证码按钮防止重复点击
      getCodeText: '获取验证码'
    }
  },
  created () {
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
    getCode () { // 获取验证码
     let ph = this.phone
      ph = ph.replace(/\s*/g, "")
      if (phoneNumber(ph)) {
        const params = {
          phone: ph,
          msg_sign: 0, //  0 =>贷贷狐 , 1=>惠融易
          verify_type: 'register' // register=>注册 , verify=>快捷登录 , retrieve=>找回密码
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
            } else {
              let time = 2e3
              this.throttle(() => { // 信息提示
                this.$toast(res.info, time, 1)
              }, time)
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
    setCode () { // 验证验证码
      if (this.code.length === 6) {
        const params = {
          phone: this.phone,
          verification: this.code,
          verify_type: 'register' // 验证码类型 : register=>注册 , verify=>快捷登录 , retrieve=>找回密码
        }
        this.fetch.checkCode(params).then((res) => {
          if (res.code === 200) {
            this.verificationType = true
            let time = 1e3
            this.throttle(() => { // 信息提示
              this.$toast('验证成功', time, 2)
            }, time)
          } else {
            let time = 1e3
            this.throttle(() => { // 信息提示
              this.$toast(res.info, time, 1)
            }, time)
          }
        })
      }
    },
    register () { // 注册
     let ph = this.phone
      ph = ph.replace(/\s*/g, "")
      if (ph && this.code && this.password && this.protocol) {
        if (this.password.length > 5) {
          const params = {
            phone: ph,
            verification: this.code, // 验证码
            verify_type: 'register', // 验证码类型 : register=>注册 , verify=>快捷登录 , retrieve=>找回密码
            package: 'ddh', // 所操作的包名: ddh | hry
            password: this.password, // 密码内容
            product_id: localStorage.product_id_ || 0, // 注册时产品id (通过产品详情进行注册时产生,非必传)
            credit_id: localStorage.credit_id_ || 0, // 注册时信用卡id (通过信用卡详情进行注册时产生,非必传
            page_id: localStorage.page_id || 0 // 注册时分发页id(用户通过分发页进行注册时产生,非必传)
          }
          this.fetch.register(params).then((res) => {
            if (res.code === 200) {
              let time = 1e3
              this.throttle(() => { // 信息提示
                this.$toast(res.info, time, 2)
              }, time)
              sessionStorage.userPhone = res.data.nick
              localStorage.removeItem('product_id_')
              localStorage.removeItem('credit_id_')
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
.login{
  .header{
    border: none;
  }
}
</style>
