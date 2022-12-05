import request from '@/utils/request'

/**
 * 道路字典数据
 * @param {*} params 
 */
export function getSiteName(params) {
    return request({
        url: '/traffic/siteName',
        method: 'get',
        params
    })
}

/**
 * 车辆类型字典数据
 */
export function getVehicleTypeList() {
    return request({
        url: '/traffic/queryVehicleType',
        method: 'get'
    })
}


export function getWarnginTypeList(params) {
    return request({
        url: '/traffic/alertType',
        method: 'get',
        params
    })
}

/**
 * 获取车辆列表
 */
export function getVehicleList() {
    return request({
        url: '/traffic/getCarList',
        method: 'get'
    })
}

/**
 * 获取沙滩列表
 */
export function getBeachList() {
    return request({
        url: '/beach/queryBeachList',
        method: 'get'
    })
}
/**
 * 获取热力图沙滩名称
 * 
 */
export function getHotMapBeachList(params) {
    return request({
        url: '/beach/queryHotMapBeachList',
        method: 'get',
        params
    })
}
/**
 * 获取沙滩列表
 */
export function getParkingList() {
    return request({
        url: '/beach/queryParkingList',
        method: 'get'
    })
}