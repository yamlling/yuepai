import common from '@/../server/common'
import Login from './page/Login.vue'
import NoFind from './page/NoFind.vue'
import Home from './page/Home.vue'
import userList from './page/User/list.vue'
import authlist from './page/User/authlist.vue'

export default {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: '/404',
      component: NoFind
    }, {
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      name: 'login',
      meta: { title: '登录' },
      component: Login
    },
    {
      path: '/user',
      meta: {
        verify: true,
        title: '用户管理',
        icon: 'fa fa-user-o'
      },
      redirect: '/user/list',
      component: Home,
      children: [
        {
          path: 'list',
          meta: {
            verify: true,
            grade: common.page_grade.userList,
            title: '用户列表',
          },
          component: userList
        },
        {
          path: 'authlist',
          meta: {
            verify: true,
            grade: common.page_grade.userList,
            title: '待审核列表',
          },
          component: authlist
        }
      ]
    }
  ]
}
