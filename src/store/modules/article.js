import { SET_ARTICLE, CLEAR_ARTICLE, PUSH_ARTICLE, SET_TEMPPOSTARTICLE, CLEAR_TEMPPOSTARTICLE} from '../mutations'


const state = {
  title: '',
  content: '',
  tags: [],
}

const mutations = {
  [SET_ARTICLE](state,article) {
    state.title = article.attributes.title
    state.content = article.attributes.content
    state.tags = article.attributes.tags
  },
  [PUSH_ARTICLE](state, payload) {

  },
  [CLEAR_ARTICLE](state) {
    state.title = ''
    state.content = ''
    state.tags = []
  },

}

export default {
  state, mutations
}