import { GET_TAGSLIST, SET_TARGETTAG} from '../mutations'

const state = {
  tagsList: [],
  currentTag:{}
}

const mutations = {
  [GET_TAGSLIST](state,payload){

    state.tagsList = payload
    state.currentTag = state.tagsList[0]
  },
  [SET_TARGETTAG](state,targetTag){
    state.currentTag = targetTag
  }
}

const getters = {
  tagsList(state){
    return state.tagsList
  },
  getCurrentTag(state){
    return state.currentTag
  }
}

export default {
  state, mutations, getters
}