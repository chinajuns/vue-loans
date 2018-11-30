<template>
    <div class="details bgfff" :class="{noheader: header_show,op0:page_init,op1:!page_init}">
        <Header v-if="!header_show" :icon_col='icon_col' :is_collection='is_collection' @collect='collect'> </Header>
         <h2 class="headline plr40">{{article.title}}</h2>
        <p class="read plr40">
          <span class="date">{{article.created_at | YTD('')}}</span>
          <span class="num">{{article.num}}阅读</span>
        </p>
        <!-- 摘要 -->
        <div class="plr40">
            <p class="abstractText">{{article.intro}}</p>
        </div>
       <!-- 文本内容 -->
       <div id="content" class="text rich-text" style="word-break: break-all;word-wrap: break-word;margin:0 .4rem;" v-html="article.content"></div>
        <div class="end plr40">
           <i class="end_line"></i>
            <span class="end_text">END</span>
             <i class="end_line"></i>
        </div>
        <!-- 点赞 -->
        <div class="clickLike">
          <img src="../../images/dian_zan_01@2x.png" @click="praise" alt="" v-if="!is_praise">
          <img src="../../images/dian_zan_02@2x.png" @click="praise" alt="" v-else>
          <p class="likeNum">{{praise_num}}</p>
        </div>
       <!-- 猜你喜欢 -->
       <h3 class="guessTitle bor_b"  v-if="likes">猜你喜欢</h3>
       <div class="loanList">
          <ul class="listBox">
            <li  v-for="(oitem, oind) in likes" :key="oind">
              <router-link :to="'/LoanDetail/0/'+oitem.id">
              <img v-if="oitem.mark&&oitem.mark.url" class="zuixin" :src="imgUrl+oitem.mark.url" alt="">
              <div class="list_item">
                <p class="head">
                  <img class="logo" :src="imgUrl+oitem.logo" alt="">
                  <span v-text="oitem.name">优借</span>
                  <em v-for="(imgitem,oimgind) in oitem.market_element" :key="oimgind" >
                      <img v-if="imgitem==='fire'" class="effect" src="../../images/huo.gif" alt="">
                      <img v-if="imgitem==='money'" class="effect" src="../../images/hongbao.gif" alt="">
                  </em>
                </p>
                <div class="loan_msg clearfix">
                  <div class="left money">
                    <p v-text="oitem.quota_min + '-' + oitem.quota_max">3000-300000</p>
                    <span>可贷金额(元)</span>
                  </div>
                   <p class="rightLine"> </p>
                  <div class="left tag">
                    <p v-for="(oit, oi) in oitem.tags.slice(0,3)" :key="oi" v-text="oit">白条信用贷</p>
                  </div>
                  <div class="right apply">
                    立即申请
                  </div>
                </div>
              </div>
              <p class="describe" v-text="oitem.slogan">三十秒批，一分钟下款，无需下载</p>
              </router-link>
            </li>
          </ul>
        </div>
        <!-- 为您推荐 -->
       <div class="recommend plr40">
          <h3 class="recTitle">为您推荐</h3>
          <ul class="listAritcle">
            <li v-for="(it, i) in articles" :key="i" class="bor_b">
              <router-link :to="`/findDetails/${it.id}`">
                <div class="content">
                    <div class="note">
                      <!-- 标题 -->
                      <p class="cont">
                      {{it.title}}
                      </p>
                      <div class="hot_date_num">
                        <!-- 热门 -->
                         <p class="hot" v-if="it.mark">{{it.mark.name}}</p>
                         <!-- <img v-if="it.mark" :src=" imgUrl + it.mark.url" alt=""> -->
                        <!-- 时间 -->
                        <span>{{it.created_at | YTD('')}}</span>
                        <!-- 阅读量 -->
                        <span class="read">{{it.num}}阅读</span>
                    </div>
                  </div>
                    <!-- 图片 -->
                    <img :src="imgUrl + it.cover" alt="" class="findImg">
                </div>
              </router-link>
            </li>
          </ul>
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
      page_init:true,
      header_show: checkurl('type') === 'app' && checkurl('share') === '1',
      is_praise: null,
      praise_num: 0,
      article: {created_at: new Date()},
      articles: [],
      icon_col: true, // 头部icon
      is_collection: 0, // 是否收藏
      collect_type: null, // 收藏类型
      collect_id: 0, // 收藏id
      likes: [] // 猜你喜欢
    }
  },
  methods: {
    // 列表接口
    articleDetail_ () {
      let city = sessionStorage.cityName
      this.fetch.articleDetail(`${this.$route.params.id}`, city,'').then(res => {
        if (res.code === 200) {
          this.throttle(() => {
            this.page_init = false
          }, 1000)
          this.title = res.data.article.title
          window.document.title  = res.data.article.title
          this.header_show || (document.getElementsByClassName('ellipsis')[0].innerHTML =
            res.data.article.title) // 修改标题
            document.getElementsByClassName('ellipsis')[0].style.width = '49%'
          this.article = res.data.article
          this.praise_num = res.data.article.praise
          this.is_praise = res.data.is_praise // 点赞
          this.is_collection = res.data.is_collection // 是否收藏
          this.articles = res.data.articles // 为您推荐
          this.share_link = res.data.share_link // 分享链接
          this.likes = res.data.likes // 猜你喜欢
          // console.log('res.data.likes', res.data.likes)
          this.tags = res.data.likes.tags // 猜你喜欢产品标签
        } else {
          console.log(res.info)
        }
      })
    },
    // 点赞接口
    praise () {
      this.fetch.praise(this.$route.params.id, {}).then(res => {
        if (res.code === 200) {
          if (!this.is_praise) {
            // this.$toast('点赞成功', 2000)
          }
          this.praise_num = res.data.praise
          this.is_praise = !this.is_praise
        } else {
          let time = 2e3
          this.throttle(() => {
            this.$toast(res.info, time)
          }, time)
        }
      })
    },
    // 收藏接口
    collect () {
      const params = {
        collect_id: this.$route.params.id, // 分享id: 贷款产品id/信用卡id/资讯id
        collect_type: 'article' // product=>贷款产品 , credit=>信用卡 , article=>资讯
      }
      this.fetch.collect(params).then(res => {
        if (res.code === 200) {
          if (!this.is_collection) {
            // this.$toast('收藏成功', 2000)
          }
          this.is_collection = !this.is_collection
        } else {
          let time = 1e3
          this.throttle(() => {
            this.$toast(res.info, time)
          }, time)
        }
      })
    }
  },
  created () {
     if (this.header_show){
      setTimeout(()=>{
        this.articleDetail_()
      },800)
    } else {
      this.articleDetail_()
    }
    
  },
  watch: {
    $route (to, from) {
      this.page_init = true
      this.articleDetail_()
    }
  }
}
</script>
<style lang="scss">
.op0{
  opacity: 0;
}
.op1{
  opacity: 1;
}
.noheader{
  margin-top: -0.88rem; 
}
.details{
  .headline {
    font-size: .4rem;
    color: #101d37;
    line-height: 0.6rem;
    letter-spacing: .02rem;
    font-weight: 700;
    text-align: left;
    padding-top: .4rem;
  }
  #content{
    min-height: 3rem;
    overflow-x: hidden;
    img{
      width: 100%;
      display: block;
    }
  }
}
.rich-text img{
    width: 100%;
    height: auto;
}
.rich-text p span{
  font-size: .24rem
}
.read {
  font-size: 0.24rem;
  color: #8a9099;
  font-size: .24rem;
  line-height: 1rem;
  letter-spacing: .01rem;
  .date {
    margin-right: 0.39rem;
  }
}
.abstractText {
  font-size: 0.26rem;
  line-height: 0.34rem;
  color: #394043;
  padding-left: 0.2rem;
  letter-spacing: 0.01rem;
  border-left: 2px solid #c2c5cc;
  margin-bottom: .4rem;
}
.text {
  color: #101d37;
  font-size: 0.3rem;
  line-height: 0.46rem;
}
.end {
  color: #dadde6;
  font-size: 0.24rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}
.end_text {
  margin: 0 0.24rem;
}
.end_line {
  width: 100%;
  height: 0.02rem;
  display: inline-block;
  background-color: #edeff5;
}
.clickLike {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 0.8rem;
  img {
    width: 1rem;
    margin-bottom: 0.2rem;
  }
  .likeNum {
    font-size: 0.24rem;
    color: #101d37;
  }
}
/* 猜你喜欢 */
.guessTitle {
  color: #101d37;
  font-size: 0.36rem;
  letter-spacing: 0.02rem;
  padding: 0 .4rem .4rem .4rem;
  font-weight: 700;
  .apply{
    margin-top: .1rem;
  }
}
.details{
  .loanList{
    .listBox{
      background-color: #f8f8f9;
      padding: .2rem;
      li{
        position: relative;
        background-color: #fff;
        box-shadow: 0 .04rem .16rem 0 rgba(0, 0, 0, 0.08);
        border-radius: .1rem;
        margin-bottom: .2rem;
        .list_item{
          padding: .2rem .2rem .3rem;
          border-bottom: 1px solid #edeef5;
        }
        .zuixin{
          position: absolute;
          left: -.12rem;
          top: -.12rem;
          width: .88rem;
          height: .88rem;
        }
        .head{
          height: .44rem;
          line-height: .44rem;
          font-size: 0;
          .logo{
            float: left;
            width: .44rem;
            height: .44rem;
            border-radius: .1rem;
          }
          span{
            letter-spacing: .01rem;
            color: #101d37;
            font-size: .3rem;
            margin: 0 .1rem 0 .2rem;
            vertical-align: middle;
            font-weight: bold;
          }
          .effect{
            width: .36rem;
            vertical-align: middle;
          }
        }
        .loan_msg{
          margin-top: .27rem;
          font-size: .24rem;
          color: #7f8799;
          .money{
            width: 2.68rem;
            height: 1rem;
            // border-right: 1px solid #edeef5;
            margin-right: .46rem;
            p{
              font-size: .36rem;
              color: #ff3d24;
              height: .37rem;
              margin-bottom: .38rem;
              font-weight: bold;
            }
          }
          .rightLine{
            display: inline-block;
            width: 1px;
            height: 1rem;
            background-color: #edeef5;
            // background-color: red;
            position: relative;
            right: 1.55rem;
            top: .05rem;
          }
          .tag{
            line-height: .3rem;
            position: relative;
            top: .03rem;
          }
          .apply{
            width: 1.24rem;
            height: .44rem;
            line-height: .44rem;
            text-align: center;
            border-radius: .3rem;
            border: solid 1px #2e6eec;
            color: #2e6eec;
            margin-top: .3rem;
            a{
              color: #2e6eec;
            }
          }
        }
        .describe{
          padding: .2rem;
          font-size: .26rem;
          color: #7f8799;
        }
      }
    }
  }
}
/* 为您推荐 */
.recTitle {
  color: #101d37;
  font-size: 0.36rem;
  letter-spacing: 0.01rem;
  margin: .4rem 0;
  font-weight: 700;
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
