/**
 * 路由钩子函数
 */
import router from '../router'
// import qs from 'qs'
import axios from '@/utils'

router.beforeEach((to, from, next) => {
  // 保存登录来源路由
  localStorage.router_from_path = from.path || ''
  if (to.path.indexOf('login') !== -1 && from.path.indexOf('login') === -1 && from.path !== '/') {
    localStorage.fromUrl = from.path
  }
  // 设置title
  window.document.title = to.meta.title || to.query.title
  // // Channel是地址栏参数 根据业务改变
  // localStorage.Channel = to.query.Channel || localStorage.Channel || 100001
  // if (JSON.stringify(to.query).indexOf('Channel') === -1) {
  //   to.query.Channel = localStorage.Channel
  //   next(`${to.path}?${qs.stringify(to.query)}`)
  // } else {
  //   next()
  // }
  const token = sessionStorage.token
  if (!token) {
    axios(`/api/v1/token`, '').then(res => {
      sessionStorage.token = res.data.token
      next()
    })
  } else {
    sessionStorage.token = token
    next()
  }
})
