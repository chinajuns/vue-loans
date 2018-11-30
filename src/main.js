// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import fetch from './api'
import 'vant/lib/vant-css/index.css'
import Toast from './components/toast'
import '@/utils/intercept'
// import imgUrl from '@/utils/Global'
import VueClipboard from 'vue-clipboard2' // 复制功能插件
Vue.use(VueClipboard)
Vue.use(Vant)
Vue.use(Toast)

// 创建全局
Vue.prototype.fetch = fetch
Vue.prototype.imgUrl = 'http://image.daidai123.cn/'
// 函数节流
const Throttle = () => {
  let flags = true // 是否可以执行函数
  return (fn, time) => {
    let _fn = fn // 保存需要被延迟的函数引用
    if (flags) {
      flags = false
      _fn()
      setTimeout(function () { // 延迟执行
        flags = true
      }, time)
    }
  }
}
Vue.prototype.throttle = new Throttle()

Vue.config.productionTip = false

// 年月日
Vue.filter('YTD', function (val) {
  if (!val) {
    return ''
  }
  val = typeof val === 'string' ? val.replace(/\-/g, '/') : val
  let date = new Date(val)
  let dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  return dateStr
})
// 年月日时分
Vue.filter('YTDHM', function (val) {
  if (!val) {
    return ''
  }
  val = typeof val === 'string' ? val.replace(/\-/g, '/') : val
  let date = new Date(val)
  let dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  return dateStr
})
// 千分位
Vue.filter('numFmt', function (value) {
  if (!value) return '0'
  var intPart = Number(value).toFixed(0) // 获取整数部分
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})
Vue.prototype.successLoadImg = function (event) {
  if (event.target.complete === true) {
    event.target.parentNode.classList.remove('def-img')
    var imgParentNode = event.target.parentNode
    if (imgParentNode.classList.contains('show-img') === true) {
      imgParentNode.style.background = '#000'
    }
  }
}
Vue.prototype.errorLoadImg = function (event) {
  event.target.classList.add('def-img')
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})