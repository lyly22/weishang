import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'
import login from '@/components/login'
import blogs from '@/components/blogs'
import index from '@/components/index'
import detail from '@/components/detail'
import list from '@/components/list'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: index
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: blogs
    }
  ]
})
