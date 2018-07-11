import AV from '@/lib/leancloud/leancloud'
import { GET_ARTICLE, CLEAR_ARTICLE, PUSH_ARTICLE } from '../mutations'


const state = {
  title: '',
  content: '',
  cover: '',
  tags: ''
}

const mutations = {
  [GET_ARTICLE](state) {

  },
  [PUSH_ARTICLE](state, payload) {

  },
  [CLEAR_ARTICLE](state) {

  },
}

export default {
  state, mutations
}