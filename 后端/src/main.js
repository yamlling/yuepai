import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './assets/style.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './store/index'
// 本地存储
import utils from './utils/index'
import routes from './router.js'

// 页面顶部进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Vuex)
Vue.use(ElementUI, { size: 'small' })
Vue.use(VueRouter)

const router = new VueRouter(routes)

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(() => {
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
