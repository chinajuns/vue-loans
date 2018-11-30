<template>
  <div>
    <Header></Header>
    <div class="banner">
      <a :href="project.banner_redirect" v-if="project.redirect_type==='outside'">
        <img :src="project.banner" alt="">
      </a>
      <router-link :to="project.inpath" v-else-if="project.redirect_type==='inside'">
        <img :src="project.banner" alt="">
      </router-link>
      <a href="javascript:;" v-else>
        <img :src="project.banner" alt="">
      </a>
    </div>
    <!-- loanList -->
    <div class="loanList">
      <ul class="listBox" v-show="!no_project_list_btn">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
          <li v-for="(item, ind) in project_list" :key="ind">
            <img v-if="item.mark&&item.mark.url" class="zuixin" :src="imgUrl + item.mark.url" alt="">
            <router-link :to="`/LoanDetail/1/${item.id}`">
            <div class="list_item">
              <p class="head">
                <img class="logo" :src="imgUrl + item.logo" alt="">
                <span v-text="item.name">优借</span>
                <!-- <img class="effect" src="../../images/huo.gif" alt="">
                <img class="effect" src="../../images/hongbao.gif" alt=""> -->
                <em v-for="(imgitem,oimgind) in item.market_element" :key="oimgind">
                    <img v-if="imgitem==='fire'" class="effect" src="../../images/huo.gif" alt="">
                    <img v-if="imgitem==='money'" class="effect" src="../../images/hongbao.gif" alt="">
                </em>
              </p>
              <div class="loan_msg clearfix">
                <div class="left money">
                  <p v-text="item.quota_min + '-' + item.quota_max">3000-300000</p>
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
            </router-link>
            <p class="describe" v-text="item.slogan">三十秒批，一分钟下款，无需下载</p>
          </li>
        </van-list>
      </ul>
      <!-- 暂无内容 -->
      <div class="content_none" :class="{none:!no_project_list_btn}" >
        <img src="../../images/zanwuneirong.gif" alt="">
        <p>暂无内容</p>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header'
import imgDeflut from '@/utils/base64'
export default {
  components: {
    Header
  },
  data () {
    return {
      list: 0,
      loading: false,
      finished: false,
      project: {banner:imgDeflut.product_banner},
      project_list: [],
      no_project_list_btn: false,
      next_page: 1
    }
  },
  created () {
  },
  methods: {
    onLoad () {
      // 异步更新数据
      this.getData(1)
    },
    getData (page) {
      this.fetch.homeId(this.$route.params.id, page, sessionStorage.cityName, {}).then(res => {
        this.project = res.data.data[0]
        this.project.banner = this.imgUrl+this.project.banner
        if (this.project.node === 'product') {
              // 产品 0 为列表；否则为id产品详情
          this.project['inpath'] = (this.project.node_id === '0' ? '/apply/0' : `/LoanDetail/1/${this.project.node_id}`)
        }else if (this.project.node === 'credit') {
          // 信用卡 0 为列表；否则为id信用卡详情
          this.project['inpath'] = (this.project.node_id === '0' ? '/apply/1' : `/CardDetail/${this.project.node_id}`)
        }else if (this.project.node === 'article') {
          // 资讯  0 为列表；否则为id资讯详情
          this.project['inpath'] = (this.project.node_id === '0' ? '/find' : `/findDetails/${this.project.node_id}`)
        }else if (this.project.node === 'help') {
          // 新手帮助 新手帮助详情
          this.project['inpath'] = `/mine/Newhelp`
        }else if (this.project.node === 'about') {
          // 关于我们 关于我们
          this.project['inpath'] = `/mine/Aboutus`
        }
        setTimeout(() => {
          if (res.code === 200) {
            this.next_page += 1
            this.project_list = this.project_list.concat(res.data.data[0].category_product)
            // 加载状态结束
            this.loading = false
            // 数据全部加载完成
            if (res.data.next_page_url === null) {
              this.finished = true
            }
            if(this.project_list.length === 0 ){
              this.no_project_list_btn = true
            }
          } else if (res.code === 2004) { // 没有数据
            this.no_project_list_btn = true
            this.loading = false
            this.finished = true
          }
        }, 800)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.banner{
  img{
    width: 7.5rem;
    height: 1.5rem;
  }
}
</style>
