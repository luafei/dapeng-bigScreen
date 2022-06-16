const map = {
    state: {
        carNumObj: {
            truckGps: '',
            carGps: '',
            bus: '',
            taxi: ''
        }
    },
    mutations: {
        SET_CARNUMOBJ(state, data) {
            state.carNumObj[data.type] = data.count
        }
    },
    actions: {
        GetCarNum({ commit }, data) {
            commit('SET_CARNUMOBJ', data)
        }
    }
}

export default map