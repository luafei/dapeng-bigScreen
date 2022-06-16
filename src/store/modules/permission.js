import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.perms判断是否与当前用户权限匹配
 * @param perms
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return false
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param perms
 */
function filterAsyncRouter(routes, roles) {
    const res = []
    routes.forEach(route => {
        const r = {...route }
        if (hasPermission(roles, r)) {
            if (r.children) {
                r.children = filterAsyncRouter(r.children, roles)
            }
            res.push(r)
        }
    })
    return res
}

export const filterRoles = (roles) => {
    const res = []
    roles.forEach(role => {
        res.push(role.roleName)
        role.roleResources.forEach(resouce => {
            res.push(resouce.webUrl)
        });
    })
    return res
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                let accessedRouters
                let roles = filterRoles(data.roles)
                if (roles.includes('admin')) {
                    accessedRouters = asyncRouterMap
                } else {
                    accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                }
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}

export default permission