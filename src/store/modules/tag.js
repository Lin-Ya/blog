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

export default {
  state, mutations
}