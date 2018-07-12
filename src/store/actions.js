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
  //创建新的文章
  newArticle({ commit }) {

  },
  editArticle({ commit }) {

  },

  //发布文章
  pushPost({ commit }, article) {
    //缓存待上传的article
    commit(mutations.SET_TEMPPOSTARTICLE, article)
    this.dispatch('filterTags').then(obj => {
      console.log(obj.newTagGroup)
      console.log(obj.existTagGroup)
    })



    //set article存储
    // let Article = new AV.Object('Article')
    // Article.set('title', article.title)
    // Article.set('content', article.content)
    // Article.set('cover', article.cover)
    // Article.set('owner', AV.User.current())

    //set tags存储


    //set Post存储 使用中间表实现多对多关系
    // let Post = new AV.Object('Post')
    // Post.set('article', Article)
    // Post.set('tags', TagsGroup)
    // Post.set('abstract', article.abstract)
    // Post.set('owner', AV.User.current())


    // Post.save().then(
    //   function (res) {
    //     console.log('发布成功')
    //     console.log(res)
    //   },
    //   function (error) {
    //     console.log(JSON.stringify(error))
    //   }
    // )

  },

  getTagsList({ commit }) {
    console.log('getTagsList')
    //获取所有tag
    var query = new AV.Query('Tags')
    query.find().then(function (res) {
      //处理结果，获得一个tagList数组，存到store.state.tag里面
      let tagList = []
      for (let i = 0, len = res.length; i < len; i++) {
        let target = {}
        target.id = res[i].id
        target.tag = res[i].attributes.tag
        tagList.push(target)
      }
      commit(mutations.GET_TAGSLIST, tagList)

    }).catch(function (error) {
      alert(JSON.stringify(error));
    });
  },

  filterTags({ commit }) {
    return new Promise((resolve, reject) => {
      let newTagGroup = [], existTagGroup = []  //new存放新的tag，exist存放已有的tag，后面用于绑定
      let tagsList = this.state.tag.tagsList
      let article = this.state.article
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
  uploadPost({ commit }) {

  }

}

export default actions