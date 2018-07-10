import AV from '@/lib/leancloud/leancloud'
import { GET_ARTICLE, CLEAR_ARTICLE, EDIT_ARTICLE, NEW_ARTICLE ,SAVE_ARTICLE} from '../mutations'

const state = {
  title: '',
  content: '',
  // cover: '',
  tags: ''
}

const mutations = {
  [GET_ARTICLE](state) {

  },
  [CLEAR_ARTICLE](state) {

  },
  [EDIT_ARTICLE](state) {

  },
  [NEW_ARTICLE](state) {

  },
}

export default {
  state, mutations
}