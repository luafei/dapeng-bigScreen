import { getSiteName, getVehicleTypeList, getMapVideoPoint, getBeachList, getParkingList,getHotMapBeachList } from '@/api/dicData'

const app = {
    state: {
        roadList: [], //道路
        direactionRoadList: [], //出入口
        vehicleTypeList: [], //车辆类型字典
        beachList: [], //沙滩
        parkingList: [] //停车场
    },
    mutations: {
        SET_ROADLIST(state, roadList) {
            state.roadList = roadList
        },
        SET_DIRECTIONROADLIST(state, direactionRoadList) {
            state.direactionRoadList = direactionRoadList
        },
        SET_VEHICLETYPELIST(state, vehicleTypeList) {
            state.vehicleTypeList = vehicleTypeList
        },
        SET_BEACHLIST(state, beachList) {
            state.beachList = beachList
        },
        SET_PARKINGLIST(state, parkingList) {
            state.parkingList = parkingList
        }
    },
    actions: {
        GetRaodList({ commit }, roadFlag) {
            return new Promise(async(resolve, reject) => {
                try {
                    let postData = {
                        roadFlag
                    }
                    const res = await getSiteName(postData);
                    const roadList = []
                    res.data.data.forEach(item => {
                        roadList.push({
                            label: item.roadName,
                            value: item.roadCode
                        })
                    })
                    commit('SET_ROADLIST', roadList)
                } catch (error) {
                    reject(error)
                }
            })
        },
        GetDirectionRaodList({ commit }, roadFlag) {
            return new Promise(async(resolve, reject) => {
                try {
                    let postData = {
                        roadFlag
                    }
                    const direactionRoadList = [{
                        label: '全部',
                        value: 'all'
                    }]
                    const res = await getSiteName(postData);
                    res.data.data.forEach(item => {
                        direactionRoadList.push({
                            label: item.tollName,
                            value: item.tollName
                        })
                    })
                    commit('SET_DIRECTIONROADLIST', direactionRoadList)
                    resolve(direactionRoadList)
                } catch (error) {
                    reject(error)
                }
            })
        },
        GetVehicleTypeList({ commit }) {
            return new Promise(async(resolve, reject) => {
                try {
                    const res = await getVehicleTypeList()
                    const vehicleTypeList = [{
                        value: "all",
                        label: "全部"
                    }]
                    res.data.data.forEach(item => {
                        vehicleTypeList.push({
                            label: item.vehicleTypeName,
                            value: item.vehicleTypeCode
                        })
                    })
                    commit('SET_VEHICLETYPELIST', vehicleTypeList)
                } catch (error) {
                    reject(error)
                }
            })
        },
        GetBeachList({ commit }) {
            return new Promise(async(resolve, reject) => {
                try {
                    const res = await getHotMapBeachList()
                    const beachList = []
                    res.data.data.forEach(item => {
                        beachList.push({
                            label: item,
                        })
                    })
                    commit('SET_BEACHLIST', beachList)
                } catch (error) {
                    reject(error)
                }
            })
        },
        GetparkingList({ commit }) {
            return new Promise(async(resolve, reject) => {
                try {
                    const res = await getParkingList()
                    const parkingList = []
                    res.data.data.forEach(item => {
                        parkingList.push({
                            label: item,
                            value: item
                        })
                    })
                    commit('SET_PARKINGLIST', parkingList)
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
}

export default app