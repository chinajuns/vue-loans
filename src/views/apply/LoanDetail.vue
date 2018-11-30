<template>
  <div class="loandetail">
    <Header :ic='$route.params.type'></Header>
    <div class="main ls1">
      <div class="banner">
        <div class="banner_mag">
          <p class="head">
            <img class="logo left" :src="imgUrl + product.logo" alt="">
            <span v-text="product.name">优借</span>
            <em v-if="product.market_element" v-for="(imgitem,oimgind) in product.market_element" :key="oimgind">
              <img v-if="imgitem==='fire'" class="effect" src="./../../images/huo.gif" alt="">
              <img v-if="imgitem==='money'" class="effect" src="./../../images/hongbao.gif" alt="">
            </em>
          </p>
          <p class="may">可贷金额(元)</p>
          <p class="num">
            <span>{{product.quota_min | numFmt('')}}</span>
            -
            <span>{{product.quota_max | numFmt('')}}</span>
          </p>
        </div>
        <p class="foot" v-text="product.slogan">门槛低，有身份证就能贷，下款快</p>
      </div>
      <!-- 利率 -->
      <div class="rate bgfff bor_b">
        <ul class="head clearfix">
          <li>
            <p v-text="`${product.rate_value}%`"></p>
            <span v-text="`利率(${product.rate_unit})`"></span>
          </li>
          <li>
            <p v-text="`${product.repay_min}-${product.repay_max}`">1-48</p>
            <span v-text="`借款期限(${product.repay_unit})`"></span>
          </li>
          <li>
            <p v-text="product.fast_lend_value">1-2</p>
            <span v-text="`平均办理时间(${product.fast_lend_unit})`"></span>
          </li>
        </ul>
        <p class="tab">
          <span v-for="(oit, oi) in product.tags" :key="oi" v-text="oit">白条信用贷</span>
        </p>
      </div>
      <!-- 申请条件 -->
      <div class="condition mt20 bgfff bor_b" >
        <div class="bor_b">
          <p class="head  fwb">
            <img src="./../../images/sheng_qing_tiao_jian@2x.png" class="mr20" alt="">
            申请条件
          </p>
          <ul class="pb40 condition_list" >
            <li v-html="product.apply_condition">1、手机已实名认证；</li>
          </ul>
        </div>
        <div class="pt40">
          <p class="head  fwb">
            <img src="./../../images/ge_ren_zhi_zi@2x.png" class="mr20" alt="">
            个人资质
          </p>
          <ul class="tabs">
            <li class="mr20 mb20" v-for="(item, i) in product.material" :key="i" v-text="item.name">身份证</li>
          </ul>
        </div>
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
            <img src="./../../images/ping_jia_tou_xiang@2x.png" class="mr20" alt="">
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
        <router-link :to="`/AllEvaluate/product/${$route.params.id}`" class="all_evaluate fwb" v-text="`全部评价(${comments.total_comments}条)`">100</router-link>
      </div>
       <!-- 无评价状态 -->
      <div class="notEvaluate pd40 mt20 bgfff mb20 bor_b" v-else>
        <div class="head">
          <span class="fwb">精彩评价</span>
           <p class="grade">
              <img src="./../../images/ping_fen_wei_xuan@2x.png" alt="">
              <img src="./../../images/ping_fen_wei_xuan@2x.png" alt="">
              <img src="./../../images/ping_fen_wei_xuan@2x.png" alt="">
              <img src="./../../images/ping_fen_wei_xuan@2x.png" alt="">
              <img src="./../../images/ping_fen_wei_xuan@2x.png" alt="">
              <span>0.0</span>
          </p>
        </div>
        <p class="text">快去发表您的评论吧</p>
      </div>
      <!-- 猜你喜欢 -->
      <div class="loanList" v-if="guess_like.length">
        <div>
          <p class="listName bor_b">猜你喜欢</p>
          <ul class="listBox">
            <li  v-for="(item, i) in guess_like" :key="i">
              <div @click="guessLike(item)">
              <img v-if="item.mark&&item.mark.url" class="zuixin" :src="imgUrl+item.mark.url" alt="">
              <div class="list_item">
                <p class="head ">
                  <img class="logo" :src="imgUrl+item.logo" alt="">
                  <span v-text="item.name">优借</span>
                  <em v-if="item.market_element" v-for="(imgitem,oimgind) in item.market_element" :key="oimgind">
                    <img v-if="imgitem==='fire'" class="effect" src="./../../images/huo.gif" alt="">
                    <img v-if="imgitem==='money'" class="effect" src="./../../images/hongbao.gif" alt="">
                  </em>
                </p>
                <div class="loan_msg clearfix">
                  <div class="left money">
                    <p v-text="`${item.quota_min}-${item.quota_max}`">3000-300000</p>
                    <span>可贷金额(元)</span>
                  </div>
                  <p class="rightLine"> </p>
                  <div class="left tag">
                    <p v-for="(oit, oi) in item.tags" :key="oi" v-text="oit">白条信用贷</p>
                  </div>
                  <div class="right apply">
                    立即申请
                  </div>
                </div>
              </div>
              <p class="describe" v-text="item.slogan">三十秒批，一分钟下款，无需下载</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 立即申请 -->
      <div class="apply_now bgfff shadow">
        <div class="collect"  @click="collectProduct">
          <img src="./../../images/shou_cang_02@2x.png" v-if="is_collection" alt="">
          <img src="./../../images/shou_cang_01@2x.png" v-else alt="" >
          <p v-text="is_collection?'已收藏':'收藏'">收藏</p>
        </div>
        <p class="apply_now_btn mt20" @click="upDataProduct">立即申请</p>
        
      </div>
      <!-- 申请提示 -->
      <div class="apply_hint ls1" v-show="apply_hint"  @click="apply_hint=false">
        <div class="hint_box bgfff pd40">
          <p class="fwb">提示</p>
          <div class="hint_info">
            机构控制整体放款量会导致成功率大幅波动。
            <span>为确保成功率，</span>
            建议多申请几款适合的产品。
          </div>
          <a :href="redirect_url" class="fwb">我知道了</a>
          <div class="close_hint">
            <p class="bgfff"></p>
            <img src="./../../images/tui_chu@2x.png" alt="" @click="apply_hint=false">
          </div>
        </div>
      </div>
         <!-- 分享弹出框 -->
        <!-- <div class="shareAlert" v-if="show" @click="share(false)">
          <van-popup v-model="show" position="bottom" :overlay="false" >
            <div class="bdsharebuttonbox bdshare-button-style0-16">
              <p>
                <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到朋友圈"></a>
                <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a>
                <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
              </p>
                <ul>
                <li>朋友圈</li>
                <li>QQ</li>
                <li>微博</li>
              </ul>
            </div>
             <p class="isBtn" @click="share(false)">取消</p>
          </van-popup>
       </div> -->
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header'
import checkurl from '@/utils/checkurl'
export default {
  components: {
    Header
  },
  data () {
    return {
      no_list_btn: false,
      apply_hint: false, // 申请提示弹窗
      collect: false, // 收藏接口
      detailData: {},
      product: {logo: '', rate_value: 0, rate_unit: '-', quota_min: 0, quota_max: 0, fast_lend_value: 0, fast_lend_unit: '-', repay_min: 0, repay_max: 0, repay_unit: '-'}, // 产品相
      timeModel: {day: '日', hour: '时', month: '月', year: '年', minute: '分', 'undefined': '-'}, // 时间model
      comments: {}, // 评论
      commentArr: [], // 判断评价是否为空
      guess_like: [],
      collect_type: null, // 收藏类型
      collect_id: 0, // 收藏id
      is_collection: 0, // 是否收藏
      icon_share: true, // 分享按钮
      total_comments: 0, // 全部评论条数
      avg_star: 0, // 平均评分
      list: 5, // 星星数组
      redirect_url:'', // 我知道了
      header_show: checkurl('type') === 'app' && checkurl('share') === '1'
    }
  },
  watch: {
    $route (to, from) {
      this.getLoanDetail()
    }
  },
  created () {
    if (!sessionStorage.userPhone) {
      localStorage.product_id_ = this.$route.params.id
    }
  },
  mounted () {
    if (this.header_show){
      setTimeout(()=>{
        this.getLoanDetail()
      },800)
    } else {
      this.getLoanDetail()
    }
    
  },
  computed: {
    starScore () {
      let avgstars = [] // 定义一个空数组来存储类名
      let score = Math.floor(this.avg_star * 2) / 2 // 把评分转成整数或整数+0.5（向上取整）
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
    // 计算星星个数
    starNum (num) {
      let starArr = []
      for (let i = 0; i < 5; i++) {
        starArr.push(num >= 1 ? 1 : num >= 0.5 ? 0.5 : 0)
        num -= 1
      }
      return starArr
    },
    // 猜你喜欢 跳转当前
    guessLike (item) {
      localStorage.page_from = 'LoanDetail'
      this.$router.push(`/LoanDetail/${this.$route.params.type}/${item.id}`)
    },
    getLoanDetail () {
       let from_model = {
        'loanlist':'loanlist',
        'column': `column&t=${localStorage.page_from_column_id}`,
        'LoanDetail': 'like',
        'banner': 'banner',
        'distributePage':'distributePage'
      }
      let city = sessionStorage.cityName
      this.fetch.loanDetail(this.$route.params.id, from_model[localStorage.page_from] || '', city,{}).then(res => {
        if (res.code === 200) {
          this.product = res.data.product // 产品项
          this.product.apply_condition = '<p class="applyTerm">'+res.data.product.apply_condition.replace(/\n/g,"<br/>")+'</p>'
          // 产品项
          this.comments = {
            'list': res.data.comments, 
            'avg_star': res.data.avg_star,
            'total_comments': res.data.total_comments
          };
          (document.getElementsByClassName('ellipsis')[0].innerHTML = res.data.product.name) // 修改标题
          window.document.title = res.data.product.name
          this.commentArr = res.data.comments // 判断评价是否为空
          this.guess_like = res.data.guess_like // 猜你喜欢
          this.avg_star = res.data.avg_star // 平均评分
          this.is_collection = res.data.is_collection // 是否收藏
          this.redirect_url = res.data.product.redirect_url // 我知道了链接
          for (let i = 0; i < this.comments.list.length; i++) {
            this.comments.list[i]['stars'] = this.starNum(this.comments.list[i].star)
          }
        } else if (res.code === 2004) {
          // 没有数据
          this.no_list_btn = true
        }
      })
    },
    upDataProduct () {
      let body = {
        type: ' product',
        apply_id: this.$route.params.id
      }
      this.fetch.apply(body).then(res => {
        if (res.code === 200) {
          this.apply_hint = true
        }
      })
    },
    // 收藏接口
    collectProduct () {
      const params = {
        collect_id: this.$route.params.id, // 分享id: 贷款产品id/信用卡id/资讯id
        collect_type: 'product' // product=>贷款产品 , credit=>信用卡 , article=>资讯
      }
      this.fetch.collect(params).then(res => {
        if (res.code === 200) {
          if (!this.is_collection) {
            // this.$toast('收藏成功', 2000)
          }
          this.is_collection = !this.is_collection
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
    margin-bottom: .05rem;
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
.main{
  padding-bottom: 1.3rem;
}
.banner{
  height: 4.1rem;
  background: url(../../images/xiang_qing_bg@2x.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
    color: #fff;
  .banner_mag{
    padding: .3rem .4rem 0;
    font-size: .36rem;
    .head{
      line-height: .4rem;
    }
    .logo{
      width: .4rem;
      margin-right: .2rem;
      border-radius: .1rem;
    }
    .effect{
      width: .36rem;
      margin-left: .1rem;
    }
    .may{
      font-size: .26rem;
      margin-top: .4rem;
      line-height: .5rem;
    }
    .num{
      font-size: .8rem;
      font-weight: 600;
    }
  }
  .foot{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1.06rem;
    line-height: 1.06rem;
    padding-left: .4rem;
    background-color: rgba(0, 0, 0, 0.16);
    font-size: .26rem;
  }
}
.rate{
  padding: 0 .4rem;
  .head{
    padding: .4rem 0;
    border-bottom: .01rem solid #edeff5;
    display: flex;
    justify-content: space-around;
    text-align: center;
    font-size: .24rem;
    letter-spacing: .01rem;
    color: #a1a8b3;
    li{
      width: 29%;
      text-align: center;
      float: left;
      border-right: .01rem solid #edeff5;
      vertical-align: middle;
      padding-right: .2rem;
    }
    li:last-child{
      border-right: none;
    }
    p{
      font-size: .4rem;
      color: #101d37;
      letter-spacing: .02rem;
      font-weight: bold;
      margin-bottom: .1rem;
    }
  }
  .tab{
    padding: .2rem 0;
    display: flex;
    span{
      font-size: .22rem;
      height: .35rem;
      padding: 0 .1rem;
      border-radius: .04rem;
      background-color: rgba(127, 135, 153, .08);
      letter-spacing: .01rem;
      color: #7f8799;
      margin-right: .1rem;
    }
  }
}
.condition{
  padding: .4rem .4rem .6rem;
  .head{
    font-size: .3rem;
    color: #101d37;
    margin-bottom: .34rem;
    img{
      width: .28rem;
    }
  }
  .condition_list{
    font-size: .28rem;
    color: #101d37;
    li{
      margin-top: .28rem;
      &:first-child{
        margin-top: 0;
      }
      .applyTerm{
        line-height: .45rem;
        letter-spacing: .01rem;
        color: #394043;
        font-size: .28rem;
      }
    }
  }
  .tabs{
    display: flex;
    flex-wrap: wrap;
    li{
      padding: 0 .4rem;
      height: .6rem;
      line-height: .6rem;
      border-radius: .1rem;
      background-color: #f8f8f9;
      text-align: center;
      color: #101d37;
      font-size: .24rem;
    }
  }
}
// 分享按钮
.bdsharebuttonbox{
  border-bottom: 1px solid #edeff5;
  p{
    display: flex;
    justify-content: space-around;
    padding-top: .8rem;
    // padding: .8rem .8rem 0 .8rem;
    // width: 33%;
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
