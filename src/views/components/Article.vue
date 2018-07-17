<template>
  <div class="article">
    这是文章
  </div>
</template>

<script>
export default {
  data(){
    return {
      article: {}
    }
  },
  props: ['post'],
  created(){
    this.$store.dispatch('getArticle', this.post.articleID).then(this.article = this.$store.state.article)
    //调用方法给这条post的read增加1
  }
};
</script>

<style lang="less">
</style>
