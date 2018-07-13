import { GET_TAGSLIST } from '../mutations'

const state = {
  tagsList: []
}

const mutations = {
  [GET_TAGSLIST](state,payload){
    console.log('这里是tag模块的mutations')
    console.log(this)
    state.tagsList = payload
  },
  // [UPDATE_EDITINGARTICLETAG](state,payload){

  // }
}

export default {
  state, mutations
}