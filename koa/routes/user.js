const router = require('koa-router')()

// router.prefix('/users')

router.get('/register', function (ctx, next) {
  ctx.body = {
    code: 0,
    msg: '注册成功',
    data: {
      userId: 1,
      userName,
      jifen: 1
    }
  }
})

router.get('/login', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
