import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'
import login from '@/components/login'
import index from '@/components/index'
import detail from '@/components/detail'
import list from '@/components/list'
import add from '@/components/add'
import userList from '@/components/userList'
import articleList from '@/components/articleList'

Vue.use(Router)
let router = new Router({
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
      path: '/add',
      name: 'add',
      component: add,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userList',
      name: 'userList',
      component: userList
    },
    {
      path: '/articleList',
      name: 'articleList',
      component: articleList
    },
  ]
})
router.beforeEach((to, from, next) => {
  let islogin = localStorage.getItem('userName')
  if (to.path == '/login') {
    if (islogin) {
      next('/')
    } else {
      next()
    }
  } else {
    if (to.meta.requireAuth && !islogin) {
      next('/login')
    } else if ((to.path == '/userList' || to.path == '/articleList') && islogin != 'adminroot') {
      next('/')
    } else {
      next()
    }
  }
})

export default router
