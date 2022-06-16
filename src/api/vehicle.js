import request from '@/utils/request'

/**
 * 查询车辆预警信息
 * @param {*} params 
 */
export function getVehicleAlarmByPlateNo(params) {
    return request({
        url: '/traffic/queryVehicleAlarmByPlateNo',
        method: 'get',
        params
    })
}

/**
 * 查询车辆报警分析详情
 * @param {*} params 
 */
export function getVehicleAlarmAnalyseDetail(params) {
    return request({
        url: '/traffic/queryVehicleAlarmAnalyseDetail',
        method: 'get',
        params
    })
}

/**
 * 工地车流量时间分布
 * @param {*} params 
 */
export function getBuildingSiteTrafficFlow(params) {
    return request({
        url: '/traffic/queryBuildingSiteTrafficFlow',
        method: 'get',
        params
    })
}

/**
 * 查询公交线路
 * @param {*} plateNo -公交车牌号 
 */
export function getBusLineName(plateNo) {
    return request({
        url: '/bus/queryBusLineName',
        method: 'get',
        params: {
            plateNo: plateNo
        }
    })
}