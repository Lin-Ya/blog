import * as mutations from './mutations'
import AV from "@/lib/leancloud/leancloud.js";


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
  pushArticle({ commit }, article) {
    commit(mutations.PUSH_ARTICLE,article)
    let Article = new AV.Object('Article')
    Article.set('title',article.title)
    Article.set('content', article.content)
    // Article.set('cover', article.covere)
    Article.set('tags', article.tags)
    Article.set('abstract', article.abstract)
    Article.set('owner', AV.User.current())

    Article.save().then(
      function (res) {
        console.log('发布成功')
      },
      function (error) {
        console.log(JSON.stringify(error))
      }
    )
  },

}

export default actions