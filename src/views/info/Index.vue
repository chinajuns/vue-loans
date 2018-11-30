<template>
  <div>
    <Header></Header>
    <ul class="info_box">
      <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
        <li class="date_list" v-for="(item, index) in data_list" :key="index">
          <p class="date">{{item.created_at| YTD('')}}</p>
          <ul>
            <li v-if="item.message_type === 'system'" class="info_list" :class="{on: item.is_read === 1}">
               <router-link :to="`/info/Detail/${item.id}`">
                  <div>
                    <p class="title ellipsis" v-text="item.title">系统回复</p>
                    <div class="info bor_b" v-text="item.content">贷贷狐回复159****7151的意见反馈，回复内容：好的</div>
                  </div>
                  <div class="clickMsg">
                    <span>点击查看</span>
                    <img src="../../images/dian_ji_cha_kan@2x.png" alt="">
                  </div>
              </router-link>
            </li>
            <li v-else class="info_list" :class="{on: item.is_read === 1}">
              <router-link :to="`/info/Reply/${item.id}`">
                <div>
                  <p class="title ellipsis" v-text="item.title">系统消息统息系统消息统息系统消息</p>
                  <div class="info bor_b" v-text="item.content">尊敬的用户您好，摩尔龙安卓最新版贷款APP尊敬的用户您好，摩尔龙安卓最新版贷款APP尊敬的用户...</div>
                </div>
                <div class="clickMsg">
                  <span>点击查看</span>
                  <img src="../../images/dian_ji_cha_kan@2x.png" alt="">
                </div>
              </router-link>
            </li>
          </ul>
        </li>
      </van-list>
    </ul>
    <!-- 暂无信息 -->
    <div class="content_none" :class="{none:!no_list_btn}">
      <img src="../../images/zanwuxinxi.gif" alt="">
      <p>暂无信息</p>
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
      list: 5,
      loading: false,
      finished: false,
      cityName: sessionStorage.cityName,
      data_list: [],
      no_list_btn: false,
      next_page: 1
    }
  },
  created () {
  },
  methods: {
    onLoad () {
      // 异步更新数据
      this.getMsg()
    },
    getMsg () {
      this.fetch.message(this.next_page, {city: this.cityName}).then((res) => {
        setTimeout(() => {
          if (res.code === 200) {
            this.next_page += 1
            this.data_list = this.data_list.concat(res.data.data)
            console.log(res)
            // 加载状态结束
            this.loading = false
            if (res.data.next_page_url == null) {
              // 数据全部加载完成
              this.finished = true
            }
          } else if (res.code === 2004) {
            // 没有数据
            this.loading = false
            this.no_list_btn = true
            this.finished = true
          }
        }, 1000)
      })
    },
  
  }
}
</script>
<style lang="scss" scoped>
// .info_box{
//   padding-bottom: .4rem;
// }
.date_list{
  padding: .4rem .4rem 0;
  .date{
    width: 2.21rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    background-color: rgba(16,29,55,0.12);
    border-radius: .1rem;
    font-size: .24rem;
    color: #fff;
    margin: auto;
  }
  .info_list{
    margin-top: .4rem;
    padding: 0 .2rem;
    background-color: #fff;
    border-radius: .1rem;
    font-size: .3rem;
    letter-spacing: .01rem;
    color: #101d37;
    // height: 3.42rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    &.on{
      .title{
        color: #7f8799;
      }
      .info{
        color: #7f8799;
      }
    }
    .title{
      padding: .4rem 0;
      letter-spacing: .01rem;
      font-weight: bold;
    }
    .info{
      line-height: .4rem;
      padding-bottom: .4rem;
      font-size: .26rem;
      color: #394043;
    }
    .clickMsg{
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #101d37;
      // margin-top: .4rem;
      // margin-bottom: .4rem;
      padding: .4rem 0;
       img{
        // position: absolute;
        // right: 0;
        // top: .43rem;
        width: .12rem;
        height: .24rem;
      }
    }
    a{
      // display: block;
      // height: 1.08rem;
      // line-height: 1.08rem;
      // border-top: .01rem solid #edeff5;
      // position: relative;
      img{
        // position: absolute;
        // right: 0;
        // top: .43rem;
        // width: .12rem;
        // height: .24rem;
      }
    }
  }
}
.content_none{
  height: calc(100vh - .88rem);
}
</style>
