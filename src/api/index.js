import axios from '@/utils'
export default {
  getToken: data => { // 认证token
    return axios(`/api/v1/token`, data)
  },
  getCode: data => { // 发送短信验证码
    return axios(`/api/get/code`, data, `post`)
  },
  checkCode: data => { // 验证短信验证码
    return axios(`/api/check/code`, data, `post`)
  },
  register: data => { // 注册
    return axios(`/api/v1/register`, data, `post`)
  },
  verifyLogin: data => { // 快捷登录
    return axios(`/api/v1/verify/login`, data, `post`)
  },
  pwdLogin: data => { // 密码登录
    return axios(`/api/v1/login`, data, `post`)
  },
  retrievePwd: data => { // 找回密码
    return axios(`/api/v1/retrieve/pwd`, data, `post`)
  },
  logout: data => { // 退出登录
    return axios(`/api/v1/logout`, data)
  },
  profile: data => { // 个人资料
    return axios(`/api/v1/profile`, data)
  },
  help: data => { // 新手帮助
    return axios(`/api/v1/help`, data)
  },
  about: data => { // 关于我们
    return axios(`/api/v1/about`, data)
  },
  agreement: data => { // 用户注册协议
    return axios(`/api/v1/agreement`, data)
  },
  circle: data => { // 贷贷狐圈子内容
    return axios(`/api/v1/circle`, data)
  },
  feedbackcate: data => { // 用户反馈 类型
    return axios(`/api/v1/feedback/cate`, data)
  },
  feedback: data => { // 用户反馈
    return axios(`/api/v1/feedback`, data, `post`)
  },
  productApply: (page, data) => { // 贷款申请意向
    return axios(`/api/v1/product/apply?page=${page}`, data)
  },
  creditApply: data => { // 信用卡申请意向
    return axios(`/api/v1/apply/credit`, data)
  },
  apply: data => { // 用户申请信用卡/产品
    return axios(`/api/v1/apply`, data, `post`)
  },
  comment: data => { // 对信用卡/贷款进行评论
    return axios(`/api/v1/comment`, data, `post`)
  },
  collectionProduct: (page, data) => { // 贷款的收藏列表
    return axios(`/api/v1/collection/product?page=${page}`, data)
  },
  collectionCredit: (page, data) => { // 信用卡收藏列表
    return axios(`/api/v1/collection/credit?page=${page}`, data)
  },
  collectionArticle: (page, data) => { // 资讯收藏列表
    return axios(`/api/v1/collection/article?page=${page}`, data)
  },
  article: (page, data) => { // 资讯列表
    return axios(`/api/v1/article?page=${page}`, data)
  },
  articleDetail: (id, city,data) => { // 资讯详情
    return axios(`/api/v1/article/${id}?city=${city}`, data)
  },
  credit: (page, data) => { // 信用卡列表
    return axios(`/api/v1/credit?page=${page}`, data)
  },
  creditDetail: (id, from, data) => { // 信用卡详情
    return axios(`/api/v1/credit/${id}?from=${from}`, data)
  },
  comments: (type, id, page, good, data) => { // 评论管理
    good = good ? `/${good}` : ``
    return axios(`/api/v1/comment/${type}/${id}${good}?page=${page}`, data)
  },
  loan: (page, data) => { // 贷款列表
    page = page ? `${page}` : 1
    return axios(`/api/v1/loan?page=${page}`, data, `post`)
  },
  loanScreen: data => { // 贷款高级筛选
    return axios(`/api/v1/loan/screen`, data)
  },
  loanDetail: (id, from,city, data) => { // 贷款详情
    return axios(`/api/v1/loan/${id}?from=${from}&city=${city}`, data)
  },
  praise: (id, data) => { // 资讯点赞
    return axios(`/api/v1/praise/${id}`, data)
  },
  collect: data => { // 贷款/信用卡/资讯收藏操作
    return axios(`/api/v1/collect`, data)
  },
  share: data => { // 贷款/信用卡/资讯分享操作
    return axios(`/api/v1/share`, data, `post`)
  },
  district: data => { // 获取排序城市数据 / 获取三级联动城市数据
    return axios(`/api/v1/district`, data)
  },
  home: data => { // 获取首页数据
    return axios(`/api/v1/home`, data)
  },
  homeBase: data => { // 获取首页广告
    return axios(`/api/v1/home/base`, data)
  },
  homeId: (id, page, city, data) => { // 获取贷款专题
    return axios(`/api/v1/home/${id}?page=${page}&city=${city}`, data)
  },
  hotCity: data => { // 热门城市数据
    return axios(`/api/v1/hot/city`, data)
  },
  message: (page, data) => { // 系统消息
    return axios(`/api/v1/message?page=${page}`, data)
  },
  messageId: (id, data) => { // 系统消息：详情
    return axios(`/api/v1/message/${id}`, data)
  },
  messageNew: (data) => { // 系统消息：新消息
    return axios(`/api/v1/message/check/new`, data)
  },
  messageSet: data => { // 系统消息变更
    return axios(`/api/v1/message/set/`, data, `post`)
  }
}
