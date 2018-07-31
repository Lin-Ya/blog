<template>
  <div class="account-wrapper">
    <div class="formGroup" v-if="!user.isLogin">
      <div class="logIn">
        <p class="error-msg">{{errorMsg}}</p>
        <form @submit.prevent="logIn">
          <label for="logIn_username">
            用户名
            <input v-model="formData.username" type="text" name="username" id="logIn_username">
          </label>
          <label for="logIn_password">
            密码
            <input v-model="formData.password" type="password" name="password" id="logIn_password">
          </label>
          <input class="login-submit" type="submit" value="登录">
        </form>
      </div>
    </div>
    <div class="logOut" v-else>
      <p>欢迎回来 {{user.currentUser.username}}</p>
      <button class="logout-button" @click="logOut">注销</button>
    </div>
  </div>
</template>

<script>
import AV from "@/lib/leancloud/leancloud.js";
import getAVUser from "@/lib/leancloud/getAVUser.js";
import getErrorMessage from "@/lib/leancloud/getErrorMessage.js";

export default {
  //使用计算属性获取store实例中的某个状态
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      formData: {
        username: "",
        password: ""
      },
      actionType: "signUp",
      errorMsg: ''
    };
  },
  methods: {
    logIn() {
      console.log("我要登录啦");
      this.$store.dispatch("loginUser", this.formData).catch(error=>{
        this.errorMsg = getErrorMessage(error.code)
      });
    },
    logOut() {
      this.$store.dispatch("logoutUser");
    }
  }
};
</script>

<style lang="less">
.account-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .logIn {
    position: relative;
    form {
      display: flex;
      flex-direction: column;
      label {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        line-height: 24px;
        padding: 4px 8px;
        input {
          outline: none;
          margin-left: 8px;
          padding: 4px;
          border: none;
          border-bottom: 1px solid #5a5a5a;
          background-color: #fff;
        }
        input:-webkit-autofill,
        textarea:-webkit-autofill,
        select:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px white inset;
        }
        input[type="text"]:focus,
        input[type="password"]:focus,
        textarea:focus {
          -webkit-box-shadow: 0 0 0 1000px white inset;
        }
      }
      .login-submit {
        cursor: pointer;
        padding: 4px;
        margin-top: 8px;
        background-color: #20cfcf;
        color: #fff;
        border: none;
        border-radius: 8px;
        transition: all 0.3s;
        &:hover {
          background-color: #57e73e;
        }
      }
    }
    .error-msg {
      text-align: center;
      letter-spacing: 1px;
      font-size: 12px;
      line-height: 12px;
      padding: 4px 0;
      color: red;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%,-100%);
    }
  }
  .logOut {
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      margin: 8px 0;
    }
    .logout-button {
      border: none;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 16px;
      background-color: #dd0b0b;
      color: #fff;
      &:hover {
        background-color: #f83737;
      }
    }
  }
}
</style>
