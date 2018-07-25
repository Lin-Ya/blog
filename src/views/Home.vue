<template>
  <div class="home">
    <header>
      <Nav class="nav-wrapper" />
    </header>
    <main>
      <Posts class="posts-wrapper" />
    </main>
    <footer>
      <Footer class="footer-wrapper" />
    </footer>
  </div>
</template>

<script>
import Posts from "views/posts/Posts";
import Nav from "views/components/Nav";
import Footer from "views/components/Footer";

export default {
  components: {
    Posts,
    Nav,
    Footer
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
@media (min-width: 769px) {
  .home {
    font-size: 16px;
    line-height: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    header {
      height: 72px;
      &.fixed {
        position: fixed;
      }
    }
    main {
      flex: 1;
      height: calc(100vh - 104px);
      overflow: hidden;
    }
    footer {
      height: 32px;
    }
  }
}
@media (max-width: 768px) {
  .home {
    width: 100%;
    overflow: hidden;
  }
}
</style>
