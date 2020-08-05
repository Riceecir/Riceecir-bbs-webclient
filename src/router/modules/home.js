/* 布局 */
import Default from '@/layout/Default.vue'

/* 主页功能路由 */
export default [
  {
    path: '/',
    component: Default,
    children: [
      /* 主页 */
      {
        path: '/',
        name: 'home',
        meta: {
          title: 'Riceecir'
        },
        component: () => import('@/pages/Home/index.vue')
      }
    ]
  }
]
