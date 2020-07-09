module.exports = function returnjson(msg = '成功', data = [], code = 200) {
    if (msg != '成功') {
        code = 300
    }
    return {
        code: code,
        message: msg,
        data: data
    }
}