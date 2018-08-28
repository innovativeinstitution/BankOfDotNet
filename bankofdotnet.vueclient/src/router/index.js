import Vue from 'vue'
import Router from 'vue-router'
import CustomersView from '@/components/CustomersView'
import LoginCallbackView from '@/components/LoginCallbackView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CustomersView',
      component: CustomersView
    },
    {
      path: '/callback',
      name: 'LoginCallbackView',
      component: LoginCallbackView
    }
  ]
})
