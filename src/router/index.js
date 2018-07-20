import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/Home'
import MarkdownEditor from 'views/components/MarkdownEditor'
import Article from 'views/components/Article'
import Account from 'views/components/Account'
import Tags from 'views/components/Tags'
import PostsList from 'views/posts/PostsList'



Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          name: 'PostsList',
          component: PostsList
        },
        {
          path: '/article/:title',
          name: 'Article',
          component: Article,
          props: true
        },
        {
          path: '/mdeditor',
          name: 'Mdeditor',
          component: MarkdownEditor,
          props: true
        },
        {
          path: '/tags',
          name: 'Tags',
          component: Tags,
          props: true
        },
        {
          path: '/account',
          name: 'Account',
          component: Account
        }
      ]
    },
  ]
})

export default router