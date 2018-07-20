<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      store: this.$store
    };
  },
  created() {
    this.$store.dispatch("getTagsList");
    this.$store.dispatch("getPostsList");
  }
};
</script>

<style>
@import "simplemde/dist/simplemde.min.css";
html,
body,
#app {
  height: 100%;
}
</style>
