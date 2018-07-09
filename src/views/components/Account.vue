<template>
  <div>
    <div class="formGroup" v-if="currentUser === null">
      <div class="switchGroup">
        <label><input type="radio" name="type" v-model="actionType" value="signUp">注册</label>
        <label><input type="radio" name="type" v-model="actionType" value="logIn">登入</label>
      </div>
      <div>
        <div class="signUp" v-if="actionType === 'signUp'">
          <h3>注册</h3>
          <form @submit.prevent="signUp">
            <label for="signUp_username">用户名</label>
            <input v-model="formData.username" type="text" name="username" id="signUp_username">
            <label for="signUp_password">密码</label>
            <input v-model="formData.password" type="password" name="password" id="signUp_password">
            <input type="submit" value="注册">
          </form>
        </div>
        <div class="logIn" v-if="actionType === 'logIn'">
          <h3>登录</h3>
          <form @submit.prevent="logIn">
            <label for="logIn_username">用户名</label>
            <input v-model="formData.username" type="text" name="username" id="logIn_username">
            <label for="logIn_password">密码</label>
            <input v-model="formData.password" type="password" name="password" id="logIn_password">
            <input type="submit" value="登录">
          </form>
        </div>
      </div>
    </div>
    <div class="logOut" v-else>
      <p>你好{{this.currentUser.username}}</p>
      <button @click="logOut">注销</button>
    </div>
  </div>
</template>

<script>
import AV from "@/lib/leancloud/leancloud.js";
import getAVUser from "@/lib/leancloud/getAVUser.js";
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      actionType: "signUp",
      currentUser: null
    };
  },
  methods: {
    signUp() {
      console.log("我要注册啦");
      var user = new AV.User();
      user.setUsername(this.formData.username);
      user.setPassword(this.formData.password);
      user.signUp().then(
        function(loginedUser) {
          console.log(loginedUser);
        },
        function(error) {
          console.log(JSON.stringify(error));
        }
      );
      console.log(user);
    },
    logIn() {
      console.log("我要登录啦");
      var username = this.formData.username;
      var password = this.formData.password;
      var _this = this;
      AV.User.logIn(username, password).then(
        function(loginedUser) {
          console.log(loginedUser);
          _this.currentUser = getAVUser();
        },
        function(error) {
          console.log(JSON.stringify(error));
        }
      );
    },
    logOut(){
      AV.User.logOut()
      this.currentUser = null
      window.location.reload()
    }
  }
};
</script>

<style lang="less" scoped>
</style>
