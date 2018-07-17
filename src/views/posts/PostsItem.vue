<template>
  <div class="posts-item">
    <router-link :to="{name: 'Article', params: {post: this.post, title: this.post.title}}">
      <p>
        <span> 标题：</span> {{this.post.title}}
        <span> ID：</span> {{this.post.id}}
        <span> 文章简述：</span> {{this.post.abstract}}
        <span> 喜欢数：</span> {{this.post.like}}
        <span> 阅读数：</span> {{this.post.read}}
      </p>
      <ul>
        <li v-for="item in this.post.tags" :key="item.id">{{item.tag}}</li>
      </ul>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["propPost"],
  data() {
    return {
      post: {
        abstract: "",
        articleID: "",
        cover: "",
        id: "",
        like: "",
        read: "",
        tags: [],
        title: ""
      }
    };
  },
  created() {
    Object.assign(this.post, this.propPost);
  }
};
</script>

<style lang="less">
</style>
