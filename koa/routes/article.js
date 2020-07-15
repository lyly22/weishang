const Router = require('koa-router')
const ArtileController = require('../controller/article')

const multer = require('koa-multer');//加载koa-multer模块
// 上传 图片
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/upload/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({
  storage: storage
});
const router = new Router({
  // prefix: '/api/v1'
})

// 创建文章
router.post('/create', ArtileController.create)

// 获取文章详情
router.get('/article', ArtileController.detail)

// 获取文章列表
router.get('/articles', ArtileController.list)
router.get('/delArticle', ArtileController.delete)

router.get('/getVip', ArtileController.vipList)

router.get('/indexList', ArtileController.indexList)

router.post('/upload', upload.single('file'), async (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: '上传成功',
    fileUrl: "http://localhost:3000/upload/" + ctx.req.file.filename, //返回文件名
  }
})
router.post('/uploads', upload.array([{ name: 'file', maxCount: 2 }]), async (ctx, next) => {
  console.log(ctx.req.files);
  // ctx.body = {
  //   code: 0,
  //   msg: '上传成功',
  //   fileUrl: "http://localhost:3000/upload/" + ctx.req.file[0].filename, //返回文件名
  // }
})

module.exports = router
