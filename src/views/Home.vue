<template>
  <div class="home">
    <div class="left">
      <Side class="side" />
    </div>
    <div class="right">
      <Nav class="nav" />
      <Posts class="posts" />
    </div>
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
//home layout
.home {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  .left {
    width: 88px;
    height: 100%;
    .side {
      height: 100%;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    .nav {
      height: 104px;
    }
    .posts {
      height: calc(100% - 104px);
    }
  }
}
</style>
