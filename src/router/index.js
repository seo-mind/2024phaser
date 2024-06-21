import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/MainView.vue'),
    beforeEnter: routeGuardForLogging
  },
  {
    path: '/game1',
    name: 'game1',
    component: () => import('@/views/game/game1/GameView.vue'),
    beforeEnter: routeGuardForLogging
  },
  {
    path: '/rank1',
    name: 'rank1',
    component: () => import('@/views/game/RankView.vue'),
    beforeEnter: routeGuardForLogging
  },
  {
    path: '/game2',
    name: 'game2',
    component: () => import('@/views/game/game2/GameView.vue'),
    beforeEnter: routeGuardForLogging
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active'
})

// router navigation guard
function routeGuardForLogging(to, from) {
  console.log(`[router] ${from.fullPath} -> ${to.fullPath}`)
}

export default router
