<template>
  <div class="article-wrap">
    <div class="article">
      <div id="article_tagsList">
        <TagsButton v-for="tagItem in this.post.tags" :key="tagItem.id" :propTag="tagItem" @getPostByTag="linkToTags($event)" />
      </div>
      <div>
        <button class="article-editor" v-if="this.article.owner.id === this.currentUserID" @click="linkToMarkDownEditor">编辑</button>
      </div>
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
import TagsButton from "views/components/TagsButton";
import "@/assets/atom-one-dark.css";

hljs.initHighlightingOnLoad();
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
  components: {
    TagsButton
  },
  data() {
    return {
      article: {}
    };
  },
  props: ["post", "title"],
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
  },
  computed: {
    currentUserID() {
      return this.$store.state.user.currentUser.id;
    }
  },
  methods: {
    linkToTags(targetTagID) {
      this.$router.push({ name: "Tags", params: { targetTagID: targetTagID } });
    },
    linkToMarkDownEditor() {
      let updateData = {
        postID: this.post.id||'',
        oldArticle: this.article
      }
      this.$router.push({
        name: "Mdeditor",
        params: { updateData }
      });
    }
  }
};
</script>

<style lang="less">
</style>
