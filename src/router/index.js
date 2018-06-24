import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import MarkdownEditor from '@/views/posts/MarkdownEditor'
import Article from '@/views/posts/Article'
import Posts from '@/views/posts/Posts'
import PostsList from '@/views/posts/PostsList'
import Tags from '@/views/posts/Tags'



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home,
    //   children: [
    //     {
    //       path: 'mdeditor',
    //       name: 'MarkdownEditor',
    //       component: MarkdownEditor
    //     },{
    //       path: 'article',
    //       name: 'Article',
    //       component: Article
    //     }
    //   ]
    // }
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
          path: '',
          name: 'PostsList',
          component: PostsList
        },
        {
          path: '/article/:id',
          name: 'Article',
          component: Article,
          props: true
        },
        {
          path: 'mdeditor',
          name: 'Mdeditor',
          component: MarkdownEditor
        },
        {
          path: 'tags',
          name: 'Tags',
          component: Tags
        }
      ]
    }
  ]
})
