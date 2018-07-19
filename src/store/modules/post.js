import { SET_POSTSLIST, SET_NOWPAGE } from '../mutations'

const state = {
  postsList: [],
  nowPage: 1,
  offset: 3
}

const mutations = {
  [SET_POSTSLIST](state, payload) {
    state.postsList = payload
    state.nowPage = 1
  },
  [SET_NOWPAGE](state, page) {
    state.nowPage = page
  }
}

const getters = {
  totalPost(state) {
    return state.postsList.length
  },
  nowPost(state) {
    return state.nowPage
  },
  //返回当前页面显示的3个post数组
  currentPostsList(state, getters) {
    let begin = (state.nowPage - 1) * 3
    return state.postsList.slice(begin, begin + 3)
  },

}

export default {
  state, mutations, getters
}