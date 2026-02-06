import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import MessagePage from '../pages/MessagePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import { useUserStore } from '@/stores/user/user-store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: LoginPage
  },
  {
    path: '/email',
    beforeEnter: (to, from, next) => {
      useUserStore().email ? next() : next('/')
    },
    name: 'email',
    component: () => import('../pages/template/EmailPage.vue'),
    children: [
      {
        path: '',
        name: 'home-page',
        component: HomePage
      },
      {
        path: 'message/:id',
        component: MessagePage
      },
      {
        path: 'sent',
        component: () => import('../pages/SentPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
