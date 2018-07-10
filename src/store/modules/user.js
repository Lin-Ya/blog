import { LOGIN_INIT, LOGIN_USER, LOGOUT_USER } from '../mutations'
import getAVUser from "@/lib/leancloud/getAVUser.js";

const state = {
  currentUser: {},
  isLogin: false
}

const mutations = {
  //登录初始化
  [LOGIN_INIT](state, payload) {
    Object.assign(state, payload)
  },

  //用户登录，登录完成后改变state并把登录信息存到localStorage
  [LOGIN_USER](state, loginedUser) {
    console.log('调用mutations')
    console.log(loginedUser)
    state.isLogin = true
    Object.assign(state.currentUser, getAVUser())
    localStorage.setItem('user', JSON.stringify(state))
  },

  [LOGOUT_USER](state) {
    state.currentUser = {}
    state.isLogin = false
    localStorage.setItem('user', JSON.stringify(state))
    console.log('已经退出了')
    window.location.reload()
  }
}

export default {
  state,
  mutations
}