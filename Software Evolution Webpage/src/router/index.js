import Vue from 'vue'
import Router from 'vue-router'
import startPage from '../pages/start.vue'

Vue.use(Router)

const router = new Router ({
  root: '/start',
  routes: 
  [
      {
        path: '/start',
          name: 'start',
          component: startPage
      },
      {
          path: '/',
          redirect: '/start'
      }
  ]
})

export default router