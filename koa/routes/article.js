const Router = require('koa-router')
const ArtileController = require('../controller/article')

const router = new Router({
  // prefix: '/api/v1'
})

// 创建文章
router.post('/create', ArtileController.create)

// 获取文章详情
router.get('/article', ArtileController.detail)

// 获取文章列表
router.get('/blogs', ArtileController.list)

module.exports = router
