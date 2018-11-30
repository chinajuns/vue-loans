<template>
  <div>
    <!-- <p class="bor_"></p> -->
    <div class="cardList">
      <ul class="cardBox" :class="{none:no_list_btn}">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
          <li  v-for="(item, i) in list" :key="i" class="clearfix ls1 bgfff mt20" :class="{on:item.status===0}">
            <p class="date pb40 bor_b mb40">{{item.created_at| YTD('')}}</p>
            <!-- <router-link :to="`/CardDetail/${item.credit_id}`"> -->
              <p class="card_img">
                <img :src="imgUrl+item.logo" class="left card" alt="">
                <span class="sold_out" v-if="item.status===0">已下架</span>
              </p>
              <div class="card_msg" @click="goProductDetail(item)">
                <p class="title ellipsis" v-text="item.name">中信i白金信用卡中信i白金信用卡中信i白金信用卡</p>
                <p class="brief" v-text="item.introduce">不要年费的白金信用卡；最长50天免息还款期；挂失卡...</p>
                <p class="apply_num"><em v-text="item.num">123456</em>人申请</p>
              </div>
            <!-- </router-link> -->
            <p class="evaluate_btn fwb" :class="{on:item.status===0}" v-if="item.is_comment===0" @click.stop="goEvaluate(item)">评价</p>
            <p class="evaluate_btn on fwb" :class="{on:item.status===1}" v-else @click.stop="goEvaluate(item)">已评价</p>
          </li>
        </van-list>
      </ul>
      <!-- 暂无内容 -->
      <div class="content_none" :class="{none:!no_list_btn}">
        <img src="../../images/zanwujilu.gif" alt="">
        <p>您还没有申请的信用卡哦~</p>
        <router-link to="/apply/1">立即申请</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      product_apply_data: {}, // 返回数据
      no_list_btn: false, // 有无数据
      next_page: 1 // 页数
    }
  },
  created () {
  },
  methods: {
    onLoad () {
      // console.log('creaitcard is created')
    // console.log(this.$route.params.id)
      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 5; i++) {
      //     this.list += 1
      //   }
      //   // 加载状态结束
      //   this.loading = false
      //   // 数据全部加载完成
      //   if (this.list >= 20) {
      //     this.finished = true
      //   }
      // }, 2000)
      this.getData()
    },
    getData () {
      this.fetch.creditApply({}).then(res => {
        setTimeout(() => {
          // 加载状态结束
          if (res.code === 200) {
            console.log('信用卡意向',res);
            this.product_apply_data = res.data
            this.list = res.data.data
            // console.log('list', this.list)
            this.loading = false
            // 数据全部加载完成
            if (res.data.next_page_url != null) {
              this.next_page = res.data.next_page_url.split('page=')[1]
              this.getData(this.next_page)
            } else {
              this.finished = true
            }
          } else if (res.code === 2004) {
            // 没有数据
            this.loading = false
            this.finished = true
            this.no_list_btn = true
          }
        }, 2000)
      })
    },
    // 贷款详情
    goProductDetail (item) {
       // 已下架提示
      if(item.status === 0){
        this.$toast('该产品已下架，如有疑问请联系客服', 2000, 1)
      }else{
        // 未下架跳转详情
        this.$router.push(
          `/CardDetail/${item.credit_id}`
        )
      }
    },
    goEvaluate (item) {
      // 已下架
      if(item.status === 0){
        this.$toast('该产品已下架，如有疑问请联系客服', 2000, 1)
        return
      }
      if (item.is_comment===1){
        return;
      }
      // 跳转到评价
      this.data_list = []
        this.$router.push(
          `/evaluate/${encodeURI(JSON.stringify({
              type:item.type,
              credit_id:item.credit_id,
              id:item.id,
              logo:item.logo&&item.logo.replace(/\//g,'_*_')
            }))}`
        )
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
.cardBox {
  overflow-y: scroll;
  height: calc(100vh - .88rem);
}
.cardList{
  padding: 0;
  // height: 100vh;
  
  background-color: #fff;
  li.on{
    .title,.brief{
      color: #8a9099;
    }
  }
  li{
    border-bottom: none;
    padding: .4rem;
  }
}
.date{
  font-size: .26rem;
  color: #8a9099;
}
.evaluate_btn{
  display: block;
  height: .72rem;
  line-height: .72rem;
  background-color: #f8f8f9;
  border-radius: .06rem;
  text-align: center;
  font-size: .3rem;
  color: #2e6eec;
  margin-top: .8rem;
  &.on{
    color: #a1a8b2;
  }
  & .none{
    display: none;
  }
}
.card_img{
  .sold_out{
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
.content_none{
  height: calc(100vh - .88rem);
}
</style>
