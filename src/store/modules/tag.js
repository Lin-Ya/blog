import { GET_TAGSLIST } from '../mutations'

const state = {
  tagsList: []
}

const mutations = {
  [GET_TAGSLIST](state,payload){
    console.log(payload)
    state.tagsList = payload
  },
  // [UPDATE_EDITINGARTICLETAG](state,payload){

  // }
}

const getters = {
  tagsList(state){
    return state.tagsList
  }
}

export default {
  state, mutations, getters
}