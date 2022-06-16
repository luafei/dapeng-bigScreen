import request from '@/utils/request'

/**
 * 查询电子围栏列表
 * @param {string} name 
 */
export const getElectronicFence = ({ name, vehicleType }) =>
    request({
        url: '/traffic/queryElectronicFence',
        method: 'get',
        params: {
            name,
            vehicleType
        }
    })

/**
 * 新增或修改电子围栏列表
 * @param {*} data 
 */
export const addElectronicFence = (data) =>
    request({
        url: '/traffic/saveElectronicFence',
        method: 'post',
        data
    })

/**
 * 删除电子围栏列表
 * @param {string} name 
 */
export const delElectronicFence = ({ name, vehicleType }) =>
    request({
        url: '/traffic/deleteElectronicFence',
        method: 'get',
        params: {
            name,
            vehicleType
        }
    })