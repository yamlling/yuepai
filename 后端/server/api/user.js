const config = require('../config')
const mysql = require('mysql2/promise');
const returnjson = require('../utils/index');

/**
 * 用户相关方法
 */

module.exports = class UserController {

  // 用户登录
  static async login(ctx) {
    //获取到参数
    const { user, pwd } = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    const [rows] = await connection.execute('SELECT * FROM `user` where `user`= ? and `pwd` = ?', [user, pwd])

    //结束连接
    await connection.end()
    console.log();

    //返回结果
    if (rows.length == 0) {
      ctx.body = returnjson('账号密码错误')
    } else if (rows[0].state == 0) {
      ctx.body = returnjson('账号未审核通过')
    } else {
      ctx.body = returnjson('成功', rows[0])
    }
  }

  // 用户注册
  static async register(ctx) {
    //获取到参数
    const body = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    let [rows] = await connection.execute('SELECT *  FROM `user` where `user`= ?', [body.user])

    if (rows.affectedRows > 0) {
      ctx.body = returnjson('账号已存在!');
      return
    }

    [rows] = await connection.execute('INSERT INTO `user` (user,pwd,nick,name,idcard,addr,bith,tel,img) VALUES (?,?,?,?,?,?,?,?,?)', [body.user, body.pwd, body.nick, body.name, body.idcard, body.addr, body.bith, body.tel, body.img])

    //结束连接
    await connection.end()

    //返回结果
    if (rows.affectedRows == 0) {
      ctx.body = returnjson('注册失败')
    } else {
      ctx.body = returnjson('成功', rows[0])
    }
  }


  // 修改信息
  static async reInfo(ctx) {
    //获取到参数
    const body = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    let [rows] = await connection.execute('UPDATE `user` SET img=?,tel=?,addr=?,bith=? where id=?', [body.img, body.tel, body.addr, body.bith, body.id])

    //结束连接

    //返回结果
    if (rows.affectedRows == 0) {
      ctx.body = returnjson('失败')
    } else {
      let [rows] = await connection.execute('SELECT * FROM `user` where id=?', [body.id])
      ctx.body = returnjson('成功', rows[0])
    }
    await connection.end()
  }

  // 查询关注量
  static async userGuanzhu(ctx) {
    //获取到参数
    const { beuserid } = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    const [rows] = await connection.execute('SELECT COUNT(id) as sum FROM `guanzhu` where `beuserid`= ?', [beuserid])

    //结束连接
    await connection.end()

    //返回结果
    ctx.body = returnjson('成功', rows[0])
  }



  // 查询总打赏量
  static async userPrice(ctx) {
    //获取到参数
    const { userid } = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    const [rows] = await connection.execute('SELECT sum(price) as sum FROM `yaoyue` where `userid`= ?', [userid])

    //结束连接
    await connection.end()

    //返回结果
    ctx.body = returnjson('成功', rows[0])
  }



  // 查询总点赞量
  static async userZan(ctx) {
    //获取到参数
    const { userid } = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    let aa = await connection.execute('SELECT sum(zan) as sum FROM `yaoyue` where `userid`= ?', [userid])

    let sum = 0
    sum = aa[0].map(item => {
      return Number(item.sum) + Number(sum);
    })

    let bb = await connection.execute('SELECT sum(zan) as sum FROM `works` where `userid`= ?', [userid])
    sum = bb[0].map(item => {
      return Number(item.sum) + Number(sum);
    })

    //结束连接
    await connection.end();
    //返回结果
    ctx.body = returnjson('成功', sum)
  }

  // 我收到的邀约
  static async toMe(ctx) {
    //获取到参数
    const body = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    let [rows] = await connection.execute('SELECT yaoyuelist.*,user.img,user.nick  FROM `yaoyuelist` left join `user` on yaoyuelist.userid = user.id where user.id=?', [body.userid])


    //结束连接
    await connection.end();
    //返回结果
    ctx.body = returnjson('成功', rows)
  }

  // 我发起的邀约
  static async formMe(ctx) {
    //获取到参数
    const body = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    let [rows] = await connection.execute('SELECT *  FROM `yaoyue`  where userid=?', [body.userid])

    //结束连接
    await connection.end();
    //返回结果
    ctx.body = returnjson('成功', rows)
  }

  // 改变邀约状态
  static async changeState(ctx) {
    //获取到参数
    const body = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    let [rows] = await connection.execute('UPDATE `yaoyuelist` SET state=? where userid=?', [body.state, body.id])

    //结束连接
    await connection.end();

    //返回结果
    if (rows.affectedRows == 0) {
      ctx.body = returnjson('失败')
    } else {
      ctx.body = returnjson('成功', rows[0])
    }
  }

  // 删除邀约
  static async delState(ctx) {
    //获取到参数
    const body = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    let [rows] = await connection.execute('DELETE FROM `yaoyue`  where id=?', [body.id])

    //结束连接
    await connection.end();

    //返回结果
    if (rows.affectedRows == 0) {
      ctx.body = returnjson('失败')
    } else {
      ctx.body = returnjson('成功', rows[0])
    }
  }


  // 用户列表-所有
  static async userlist(ctx) {
    //获取到参数
    const { limit, offset, user } = ctx.request.body

    let limit1 = offset > 1 ? (offset - 1) * limit : offset - 1
    let limit2 = Number(limit1) + Number(limit)

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)
    //执行查询条件
    let [rows] = await connection.execute('SELECT * FROM `user` WHERE INSTR(user,?)>0 LIMIT ?,?', [user, limit1, limit2])
    let sum = await connection.execute('SELECT COUNT(*) as sum FROM `user` WHERE INSTR(user,?)>0', [user])

    //结束连接
    await connection.end()

    //返回结果
    ctx.body = returnjson('成功', { list: rows, total: sum[0] })
  }

  // 用户列表-未审核
  static async userliststate(ctx) {
    //获取到参数
    const { limit, offset, user } = ctx.request.body

    let limit1 = offset > 1 ? (offset - 1) * limit : offset - 1
    let limit2 = Number(limit1) + Number(limit)

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    let [rows] = await connection.execute('SELECT * FROM `user` where state=0 and INSTR(user,?)>0 LIMIT ?,?', [user, limit1, limit2])
    let sum = await connection.execute('SELECT COUNT(*) as sum FROM `user` where state=0 and INSTR(user,?)>0', [user])

    //结束连接
    await connection.end()

    //返回结果
    ctx.body = returnjson('成功', { list: rows, total: sum[0] })
  }

  // 用户-删除
  static async deluser(ctx) {
    //获取到参数
    const { id } = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    const [rows] = await connection.execute('DELETE FROM `user` where id=?', [id])

    //结束连接
    await connection.end()

    //返回结果
    if (rows.affectedRows == 0) {
      ctx.body = returnjson('失败')
    } else {
      ctx.body = returnjson('成功', rows[0])
    }
  }

  // 用户-修改审核状态
  static async userstate(ctx) {
    //获取到参数
    const { id, state } = ctx.request.body

    //连接数据库
    const connection = await mysql.createConnection(config.mysqlDB)

    //执行查询条件
    const [rows] = await connection.execute('UPDATE `user` SET state=? where id=?', [state, id])

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

