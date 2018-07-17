import { SET_POSTSLIST, SET_NOWPAGE } from '../mutations'

const state = {
  postsList: [],
  nowPage: 1,
}

const mutations = {
  [SET_POSTSLIST](state, payload) {
    console.log('这里是post模块的mutations')
    console.log(this)
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
  now(state) {
    return state.nowPage
  },
  currentPostsList(state,getters) {
    return state.nowPage === 1 ? state.postsList.slice(0, 3) : state.postsList.slice(getters.now*2, getters.now*2 + 3)
  }
}

export default {
  state, mutations, getters
}