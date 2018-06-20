import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import MarkdownEditor from '@/views/posts/MarkdownEditor'
import Posts from '@/views/posts/Posts'
import Article from '@/views/posts/Article'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts,
      children: [
        {
          path: 'mdeditor',
          name: 'MarkdownEditor',
          component: MarkdownEditor
        },{
          path: 'article',
          name: 'Article',
          component: Article
        }
      ]
    }
  ]
})
