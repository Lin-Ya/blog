import * as mutations from './mutations'
import AV from "@/lib/leancloud/leancloud.js";
import { rejects } from 'assert';
import { debug } from 'util';


const actions = {
  //init 
  initState({ commit }) {
    let state = localStorage.getItem('user')
    if (state) {
      state = JSON.parse(state)
      commit('LOGIN_INIT', state)
    }
    this.dispatch('getTagsList')
    this.dispatch('getPostsList')
  },

  //user
  loginUser({ commit }, formData) {
    return new Promise((resolve, rejects) => {
      AV.User.logIn(formData.username, formData.password).then(
        function (loginedUser) {
          commit(mutations.LOGIN_USER, loginedUser);
        },
        function (error) {
          rejects(error)
        }
      );
    })
  },
  logoutUser({ commit }) {
    AV.User.logOut()
    commit(mutations.LOGOUT_USER)
  },

  //mdeditor
  pushPost({ commit }, article) {
    this.dispatch('filterTags', article.tags).then(obj => {
      this.dispatch('setPostData', { obj, article })
    })
  },

  filterTags({ commit, state }, tags) {
    return new Promise(resolve => {
      let newTagGroup = [], existTagGroup = []  //new存放新的tag，exist存放已有的tag，后面用于绑定
      let tagsList = state.tag.tagsList
      //对标签进行检索，如果是旧标签，就把旧标签的id存放到existTagGroup;如果是新标签，则把tag存放到newTagGroup
      tags.forEach(tag => {
        let exist = tagsList.find(e => {
          return e.attributes.tag === tag
        })
        exist ? existTagGroup.push(exist.id) : newTagGroup.push(tag)
      });
      resolve({ newTagGroup, existTagGroup })
    })
  },

  setPostData({ commit, state }, { obj, article }) {
    // set article存储
    let Article = article.id ? AV.Object.createWithoutData('Article', article.id) : new AV.Object('Article')
    Article.set('title', article.title)
    Article.set('tags', article.tags)
    Article.set('content', article.content)
    Article.set('owner', AV.User.current())

    //set 新Tag存储
    let TagsGroup = []
    if (obj.newTagGroup.length > 0) {
      obj.newTagGroup.forEach(newTag => {
        let Tags = new AV.Object('Tags')
        Tags.set('tag', newTag)
        TagsGroup.push(Tags)
      })
    }
    if (obj.existTagGroup.length > 0) {
      //oldTag存储的是这个旧tag的objectId
      obj.existTagGroup.forEach(oldTag => {
        let Tags = AV.Object.createWithoutData('Tags', oldTag)
        TagsGroup.push(Tags)
      })
    }

    //set Post存储 使用中间表实现多对多关系
    let Post = article.postID ? AV.Object.createWithoutData('Post', article.postID) : new AV.Object('Post')
    Post.set('article', Article)
    Post.set('tags', TagsGroup)
    Post.set('title', article.title)
    Post.set('cover', article.cover)
    Post.set('abstract', article.abstract)
    Post.set('like', 1)
    Post.set('read', 1)
    Post.set('owner', AV.User.current())

    this.dispatch('uploadPost', Post)
  },

  uploadPost({ commit }, Post) {
    let _this = this
    Post.save().then(
      function (res) {
        _this.dispatch('getTagsList')
        _this.dispatch('getPostsList')
      },
      function (error) {
        alert(JSON.stringify(error))
      }
    )
  },

  //tag
  getTagsList({ commit }) {
    //获取所有tag
    return new Promise((resolve, reject) => {
      let query = new AV.Query('Tags')
      query.find().then(function (res) {
        commit(mutations.GET_TAGSLIST, res)
        resolve()
      }).catch(function (error) {
        alert(JSON.stringify(error));
      });
    })
  },
  setTargetTag({ commit }, tag) {
    return new Promise(resolve => {
      commit(mutations.SET_TARGETTAG, tag)
      resolve()
    })
  },

  // post
  getCurrentPost({ commit }, targetPostID) {
    return new Promise((resolve, reject) => {
      let query = new AV.Query('Post')
      query.include('tags')
      query.include('article')
      query.get(targetPostID).then(res => {
        resolve(res)
      }).catch(error => {
        alert(JSON.parse(error))
        reject(error)
      })
    })
  },
  getPostsList({ commit }, targetTagID) {
    //设置loading状态
    commit(mutations.SET_LOADING)

    return new Promise((resolve, reject) => {
      console.log('getPostsList')
      let config = {
        //按时间，降序排列
        condition: 'createdAt',
        mutations: 'SET_POSTSLIST'
      }

      //获取所有的post
      let query = new AV.Query('Post')
      query.descending(config.condition);
      query.include('tags')
      query.include('article')

      //targetTagID可选。当存在的时候，则是用于筛选带tag的post
      if (targetTagID) {
        var targetTag = AV.Object.createWithoutData('Tags', targetTagID)
        query.equalTo('tags', targetTag)
      }
      query.find().then(function (res) {
        commit(mutations[config.mutations], res)
        resolve(res)
      }).catch(error => {
        alert(JSON.parse(error))
        reject(error)
      })
    })
  },
  setPostsListPage({ commit }, page) {
    commit(mutations.SET_NOWPAGE, page)
  },
  setCurrentPost({ commit }, currentPost) {
    commit(mutations.SET_CURRENTPOST, currentPost)
  }
}

export default actions