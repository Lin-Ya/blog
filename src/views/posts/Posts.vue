<template>
  <div class="posts">
    this is posts

    <router-link :to="{name:'Home'}">Home</router-link>

    <router-link :to="{name:'PostsList'}">PostsList</router-link>

    <router-link :to="{name:'Tags'}">Tags</router-link>

    <router-link :to="{name:'Mdeditor'}">Mdeditor</router-link>

    <router-view/>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
</style>
