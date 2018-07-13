import { GET_POSTSLIST, GET_POSTSRCMDLIST } from '../mutations'

const state = {
  postsList: [],
  postsRcmdList:[]
}

const mutations = {
  [GET_POSTSLIST](state, payload) {
    console.log('这里是post模块的mutations')
    console.log(this)
    state.postsList = payload
  },
  [GET_POSTSRCMDLIST](state,payload) {
    state.postsRcmdList = payload
  }
}

export default {
  state, mutations
}