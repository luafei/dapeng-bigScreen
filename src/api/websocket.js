import request from '@/utils/request'

/**
 * 开启获取websocket数据
 * 
 */
export function startWebsocket(){
    return request({
        url: '/openMQListen',
        method: 'get'
    })
}

/**
 * 暂停获取websocket数据
 * 
 */
export function stopWebsocket(){
    return request({
        url: '/closeMQListen',
        method: 'get'
    })
}

/**
 * 删除正在推送的卡口编号
 * @param {*} code 
 */
export function delPushCrossingIndexCode(code){
    return request({
        url: '/traffic/deletePushCrossingIndexCode',
        method: 'get',
        params: {
            code
        }
    })
}