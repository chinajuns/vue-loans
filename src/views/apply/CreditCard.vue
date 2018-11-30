<template>
  <div class="card">
    <p class="bor_"></p>
    <div class="cardList bgfff">
      <ul class="cardBox ">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
          <li v-for="(it, i) in data_list" :key="i" class="clearfix">
            <div @click="goCardDetail(it)">
              <p class="card_img">
                <img :src="imgUrl + it.logo" class="left card" alt="">
                <img v-if="it.corner&&it.corner.url" :src="imgUrl + it.corner.url" class="left redu" alt="">
              </p>
              <div class="card_msg">
                <p class="title ellipsis">{{it.name}}</p>
                <p class="brief ">{{it.introduce}}</p>
                <p class="apply_num"><em>{{it.applies}}</em>人申请</p>
              </div>
            </div>
          </li>
        </van-list>
      </ul>
      <!-- 暂无内容 -->
      <div class="content_none" :class="{none:!no_list_btn}">
        <img src="../../images/zanwuneirong.gif" alt="">
        <p>暂无内容</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: 5,
      loading: false,
      finished: false,
      data_list: [],
      no_list_btn: false,
      next_page: 1
    }
  },
  methods: {
    onLoad () {
      this.fetch.credit(this.next_page, {}).then((res) => {
        setTimeout(() => {
          // 加载状态结束
          if (res.code === 200) {
            this.next_page += 1
            this.data_list = this.data_list.concat(res.data.data)
            this.loading = false
            if (res.data.next_page_url === null) {
              // 数据全部加载完成
              this.finished = true
            }
          } else if (res.code === 2004) {
            // 没有数据
            this.loading = false
            this.no_list_btn = true
            this.finished = true
          }
        }, 800)
      })
    },
    goCardDetail (item) {
      localStorage.page_from = 'creditlist'
      this.$router.push(`/CardDetail/${item.id}`)
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.card {
    overflow-x: scroll;
    background-color: #fff;
    height: calc(100vh - .88rem);
    -webkit-overflow-scrolling: touch;
    padding-bottom: .4rem;
  }
</style>
