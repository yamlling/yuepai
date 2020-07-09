import request from '@/utils/request'

const URL_PORT = process.env.VUE_APP_BASE_PORT

//用户列表
export function userlist(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/user/userlist",
        data: params,
    })
}

//用户待审核列表
export function userliststate(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/user/userliststate",
        data: params,
    })
}

//用户-删除
export function deluser(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/user/deluser",
        data: params,
    })
}

//用户-编辑
export function reInfo(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/user/reInfo",
        data: params,
    })
}

//用户-审核
export function userstate(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/user/userstate",
        data: params,
    })
}



