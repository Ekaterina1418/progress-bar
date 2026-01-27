import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../pages/CircularProgressDemo.vue'),
    },
    {
      path: '/diagram',
      component: () => import('../pages/DiagramPage.vue'),
    },
  ],
})

export default router
