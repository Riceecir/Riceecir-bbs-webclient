/* 布局 */
import Login from '@/layout/Login.vue'

export default [
  {
    path: '/login',
    component: Login,
    children: [
      {
        path: '/',
        name: 'login',
        meta: {
          title: '登录'
        },
        component: () => import('@/pages/Login/Login/index.vue')
      }
    ]
  },

  {
    path: '/register',
    component: Login,
    children: [
      {
        path: '/',
        name: 'register',
        meta: {
          title: '注册'
        },
        component: () => import('@/pages/Login/Register/index.vue')
      }
    ]
  },

  {
    path: '/forget',
    component: Login,
    children: [
      {
        path: '/',
        name: 'forget',
        meta: {
          title: '找回密码'
        },
        component: () => import('@/pages/Login/Forget/index.vue')
      }
    ]
  },

  {
    path: '/test/:id/:name/:sex',
    component: Login
  }
]
