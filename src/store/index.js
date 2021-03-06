import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permission from './modules/permission'
import app from './modules/app'
import map from './modules/map'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        permission,
        app,
        map
    },
    getters
})

export default store