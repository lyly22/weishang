const Router = require('koa-router')
const UserController = require('../controller/user')

const router = new Router({
  // prefix: '/api/v1'
})

router.post('/register', UserController.create)

router.post('/login', UserController.login)

module.exports = router
