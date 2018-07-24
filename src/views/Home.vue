<template>
  <div class="home">
    <Side class="side-wrapper" />
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
  data() {
    return {};
  }
};
</script>

<style lang="less">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
//home layout
.home {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  .side-wrapper {
    width: 88px;
    height: 100%;
  }
  .main-wrapper {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
}
@media (max-width: 768px) {
  .side-wrapper {
    display: none;
  }
  .main-wrapper {
    flex: 1;
    height: 100%;
    .nav-wrapper {
      min-height: 56px;
      margin-bottom: 8px;
    }
    .posts-wrapper {
      height: calc(100vh - 56px);
    }
  }
}
</style>
