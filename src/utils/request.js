import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.NODE_ENV == 'production' ? '/' : '', // 开发环境时本地配置proxy跨域，生产环境时补全接口路径
    timeout: 60000, // request timeout
    withCredentials: false
})

service.interceptors.request.use(
    config => {

        // if (store.getters.token) {
        //     config.headers['token'] = getToken()
        // }
        config.transformRequest = [function (data, headers) {
            if (store.getters.token) {
                headers['token'] = getToken()
            }

            //transformRequest方法会影响post请求data取值
            if (data && Object.keys(data).length && data.strUserCert) {
                return JSON.stringify(data)
            }
        }]
        return config
    },
    error => {
        Promise.reject(error)
    }
)

const whileList = ["/openMQListen", "/closeMQListen", '/createPicCode'] //

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.status && res.status !== 0 && !whileList.includes(response.config.url)) {
            Message({
                message: res.data || res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.data || res.msg || 'Error'))
        } else {
            return response
        }
    },
    error => {
        Promise.reject(error)
    }
)

service.CancelToken = axios.CancelToken

export default service