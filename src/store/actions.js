import * as types from './mutations'
import AV from "@/lib/leancloud/leancloud.js";
import getAVUser from "@/lib/leancloud/getAVUser.js";

const actions = {
  loginUser({ commit }, formData) {
    AV.User.logIn(formData.username, formData.password).then(
      function (loginedUser) {
        console.log(loginedUser)
        commit("LOGIN_USER", loginedUser );
      },
      function (error) {
        console.log(JSON.stringify(error));
      }
    );
  },
  logoutUser() {

  }
}

export default actions