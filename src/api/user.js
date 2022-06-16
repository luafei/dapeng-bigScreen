import request from '@/utils/request'
import Qs from 'qs'

/**
 * 登录接口
 * @param params 
 */
export const login = (params) =>
    request({
        url: '/permit/loginUser',
        method: 'get',
        params
    })

/**
 * 获取用户信息
 * @param id 主键ID
 */
export const getUserInfo = (id) =>
    request({
        url: '/permit/queryUserInfo',
        method: 'get',
        params: {
            id
        }
    })

/**
 * 生成图形验证码
 */
export const getPicCode = (params) =>
    request({
        url: '/permit/createPicCode',
        method: 'get',
        params,
        responseType: 'arraybuffer'
    })

/**
 * 服务器随机数
 * 
 */
export function getStep3() {
    return request({
        url: '/bjca/getStep3',
        method: 'get',
    })
}

/**
 * 手工推送预警信息
 * 
 */
export function getStep910(data) {
    return request({
        url: '/bjca/getStep910',
        data,
        method: 'post',
        headers: {
            'Content-Type': "application/json",
        },
    })
}

/**
 * 获取用户信息登陆
 * 
 */
export function queryUserBySfId(params) {
    return request({
        url: '/bjca/queryUserBySfId',
        method: 'get',
        params
    })
}