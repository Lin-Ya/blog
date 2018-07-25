<template>
  <div class="post-wrapper">
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: ''
    };
  },
  watch: {
    $route(to, from) {
      if (to.path === "/") {
        this.$store.dispatch("getPostsList");
      }
    }
  }
};
</script>

<style lang="less">
.post-wrapper {
  height: calc(100vh - 104px);
}
</style>
