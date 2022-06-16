import request from '@/utils/request'

/**
 * 获取监控录像链接
 * @param {*} params 
 */
export function getLiveUrl(params){
    return request({
        url: '/traffic/queryHKVideoUrl',
        method: 'get',
        params
    })
}

/**
 * 详情获取视频链接
 * @param {*} params 
 */
export function getDetailLiveUrl(params){
    return request({
        url: '/traffic/queryHKVideoUrlByCrossCode',
        method: 'get',
        params
    })
}

/**
 * 查询视频轮播编码
 * @param {*} 查询视频轮播编码
 */
export function getGovNetWorkVideoCodes(){
    return request({
        url: '/gov/queryGovNetWorkVideoCodes',
        method: 'get',
    })
}
