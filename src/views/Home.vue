<template>
  <div class="home">
    <div class="slide">
      <Side class="side-wrapper" />
    </div>
    <div class="main-wrapper">
      <Nav class="nav-wrapper" />
      <Posts class="posts-wrapper" />
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
  },
  data(){
    return {
      
    }
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
  .slide {
    width: 88px;
    height: 100%;
    .side-wrapper {
      height: 100%;
    }
  }
  .main-wrapper {
    flex: 1;
    height: 100%;
    .nav-wrapper {
      height: 104px;
    }
    .posts-wrapper {
      height: calc(100% - 104px);
      overflow: scroll;
    }
  }
}
</style>
