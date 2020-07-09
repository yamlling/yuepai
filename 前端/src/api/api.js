import request from '@/utils/request'

const URL_PORT = process.env.VUE_APP_BASE_PORT

//上传
export function upload(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/upload",
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

//登陆
export function login(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/user/login",
        data: params,
    })
}

//注册
export function register(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/user/register",
        data: params,
    })
}

//预约拍照-新增
export function addYuepai(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/yue/addYuepai",
        data: params,
    })
}

//预约拍照-列表
export function listYuepai(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/yue/listYuepai",
        data: params,
    })
}

//邀约-点赞
export function zanYuepai(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/yue/zanYuepai",
        data: params,
    })
}

//邀约-打赏
export function dashang(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/yue/dashang",
        data: params,
    })
}

//立即邀约
export function nowYuepai(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/yue/nowYuepai",
        data: params,
    })
}

//作品-添加
export function addWorks(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/yue/addWorks",
        data: params,
    })
}

//作品-列表
export function listWorks(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/yue/listWorks",
        data: params,
    })
}

//作品-赞
export function zanWorks(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/yue/zanWorks",
        data: params,
    })
}

//关注
export function guanzhu(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/yue/guanzhu",
        data: params,
    })
}

//点赞量
export function userZan(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/user/userZan",
        data: params,
    })
}

//关注量
export function userGuanzhu(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/user/userGuanzhu",
        data: params,
    })
}

//打赏量
export function userPrice(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/user/userPrice",
        data: params,
    })
}

//我收到的邀约-列表
export function toMe(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/user/toMe",
        data: params,
    })
}

//我发出的邀约-列表
export function formMe(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/user/formMe",
        data: params,
    })
}

//我收到的邀约-修改状态
export function changeState(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/user/changeState",
        data: params,
    })
}

//我发出的邀约-删除
export function delState(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/user/delState",
        data: params,
    })
}

//修改我的资料
export function reInfo(params) {
    return request({
        method: "post",
        url: URL_PORT + "api/user/reInfo",
        data: params,
    })
}


