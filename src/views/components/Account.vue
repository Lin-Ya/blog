<template>
  <div>
    <div class="formGroup" v-if="!user.isLogin">
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
      <p>你好 {{user.currentUser.username}}</p>
      <button @click="logOut">注销</button>
    </div>
  </div>
</template>

<script>
import AV from "@/lib/leancloud/leancloud.js";
import getAVUser from "@/lib/leancloud/getAVUser.js";

export default {
  //使用计算属性获取store实例中的某个状态
  computed: {
    user(){
      return this.$store.state.user
    }
  },
  data() {
    return {
      formData: {
        username: "",
        password: ""
      },
      actionType: "signUp",
    };
  },
  methods: {
    signUp() {
      console.log("我要注册啦");
      // var user = new AV.User();
      // user.setUsername(this.formData.username);
      // user.setPassword(this.formData.password);
      // user.signUp().then(
      //   function(loginedUser) {
      //     console.log(loginedUser);
      //   },
      //   function(error) {
      //     console.log(JSON.stringify(error));
      //   }
      // );
      // console.log(user);
    },
    logIn() {
      console.log("我要登录啦");
      this.$store.dispatch('loginUser',this.formData)
    },
    logOut() {
      this.$store.dispatch('logoutUser')
    }
  }
};
</script>

<style lang="less" scoped>
</style>
