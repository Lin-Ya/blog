import { GET_ARTICLE, CLEAR_ARTICLE, PUSH_ARTICLE, SET_TEMPPOSTARTICLE, CLEAR_TEMPPOSTARTICLE} from '../mutations'


const state = {
  title: '',
  content: '',
  cover: '',
  tags: []
}

const mutations = {
  [GET_ARTICLE](state) {

  },
  [PUSH_ARTICLE](state, payload) {

  },
  [CLEAR_ARTICLE](state) {

  },
  
  //用户处理缓存待上传的article,开始筛选tag
  [SET_TEMPPOSTARTICLE](state,article){
    Object.assign(state,article)
  },
  [CLEAR_TEMPPOSTARTICLE](state){
    
  }
}

export default {
  state, mutations
}