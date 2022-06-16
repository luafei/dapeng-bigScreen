import request from '@/utils/request'

/**
 * 沙滩统计
 * 
 */
export function getBeachStatistics() {
    return request({
        url: '/beach/queryBeachStatistics',
        method: 'get',
    })
}

/**
 * @param {*} params 
 */
export function getBeachdialog(params) {
    return request({
        url: '/beach/queryBeachStatisticsDetail',
        method: 'get',
        params
    })
}

/**
 * 沙滩实时客流量
 */
export function getCurrentBeachPassengers() {
    return request({
        url: '/beach/queryCurrentBeachPassengers',
        method: 'get'
    })
}

/**
 * 沙滩实时客流量变化趋势
 * @param {*} params 
 */
export function getBeachPassengerDiagram(params) {
    return request({
        url: '/beach/queryBeachPassengerDiagram',
        method: 'get',
        params
    })
}

/**
 * 沙滩停车场今日累计流量查询
 * @param {*} params 
 */
export function getTodayParkFlow(params) {
    return request({
        url: '/beach/queryTodayParkFlow',
        method: 'get',
        params
    })
}

/**
 * 停车场流量
 * @param {*} params 
 */
export function getParkFlowDistribution(params) {
    return request({
        url: '/beach/queryParkFlowDistribution',
        method: 'get',
        params
    })
}

/**
 * 获取沙滩视频点位
 */
export function getBeachVideoList() {
    return request({
        url: '/beach/queryBeachVideoList',
        method: 'get'
    })
}

/**
 * 获取今日停车场车辆来源地排名
 * @param {*} params 
 */
export function getParkVehicleSourceRanking(params) {
    return request({
        url: '/beach/queryParkVehicleSourceRanking',
        method: 'get',
        params
    })
}

/**
 * 获取沙滩落点数据
 */
export function getBeachDicList() {
    return request({
        url: '/beach/queryBeachDicList',
        method: 'get'
    })
}

/**
 * 获取沙滩落点数据详情
 * @param {*} id 
 */
export function getBeachDicDetail(id, cancelToken) {
    return request({
        url: '/beach/queryBeachDicDetail',
        method: 'get',
        params: {
            id
        },
        cancelToken
    })
}

/**
 * 查询沙滩预警数据
 */
export function getBeachAlarmData() {
    return request({
        url: '/beach/queryBeachAlarmData',
        method: 'get',
    })
}

/**
 * 获取停车场视频落点数据
 */
export function getParkVideoData() {
    return request({
        url: '/beach/queryParkVideoData',
        method: 'get',
    })
}

/**
 * 获取停车场地图落点数据
 */
export function getParkMapData() {
    return request({
        url: '/beach/queryParkMapData',
        method: 'get',
    })
}

/**
 * 查询沙滩周边视频或道路视频
 * @param {Object} params
 * @param {string} params.beach
 * @param {string} params.videoType
 * @param {string} params.typeName
 */
export function getBeachNearbyOrRoadVideo(params) {
    return request({
        url: '/beach/queryBeachNearbyOrRoadVideo',
        method: 'get',
        params
    })
}

/**
 * 查询沙滩实时环境
 */
export function getBeachCurrentEnvironment() {
    return request({
        url: '/beach/queryBeachCurrentEnvironment',
        method: 'get'
    })
}

/**
 * 查询沙滩预警排名
 */
export function getBeachAlarmRanking() {
    return request({
        url: '/beach/queryBeachAlarmRanking',
        method: 'get'
    })
}

/**
 * 查询沙滩预警
 */
export function getBeachAlarm() {
    return request({
        url: '/beach/queryBeachAlarm',
        method: 'get'
    })
}

/**
 * 获取热力图沙滩名称
 * 
 */
export function getHotMapBeachList() {
    return request({
        url: '/beach/queryHotMapBeachList',
        method: 'get'
    })
}
/**
 * 获取热力图打点数据
 */
export function getHotmappercentlist() {
    return request({
        url: '/beach/queryHotMapPercentList',
        method: 'get'
    })
}