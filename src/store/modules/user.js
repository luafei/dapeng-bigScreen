import { login, getUserInfo, getPicCode, getStep3, getStep910, queryUserBySfId } from '@/api/user'
import AES from '@/utils/AES'
import { setToken, getToken, removeToken } from '@/utils/auth'

const user = {
    state: {
        userName: '',
        token: getToken(),
        roles: [],
        kId: localStorage.getItem('kId'),
        picCode: ''
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_KID(state, kId) {
            state.kId = kId
            localStorage.setItem('kId', kId)
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_NAME: (state, name) => {
            state.userName = name
        },
        SET_PIC_CODE: (state, picCode) => {
            state.picCode = picCode
        },
        SET_UKEY_SERTVERS: (state, picCode) => {
        },
    },
    actions: {
        // 用户名登录
        LoginByUsername({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise(async (resolve, reject) => {
                try {
                    let postData = {
                        petName: username,
                        keyName: AES.encrypt(userInfo.password),
                        code: userInfo.code,
                        flag: userInfo.flag
                    }
                    const { data } = await login(postData)
                    const token = data.data.tokenId
                    commit('SET_KID', data.data.id)
                    commit('SET_TOKEN', token)
                    setToken(token)
                    resolve(data)
                } catch (error) {
                    reject(error)
                }
            })
        },

        getStep3({ commit }) {
            return new Promise(async resolve => {
                const { data } = await getStep3()
                resolve(data)
            })
        },

        getStep910({ commit }, params) {
            return new Promise(async resolve => {
                const { data } = await getStep910(params)
                resolve(data)
            })
        },

        queryUserBySfId({ commit }, params) {
            return new Promise(async resolve => {
                try {
                    const { data } = await queryUserBySfId(params)
                    const token = data.data.tokenId
                    commit('SET_KID', data.data.id)
                    commit('SET_TOKEN', token)
                    setToken(token)
                    resolve(data)
                } catch (error) {
                    reject(error)
                }
            })
        },


        // 获取用户信息
        GetUserInfo({ commit, state }) {
            return new Promise(async (resolve, reject) => {
                try {
                    const { data } = await getUserInfo(state.kId)
                    const { userRoles, userName } = data.data
                    commit('SET_ROLES', userRoles)
                    commit('SET_NAME', userName)
                    resolve(data)
                } catch (error) {
                    reject(error)
                }
            })
        },
        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resolve()
            })
        },

        //獲取圖形碼
        GetPicCode({ commit }, params) {
            return new Promise(async (resolve) => {
                const res = await getPicCode(params)
                commit('SET_PIC_CODE', '')
                resolve(res)
            })
        },

        SetIdToken({ commit }, { id, token }) {
            return new Promise(async (resolve) => {
                commit('SET_KID', id)
                commit('SET_TOKEN', token)
                setToken(token)
                resolve({ id, token })
            })
        },
    }
}

export default user