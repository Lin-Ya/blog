<template>
  <div class="article-wrap">
    <div class="article">
      <div id="article_title">
        <h1>{{this.article.title}}</h1>
      </div>
      <div id="article_content"></div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
import "@/assets/atom-one-dark.css";

hljs.initHighlightingOnLoad()
let myRenderer = new marked.Renderer();
marked.setOptions({
  renderer: myRenderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

marked.setOptions({
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});
export default {
  data() {
    return {
      article: {}
    };
  },
  props: ['post','title'],
  created() {
    for (let key in this.post.article.attributes) {
      this.article[key] = this.post.article.attributes[key];
    }
    this.article.id = this.post.article.id;
    //调用方法给这条post的read增加1
  },
  mounted() {
    document.getElementById("article_content").innerHTML = marked(
      this.article.content
    );
  }
};
</script>

<style lang="less">
</style>
