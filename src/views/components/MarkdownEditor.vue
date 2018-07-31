<template>
  <div class="mdeditor-wrapper">
    <div class="mdeditor-buttons">
      <button @click="push">发布</button>
      <button @click="save">暂存</button>
      <button @click="clear">清空</button>
    </div>
    <div class="mdeditor-inputs">
      <div class="title-input">
        <label for="title">标题：<input name="title" type="text" placeholder="填写文章标题" v-model="article.title"></label>
        <a>添加封面<input type="file" name="cover" id="article_cover" @change="uploadImg($event)"></a>
      </div>
      <div class="tags-input">
        <label for="tags">标签：<input name="tags" type="text" placeholder="输入并按回车完成添加" ref="tagsInput" @keypress.enter="addTags"></label>
        <ul class="tags-group">
          <li v-for="(item,index) in this.article.tags" :key="index" @click="deleTags(index)">{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="mdeditor-content">
      <textarea class="content-input content" id="article_content" v-model="article.content"></textarea>
      <div class="content-preview content markdown-body" v-html="previewContent">
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";

export default {
  name: "markdown-editor",
  props: ["updateData"],
  created() {
    //判断是新建还是编辑
    //如果是新建，则需要检查是否有暂存文章。如果是编辑，则不检查

    if (this.updateData) {
      this.editorStatus = "edit";
      Object.assign(this.article, this.updateData.oldArticle);
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
    previewContent() {
      return marked(this.article.content);
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
      pushData.abstract = pushData.content.slice(0, 30);
      if (this.updateData) {
        pushData.postID = this.updateData.postID;
      } else {
        pushData.postID = "";
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
      this.article.tags = [];
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
    },
    deleTags(index) {
      this.article.tags.splice(index, 1);
    },
    changeText() {
      this.article.content = this.$refs.edit.innerHTML;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.mdeditor-wrapper {
  padding: 0 24px;
  .mdeditor-buttons {
    button {
      cursor: pointer;
      border: 1px solid black;
      color: black;
      background-color: #fff;
      font-size: 16px;
      line-height: 16px;
      padding: 8px 16px;
      border-radius: 5px;
      &:hover {
        background-color: black;
        color: #fff;
        transition: all 0.3s;
      }
    }
  }
  .mdeditor-inputs {
    label {
      margin-right: 16px;
    }
    .title-input {
      display: flex;
      flex-direction: row;
      align-items: center;
      a {
        position: relative;
        color: #fff;
        background-color: #79b6f0;
        display: inline-block;
        overflow: hidden;
        text-align: center;
        padding: 4px 16px;
        border-radius: 16px;
        input {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
        }
      }
    }
  }
  .mdeditor-content {
    .content-preview {
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
}

@media (min-width: 769px) {
  .mdeditor-wrapper {
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    letter-spacing: 1px;
    .mdeditor-inputs {
      padding: 8px 0;
      label {
        margin-right: 16px;
        input {
          padding: 4px 16px;
        }
      }
      .tags-input {
        display: flex;
        align-items: center;
        margin-top: 8px;
        ul {
          display: flex;
          align-items: center;
          justify-content: space-around;
          li {
            text-align: center;
            padding: 4px 16px;
            margin: 0 8px;
            border-radius: 16px;
            background-color: rgb(98, 98, 98);
            color: #fff;
            cursor: pointer;
            position: relative;
            &::after {
              display: block;
              content: "X";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              padding: 4px 16px;
              border-radius: 16px;
              background-color: red;
              color: #fff;
              opacity: 0;
              transition: all 0.3s;
            }
            &:hover {
              &::after {
                opacity: 1;
              }
            }
          }
        }
      }
    }
    .mdeditor-content {
      flex: 1;
      display: flex;
      padding-top: 16px;
      font-size: 16px;
      line-height: 24px;
      .content-input {
        border: 1px solid #a19191;
        padding: 8px;
        height: 100%;
        flex: 1;
      }
      .content-preview {
        width: 50%;
        border: 1px solid #a19191;
        padding: 8px;
      }
    }
  }
}
@media (max-width: 768px) {
  .mdeditor-wrapper {
    .mdeditor-buttons {
      button {
        cursor: pointer;
        border: 1px solid black;
        color: black;
        background-color: #fff;
        font-size: 0.381rem;
        line-height: 0.381rem;
        padding: 0.1905rem 0.381rem;
        border-radius: 5px;
        &:hover {
          background-color: black;
          color: #fff;
          transition: all 0.3s;
        }
      }
    }
    font-size: 0.2857rem;
    line-height: 0.3333rem;
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    letter-spacing: 1px;
    .mdeditor-inputs {
      padding: 16px 0;
      .tags-input {
        margin-top: 8px;
        ul {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          li {
            padding: 4px 6px;
            background-color: #5a5a5a;
            color: #fff;
          }
        }
      }
    }
    .mdeditor-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      .content {
        border: 1px solid #a19191;
        padding: 4px;
      }
      .content-input {
        flex: 1;
      }
      .content-preview {
        height: 50%;
      }
    }
  }
}
</style>
