import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Index'),
      meta: {
        title: '首页',
        isFooter: true
      }
    },
    // 极速小贷
    {
      path: '/topspeed/:id',
      name: 'topspeed',
      component: () => import('@/views/topspeed/Index'),
      meta: {
        isHeader: true
        // title: '极速小贷'
      }
    },
    // 系统消息
    {
      path: '/info',
      name: 'info',
      component: () => import('@/views/info/Index'),
      meta: {
        title: '系统消息',
        isHeader: true
      }
    },
    // 系统消息详情
    {
      path: '/info/Detail/:id',
      name: 'detail',
      component: () => import('@/views/info/Detail'),
      meta: {
        title: '系统消息详情',
        isClose: true,
        turnPath: '/',
        isHeader: true
      }
    },
    // 系统回复
    {
      path: '/info/Reply/:id',
      name: 'reply',
      component: () => import('@/views/info/Reply'),
      meta: {
        title: ' ',
        isClose: true,
        turnPath: '/',
        isHeader: true
      }
    },
    // 选择城市
    {
      path: '/city',
      name: 'city',
      component: () => import('@/views/city/Index'),
      meta: {
        title: '城市选择',
        isBack: true, // 返回按钮，此处取反
        isClose: true,
        turnPath: '/',
        isHeader: true
      }
    },
    // 申请
    {
      path: '/apply/:index',
      name: 'apply',
      component: () => import('@/views/apply/Index'),
      meta: {
        title: '贷款',
        isFooter: true,
        keepAlive: true // 是否缓存
      }
    },
    // 贷款详情
    {
      path: '/LoanDetail/:type/:id',
      name: 'LoanDetail',
      component: () => import('@/views/apply/LoanDetail'),
      meta: {
        title: '贷款详情',
        isHeader: true
      }
    },
    // 信用卡详情
    {
      path: '/CardDetail/:id',
      name: 'CardDetail',
      component: () => import('@/views/apply/CardDetail'),
      meta: {
        title: '信用卡详情',
        isHeader: true
      }
    },
    // 全部评价
    {
      path: '/AllEvaluate/:type/:id',
      name: 'AllEvaluate',
      component: () => import('@/views/apply/AllEvaluate'),
      meta: {
        title: '全部评价',
        isClose: true,
        turnPath: '/apply/0',
        isHeader: true
      }
    },
    // 快捷登录
    {
      path: '/login',
      name: 'login',
      component: (resolve) => import('@/views/login/Index'),
      meta: {
        title: '快捷登录'
      }
    },
    // 注册
    {
      path: '/login/Register',
      name: 'Register',
      component: (resolve) => import('@/views/login/Register'),
      meta: {
        title: '注册',
        isHeader: true
      }
    },
    // 密码登录
    {
      path: '/login/PwdLogin',
      name: 'PwdLogin',
      component: (resolve) => import('@/views/login/PwdLogin'),
      meta: {
        title: '密码登录'
      }
    },
    // 找回密码
    {
      path: '/login/FindPwd',
      name: 'FindPwd',
      component: (resolve) => import('@/views/login/FindPwd'),
      meta: {
        title: '找回密码',
        isHeader: true
      }
    },
    // 注册协议
    {
      path: '/login/Protocol',
      name: 'Protocol',
      component: (resolve) => import('@/views/login/Protocol'),
      meta: {
        title: '注册协议',
        isClose: true,
        turnPath: '/login',
        isHeader: true
      }
    },
    // 发现
    {
      path: '/find',
      name: 'Find',
      component: (resolve) => import('@/views/find/Find'),
      meta: {
        title: '发现',
        isFooter: true,
        isBack: true, // 返回按钮，此处取反
        isHeader: true
      }
    },
    // 发现详情
    {
      path: '/FindDetails/:id',
      name: 'FindDetails',
      component: (resolve) => import('@/views/find/FindDetails'),
      meta: {
        title: '微粒贷额度涨到...',
        isHeader: true
      }
    },
    // 我的
    {
      path: '/mine',
      name: 'NotLogin',
      component: (resolve) => import('@/views/mine/Index'),
      meta: {
        title: '我的',
        isFooter: true
      }
    },
    // 新手帮助
    {
      path: '/mine/Newhelp',
      name: 'Newhelp',
      component: (resolve) => import('@/views/mine/Newhelp'),
      meta: {
        title: '新手帮助',
        isHeader: true
        // isFooter: true
      }
    },
    // 意见反馈
    {
      path: '/mine/Opinion',
      name: 'Opinion',
      component: (resolve) => import('@/views/mine/Opinion'),
      meta: {
        title: '意见反馈',
        isHeader: true
      }
    },
    // 贷贷狐圈子
    {
      path: '/mine/Circle',
      name: 'Circle',
      component: (resolve) => import('@/views/mine/Circle'),
      meta: {
        title: '贷贷狐圈子',
        isHeader: true
      }
    },
    // 设置
    {
      path: '/mine/Set',
      name: 'Set',
      component: (resolve) => import('@/views/mine/Set'),
      meta: {
        title: '设置',
        isHeader: true
      }
    },
    // 关于我们
    {
      path: '/mine/Aboutus',
      name: 'Aboutus',
      component: (resolve) => import('@/views/mine/Aboutus'),
      meta: {
        title: '关于我们',
        isClose: true,
        turnPath: '/mine',
        isHeader: true
      }
    },
    // 我的收藏
    {
      path: '/collect',
      name: 'collect',
      component: (resolve) => import('@/views/collect/Index'),
      meta: {
        title: '我的收藏'
        // isHeader: true
      }
    },
    // 申请意向
    {
      path: '/intention',
      name: 'intention',
      component: (resolve) => import('@/views/intention/Index'),
      meta: {
        title: '申请意向'
      }
    },
    // 评价
    {
      path: '/evaluate/:item',
      name: 'evaluate',
      component: (resolve) => import('@/views/evaluate/Index'),
      meta: {
        title: '评价',
        isClose: true,
        isHeader: true,
        turnPath: '/mine'
      }
    }
  ],
  scrollBehavior: () => {
    return { x: 0, y: 0 }
  }
})
