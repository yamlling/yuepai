const Koa = require('koa')
const cors = require('koa2-cors')
const koaRouter = require('koa-router')
const json = require('koa-json')
const path = require('path')           //路径管理
const static1 = require('koa-static')   //静态资源服务插件

const historyApiFallback = require('koa2-history-api-fallback')

const koaBodyparser = require('koa-bodyparser')
const routesObj = require('./server/routes.js')
const fs = require('fs')

const app = new Koa()
app.use(cors()); //跨域
const router = koaRouter()

app.use(koaBodyparser())
app.use(json())

// 配置静态资源以供访问
const staticPath = './public/uploads'
app.use(static1(
  path.join(__dirname, staticPath)
))


app.use(async (ctx, next) => {
  await next()
})

app.on('error', function (err, ctx) {
  ctx.body = {
    success: false,
    data: ctx,
    message: err
  }
  console.log('server error', err)
})

router.use('/api', routesObj.routes.routes())

app.use(router.routes())

app.listen(3000, () => {
  console.log('Koa is listening in 3000')
})

module.exports = app
