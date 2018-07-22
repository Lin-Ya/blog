<template>
  <div class="article-wrap">
    <div class="article">
      <div id="article_tagsList">
        <TagsButton v-for="tagItem in this.currentPost.tags" :key="tagItem.id" :propTag="tagItem" @getPostByTag="linkToTags($event)" />
      </div>
      <div>
        <button class="article-editor" v-if="this.currentPost.owner.id === this.currentUserID" @click="linkToMarkDownEditor">编辑</button>
      </div>
      <div id="article_title">
        <h1>{{this.currentPost.article.attributes.title}}</h1>
      </div>
      <div id="article_content" v-html=" Marked(this.currentPost.article.attributes.content)"></div>
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

    };
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
    },
  },
  methods: {
    linkToTags(targetTagID) {
      this.$router.push({ name: "Tags", params: { targetTagID: targetTagID } });
    },
    linkToMarkDownEditor() {
      let updateData = {
        postID: this.post.id || "",
        oldArticle: this.article
      };
      this.$router.push({
        name: "Mdeditor",
        params: { updateData }
      });
    },
    Marked(obj){
      return marked(obj)
    }
  }
};
</script>

<style lang="less">
</style>
