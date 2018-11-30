<template>
  <div class="loanList">
    <ul class="listBox" :class="{none:no_list_btn}">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
      >
        <li  v-for="(item, i) in data_list" :key="i" class="on">
          <!-- <img class="zuixin" src="../../images/zuixin@2x.png" alt=""> -->
          <img v-if="item.mark&&item.mark.url" class="zuixin" :src="imgUrl+item.mark.url" alt="">
          <router-link :to="`/LoanDetail/0/${item.id}`">
          <span class="sold_out" v-if="item.status===0">下架</span>
          <div class="list_item">
            <p class="head ">
              <img class="logo" :src="imgUrl+item.logo" alt="">
              <span v-text="item.name">优借</span>
              <em v-if="item.market_element" v-for="(imgitem,oimgind) in item.market_element" :key="oimgind">
                <img v-if="imgitem==='fire'" class="effect" src="../../images/huo.gif" alt="">
                <img v-if="imgitem==='money'" class="effect" src="../../images/hongbao.gif" alt="">
              </em>
            </p>
            <div class="loan_msg clearfix">
              <div class="left money">
                <p v-text="`${item.quota_min}-${item.quota_max}`">3000-300000</p>
                <span>可贷金额(元)</span>
              </div>
               <p class="rightLine"> </p>
              <div class="left tag">
                <p v-for="(oit, oi) in item.tags.slice(0,3)" :key="oi" v-text="oit">白条信用贷</p>
              </div>
              <div class="right apply">
                立即申请
              </div>
            </div>
          </div>
          <p class="describe" v-text="item.slogan">三十秒批，一分钟下款，无需下载</p>
          </router-link>
        </li>
      </van-list>
    </ul>
    <!-- 暂无内容 -->
    <div class="content_none" :class="{none:!no_list_btn}">
      <img src="../../images/zanwushoucang.gif" alt="">
      <p>暂无产品</p>
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
  created () {
  },
  methods: {
    getCollection () {
      // 获取贷款列表
      this.fetch.collectionProduct(this.next_page, {}).then((res) => {
        if (res.code === 200) {
          console.log(res)
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
.loanList {
  li.on {
    .head span {
      color: #8a9099;
    }
    .loan_msg .apply a {
      color: #8a9099;
      border-color: #8a9099;
    }
  }
}
.sold_out {
  position: absolute;
  top: 0;
  left: 0;
  width: 0.84rem;
  height: 0.3rem;
  line-height: 0.32rem;
  text-align: center;
  background-color: #a1a8b2;
  font-size: 0.2rem;
  color: #fff;
  border-radius: 0.1rem 0 0 0;
}
.content_none {
  height: calc(100vh - 1.76rem);
}
</style>
