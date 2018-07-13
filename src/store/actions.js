import * as mutations from './mutations'
import AV from "@/lib/leancloud/leancloud.js";
import { rejects } from 'assert';


const actions = {
  //user
  loginUser({ commit }, formData) {
    AV.User.logIn(formData.username, formData.password).then(
      function (loginedUser) {
        commit(mutations.LOGIN_USER, loginedUser);
      },
      function (error) {
        console.log(JSON.stringify(error));
      }
    );
  },
  logoutUser({ commit }) {
    AV.User.logOut()
    commit(mutations.LOGOUT_USER)
  },

  //mdeditor
  pushPost({ commit }, article) {
    //缓存待上传的article
    commit(mutations.SET_TEMPPOSTARTICLE, article)
    this.dispatch('filterTags').then(obj => {
      this.dispatch('setPostData', obj)
    })
  },

  filterTags({ commit, state }) {
    return new Promise((resolve, reject) => {
      let newTagGroup = [], existTagGroup = []  //new存放新的tag，exist存放已有的tag，后面用于绑定
      let tagsList = state.tag.tagsList
      let article = state.article
      //对标签进行检索，如果是旧标签，就把旧标签的id存放到existTagGroup;如果是新标签，则把tag存放到newTagGroup
      article.tags.forEach(element => {
        console.log(element)
        let exist = tagsList.find(e => {
          return e.tag === element
        })
        exist ? existTagGroup.push(exist.id) : newTagGroup.push(element)
      });
      resolve({ newTagGroup, existTagGroup })
    })
  },

  setPostData({ commit, state }, obj) {
    let article = state.article

    // set article存储
    let Article = new AV.Object('Article')
    Article.set('title', article.title)
    Article.set('content', article.content)
    Article.set('cover', article.cover)
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
    console.log('TagsGroup')
    console.log(TagsGroup)

    //set Post存储 使用中间表实现多对多关系
    let Post = new AV.Object('Post')
    Post.set('article', Article)
    Post.set('title', article.title)
    Post.set('tags', TagsGroup)
    Post.set('abstract', article.abstract)
    Post.set('owner', AV.User.current())

    this.dispatch('uploadPost', Post)
  },

  uploadPost({ commit }, postData) {
    let _this = this
    postData.save().then(
      function (res) {
        console.log(_this)
        console.log(res)
        _this.dispatch('getTagsList')
      },
      function (error) {
        console.log(JSON.stringify(error))
      }
    )
  },

  //tag
  getTagsList({ commit }) {
    console.log('getTagsList')
    //获取所有tag
    let query = new AV.Query('Tags')
    query.find().then(function (res) {
      //处理结果，获得一个tagList数组，存到store.state.tag里面
      let tagList = []
      for (let i = 0, len = res.length; i < len; i++) {
        let tag = {}
        tag.id = res[i].id
        tag.tag = res[i].attributes.tag
        tagList.push(tag)
      }
      commit(mutations.GET_TAGSLIST, tagList)
      return new Promise((resolve, rejects) => {
        resolve()
      })

    }).catch(function (error) {
      alert(JSON.stringify(error));
    });
  },

  //post
  getPostsList({ commit }, inquireKey) {
    console.log('getPostsList')
    let config = {
      //按时间，降序排列
      condition: 'createdAt',
      mutationsTypes: 'GET_POSTSLIST'
    }
    if (inquireKey) {
      config.condition = inquireKey
      config.mutationsTypes = 'GET_POSTSRCMDLIST'
    }

    //获取所有的post
    let query = new AV.Query('Post')
    query.descending(config.condition);
    query.find().then(function (res) {
      let postsList = []
      for (let i = 0, len = res.length; i < len; i++) {
        let post = {}
        post.tags = []
        post.id = res[i].id
        post.title = res[i].attributes.title
        post.article = res[i].attributes.article.id
        res[i].attributes.tags.forEach(tag => {
          post.tags.push({ id: tag.id })
        })
        postsList.push(post)
      }
      commit(mutations[config.mutationsTypes],postsList)
      console.log(res)
    }).catch(function (error) {
      alert(JSON.stringify(error))
    })
  },


}

export default actions