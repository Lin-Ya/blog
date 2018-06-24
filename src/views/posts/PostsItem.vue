<template>
  <div class="posts-item">
    <ul>
      <router-link :to="{name: 'Article', params: {id: 1}}">文章1</router-link>
      <router-link :to="{name: 'Article', params: {id: 2}}">文章2</router-link>
      <router-link :to="{name: 'Article', params: {id: 3}}">文章3</router-link>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">

</style>
