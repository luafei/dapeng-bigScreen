import request from '@/utils/request'

/**
 * 预警确认
 * @param {string} id 
 */
export function affirmAlarm(id) {
    return request({
        url: '/alarm/affirmAlarm',
        method: 'get',
        params: {
            id
        }
    })
}

/**
 * 手工推送预警信息
 * @param {string} id 
 */
export function pushAlarm(id) {
    return request({
        url: '/alarm/pushAlarm',
        method: 'get',
        params: {
            id
        }
    })
}