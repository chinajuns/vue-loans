<template>
  <div>
    <p class="bor_"></p>
    <div class="cardList bgfff">
      <ul class="cardBox">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
          <li  v-for="(item, i) in data_list" :key="i" class="clearfix">
            <router-link :to="`/CardDetail/${item.id}`">
              <p class="card_img">
                <img :src="imgUrl+item.logo" class="left card" alt="">
                <img v-if="item.mark&&item.mark.url" :src="imgUrl + item.mark.url" class="left redu" alt="">
                <span v-if="item.status===0">已下架</span>
              </p>
              <div class="card_msg">
                <p class="title ellipsis" v-text="item.name">中信i白金信用卡中信i白金信用卡中信i白金信用卡</p>
                <p class="brief" v-text="item.introduce">不要年费的白金信用卡；最长50天免息还款期；挂失卡...</p>
                <p class="apply_num"><em v-text="item.num">123456</em>人申请</p>
              </div>
            </router-link>
          </li>
        </van-list>
      </ul>
      <!-- 暂无内容 -->
      <div class="content_none" :class="{none:!no_list_btn}">
        <img src="../../images/zanwushoucang.gif" alt="">
       <p>暂无信用卡</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data_list: [],
      loading: false,
      finished: false,
      no_list_btn: false,
      next_page: 1
    }
  },
  methods: {
    getCollection () {
      // 获取贷款列表
      this.fetch.collectionCredit(this.next_page, {}).then((res) => {
        if (res.code === 200) {
          console.log('信用卡收藏',res);
          
          this.next_page += 1
          if (res.data && res.data.data.length) {
            this.data_list = this.data_list.concat(res.data.data)
          } else {
            this.no_list_btn = true
          }
          // 加载状态结束
          this.loading = false
          if (res.data && res.data.next_page_url == null) {
            // 数据全部加载完成
            this.finished = true
          }
        } else if (res.code === 2004) {
          // 没有数据
          this.loading = false
          this.no_list_btn = true
          this.finished = true
        }
      })
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        this.getCollection()
      }, 800)
    }
  }
}
</script>
<style lang="scss" scoped>
.bor_{
  position: fixed;
  top: .88rem;
  left: 0;
  right: 0;
  height: .01rem;
  background-color: #edeff5;
}
.cardList{
  li{
    padding: .4rem 0;
  }
  li.on{
    .title,.brief{
      color: #8a9099;
    }
  }
  li:last-child{
    border-bottom: none;
  }
}
.card_img{
  span{
    position: absolute;
    top: 0;
    left: 0;
    width: .84rem;
    height: .3rem;
    line-height: .32rem;
    text-align: center;
    background-color: #a1a8b2;
    font-size: .2rem;
    color: #fff;
    border-radius: .1rem 0 0 0;
  }
}
.content_none {
  height: calc(100vh - 1.76rem);
}
</style>
