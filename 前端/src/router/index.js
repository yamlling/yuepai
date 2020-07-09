import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    meta: { title: '首页' },
    component: () => import('@/views/index'),
  },
  {
    path: '/',
    meta: { title: '首页' },
    component: () => import('@/views/index'),
  },
  {
    path: '/register',
    meta: { title: '注册' },
    component: () => import('@/views/register'),
  },
  {
    path: '/login',
    meta: { title: '登陆' },
    component: () => import('@/views/login'),
  },
  {
    path: '/explore',
    meta: { title: '发现' },
    component: () => import('@/views/explore'),
  },
  {
    path: '/content',
    name: 'Content',
    meta: { title: '邀约详情' },
    component: () => import('@/views/content'),
  },
  {
    path: '/works',
    name: 'Works',
    meta: { title: '作品详情' },
    component: () => import('@/views/works'),
  },
  {
    path: '/information',
    meta: { title: '消息' },
    component: () => import('@/views/information'),
  },
  {
    path: '/my',
    meta: { title: '我的' },
    component: () => import('@/views/my'),
  },
  {
    path: '/config',
    meta: { title: '资料设置' },
    component: () => import('@/views/config'),
  },
  {
    path: '/add-photo',
    meta: { title: '发布邀约信息' },
    component: () => import('@/views/add-photo'),
  },
  {
    path: '/add-works',
    meta: { title: '发布作品' },
    component: () => import('@/views/add-works'),
  },

]

const router = new VueRouter({
  routes
})

export default router
