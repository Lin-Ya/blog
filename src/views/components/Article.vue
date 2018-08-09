<template>
  <div class="article-wrapper">
    <div class="article-header">
      <h1>{{this.currentPost.article.attributes.title}}</h1>
      <p>{{this.getHandledDate}}</p>
      <ul class="article-tagsList">
        <li v-for="tagItem in this.currentPost.tags" :key="tagItem.id">
          <TagsButton :propTag="tagItem" @getPostByTag="linkToTags($event)" />
        </li>
      </ul>
      <img :src="this.currentPost.cover">
    </div>
    <button class="article-editor" v-if="this.currentPost.owner.id === this.currentUserID" @click="linkToMarkDownEditor">编辑</button>
    <div class="article-content markdown-body" v-html=" Marked(this.currentPost.article.attributes.content)"></div>
  </div>
</template>

<script>
import moment from "moment";
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
      ? console.log(this.currentPost.id)
      : this.$store.dispatch("getCurrentPost", this.postID).then(res => {
          this.$store.dispatch("setCurrentPost", res);
        });
  },
  computed: {
    currentUserID() {
      return this.$store.state.user.currentUser.id;
    },
    currentPost() {
      return this.$store.getters.getCurrentPost;
    },
    getHandledDate() {
      return moment(this.currentPost.createdAt).format(
        "MMMM Do YYYY, h:mm:ss a"
      );
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

<style lang="less" scoped>
.article-wrapper {
  letter-spacing: 1px;
  .article-header {
    width: 100%;
    margin: 0 auto;
    position: relative;
    img {
      width: 100%;
      filter: brightness(0.8);
    }
  }
  .article-tagsList {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px;
  }
  .article-content {
    ul {
      list-style-type: disc;
      list-style-position: inside;
    }
    ol {
      list-style-type: decimal;
      list-style-position: inside;
    }
    ul ul,
    ol ul {
      list-style-type: circle;
      list-style-position: inside;
      margin-left: 15px;
    }
    ol ol,
    ul ol {
      list-style-type: lower-latin;
      list-style-position: inside;
      margin-left: 15px;
    }
  }
}

@media (max-width: 768px) {
  .article-wrapper {
    .article-header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .article-tagsList {
        position: absolute;
        bottom: 0%;
        transform: translateY(100%);
      }
      img {
        width: 100%;
        z-index: -1;
      }
      h1 {
        text-align: center;
        font-size: 0.8571rem;
        line-height: 1.0476rem;
        padding: 0 1.1429rem;
        font-weight: 750;
        position: absolute;
        top: 50%;
        transform: translateY(-100%);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        letter-spacing: 2px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-shadow: 2px 2px 2px #5a5a5a;
      }
      p {
        position: absolute;
        bottom: 10%;
        font-size: 0.4762rem;
        line-height: 0.4762rem;
        color: #ccc;
      }
    }
    .article-content {
      margin-top: 50px;
      padding: 0.3333rem 0.9524rem;
      font-size: 0.381rem;
      line-height: 0.5714rem;
      font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica,
        "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC",
        "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC",
        "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei",
        "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp",
        sans-serif;
    }
  }
}
@media (min-width: 769px) {
  .article-wrapper {
    max-width: 1280px;
    padding: 0 24px;
    margin: 0 auto;
    .article-header {
      text-align: center;
      h1 {
        font-size: 40px;
        line-height: 48px;
      }
      p {
        font-size: 16px;
        line-height: 32px;
        color: #79b6f0;
      }
    }
    .article-content {
      width: 80%;
      margin: 0 auto;
      padding: 48px;
      background-color: #fff;
    }
  }
}
</style>
