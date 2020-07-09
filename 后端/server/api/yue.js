const config = require('../config')
const mysql = require('mysql2/promise');
const returnjson = require('../utils/index');

/**
 * 用户相关方法
 */

module.exports = class YueController {

  // 预约拍照-新增
  static async addYuepai(ctx) {
    //获取到参数
    const body = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    const [rows] = await connection.execute('INSERT INTO `yaoyue` (userid,content,img1,img2,img3,city,tag,addr,theme,time,create_time) value (?,?,?,?,?,?,?,?,?,?,?)', [body.userid, body.content, body.img1, body.img2, body.img3, body.city, body.tag, body.addr, body.theme, body.time, body.create_time])

    //结束连接
    await connection.end()

    //返回结果
    if (rows.affectedRows == 0) {
      ctx.body = returnjson('失败')
    } else {
      ctx.body = returnjson('成功', rows[0])
    }
  }

  // 预约拍照-列表
  static async listYuepai(ctx) {
    //获取到参数
    const body = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    const [rows] = await connection.execute('SELECT yaoyue.*,user.nick,user.img  FROM `yaoyue` left join `user` on yaoyue.userid = user.id  WHERE INSTR(yaoyue.content,?)>0', [body.search])

    //结束连接
    await connection.end()

    //返回结果
    ctx.body = returnjson('成功', rows)
  }


  // 发布作品-新增
  static async addWorks(ctx) {
    //获取到参数
    const body = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    const [rows] = await connection.execute('INSERT INTO `works` (content,img1,img2,img3,userid,time,name) value (?,?,?,?,?,?,?)', [body.content, body.img1, body.img2, body.img3, body.userid, body.time, body.name])

    //结束连接
    await connection.end()

    //返回结果
    if (rows.affectedRows == 0) {
      ctx.body = returnjson('失败')
    } else {
      ctx.body = returnjson('成功', rows[0])
    }
  }

  // 发布作品-列表
  static async listWorks(ctx) {
    //获取到参数
    const body = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    const [rows] = await connection.execute('SELECT works.*,user.nick,user.img  FROM `works` left join `user` on works.userid = user.id')

    //结束连接
    await connection.end()

    //返回结果
    ctx.body = returnjson('成功', rows)
  }

  //立即邀约
  static async nowYuepai(ctx) {
    //获取到参数
    const body = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    let [rows] = await connection.execute('SELECT *  FROM `yaoyuelist` where userid=? and yaoyueid=?', [body.userid, body.yaoyueid])
    if (rows.length > 0) {
      ctx.body = returnjson('已经邀约过了!');
      return
    }

    [rows] = await connection.execute('INSERT INTO `yaoyuelist` (userid,yaoyueid,time) value (?,?,?)', [body.userid, body.yaoyueid, body.time])

    //结束连接
    await connection.end()

    //返回结果
    if (rows.affectedRows == 0) {
      ctx.body = returnjson('失败')
    } else {
      ctx.body = returnjson('成功', rows[0])
    }
  }

  //打赏
  static async dashang(ctx) {
    //获取到参数
    const body = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)


    //执行查询条件
    let [rows] = await connection.execute('UPDATE `yaoyue` SET price=price+? where id=?', [body.price, body.id])

    //结束连接
    await connection.end()

    //返回结果
    ctx.body = returnjson('成功', rows[0])

  }

  //邀约-点赞
  static async zanYuepai(ctx) {
    //获取到参数
    const body = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)


    //执行查询条件
    let [rows] = await connection.execute('UPDATE `yaoyue` SET zan=zan+1 where id=?', [body.id])

    //结束连接
    await connection.end()

    //返回结果
    ctx.body = returnjson('成功', rows[0])

  }

  //发布作品-点赞
  static async zanWorks(ctx) {
    //获取到参数
    const body = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)


    //执行查询条件
    let [rows] = await connection.execute('UPDATE `works` SET zan=zan+1 where id=?', [body.id])

    //结束连接
    await connection.end()

    //返回结果
    ctx.body = returnjson('成功', rows[0])

  }

  //关注
  static async guanzhu(ctx) {
    //获取到参数
    const body = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    let [rows] = await connection.execute('SELECT *  FROM `guanzhu` where beuserid=? and userid=?', [body.beuserid, body.userid])
    if (rows.length > 0) {
      ctx.body = returnjson('已经关注过了!');
      return
    }

    [rows] = await connection.execute('INSERT INTO `guanzhu` (beuserid,userid,time) value (?,?,?)', [body.beuserid, body.userid, body.time])

    //结束连接
    await connection.end()

    //返回结果
    if (rows.affectedRows == 0) {
      ctx.body = returnjson('失败')
    } else {
      ctx.body = returnjson('成功', rows[0])
    }

  }


}

