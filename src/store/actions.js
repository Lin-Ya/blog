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
    
    //set article存储
    Article.set('title',article.title)
    Article.set('content', article.content)
    Article.set('cover', article.cover)
    Article.set('abstract', article.abstract)
    Article.set('owner', AV.User.current())
    
    
    //set tags存储
    let TagsGroup = [] 
    
    article.tags.forEach(element => {
      let Tags = new AV.Object('Tags')
      Tags.set('tag',element)
      TagsGroup.push(Tags)
    });
    Article.set('dependent',TagsGroup)
    
    Article.save().then(
      function (res) {
        console.log('发布成功')
        console.log(res)
      },
      function (error) {
        console.log(JSON.stringify(error))
      }
    )

  },

}

export default actions