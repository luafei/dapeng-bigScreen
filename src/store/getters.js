const getters = {
    token: state => state.user.token,
    roles: state => state.user.roles,
    userName: state => state.user.userName,
    addRouters: state => state.permission.addRouters,
    app: state => state.app,
    permission: state => state.permission,
    carNumObj: state => state.map.carNumObj
}

export default getters