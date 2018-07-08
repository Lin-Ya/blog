<template>
  <div>
    <div class="switchGroup">
      <label><input type="radio" name="type" v-model="actionType" value="signUp">注册</label>
      <label><input type="radio" name="type" v-model="actionType" value="logIn">登入</label>
    </div>
    <div class="sigUp" v-if="actionType === 'signUp'">
      <h3>注册</h3>
      <form @submit.prevent="sigUp(user)">
        <label for="sigUp_username">用户名</label>
        <input v-model="user.name" type="text" name="username" id="sigUp_username">
        <label for="sigUp_password">密码</label>
        <input v-model="user.password" type="password" name="password" id="sigUp_password">
        <input type="submit" value="注册">
      </form>
    </div>
    <div class="logIn" v-if="actionType === 'logIn'">
      <h3>登录</h3>
      <form @submit.prevent="logIn(user)">
        <label for="logIn_username">用户名</label>
        <input v-model="user.name" type="text" name="username" id="logIn_username">
        <label for="logIn_password">密码</label>
        <input v-model="user.password" type="password" name="password" id="logIn_password">
        <input type="submit" value="登录">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user: {
        name: null,
        password: null
      },
      actionType: 'signUp'
    }
  },
  methods: {
    sigUp(user){
      console.log('我要注册啦')
      console.log(user)
    },
    logIn(user){
      console.log('我要登录啦')
      console.log(user)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
