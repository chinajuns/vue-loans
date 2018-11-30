<template>
  <div>
    <Header></Header>
    <div>
      <div class="filtrate pd40 bgfff bor_b">
        <p :class="{on:comments_model===0}" @click="cutGoodModel(0)" v-text="`全部(${comments_total.total})`">100</p>
        <p :class="{on:comments_model==='good'}" @click="cutGoodModel('good')" v-text="`好评(${comments_total.good_total})`">好评(100) </p>
        <p :class="{on:comments_model==='bad'}" @click="cutGoodModel('bad')" v-text="`差评(${comments_total.bad_total})`">差评(100)</p>
      </div>
      <ul class="evaluate mt20 bgfff">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
        <li class="evaluate_item bor_b pb40 mb40" v-for="(item, i) in data_list" :key="i">
            <img src="../../images/ping_jia_tou_xiang@2x.png" class="mr20" alt="">
           
            <div class="evaluate_item_msg">
              <p class="date">
                 <!-- 真实评价 -->
                <span v-if="item.comment_type==='fake'">{{item.phone}}</span>
                <!-- 虚假评价 -->
                <span v-else-if="item.comment_type==='real'">{{item.member.nick}}</span>
                <span>{{item.created_at| YTDHM('')}}</span>
              </p>
               <!--循序生成五星，span绑定类名设置星星背景图-->
              <div class="score oneScore">
                <span class="star-item" v-for="(onestar,i) in item.stars" :class="{on:onestar===1,half:onestar===0.5,off:onestar===0}" :key="i"></span>
                <span v-text="item.star.toFixed(1)">5</span>
              </div>
              <p class="evaluate_content pd20" v-text="item.content">根据百度经验，这种贷款其他地方需要10个工作日，但是在这里只要1-2两天就可以拿到钱，很快，很放心，下次还会来。</p>
               <div class="evaluate_content pd20" v-if="item.reply&&item.reply.length" v-for="(oitem, oind) in item.reply" :key="oind">
                <p>
                  <span style="color:#2e6eec">贷贷狐</span>
                  <span>回复</span>
                  <span style="color:#2e6eec" v-text="item.member.nick"></span>
                </p>
                <p class="pcub-te2">
                  <span v-text="oitem.content"></span>
                </p>
              </div>
            </div>
        </li>
        </van-list>
      </ul>
    </div>
     <!-- 暂无内容 -->
    <div class="content_none" :class="{none:!no_list_btn}">
      <img src="../../images/zanwuneirong.gif" alt="">
      <p>暂无此评价</p>
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
      filtrate_list: false, // 筛选按钮
      filtrate: false, // 筛选列表显示
      next_page: 1,
      data_list: [],
      no_list_btn: false,
      comments_total: {
        bad_total: 0,
        good_total: 0,
        total: 0
      },
      comments_model: 0
    }
  },
  created () {
  },
  methods: {
    onLoad () {
      // 异步更新数据
      this.getCommentsList()
    },
    // 计算星星个数
    starNum (num) {
      let starArr = []
      for (let i = 0; i < 5; i++) {
        starArr.push(num >= 1 ? 1 : num >= 0.5 ? 0.5 : 0)
        num -= 1
      }
      return starArr
    },
    getCommentsList () {
      // 获取评论列表
      this.fetch.comments(this.$route.params.type, this.$route.params.id, this.next_page, this.comments_model, {}).then((res) => {
        console.log(this.$route.params.type);
        setTimeout(() => {
          if (res.code === 200) {
            // console.log('评论',res)
            this.next_page += 1
            this.data_list = this.data_list.concat(res.data.data.data)
            for (let i = 0; i < this.data_list.length; i++) {
              this.data_list[i]['stars'] = this.starNum(this.data_list[i].star)
            }
            console.log(this.data_list)
            this.comments_total = {
              bad_total: res.data.bad_total,
              good_total: res.data.good_total,
              total: res.data.total
            }
            // 加载状态结束
            this.loading = false
            if (res.data.data.next_page_url == null) {
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
    cutGoodModel (type) {
      this.no_list_btn = false
      this.comments_model = type
      this.loading = true
      this.finished = false
      this.data_list = []
      this.next_page = 1
      this.getCommentsList()
    }
  }
}
</script>
<style lang="scss" scoped>
.score{
    display: flex;
    justify-content: center;
    align-items: flex-end;
    .star-item{
      width: .25rem;
      height: .25rem;
      background: no-repeat;
    }
    .star-item.on{
      background: url("../../images/ping_fen@2x.png");  //全星
      background-size: contain;
    }
    .star-item.half{
      background: url("../../images/ping_jia_ban_xing@2x.png");  //半星
      background-size: contain;
    }
    .star-item.off{
      background: url("../../images/ping_fen_wei_xuan@2x.png");   //空星星
      background-size: contain;
    }
    span{
      font-size: .26rem;
      color: #ff812d;
      margin-left: .1rem;
      vertical-align: bottom;
      height: .26rem;
    }
}
.oneScore{
  display: flex;
  justify-content: flex-start;
  margin-left: -.1rem;
}
.filtrate{
  display: flex;
  p{
    padding: 0 .3rem;
    height: .6rem;
    line-height: .6rem;
    border-radius: .3rem;
    background-color: #f8f8f9;
    margin-right: .3rem;
    font-size: .24rem;
    color: #101d37;
    &.on{
      background-color: #2e6eec;
      color: #fff;
    }
  }
}
.evaluate{
  padding: .4rem .4rem;
  height: 100vh;
}
</style>
