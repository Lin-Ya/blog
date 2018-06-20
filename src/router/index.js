import Vue from 'vue'
import Router from 'vue-router'
import MarkdownEditor from '@/components/MarkdownEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MarkdownEditor',
      component: MarkdownEditor
    }
  ]
})
