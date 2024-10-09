import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'
import LayoutDefault from '@/layouts/Default.vue'

export const constantRoutes = [
  {
    path: '',
    component: LayoutDefault,
    redirect: '/home',
    onlyChild: true,
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/Home.vue'),
        name: 'Home',
        meta: { title: '首页', icon: 'dashboard', affix: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    hidden: true,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register.vue'),
    hidden: true,
  },
  {
    path: '/user',
    component: LayoutDefault,
    redirect: 'noredirect',
    hidden: true,
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/index.vue'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error/401.vue'),
    hidden: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

export default router
