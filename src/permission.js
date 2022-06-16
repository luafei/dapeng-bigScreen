import router from './router'
import store from '@/store'
import { getToken } from '@/utils/auth' // getToken from cookie
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // 白名单 , '/DemonstrationSection' '/govService/businessanalysis', '/govService'
router.beforeEach((to, from, next) => {
    NProgress.start() // start progress bar
    function dealRoot() {
        let path = store.getters.addRouters[0] && store.getters.addRouters[0].children[0].path
        next({ path })
        NProgress.done()
    }
    if (to.query.id && to.query.token) { //绕过登录页面
        store.dispatch('SetIdToken', { id: to.query.id, token: to.query.token }).then(res => {})
    }
    if (getToken()) {
        if (to.path == '/login' && store.getters.addRouters.length > 0) {
            dealRoot()
                // next({ path: '/' })
            NProgress.done()
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch('GetUserInfo').then(res => {
                    store.dispatch('GenerateRoutes', { roles: store.getters.roles }).then(() => {
                        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                        if (store.getters.addRouters.length === 0) {
                            store.dispatch('FedLogOut').then(() => {
                                next({ path: '/login' })
                                Message({
                                    message: '没有访问权限，请联系管理员。',
                                    type: 'error',
                                    duration: 5 * 1000
                                })
                            })
                        }
                        if (to.path == '/login' || to.path == '/') {
                            dealRoot()
                            return
                        }
                        next({...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                    })
                }).catch((err) => {
                    store.dispatch('FedLogOut').then(() => {
                        next({ path: '/login' })
                    })
                })
            } else {
                if (to.path == '/') {
                    dealRoot()
                    return
                }
                next()
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach((to, from) => {
    NProgress.done() // finish progress bar
})