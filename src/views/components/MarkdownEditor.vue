<template>
  <div>
    <div class="button-group">
      <button id="pushButton" @click="push">发布</button>
      <button id="saveButton" @click="save">暂存</button>
      <button id="clearButton" @click="clear">清空</button>
    </div>
    <div class="markdown-editor">
      <label for="article_title">标题<input id="article_title" type="text" v-model="article.title"></label>
      <label for="article_cover">封面<input type="file" name="cover" id="article_cover"></label>
      <label for="article_title">标签<input id="article_tags" type="text" v-model="article.tags"></label>
      <textarea id="mdeditor" @onchange="updateContent(event)"></textarea>
    </div>
  </div>
</template>

<script>
import Simplemde from "simplemde";
import marked from "marked";
export default {
  name: "markdown-editor",
  props: ["isNew"],
  created() {
    //判断是新建还是编辑
    //如果是新建，则需要检查是否有暂存文章。如果是编辑，则不检查
    if (!this.isNew) {
      this.editorStatus = "edit";
    } else {
      //判断是否有暂存文章
      let tempArticle = localStorage.getItem("tempArticle");
      tempArticle = JSON.parse(tempArticle);
      if (tempArticle) {
        let isKeepTemp = window.confirm("检查到有暂存文章，是否继续编辑？");
        if (isKeepTemp) {
          Object.assign(this.article, tempArticle);
        }
      }
    }
  },
  data() {
    return {
      article: {
        title: "",
        tags: "",
        content: "",
        cover: ""
      },
      editorStatus: "new"
    };
  },
  mounted() {
    console.log("进入了md编辑器");
    let _this = this;
    let simplemde = new Simplemde({
      element: document.querySelector("#mdeditor")
    });
    simplemde.value(this.article.content);
    //嵌入了simplemde，data不显示实时变化。这里使用set来更新data
    simplemde.codemirror.on("change", function() {
      // _this.$set(_this.article, "content", simplemde.value());
      _this.article.content = simplemde.value();
    });
  },
  methods: {
    push() {
      console.log(this.article, "我要发布啦");
      this.$store.dispatch("pushArticle", this.article);
    },
    save() {
      console.log(this.article, "暂存到本地");
      localStorage.setItem("tempArticle", JSON.stringify(this.article));
    },
    clear() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.markdown-editor .markdown-body {
  padding: 0.5em;
}
.markdown-editor .editor-preview-active,
.markdown-editor .editor-preview-active-side {
  display: block;
}
</style>
