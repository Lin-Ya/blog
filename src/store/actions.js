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
    
    this.dispatch('filterTags').then(obj => {
      this.dispatch('setPostData',{obj,article})
    })
  },

  filterTags({ commit, state }) {
    return new Promise((resolve, reject) => {
      let newTagGroup = [], existTagGroup = []  //new存放新的tag，exist存放已有的tag，后面用于绑定
      let tagsList = state.tag.tagsList
      let article = state.article
      //对标签进行检索，如果是旧标签，就把旧标签的id存放到existTagGroup;如果是新标签，则把tag存放到newTagGroup
      article.tags.forEach(element => {
        let exist = tagsList.find(e => {
          return e.tag === element
        })
        exist ? existTagGroup.push(exist.id) : newTagGroup.push(element)
      });
      resolve({ newTagGroup, existTagGroup })
    })
  },

  setPostData({ commit, state }, {obj,article}) {
  
    // set article存储
    let Article = new AV.Object('Article')
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
    let Post = new AV.Object('Post')
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
        console.log('uploadPost_res')
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
    //获取所有tag
    let query = new AV.Query('Tags')
    console.log('getTagsList')
    query.find().then(function (res) {
      console.log(res)
      //处理结果，获得一个tagList数组，存到store.state.tag里面
      let tagList = []
      for (let i = 0, len = res.length; i < len; i++) {
        let tag = {}
        tag.id = res[i].id
        tag.tag = res[i].attributes.tag
        tagList.push(tag)
      }
      commit(mutations.GET_TAGSLIST, tagList)
    }).catch(function (error) {
      alert(JSON.stringify(error));
    });
  },

  // post
  getPostsList({ commit }, inquireKey) {
    return new Promise((resolve, reject) => {
      console.log('getPostsList')
      let config = {
        //按时间，降序排列
        condition: 'createdAt'
      }
      if (inquireKey) {
        config.condition = inquireKey
      }

      //获取所有的post
      let postsList = []
      let query = new AV.Query('Post')
      query.descending(config.condition);
      query.include('tags')
      query.find().then(function (res) {
        for (let i = 0, len = res.length; i < len; i++) {
          let post = {}
          post.tags = []
          post.id = res[i].id
          post.title = res[i].attributes.title
          post.cover = res[i].attributes.cover
          post.like = res[i].attributes.like
          post.read = res[i].attributes.read
          post.abstract = res[i].attributes.abstract
          post.articleID = res[i].attributes.article.id
          // debugger
          res[i].attributes.tags.forEach(tag => {
            post.tags.push({ id: tag.id, tag: tag.attributes.tag })
          })
          postsList.push(post)
        }
        commit(mutations.SET_POSTSLIST, postsList)
        resolve()
      }).catch(error => {
        console.log(JSON.parse(error))
        reject(error)
      })
    })
  },
  setPostsListPage({ commit }, page) {
    commit(mutations.SET_NOWPAGE, page)
  },

  //article
  getArticle({ commit }, articleID) {
    return new Promise((resolve,reject)=>{
      let query = new AV.Query('Article')
      query.get(articleID).then(function (res) {
        commit(mutations.SET_ARTICLE,res)
        resolve()
      }, function (error) {
        console.log(error)
        reject()
      })
    })
  }

}

export default actions