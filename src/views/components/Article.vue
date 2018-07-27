<template>
  <div class="article-wrapper">
    <div class="article-cover">
      <img :src="this.currentPost.cover">
    </div>
    <div class="article-header">
      <h1>{{this.currentPost.article.attributes.title}}</h1>
      <button class="article-editor" v-if="this.currentPost.owner.id === this.currentUserID" @click="linkToMarkDownEditor">编辑</button>
      <ul class="article-tagsList">
        <li>
          <TagsButton v-for="tagItem in this.currentPost.tags" :key="tagItem.id" :propTag="tagItem" @getPostByTag="linkToTags($event)" />
        </li>
      </ul>
    </div>
    <div class="article-content markdown-body" v-html=" Marked(this.currentPost.article.attributes.content)"></div>
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
    return {};
  },
  props: ["postID"],
  created() {
    this.currentPost.id
      ? console.log("1")
      : this.$store.dispatch("getCurrentPost", this.postID).then(res => {
          this.$store.dispatch("setCurrentPost", res);
        });
    //调用方法给这条post的read增加1
  },
  // mounted(){
  //   document.getElementById("article_content").innerHTML = marked(
  //     this.article.attributes.content
  //   );
  // },
  computed: {
    currentUserID() {
      return this.$store.state.user.currentUser.id;
    },
    currentPost() {
      return this.$store.getters.getCurrentPost;
    }
  },
  methods: {
    linkToTags(targetTagID) {
      this.$router.push({ name: "Tags", params: { targetTagID: targetTagID } });
    },
    linkToMarkDownEditor() {
      let updateData = {
        postID: this.postID,
        oldArticle: this.currentPost.article.attributes
      };
      updateData.oldArticle.id = this.currentPost.article.id;
      this.$router.push({
        name: "Mdeditor",
        params: { updateData }
      });
    },
    Marked(obj) {
      return marked(obj);
    }
  }
};
</script>

<style lang="less">
.article-wrapper {
}
</style>
