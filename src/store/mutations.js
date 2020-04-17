const state = {
  loading: false,
  prevUrlName: null,
  permissionList: [],
  columnMenu: null
}
// getters
const getters = {
  getPermission: state => {
    let permission = {}
    for (let i = 0; i < state.permissionList.length; i++) {
      permission[state.permissionList[i]] = state.permissionList[i]
    }
    return permission
  },
  permissionList: state => {
    return state.permissionList
  },
  columnMenu: state => {
    if (state.columnMenu) {
      return state.columnMenu.filter(res => res.status === 1)
    } else {
      return state.columnMenu
    }
  }
}
const mutations = {
  // 清空
  emptyState (state) {
    state = {}
  },
  // 全局加载中
  loading (state, val) {
    state.loading = val
  },
  // 清除url
  clearPrevUrlName (state, val) {
    state.prevUrlName = val
  },
  // 保存url
  prevUrlName (state, val) {
    state.prevUrlName = val
  },
  // 权限列表
  permissionList (state, val) {
    state.permissionList = val
  },
  // 传播力监测菜单
  columnMenu (state, val) {
    state.columnMenu = val
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations
}
