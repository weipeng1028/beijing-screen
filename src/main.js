/*
 * @Author: MaiChao
 * @Date: 2020-04-17 11:08:44
 * @LastEditors: MaiChao
 * @LastEditTime: 2020-09-21 10:51:21
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementUI from 'element-ui'
import { debounce, throttle } from 'lodash'
// import directives from './libs/global_directive' // 全局指令
// import components from './libs/global_components' // 全局组件
// import { isPermission, getMonth } from './libs/tools' // 全局方法
import api from './api/api'
import axios from './libs/axios'
import 'lib-flexible'
import './assets/css/reset.css'
import './assets/css/public.css'
import './assets/css/change-ele.css'
import './assets/iconfont/iconfont.css'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'
// Vue.use(VueAwesomeSwiper) // (css 不显示的问题可能就在这)
// 引入nprogress
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$http = axios
Vue.prototype.$debounce = debounce
Vue.prototype.$throttle = throttle
// Vue.prototype.$isPermission = isPermission
// Vue.prototype.$_getMonth = getMonth
Vue.use(ElementUI)
// Vue.use(directives)
// Vue.use(components)
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
