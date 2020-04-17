import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)
let routes = [
  {
    path: '/',
    name: 'Bigscreen',
    meta: {
      title: '新媒体大屏统计分析'
    },
    component: () => import('@/views/auth/Bigscreen.vue')
  }
]
const router = new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/bjjcBigScreen' : '/',
  linkActiveClass: 'is-active',
  routes,
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
router.beforeEach((to, from, next) => {
  // 验证登录
  if (store.state.user.token) {
    next()
  } else {
    if (to.name === 'Bigscreen') {
      next()
    } else {
      next({ name: 'Bigscreen' })
    }
  }
  // if (to.matched.some(r => r.meta.requireAuth)) {
  //   if (!store.state.user.token) {
  //     next({ name: 'Login' })
  //     // store.commit('mutations/prevUrlName', to.name)
  //     store.commit('user/USER_SIGNOUT')
  //     store.commit('user/USER_TOKEN', null)
  //   } else {
  //     next()
  //   }
  // } else {
  //   next()
  // }
  // if (to.name !== null) {
  //   if (!store.state.user.token) {
  //     next({ name: 'Login' })
  //   } else {
  //     next()
  //   }
  //   // store.commit('mutations/prevUrlName', to.name)
  //   // store.commit('user/USER_SIGNOUT')
  //   // store.commit('user/USER_TOKEN', null)
  // } else {
  //   next()
  // }
  // meta title
  if (to.meta.title) {
    if (to.meta.title === '新媒体大屏统计分析') {
      document.title = '新媒体大屏统计分析'
    } else {
      document.title = to.meta.title
    }
  } else {
    document.title = '新媒体大屏统计分析'
  }
})
export default router
