<template>
  <div class="find bgfff">
    <Header></Header>
    <div class="bgfff"></div>
      <div class="findList">
         <ul class="listAritcle">
            <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
          >
            <li v-for="(it, i) in data_list" :key="i" class="bor_b">
              <router-link :to="`/findDetails/${it.id}`">
                <div class="content">
                    <div class="note">
                      <!-- 标题 -->
                      <p class="cont" :class="{clicked:it.is_read,not:it.is_read===0}">
                      {{it.title}}
                      </p>
                      <div class="hot_date_num">
                        <!-- 热门 -->
                         <p class="hot" v-if="it.mark">{{it.mark.name}}</p>
                         <!-- <img v-if="it.mark" :src=" imgUrl + it.mark.url" alt=""> -->
                        <!-- 时间 -->
                        <span>{{it.created_at | YTD('')}}</span>
                        <!-- 阅读量 -->
                        <span class="readNum">{{it.num}}阅读</span>
                      </div>
                    </div>
                    <!-- 图片 -->
                    <div class="def-img findImg">
                      <img :src="imgUrl + it.cover"  @load="successLoadImg" @error="errorLoadImg" alt="" class="">
                    </div>
                </div>
              </router-link>
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
import Header from '@/components/Header'
export default {
  components: {
    Header
  },
  data () {
    return {
      loading: false,
      finished: false,
      next_page: 1,
      no_list_btn: false,
      data_list: [],
      is_read: 0 // 是否已读
    }
  },
  created () {
  },
  methods: {
    onLoad () {
      // 异步更新数据 获取贷款列表
      this.fetch.article(this.next_page, {}).then((res) => {
        setTimeout(() => {
          if (res.code === 200) {
            console.log('res', res)
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
        }, 800)
      })
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.find{
  background-color: #fff;

}
.findList{
  min-height: calc(100vh);
  padding: 0 .4rem;
  .listAritcle{
      li{
        .content{
          display: flex;
          justify-content: space-between;
          margin-top: 0;
          padding: .4rem 0;
          padding-bottom: .4rem;
          .note{
            width: 70%;
            height: 1.36rem;
            box-sizing: border-box;
            display: flex;
            flex-flow: column;
            align-content: space-between;
            position: relative;
            bottom: .1rem;
            .cont {
              color: #0c1d39;
              font-weight: bold;
              letter-spacing: .02rem;
              font-size: .3rem;
            }
            .not{
              color: #0c1d39;                                                                                        
            }
            .clicked{
              color: #8a9099;
            }
            .hot_date_num {
              font-size: .24rem;
              color: #8a9099;
              margin-top: .34rem;
              span{
                margin-right: .2rem;
              }
              // img{
              //   width: .57rem;
              //   height: .3rem;
              //   margin-right: .2rem;
              // }
              .hot {
                display: inline-block;
                width: .57rem;
                height: .3rem;
                line-height: .3rem;
                padding: 0;
                text-align: center;
                color: #ff3d24;
                border: 1px solid #ff3d24;
                font-size: .22rem;
                border-radius: .04rem;
                box-sizing: border-box;
              }
              .readNum{
                font-size: .24rem;
              }
            }
          }
          .findImg {
            width: 1.68rem;
            height: 1.34rem;
            border-radius: .06rem;
            overflow: hidden;
            &.def-img{
              background: url('../../images/zhanweitu_faxian@2x.png') no-repeat;
              background-size: 100% 100%;
            }
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      li:last-child{
        border-bottom: none;
      }
    }
}
</style>
