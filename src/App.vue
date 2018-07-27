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
    this.$store.dispatch("initState");
  }
};
</script>

<style>

html,
body,
#app {
  height: 100%;
}
</style>
