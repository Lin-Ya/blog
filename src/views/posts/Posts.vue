<template>
  <div>
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
</style>
