<template>
  <div class="cardDetail">
    <Header></Header>
    <div class="main ls1">
      <div class="banner bgfff">
        <img :src="imgUrl + info.logo" alt="">
        <div class="privilege_info bor_b">
          <p class="privilege fwb mb40">{{name}} - 特权</p>
          <ul>
            <li>{{info.introduce}}</li>
          </ul>
        </div>
      </div>
      <!-- 卡片信息 -->
      <div class="card_info mt20 bgfff pd40 bor_b">
        <p class="title fwb">卡片信息</p>
        <ul class="mt40 pb40">
          <li><span>卡等级</span>:<p>{{level.name}}</p></li>
          <li><span>卡组织</span>:<p v-if="info.organization">{{info.organization.name}}</p></li>
          <li><span>年费</span>:<p>{{info.year_fee}}</p></li>
          <li><span>免息期</span>:<p>{{info.free_period}}</p></li>
          <li><span>取现额度</span>:<p>{{info.cash_amount}}</p></li>
        </ul>
      </div>
      <!-- 精彩评价 -->
      <div class="evaluate pd40 mt20 bgfff" v-if="commentArr.length">
        <div class="head">
          <span class="fwb">精彩评价</span>
          <!--循序生成五星，span绑定类名设置星星背景图-->
          <div class="score">
            <span class="star-item" v-for="(avgstar,i) in starScore" :class="avgstar" :key="i"></span>
            <span v-text="comments.avg_star.toFixed(1)">{{avg_star}}</span>
          </div>
        </div>
        <div class="evaluate_list mt45" >
          <div class="evaluate_item bor_b pb40 mb40" v-for="(item, i) in comments.list" :key="i">
            <img src="../../images/ping_jia_tou_xiang@2x.png" class="mr20" alt="">
            <div class="evaluate_item_msg">
              <p class="date ">
                 <!-- 真实评价 -->
                <span v-if="item.comment_type==='fake'">{{item.phone}}</span>
                <!-- 虚假评价 -->
                <span v-else-if="item.comment_type==='real'">{{item.member.nick}}</span>
                 <span>{{item.created_at | YTDHM('')}}</span>
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
                  <span style="color:#2e6eec" v-if="item.comment_type==='fake'">{{item.phone}}</span>
                   <span style="color:#2e6eec" v-else-if="item.comment_type==='real'">{{item.member.nick}}</span>
                </p>
                <p class="pcub-te2">
                  <span v-text="oitem.content"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <router-link :to="`/AllEvaluate/credit/${$route.params.id}`" class="all_evaluate fwb" v-text="`全部评价(${comments.total_comments}条)`">100</router-link>
      </div>
       <!-- 无评价状态 -->
      <div class="notEvaluate pd40 mt20 bgfff mb20 bor_b"  v-else>
        <div class="head">
          <span class="fwb">精彩评价</span>
           <p class="grade">
              <img src="../../images/ping_fen_wei_xuan@2x.png" alt="">
              <img src="../../images/ping_fen_wei_xuan@2x.png" alt="">
              <img src="../../images/ping_fen_wei_xuan@2x.png" alt="">
              <img src="../../images/ping_fen_wei_xuan@2x.png" alt="">
              <img src="../../images/ping_fen_wei_xuan@2x.png" alt="">
              <span>0.0</span>
          </p>
        </div>
        <p class="text">快去发表您的评论吧</p>
      </div>
      <!-- 猜你喜欢 -->
      <div class="cardList bgfff mt20" v-if="recommend">
        <div>
          <p class="listName">猜你喜欢</p>
          <ul class="cardBox ">
            <li  v-for="(it, i) in recommend" :key="i" class="clearfix">
              <div @click="guessLike(it)">
                <p class="card_img">
                  <img :src="imgUrl + it.logo" class="left card" alt="">
                  <img v-if="it.corner&&it.corner.url" :src="imgUrl + it.corner.url" class="left redu" alt="">
                </p>
                <div class="card_msg">
                  <p class="title ellipsis">{{it.name}}</p>
                  <p class="brief">{{it.introduce}}</p>
                  <p class="apply_num"><em>{{it.applies}}</em>人申请</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 立即申请 -->
      <div class="apply_now bgfff shadow">
        <div class="collect">
          <img src="../../images/shou_cang_01@2x.png" @click="collect_"  alt="" v-if="!collection">
          <img src="../../images/shou_cang_02@2x.png" @click="collect_"  alt="" v-else>
          <p v-text="collection?'已收藏':'收藏'">收藏</p>
        </div>
        <p class="apply_now_btn mt20" @click="apply">立即申请</p>
      </div>
      <!-- 申请提示 -->
      <div class="apply_hint ls1" v-show="apply_hint">
        <div class="hint_box bgfff pd40">
          <p class="fwb">提示</p>
          <div class="hint_info">
            机构控制整体放款量会导致成功率大幅波动。
            <span>为确保成功率，</span>
            建议多申请几款适合的产品。
          </div>
          <!-- <router-link to="" class="fwb">我知道了</router-link> -->
          <a :href="redirect_url" class="fwb">我知道了</a>
          <div class="close_hint">
            <p class="bgfff"></p>
            <img src="../../images/tui_chu@2x.png" alt="" @click="apply_hint=false">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header'
import checkurl from '@/utils/checkurl'
export default {
  // 分享插件
  beforeCreate () {
    window._bd_share_main = ''
  },
  components: {
    Header
  },
  data () {
    return {
      apply_hint: false, // 申请提示弹窗
      collect: false, // 收藏
      info: {},
      collection: null, // 是否收藏
      collect_type: null, // 收藏类型
      collect_id: 0, // 收藏id
      logo: '', // 图片
      name: '', // 标题
      recommend: [], // 猜你喜欢
      level: {'organization':{'name':''}}, // 卡片等级
      comments: {}, // 评价
      commentArr: [], // 判断评价是否为空
      total_comments: 0, // 全部评论条数
      avg_star: 0, // 平均评分
      list: 5, // 星星数组
      redirect_url:'', // 我知道了
      header_show: checkurl('type') === 'app' && checkurl('share') === '1'
    }
  },
  watch: {
    $route (to, from) {
      this.creditDetail()
    }
  },
  created () {
    if (!sessionStorage.userPhone) {
      localStorage.credit_id_ = this.$route.params.id
    }
    if (this.header_show){
      setTimeout(()=>{
        this.creditDetail()
      },800)
    } else {
      this.creditDetail()
    }
    
  },
  computed: {
    starScore () {
      let avgstars = [] // 定义一个空数组来存储类名
      let score = Math.floor(this.avg_star * 2) / 2 // 把评分转成整数或整数+0.5（如：4.7转成4.5，4.2转成4.0）
      let decimalScore = score % 1 !== 0 // 取1的余数不等于0，说明有小数（显示半星）
      let integerScore = Math.floor(score) // 取整数分数（显示全星）
      for (let i = 0; i < integerScore; i++) {
        avgstars.push('on') // 整数分数为多少，就添加多少个全星
      }
      if (decimalScore) {
        avgstars.push('half') // 存在小数分数，添加一个半星
      }
      while (avgstars.length < 5) {
        avgstars.push('off') // 如果星星数不满5颗，空星星填充
      }
      return avgstars
    }
  },
  methods: {
    starNum (num) {
      let starArr = []
      for (let i = 0; i < 5; i++) {
        starArr.push(num >= 1 ? 1 : num >= 0.5 ? 0.5 : 0)
        num -= 1
      }
      return starArr
    },
    mounted () {
      this.creditDetail()
    },
    // 列表接口
    creditDetail () {
      let from_model = {
        'creditlist': 'creditlist',
        'CardDetail': 'like',
        'banner': 'banner'
      }
      this.fetch.creditDetail(this.$route.params.id, from_model[localStorage.page_from] || '', {}).then(res => {
        if (res.code === 200) {
          this.info = res.data.info
          this.logo = res.data.info.logo // 图片
          this.name = res.data.info.name // 标题
          this.collection = res.data.collection // 是否收藏
          document.getElementsByClassName('ellipsis')[0].innerHTML = res.data.info.name // 修改标题
          window.document.title = res.data.info.name
          document.getElementsByClassName('ellipsis')[0].style.width = '49%'
          this.recommend = res.data.recommend // 猜你喜欢
          this.level = res.data.info.level // 卡片等级
          this.redirect_url = res.data.info.redirect_url // 我知道了链接
          this.commentArr = res.data.comment // 判断评价是否为空
          this.comments = {
            list: res.data.comment, // 产品项
            avg_star: res.data.avg_star,
            total_comments: res.data.total_comments
          }
          this.total_comments = res.data.total_comments // 全部评论条数
          this.avg_star = res.data.avg_star // 平均评分
          // if (this.comment.length) {
            for (let i = 0; i < this.comments.list.length; i++) {
              this.comments.list[i]['stars'] = this.starNum(this.comments.list[i].star)
            }
          // }
        } else if (res.code === 2004) {
          // 没有数据
          this.no_list_btn = true
        }
      })
    },
    // 猜你喜欢 跳转当前
    guessLike (item) {
      localStorage.page_from = 'CardDetail'
      this.$router.push(`/CardDetail/${item.id}`)
    },
    // 收藏
    collect_ () {
      const params = {
        collect_id: this.$route.params.id, // 收藏id
        collect_type: 'credit' // product=>贷款产品 , credit=>信用卡 , article=>资讯
      }
      this.fetch.collect(params).then(res => {
        if (res.code === 200) {
          if (!this.collection) {
            // this.$toast('收藏成功', 2000)
          }
          this.collection = !this.collection
        } else {
          let time = 2e3
          this.throttle(() => {
            this.$toast(res.info, time)
          }, time)
        }
      })
    },
    // 立即申请
    apply () {
      const params = {
        type: 'credit', // 申请类型:credit=>信用卡 , product=>产品
        apply_id: this.info.id // 申请id:type = credit时为信用卡id,type = product时为产品id
      }
      this.fetch.apply(params).then(res => {
        if (res.code === 200) {
          console.log('信用卡申请', res)
          this.apply_hint = true
        } else {
          let time = 2e3
          this.throttle(() => {
            this.$toast(res.info, time)
          }, time)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped> 
// 星星背景
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
.none{
  display: none;
}
.main{
  padding-bottom: 1.3rem;
}
.banner{
  >img{
    width: 5.88rem;
    height: 3.64rem;
    border-radius: .22rem;
    margin: .2rem .81rem;
    box-shadow: 0px 12px 15px 0px rgba(0, 0, 0, 0.1);
  }
  .privilege_info{
    padding: .78rem .4rem .7rem;
    line-height: .45rem; 
    ul li{
      font-size: .28rem;
      color: #101d37;
    }
  }
  .privilege{
    font-size: .3rem;
    color: #101d37;
   
  }
}
.card_info{
  color: #101d37;
  font-size: .28rem;
  .title{
    font-size: .3rem;
  }
  li{
    display: flex;
    vertical-align: middle;
    // line-height: .25rem;
    font-size: .28rem;
    span{
      vertical-align: top;
      display: inline-block;
      width: 1.2rem;
      line-height: .3rem;
      text-align: justify;
      text-justify: distribute-all-lines; /*ie6-8*/
      text-align-last: justify; /* ie9*/
      -moz-text-align-last: justify; /*ff*/
      -webkit-text-align-last: justify; /*chrome 20+*/
    }
    // 兼容iostext-align: justify;无效
    span:after{
      content: '';
      width: 100%;
      display: inline-block;
      height: 0;
      line-height: .3rem;
      vertical-align: top;
    }
    p{
      vertical-align: top;
      display: inline-block;
      width: 5rem;
      line-height:.3rem; 
      padding-left: .2rem;
      word-break: break-all;
      padding-bottom: .1rem;
    }
  }
}
.cardList{
  min-height: auto;
  .listName{
    padding-left: 0;
    padding-bottom: 0;
  }
  .cardBox{
    li:last-child{
      border-bottom: none;
      padding-bottom: 0;
    }
  }
}
.cardDetail .header{
  border-bottom: none;
}
// 分享按钮
.bdsharebuttonbox{
  border-bottom: 1px solid #edeff5;
  p{
    display: flex;
    justify-content: space-around;
    padding-top: .8rem;
    margin-bottom: .2rem;
    .bds_weixin{
      background-image: url('../../images/peng_you_quan@2x.png');
      background-size: 100% 100%;
      background-position: 0 0!important;
      width: .88rem;
      height: .88rem;
      padding: 0;
      margin: 0;
    }
    .bds_sqq{
      background-image: url('../../images/QQ@2x.png');
      background-size: 100% 100%;
      background-position: 0 0!important;
      width: .88rem;
      height: .88rem;
      padding: 0;
      margin: 0;
    }
    .bds_tsina{
      background-image: url('../../images/wei_bo@2x.png');
      background-size: 100% 100%;
      background-position: 0 0!important;
      width: .88rem;
      height: .88rem;
      padding: 0;
      margin: 0;
    }

  }
      ul {
      display: flex;
      justify-content: space-around;
      letter-spacing: .01rem;
      color: #808080;
      margin-bottom: .6rem;
      li{
        width: 33%;
        text-align: center;
      }
    }
}
</style>
