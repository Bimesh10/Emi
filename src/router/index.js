import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import NotFound from '@/components/errorComponent.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        show: false,
        title: 'EMI Calculator',
        desc: 'EMI Calculator for Home Loan, Car Loan & Personal Loan in Nepal'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: {}
    }
  ]
})

export default router
