import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
