import request from '@/utils/request'
/* 示范路段的api接口 */

/**
 * 交通运行泥头车页面工地总体指标
 * @param {*} params 
 */
 export function getQueryNTCTotalIndex(params) {
    return request({
        url: '/traffic/queryNTCTotalIndex',
        method: 'get',
        params
    })
}

/**
 * 交通运行泥头车页面各工地排放情况
 * @param {*} params 
 */
 export function getQueryNTCSiteDischarge(params) {
    return request({
        url: '/traffic/queryNTCSiteDischarge',
        method: 'get',
        params
    })
}

/**
 *交通运行泥头车页面泥头车详情查看接口
 * @param {*} params 
 */
 export function getQueryNTCDetailInfo(params) {
    return request({
        url: '/traffic/queryNTCDetailInfo',
        method: 'get',
        params
    })
}

/**
 * 交通运行泥头车页面工地电子联单分析
 * @param {*} params 
 */
 export function getQueryNTCSiteEbillInfo(params) {
    return request({
        url: '/traffic/queryNTCSiteEbillInfo',
        method: 'get',
        params
    })
}

/**
 * 交通运行泥头车页面备案车辆企业列表查询
 * @param {*} params 
 */
 export function getQueryNTCRecordsCompanyList(params) {
    return request({
        url: '/traffic/queryNTCRecordsCompanyList',
        method: 'get',
        params
    })
}

/**
 * 交通运行泥头车页面备案车辆企业详情查询
 * @param {*} params 
 */
 export function getQueryNTCRecordsCompanyDetail(params) {
    return request({
        url: '/traffic/queryNTCRecordsCompanyDetail',
        method: 'get',
        params
    })
}

/**
 * 交通运行泥头车页面工地排放情况详情查询
 * @param {*} params 
 */
 export function getQueryNTCSiteDischargeDetail(params) {
    return request({
        url: '/traffic/queryNTCSiteDischargeDetail',
        method: 'get',
        params
    })
}

/**
 * 交通运行泥头车页面预警车辆列表
 * @param {*} params 
 */
 export function getQueryNTCAlarmList(params) {
    return request({
        url: '/traffic/queryNTCAlarmList',
        method: 'get',
        params
    })
}


/**
 * 点击地图查看该车辆所属公司
 * @param {*} params 
 */
 export function getQueryNTCAlarmMap(params) {
    return request({
        url: '/traffic/queryNTCAlarmMap',
        method: 'get',
        params
    })
}

/**
 * 交通运行泥头车页面查询历史车辆预警
 * @param {*} params 
 */
 export function getQueryNTCAlarmHistory(params) {
    return request({
        url: '/traffic/queryNTCAlarmHistory',
        method: 'get',
        params
    })
}


/**
 * 交通运行泥头车页面消纳场落图详情查询
 * @param {*} params 
 */
 export function getQueryNTCDisposeMapDetail(params) {
    return request({
        url: '/traffic/queryNTCDisposeMapDetail',
        method: 'get',
        params
    })
}

/**
 * 查询车辆总体指标
 * @param {*} params
 */
export function getQueryNTCVehicleTotalIndex(params) {
    return request({
        url: '/traffic/queryNTCVehicleTotalIndex',
        method: 'get',
        params
    })
}

