<template>
  <div class="home">
    hello。this is home
    <Nav/>
    <Side/>
    <Posts/>
  </div>
</template>

<script>
import Posts from "views/posts/Posts";
import Nav from "views/components/Nav";
import Side from "views/components/Side";

export default {
  components: {
    Posts,
    Nav,
    Side
  }
};
</script>

<style lang="less">
.home {
  color: red;
  text-align: center;
}
</style>
