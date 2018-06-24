<template>
  <div class="home">
    hello。this is home
    <Posts/>
  </div>
</template>

<script>
import Posts from '@/views/posts/Posts'
export default {
  components: {
    Posts
  }
}
</script>

<style lang="less">
.home {
  color: red;
  text-align: center;
}
</style>
