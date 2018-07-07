<template>
  <div class="article">
    这是文章{{articleId}}
  </div>
</template>

<script>
export default {
  data(){
    return {
      articleId: '0'
    }
  },
  props: ['id'],
  created(){
    this.articleId = this.id
  }
};
</script>

<style lang="less">
</style>
