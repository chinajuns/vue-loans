<template>
  <div class="bgfff collFind">
    <div class="line"></div>
      <div class="findList bgfff">
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
                        <!-- <img v-if="it.mark" :src=" imgUrl + it.mark.url" alt=""> -->
                         <p class="hot" v-if="it.mark">{{it.mark.name}}</p>
                        <!-- 时间 -->
                        <span>{{it.created_at | YTD('')}}</span>
                        <!-- 阅读量 -->
                        <span class="read">{{it.num}}阅读</span>
                    </div>
                  </div>
                    <!-- 图片 -->
                    <!-- <img :src="imgUrl + it.cover" alt="" class="findImg"> -->
                    <div class="def-img findImg">
                      <img :src="imgUrl + it.cover"  @load="successLoadImg" @error="errorLoadImg" alt="" class="">
                    </div>
                </div>
                 <p class="soldOut" v-if="it.status===0">已下架</p>
              </router-link>
            </li>
          </van-list>
        </ul>
         <!-- 暂无收藏 -->
        <div class="content_none" :class="{none:!no_list_btn}">
          <img src="../../images/zanwushoucang.gif" alt="">
          <p>您还没有收藏的文章哦~</p>
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
      next_page: 1,
      is_read: 0 // 是否已读
    }
  },
  created () {
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        this.getCollection()
      }, 800)
    },
    getCollection () {
      // 获取贷款列表
      this.fetch.collectionArticle(this.next_page, {}).then((res) => {
        if (res.code === 200) {
          console.log('收藏发现',res)
          this.next_page += 1
          if (res.data && res.data.data.length) {
            this.data_list = this.data_list.concat(res.data.data)
          } else {
            this.no_list_btn = true
          }
          // 加载状态结束
          this.loading = false
          if (res.data && res.data.data.next_page_url == null) {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.clicked {
  color: #8a9099;
}
.not{
  color: #0c1d39;
}
.line {
  height: .001rem;
}
.collFind{
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
              margin-top: .4rem;
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
                // margin-bottom: .05rem;
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
}

</style>
