<template>
    <div class="notLogin bgfff">
       <div class="bggray">
          <header>
            <div class="info">
              <!-- <span v-if="msg_num>0" v-text="msg_num">0</span> -->
              <img @click="chat" src="../../images/ke_fu@2x.png" alt="" class="headset">
            </div>
          </header>
        <div class="topBox">
            <img :src="userPhone?loginPic:notLoginPic" class="userPic" alt="">
            <router-link to="/login" v-if="!userPhone" class="ls1 loginBtn">登录/注册</router-link>
            <p class="userPhone mt40 ls1 fwb" v-else>{{userPhone}}</p>
        </div>
        <!-- 三个列表 -->
        <ul class="list pd40">
            <li>
                <a href="javascript:;" @click="goTo('/intention')">
                    <img src="../../images/yi_xiang@2x.png" alt="">
                    <p>申请意向</p>
                </a>
            </li>
            <li>
                <a href="javascript:;" @click="goTo('/collect')">
                    <img src="../../images/wo_de_shou_cang@2x.png" alt="">
                    <p>我的收藏</p>
                 </a>
            </li>
            <li>
               <router-link to="/mine/Newhelp">
                    <img src="../../images/xin_shou_bang_zhu@2x.png" alt="">
                    <p>新手帮助</p>
                </router-link>
            </li>
        </ul>
       </div>
        <!-- 菜单栏 -->
        <ul class="menu bggray">
            <li>
                <div>
                  <a href="javascript:;" @click="goTo('/mine/Opinion')">
                      <p>意见反馈</p>
                      <img src="../../images/dian_ji_cha_kan@2x.png" alt="">
                  </a>
                </div>
            </li>
             <li class="bor_b">
                <router-link to="/mine/Circle">
                    <p>贷贷狐圈子</p>
                    <img src="../../images/dian_ji_cha_kan@2x.png" alt="">
               </router-link>
            </li>
             <li>
               <div>
                <router-link to="/mine/Set">
                    <p>设置</p>
                    <img src="../../images/dian_ji_cha_kan@2x.png" alt="">
                 </router-link>
                 </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
      // userPhone: sessionStorage.userPhone || null,
      userPhone: sessionStorage.userPhone || '',
      cityName: sessionStorage.cityName,
      msg_num: 0,
      notLoginPic: require("../../images/mo_ren_tou_xiang@2x.png"),
      loginPic: require("../../images/yonghutouxiang@2x.png")
    };
  },
  created() {
    this.creatServer(),
    this.profile()
  },
  methods: {
    creatServer () {
      if (!document.getElementById('script__id__yang')) {
        window.qimoClientId = {
          userId: localStorage.deviceid_,
          nickName: sessionStorage.userPhone || "游客"
        }
        let script = document.createElement("script");
        script.src = "https://webchat.7moor.com/javascripts/7moorInit.js?accessId=fd253de0-a516-11e8-8207-4d28820c892f&autoShow=false&language=ZHCN";
        script.async = 'async'
        script.id = "script__id__yang"
        document.body.appendChild(script)
      }
    },
    // 个人资料
    profile () {
       this.fetch.profile({}).then(res => {
        if (res.code === 200) {
          // console.log('个人资料',res);
          this.userPhone = res.data.nick
          sessionStorage.userPhone = res.data.nick
        }
      });
    },
    getMsg() {
      this.fetch.messageNew({}).then(res => {
        if (res.code === 200) {
          this.msg_num = res.data.has_new;
        }
      });
    },
    chat() {
      qimoChatClick()
    },
    goTo (url) {
      if (this.userPhone) {
        this.$router.push(url)
      } else {
         this.$router.push('/login')
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bggray {
  background-color: #f8f8f9;
}
.notLogin {
  height: calc(100vh - 1.28rem);
  .userPhone {
    font-size: 0.36rem;
    color: #101d37;
  }
  header {
    justify-content: space-between;
    .info {
      display: flex;
      flex-direction: row-reverse;
      margin-top: 0.28rem;
      height: 1rem;
      img {
        width: 0.38rem;
        height: 0.32rem;
        position: absolute;
        right: 0.4rem;
        top: 0.15rem;
      }
      span {
        position: absolute;
        right: 0.11rem;
        background-color: #ff3336;
        height: 0.34rem;
        line-height: 0.34rem;
        border-radius: 0.17rem;
        color: #fff;
        font-size: 0.22rem;
        padding: 0 0.1rem;
      }
    }
  }
  .topBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .userPic {
      width: 1.3rem;
    }
    & .loginBtn {
      color: #fff;
      width: 2.4rem;
      height: 0.7rem;
      font-size: 0.3rem;
      letter-spacing: 0.01rem;
      display: inline-block;
      line-height: 0.7rem;
      text-align: center;
      border-radius: 0.5rem;
      background-color: #2e6eec;
      margin: 0.4rem 0 0.8rem 0;
    }
  }

  // 三个列表
  .list {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.4rem;
    & li {
      width: 1.75rem;
      height: 1.1rem;
      background-color: #fff;
      padding: 0.19rem 0 0 0.3rem;
      -webkit-box-shadow: 0 0.06rem 0.1rem #e6e6e6;
      box-shadow: 0 0.06rem 0.1rem #e6e6e6;
      & img {
        width: 0.36rem;
        height: 0.44rem;
      }
      & p {
        color: #7f8799;
        line-height: 0.6rem;
        letter-spacing: 0.01rem;
      }
    }
    & li:last-child {
      margin-right: 0;
    }
    & li:nth-child(2) {
      img {
        width: 0.38rem;
        height: 0.38rem;
      }
      p {
        line-height: 0.76rem;
      }
    }
  }
  // 菜单栏
  .menu {
    & li {
      padding: 0 0.4rem;
      background-color: #fff;
      & div {
        border-bottom: 0.02rem solid #edeff5;
      }
      & a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        & p {
          line-height: 1rem;
          font-size: 0.28rem;
          color: #101d37;
          letter-spacing: 0.01rem;
          display: inline-block;
        }
        & img {
          height: 0.24rem;
        }
      }
    }
    & li:nth-child(2) {
      margin-bottom: 0.2rem;
    }
  }
}
</style>
