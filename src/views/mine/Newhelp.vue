<template>
    <div class="newhelp">
         <Header></Header>
       <div class="mt20">
           <!-- <van-collapse v-model="activeName" :accordion="true">
                <van-collapse-item :title="it.question" v-for="(it, i) in list" :key="i">
                    <p class="ask mb40">{{it.answer}}</p>
                </van-collapse-item>
            </van-collapse> -->
            <ul>
              <li v-for="(item,i) in list" :key="i" class="bor_b">
                  <div class="linebox" @click="changeContent(i)">
                    <p v-text="item.question" class="title mb20"></p>
                    <img src="../../images/bang_zhu_shou_qi@2x.png" alt="" v-if="item.isClick">
                     <img src="../../images/bang_zhu_xia_la@2x.png" alt=""  v-else>
                  </div>
                  
                  <div class="ask none" v-text="item.answer" :class="{'block' : item.isClick}"></div>
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
      list: []
    }
  },
  created () {
    this.fetch.help('').then((res) => {
      if (res.code === 200) {
        this.list = res.data
        for(let i=0;i<this.list.length;i++){
          this.list[i]['isClick']=false
        }
      }
    })
  },
  methods: {
   changeContent (i) {
      let btn = this.list[i].isClick
      for(let i=0;i<this.list.length;i++){
        this.list[i].isClick = false
      }
      this.list[i].isClick = !btn
      this.list = this.list.concat([])
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  display: block!important;
}
.newhelp{
  height: 100%;
  padding: 0 .4rem;
  background-color: #fff;
  ul{
    li{
      padding: .4rem 0 .25rem 0;
      .linebox{
        display: flex;
        justify-content: space-between;
      }
      .title{
        font-weight: 600;
        font-size: .3rem;
        width: 90%;
        color: #101d37;
        letter-spacing: .01rem;
      }
      img{
        width: 0.24rem;
        height: 0.12rem;
        display: inline-block;
        text-align: right;
      }
      .ask{
        color: #7f8799;
        font-size: .28rem;
        padding: 0;
      }
    }
  }
  
}
</style>
