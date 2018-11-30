<template>
  <div class="footer">
    <p>
      <router-link to="/" :class="{ on: $route.name == `home` }">
        <i class="icon_img"></i>
        <em>首页</em>
      </router-link>
    </p>
    <p>
      <router-link to="/apply/0" :class="{ on: $route.name == `apply` }">
        <i class="icon_img"></i>
        <em>贷款</em>
      </router-link>
    </p>
    <p>
      <router-link to="/find" :class="{ on: $route.name == `Find` }">
        <i class="icon_img"></i>
        <em>发现</em>
      </router-link>
    </p>
    <p>
      <router-link to="/mine" :class="{ on: $route.name == `NotLogin` }">
        <i class="icon_img"></i>
        <em>我的</em>
      </router-link>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1rem;
    display: flex;
    background-color: #fff;
    p{
      display: flex;
      align-items: center;
      flex-grow: 1;
      a{
        flex-grow: 1;
        text-align: center;
        color: #8a9099;
        font-size: .18rem;
        .icon_img{
          display: block;
          width: .38rem;
          height: .38rem;
          background: url(../images/shou_ye_02@2x.png) no-repeat;
          background-size: 100% 100%;
          margin: auto;
          margin-bottom: .1rem;
        }
        &.on{
          color: #2e6eec;
          .icon_img{
            background: url(../images/shou_ye_01@2x.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      &:nth-of-type(2){
        a{
          .icon_img{
            background: url(../images/dai_kuan_02@2x.png) no-repeat;
            background-size: 100% 100%;
          }
          &.on{
            color: #2e6eec;
            .icon_img{
              width: .4rem;
              background: url(../images/dai_kuan_01@2x.png) no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      &:nth-of-type(3){
        a{
          .icon_img{
            background: url(../images/fa_xian_02@2x.png) no-repeat;
            background-size: 100% 100%;
          }
          &.on{
            color: #2e6eec;
            .icon_img{
              background: url(../images/fa_xian_01@2x.png) no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      &:nth-of-type(4){
        a{
          .icon_img{
            width: .30rem;
            background: url(../images/wo_de_02@2x.png) no-repeat;
            background-size: 100% 100%;
          }
          &.on{
            color: #2e6eec;
            .icon_img{
              width: .30rem;
              background: url(../images/wo_de_01@2x.png) no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
</style>
