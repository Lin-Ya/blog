import { LOGIN_USER, LOGOUT_USER } from '../mutations'


const state = {
  currentUser: {},
  isLogin: false
}

const mutations = {
  [LOGIN_USER](state, loginedUser) {
    console.log('调用mutations')
    console.log(loginedUser)
    // state.username = data.username,
    // state.id = data.id,
    // state.isLogin = true
  },
  [LOGOUT_USER](state){
    state.username = '',
    state.id = '',
    isLogin = false
  }
}

export default {
  state,
  mutations
}