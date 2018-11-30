import axios from 'axios'
import router from '@/router'
import checkurl from '@/utils/checkurl'
import {guid} from '@/utils/check'
// 创建axios实例
const Axios = axios.create({
  // baseURL: 'http://csadm.daidaihu360.com/', // api的base_url
  // baseURL: 'http://api.ddfox.cn/', // api的base_url
  baseURL: 'http://api.daidai123.cn/', // api的base_url
  timeout: 15000 // 请求超时时间
})
let profileurl = '' // profile接口不自动跳转登录

localStorage.Channel = checkurl('Channel') || localStorage.Channel || 100001
if (checkurl('Channel') && checkurl('deviceid_') && checkurl('Authorization')) {
  // console.log('注册页过来的')
  localStorage.deviceid_ = checkurl('deviceid_')
  sessionStorage.token = checkurl('Authorization')
} else {
  // console.log('正常流程')
  if (!localStorage.deviceid_ || localStorage.deviceid_ === '') {
    localStorage.deviceid_ = guid()
  }
}
// 添加请求拦截器
Axios.interceptors.request.use(config => {
  config.headers['Source'] = 'wap' // 平台
  config.headers['Version'] = '1.0.1' // 渠道下App版本
  config.headers['System'] = '1.0.1' // 操作系统版本
  config.headers['Channel'] = localStorage.Channel// 渠道码
  config.headers['Device'] = localStorage.deviceid_
  config.headers['Authorization'] = sessionStorage.token || ''
  // 在发送请求之前做些什么
  profileurl = config.url.indexOf('profile') >= 0
  return config
}, error => {
  // 对请求错误做些什么
  // console.log(error)
  return Promise.reject(error)
})

// 添加响应拦截器
Axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  // console.log(response)
  if (response.data.code === 4001) { // token过期
    Axios.get('/api/v1/token').then((res) => {
      if (res.code === 200) {
        sessionStorage.token = res.data.token
        // router.go(0)
      }
    })
  } else if (response.data.code === 4002) {
    sessionStorage.removeItem('userPhone')
    if (!profileurl) {
      router.push({
        path: '/login'
      })
    }
  }
  return response.data
}, error => {
  return Promise.reject(error)
})
// Axios.get('/api/v1/token').then((res) => {
//   if (res.code === 200) {
//     localStorage.token = res.data.token
//   }
// })
// 发起请求
export default (url, data, method = `GET`) => {
  if (method === `GET`) {
    return Axios.get(url, data.params ? data : {
      params: data
    })
  }
  return Axios.post(url, data)
}
