<template>
  <div>
    <!-- 按钮组 -->
    <div class="button-group">
      <button id="pushButton" @click="push">发布</button>
      <button id="saveButton" @click="save">暂存</button>
      <button id="clearButton" @click="clear">清空</button>
    </div>
    <!-- 文本编辑组 -->
    <div class="markdown-editor">
      <label for="article_title">标题<input id="article_title" type="text" v-model="article.title"></label>
      <label for="article_cover">封面<input type="file" name="cover" id="article_cover" @change="uploadImg($event)"></label>
      <label for="article_tags">标签<input id="article_tags" type="text" ref="tagsInput" @keypress.enter="addTags"></label>
      <div class="tags_group">
        <span v-for="index in this.article.tags" :key="index"> {{index}} </span>
      </div>
      <!-- 封面 -->
      <!-- <img :src="this.article.cover"> -->
      <textarea name="content" id="article_content" placeholder="正文" cols="30" rows="10" v-model="article.content"></textarea>
    </div>
    <div class="markdown-preview">
      <div id="content_preview" class="markdown-body" v-html="previewContent"></div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import 'github-markdown-css'
export default {
  name: "markdown-editor",
  props: ["updateData"],
  created() {
    //判断是新建还是编辑
    //如果是新建，则需要检查是否有暂存文章。如果是编辑，则不检查

    if (this.updateData) {
      this.editorStatus = "edit";
      Object.assign(this.article,this.updateData.oldArticle)
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
        content: "",
        tags: [],
        cover: ""
      },
      editorStatus: "new"
    };
  },
  computed: {
    previewContent(){
      return marked(this.article.content)
    }
  },
  methods: {
    push() {
      if (!this.$store.state.user.isLogin) {
        alert("你还没有登录呢");
        return;
      }
      // else if (
      //   !this.article.title.trim() ||
      //   !this.article.content.trim() ||
      //   !this.article.tags ||
      //   !this.article.cover
      // ) {
      //   alert("你是不是写漏了什么？再检查一下");
      //   return;
      // }

      let pushData = {};
      Object.assign(pushData, this.article);
      pushData.title = pushData.title.trim();
      pushData.content = pushData.content.trim();
      pushData.abstract = pushData.content.slice(0, 100);
      if(this.updateData){
        pushData.postID = this.updateData.postID
      }else {
        pushData.postID = ''
      }

      this.$store.dispatch("pushPost", pushData);
      this.clear();
    },

    save() {
      console.log(this.article, "暂存到本地");
      localStorage.setItem("tempArticle", JSON.stringify(this.article));
    },

    clear() {
      for (let key in this.article) {
        this.article[key] = "";
      }
      this.article.tags = []
      localStorage.removeItem("tempArticle");
    },
    uploadImg(e) {
      let _this = this;
      let img = e.target.nextElementSibling;
      let reader = new FileReader();
      let file = e.target.files[0];
      if (!file.type.match("image/*")) {
        alert("上传的图片必须是png、gif、jpg格式哟！");
        e.target.value = "";
        return;
      }
      reader.readAsDataURL(file);
      console.log(reader);
      reader.onload = function(event) {
        _this.article.cover = event.target.result;
      };
    },
    addTags() {
      let tag = this.$refs.tagsInput.value.trim();
      if (tag) {
        this.article.tags.push(tag);
        this.$refs.tagsInput.value = "";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
