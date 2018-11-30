<template>
  <div class="loanList">
   <ul class="listBox" :class="{none:no_list_btn}">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
          <li v-for="(item, i) in data_list" :key="i">
            <div>
            <img v-if="item.mark&&item.mark.url" class="zuixin" :src="imgUrl+item.mark.url" alt="">
            <span class="sold_out" v-if="item.status===0">已下架</span>
            <div class="list_item" @click="goProductDetail(item)">
              <p class="head">
                <img class="logo" :src="imgUrl+item.logo" alt="">
                <span v-text="item.name" :class="{soldOn:item.status===0}">优借</span>
                <em v-if="item.market_element" v-for="(imgitem,oimgind) in item.market_element" :key="oimgind">
                  <img v-if="imgitem==='fire'" class="effect" src="../../images/huo.gif" alt="">
                  <img v-if="imgitem==='money'" class="effect" src="../../images/hongbao.gif" alt="">
                </em>
              </p>
              <div class="loan_msg clearfix">
                <div class="left money">
                  <p v-text="item.min_money+'-'+item.max_money">3000-300000</p>
                  <span>可贷金额(元)</span>
                </div>
                <p class="rightLine"> </p>
                <div class="left tag">
                  <p v-for="(oit, oi) in item.tags.slice(0,3)" :key="oi" v-text="oit">白条信用贷</p>
                </div>
                <div class="right apply" :class="{onbtn:item.status===0}" v-if="item.is_comment===0" @click.stop="goEvaluate(item)">
                  评价
                </div>
                <!-- 已评价 -->
                <div class="right apply" :class="{onbtn:item.is_comment===1}" v-else @click.stop="goEvaluate(item)">
                  已评价
                </div>
              </div>
            </div>
            <p class="describe" v-text="item.introduce">三十秒批，一分钟下款，无需下载</p>
            </div>
          </li>
        </van-list>
      </ul>
    <!-- 暂无内容 -->
    <div class="content_none" :class="{none:!no_list_btn}">
      <img src="../../images/zanwujilu.gif" alt="">
      <p>您还没有申请的产品哦~</p>
      <router-link to="/apply/Index">立即申请</router-link>
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
      product_apply_data: {}, // 返回数据
      no_list_btn: false, // 有无数据
      next_page: 1 // 页数
    }
  },
  created () {
  },
  methods: {
    onLoad () {
      // 异步更新数据
      this.getData()
    },
    getData () {
      this.fetch.productApply(this.next_page, {}).then(res => {
        setTimeout(() => {
          if (res.code === 200) {
            this.next_page += 1
            this.data_list = this.data_list.concat(res.data.data)
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
          `/LoanDetail/0/${item.product_id}`
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
              product_id:item.product_id,
              id:item.id,
              logo:item.logo&&item.logo.replace(/\//g,'_*_')
            }))}`
        )
    }
  }
}
</script>
<style lang="scss" scoped>
// 已下架
.loanList .listBox li .head .soldOn{
  color: #8a9099;
}
.loanList .listBox li .loan_msg .onbtn{
  border: solid 1px #a1a8b2;
  color: #a1a8b2;
}
.loanList {
    overflow-y: scroll;
  li.on{
    .head span{
      color: #8a9099;
    }
  }
  .listBox{
    height: calc(100vh - .88rem);
  }
  li {
    .head{
      position: relative;
      .date{
        position: absolute;
        right: 0;
        font-size: .24rem;
        font-weight: normal;
      }
    }
    .loan_msg .apply{
      display: inline-block;
      width: 1.24rem;
      height: .44rem;
      line-height: .44rem;
      text-align: center;
      border-radius: .22rem;
      padding: 0;
      &.on{
        color: #8a9099;
        border-color: #8a9099;
      }
    }
  }
}
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
  z-index: 3;
}
.content_none{
  height: calc(100vh - .88rem);
}
</style>
