// 后台路由配置
const koaRouter = require('koa-router')
const multer = require('koa-multer')
const fs = require('fs')

const UserController = require('./api/user'); //用户相关
const YueController = require('./api/yue'); //约拍相关

const routes = koaRouter()


const storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    const fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})

//加载配置
const upload = multer({ storage: storage });

//上传文件路由
routes.post('/upload', upload.single('file'), async (ctx, next) => {
  ctx.body = {
    filename: 'http://localhost:3000/' + ctx.req.file.filename
  }
})

routes
  .post('/user/login', UserController.login)         // 用户登录
  .post('/user/register', UserController.register)         // 用户注册
  .post('/user/reInfo', UserController.reInfo)         // 修改信息
  .post('/user/userGuanzhu', UserController.userGuanzhu)         // 关注量
  .post('/user/userPrice', UserController.userPrice)         // 打赏量
  .post('/user/userZan', UserController.userZan)         // 点赞量
  .post('/user/toMe', UserController.toMe)         // 我收到的邀约
  .post('/user/formMe', UserController.formMe)         // 我发起的邀约
  .post('/user/delState', UserController.delState)         // 删除邀约
  .post('/yue/addYuepai', YueController.addYuepai)         //预约拍照-新增
  .post('/yue/listYuepai', YueController.listYuepai)         //预约拍照-列表
  .post('/yue/addWorks', YueController.addWorks)         // 发布作品-新增
  .post('/yue/listWorks', YueController.listWorks)         // 发布作品-列表
  .post('/yue/nowYuepai', YueController.nowYuepai)         // 立即邀约
  .post('/yue/dashang', YueController.dashang)         // 打赏
  .post('/yue/zanYuepai', YueController.zanYuepai)         // 邀约-点赞
  .post('/yue/zanWorks', YueController.zanWorks)         // 发布作品-点赞
  .post('/yue/guanzhu', YueController.guanzhu)         // 关注
  .post('/user/changeState', UserController.changeState)         // 邀约-修改状态
  .post('/user/userlist', UserController.userlist)         // 用户列表
  .post('/user/userliststate', UserController.userliststate)         // 用户列表-待审核
  .post('/user/deluser', UserController.deluser)         // 用户-删除
  .post('/user/userstate', UserController.userstate)         // 用户-审核









module.exports = {
  routes
}
