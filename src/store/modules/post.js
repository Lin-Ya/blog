import { SET_POSTSLIST, SET_NOWPAGE, SET_POSTSLIST } from '../mutations'

const state = {
  postsList: [],
  postsRcmdList: [],
  nowPage: 1,
}

const mutations = {
  [SET_POSTSLIST](state, payload) {
    state.postsList = payload
  },
  [SET_NOWPAGE](state, page) {
    state.nowPage = page
  },
  [SET_POSTSLIST](state, payload) {
    state.postsRcmdList = payload
  }
}

const getters = {
  totalPost(state) {
    return state.postsList.length
  },
  now(state) {
    return state.nowPage
  },
  //返回当前页面显示的3个post数组
  currentPostsList(state, getters) {
    return state.nowPage === 1 ? state.postsList.slice(0, 3) : state.postsList.slice(getters.now * 2, getters.now * 2 + 3)
  }
}

export default {
  state, mutations, getters
}