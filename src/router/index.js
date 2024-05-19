import { createRouter, createWebHistory } from 'vue-router'
import { useUserStoreWidthOut } from '@/store/modules/user'

const Layout = () => import('@/views/layout/index.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      name: 'dashboard',
      component: Layout,
      redirect: '/course',
      meta: {
        title: '我的课程',
      },
      children: [
        {
          path: '/course',
          name: 'course',
          component: () => import('@/views/course/index.vue'),
          meta: {
            title: '我的课程',
          },
        },
        {
          path: '/active',
          name: 'active',
          component: () => import('@/views/active/index.vue'),
          meta: {
            title: '课程活动',
          },
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/about/index.vue'),
          meta: {
            title: '关于我们',
          },
        },
      ],
    },
  ],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
const userStore = useUserStoreWidthOut()

router.beforeEach((to, from, next) => {
  document.title = import.meta.env.VITE_GLOB_APP_TITLE + ' - ' + to.meta.title
  if (!userStore.isLogin && ![undefined, 'course', 'about'].includes(to.name)) {
    next({ name: 'course' })
  } else {
    next()
  }
})

export default router
