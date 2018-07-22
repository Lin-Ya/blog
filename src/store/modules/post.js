import { SET_POSTSLIST, SET_CURRENTPOST,SET_NOWPAGE } from '../mutations'

const state = {
  postsList: [],
  nowPage: 1,
  offset: 3,
  currentPost:{}  //用于存放当前浏览的post
}

const mutations = {
  [SET_POSTSLIST](state, payload) {
    state.postsList = payload
    state.nowPage = 1
  },
  [SET_NOWPAGE](state, page) {
    state.nowPage = page
  },
  [SET_CURRENTPOST](state,payload){
    state.currentPost = payload
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
  getCurrentPostsList(state) {
    let begin = (state.nowPage - 1) * 3
    return state.postsList.slice(begin, begin + 3)
  },
  //返回当前页面请求的post博文
  getCurrentPost(state){
    let post = {}
    for(let key in state.currentPost.attributes){
      post[key] = state.currentPost.attributes[key]
    }
    post.id = state.currentPost.id
    post.createdAt = state.currentPost.createdAt
    return post
  }

}

export default {
  state, mutations, getters
}