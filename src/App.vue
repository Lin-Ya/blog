<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import store from '@/store/index'
export default {
  name: 'App',
  store,
  data(){
    return {
      store
    }
  }
}
</script>

<style>
@import "simplemde/dist/simplemde.min.css";
html , body , #app {
  height: 100%;
}
</style>
