<template>
  <div>
    <p>This is Nav</p>
    <router-link to="/">Home</router-link>

    <router-link :to="{name:'PostsList'}">PostsList</router-link>

    <router-link :to="{name:'Tags'}">Tags</router-link>

    <router-link :to="{name:'Mdeditor'}">Mdeditor</router-link>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
.nav {
  border: 1px solid red;
}
</style>
