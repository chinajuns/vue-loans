<template>
  <div class="loan">
    <div class="nav bgfff">
      <p :class="{on:sortModel==='default'}" @click="cutSortModel('default')">默认排序</p>
      <p :class="{on:sortModel==='success'}" @click="cutSortModel('success')">成功率</p>
      <p :class="{on:sortModel==='speed'}" @click="cutSortModel('speed')">放款速度</p>
      <p :class="{on:sortModel==='quota'}" @click="cutSortModel('quota')">贷款额度</p>
      <p :class="{on: filtrate_btn}" class="filtrate_btn" @click="filtrateSwitch(true)"></p>
    </div>
    <div class="loanList">
      <ul class="listBox" :class="{none:no_list_btn}">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
          <li v-for="(item, i) in data_list" :key="i">
            <div @click="goLoanDetail(item)">
            <img v-if="item.mark&&item.mark.url" class="zuixin" :src="imgUrl+item.mark.url" alt="">
            <div class="list_item">
              <p class="head">
                <img class="logo" :src="imgUrl+item.logo" alt="">
                <span v-text="item.name">优借</span>
                <em v-if="item.market_element" v-for="(imgitem,oimgind) in item.market_element" :key="oimgind">
                  <img v-if="imgitem==='fire'" class="effect" src="../../images/huo.gif" alt="">
                  <img v-if="imgitem==='money'" class="effect" src="../../images/hongbao.gif" alt="">
                </em>
              </p>
              <div class="loan_msg clearfix">
                <div class="left money">
                  <p v-text="item.quota_min+'-'+item.quota_max">3000-300000</p>
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
            </div>
          </li>
        </van-list>
      </ul>
      <!-- 暂无内容 -->
      <div class="content_none" :class="{none:!no_list_btn}">
        <img src="../../images/zanwuneirong.gif" alt="">
        <p>暂无内容</p>
         <!-- <span>快去收藏喜欢的产品吧！</span> -->
      </div>
    </div>
    <!-- 筛选 -->
    <div :class="{on: filtrate}" class="filtrate" @click="closeSwitch(false)">
      <div class="filtrate_box bgfff" @click.stop="()=>{}">
        <p class="h88 bgfff filtrate_head">贷款筛选</p>
        <div class="content">
          <div class="filtrate_condition">
            <p class="title">贷款额度</p>
            <ul>
              <li class="pcub-te" @click="cutScreenType(item,'quotas')" :class="{on:item.id===quotas_id}" v-for="(item, ind) in LoanScreen.quotas" :key="ind" >
                <!-- <input style="width:100%;height:100%;position:absolute;bottom:0;right:0;left:0;top:0" type="checkbox" v-model="quotas_ids" :value="item.id"> -->
                <span v-text="item.quota"></span>
              </li>
            </ul>
          </div>
          <div class="filtrate_condition">
            <p class="title">个人资质</p>
            <ul>
              <li class="pcub-te" @click="cutScreenType(item,'materials')" :class="{on:isInMaterials_ids(item.id)}" v-for="(item, ind) in LoanScreen.materials" :key="ind" >
                  <input style="opacity:0;width:100%;height:100%;position:absolute;bottom:0;right:0;left:0;top:0" type="checkbox" v-model="materials_ids" :value="item.id">
                  <span v-text="item.name"></span>
              </li>
            </ul>
          </div>
          <div class="filtrate_condition">
            <p class="title">还款周期</p>
            <ul>
              <li class="pcub-te" @click="cutScreenType(item,'periods')" :class="{on:item.id===periods_id}" v-for="(item, ind) in LoanScreen.periods" :key="ind">
                  <!-- <input style="width:100%;height:100%;position:absolute;bottom:0;right:0;left:0;top:0" type="checkbox" v-model="periods_ids" :value="item.id"> -->
                  <span v-text="item.period"></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="filtrate_foot bgfff shadow">
          <p @click="()=>{
              materials_ids = []
              periods_id = ''
              quotas_id = ''
              filtrate_btn = false
            }">重置</p>
          <p @click="filtrateSwitch(false)">确定</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data_list: [],
      no_list_btn: false,
      loading: false,
      finished: false,
      filtrate_btn: false, // 筛选按钮
      filtrate: false, // 筛选列表显示
      next_page: 1,
      LoanScreen: {}, // 高级筛选
      sortModel: '', // 排序方式
      materials_id: '', // 贷款个人资质条件 id
      periods_id: '', // 还款周期条件 id
      quotas_id: '', // 贷款额度条件 id
      quotas_ids:[], //贷款额度条件 ids
      periods_ids:[], //还款周期条件 ids
      materials_ids: [] // 贷款个人资质条件 ids
    }
  },
  created () {
    this.getLoanScreen()
  },
  methods: {
    goLoanDetail (item) {
      localStorage.page_from = 'loanlist'
      this.$router.push(`/LoanDetail/0/${item.id}`)
    },
    filtrateSwitch (type) {
      //  呼出或者关闭筛选列表
      this.filtrate = type
      if (type) {
        setTimeout(() => {
          document.getElementsByClassName('filtrate')[0].classList.add('bg')
        }, 250)
      } else {
        document.getElementsByClassName('filtrate')[0].classList.remove('bg')
        setTimeout(() => {
          if (this.quotas_id > 0 || this.periods_id || this.materials_ids.length > 0){
            this.filtrate_btn = true
          }
          this.initData()
          this.getLoanList()
        }, 150)
      }
    },
    closeSwitch (type) {
       this.filtrate = type
      document.getElementsByClassName('filtrate')[0].classList.remove('bg')
    },
    //是否在贷款额度条件
    isInQuotas_ids (id) {
      let is = false;
      for(let i = 0;i<this.quotas_ids.length;i++){
        if(this.quotas_ids[i] === id) {
          is = true;
          break;
        }
      }
      return is
    },
    //是否在还款周期条件
    isInPeriods_ids (id) {
      let is = false;
      for(let i = 0;i<this.periods_ids.length;i++){
        if(this.periods_ids[i] === id) {
          is = true;
          break;
        }
      }
      return is
    },
    //是否在贷款个人资质条件
    isInMaterials_ids (id) {
      let is = false;
      for(let i = 0;i<this.materials_ids.length;i++){
        if(this.materials_ids[i] === id) {
          is = true;
          break;
        }
      }
      return is
    },
    // 初始化 數據
    initData () {
      this.next_page = 1
      this.loading = true
      this.finished = false
      this.no_list_btn = false
      this.data_list = []
    },
    // 切換 排序 方式
    cutSortModel (type) {
      this.initData()
      this.sortModel = type
      this.getLoanList()
    },
    // 切換 筛选 方式
    cutScreenType (item, type) {
      if (type === 'materials') {
        // 贷款个人资质条件
        if(item.id === 0){
          this.materials_ids = []
        }else{
          if(this.materials_ids[0] == 0){
            this.materials_ids = []
          }
        }
      } else if (type === 'periods') {
        // 还款周期条件
        // if(item.id === 0){
        //   this.periods_ids = []
        // }else{
        //   if(this.periods_ids[0] == 0){
        //     this.periods_ids = []
        //   }
        // }
        this.periods_id = item.id
      } else if (type === 'quotas') {
        // 贷款额度条件
        // if(item.id === 0){
        //   this.quotas_ids = []
        // }else{
        //   if(this.quotas_ids[0] == 0){
        //     this.quotas_ids = []
        //   }
        // }
        this.quotas_id = item.id
      }
    },
    getLoanScreen () {
      // 高级筛选
      this.fetch.loanScreen({}).then(res => {
        if (res.code === 200) {
          this.LoanScreen = res.data
        }
      })
    },
    getLoanList () {
      let obj = {
        sort: this.sortModel, // success=>成功率排序speed=>放款速度排序quota=>贷款额度排序
        city: sessionStorage.cityName || 2671,
        quota: this.quotas_id, // 100-5000 , 5000-20000 , 2万-5万 , 5万-10万 , 10万以上
        time: this.periods_id, // 一个月以内 , 1-6个月 , 6个月以上
        material: this.materials_ids.join(',') // 资质id拼成的字符串
      }
      // 获取贷款列表
      this.fetch.loan(this.next_page, obj).then((res) => {
        setTimeout(() => {
          if (res.code === 200) {
            this.next_page += 1
            this.data_list = this.data_list.concat(res.data.data)
            // 加载状态结束
            this.loading = false
            if (res.data.next_page_url === null) {
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
    onLoad () {
      // 异步更新数据
      this.getLoanList()
    }
  }
}
</script>
<style lang="scss" scoped>
.nav{
  position: absolute;
  top: .8rem;
  left: 0;
  right: 0;
  z-index: 3;
  height: 1.05rem;
  line-height: 1.05rem;
  padding: 0 .4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: .26rem;
  letter-spacing: .01rem;
  color: #101d37;
  border-bottom: .01rem solid #edeff5;
  
  p{
    &.on{
      color: #2e6eec;
    }
  }
  .filtrate_btn{
    width: .3rem;
    height: .3rem;
    background: url(../../images/shai_xuan@2x.png) no-repeat;
    background-size: 100% 100%;
    &.on{
      background: url(../../images/shai_xuan_xuan_zhong@2x.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}
.loanList{
  padding-top: .7rem;
}
.loanList .listBox {
  background-color: #f8f8f9;
  padding: .2rem;
  padding-top: .5rem;
  overflow: scroll;
  height: calc(100vh - 3.1rem);
}
.filtrate{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  transform: translate3d(7.5rem, 0, 0);
  transition: .2s;
  &.on{
    transform: translate3d(0, 0, 0);
    transition: .3s;
  }
  &.bg{
    background-color: rgba(0, 0, 0, 0.5);
  }
  .filtrate_box{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 6.5rem;
    .filtrate_head{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      font-size: .36rem;
      font-weight: bold;
      letter-spacing: .01rem;
      color: #101d37;
      text-align: center;
      border-bottom: .01rem solid #edeff5;
    }
    .filtrate_foot{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: .9rem;
      line-height: .9rem;
      text-align: center;
      font-size: .3rem;
      letter-spacing: .01rem;
      color: #101d37;
      font-weight: bold;
      display: flex;
      p{
        width: 50%;
        &:last-child{
          background-image: linear-gradient(-90deg, #2e6eec 0%, #6699ff 100%), linear-gradient( #9fa5b3, #9fa5b3);
          background-blend-mode: normal, normal;
          color: #fff;
        }
      }
    }
  }
  .content{
    padding: 1.28rem .4rem .9rem;
    height: 100vh;
    overflow-y: scroll;
    box-sizing: border-box;
    .filtrate_condition{
      margin-bottom: .8rem;
      .title{
        font-size: .3rem;
        letter-spacing: .01rem;
        color: #101d37;
        font-weight: bold;
        margin-bottom: .1rem;
      }
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          width: 1.7rem;
          height: .6rem;
          line-height: .6rem;
          text-align: center;
          background-color: #f8f8f9;
          border-radius: .1rem;
          margin-right: .3rem;
          margin-top: .3rem;
          font-size: .24rem;
          color: #101d37;
          position: relative;
          &:nth-of-type(3n){
            margin-right: 0;
          }
          &.on{
            background-color: #f5f5ff;
            color: #2e6eec;
          }
        }
      }
    }
  }
}
</style>
