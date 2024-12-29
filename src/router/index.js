import { createRouter, createWebHistory } from 'vue-router'
import { loginStore } from '@/stores/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/index.vue'),
      meta: {
        guard: 'auth',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue'),
      meta: {
        guard: 'guest',
      },
    },
  ],
})
router.beforeEach((to, from, next) => {
  const store = loginStore()
  const auth = store.authUser
  if (to.matched.some((route) => route.meta.guard === 'guest') && auth) next({ name: 'home' })
  else if (to.matched.some((route) => route.meta.guard === 'auth') && !auth) next({ name: 'login' })
  else next()
})
export default router
