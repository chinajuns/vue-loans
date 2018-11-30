<template>
    <div>
         <Header></Header>
         <ul class="menu">
            <li>
                <div>
                 <router-link to="/mine/Aboutus">
                    <p>关于我们</p>
                    <img src="../../images/dian_ji_cha_kan@2x.png" alt="">
                 </router-link>
                </div>
            </li>
             <li @click="outLoginBtn" v-if="user">
                <a href="javascript:;" class="outLogin">
                    <p class="outLogin">退出登录</p>
                    <img src="../../images/dian_ji_cha_kan@2x.png" alt="">
                 </a>
            </li>
        </ul>
        <!-- 退出登录弹出框 -->
         <div class="outLoginBtn">
           <van-popup v-model="show">
             <p class="isOutLogin">确认退出登录？</p>
             <p class="isBtn">
               <span @click="outLoginBtn">取消</span>
               <label></label>
               <span @click.stop="outLogin">确认</span>
              </p>
             </van-popup>
        </div>
    </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  },
  data () {
    return {
      show: false,
      user:''
    }
  },
  created () {
   this.user = sessionStorage.userPhone || localStorage.userPhone
  },
  methods: {
    outLogin () {
      this.fetch.logout({}).then(res => {
        if (res.code === 200) {
          sessionStorage.removeItem('userPhone')
          sessionStorage.removeItem('advertisie_hint')
          this.show = false
          this.$toast('您已安全退出', 1000, 2)
          setTimeout(() => {
            this.$router.push('/mine')
          }, 1000)
        }
      })
    },
    outLoginBtn () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  & li {
    padding: 0 0.4rem;
    background-color: #fff;
    margin-top: .2rem;
    margin-bottom: .2rem;
    border-bottom: .01rem solid #edeff5;
    & a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & p {
        line-height: 1rem;
        font-size: 0.3rem;
        display: inline-block;
      }
      & img {
        width: .14rem;
        height: .24rem;
      }
    }
  }
  & li:nth-child(2) {
    margin-top: 0;
  }
  .none{
    display: none;
  }
}
</style>
