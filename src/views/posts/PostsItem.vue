<template>
  <div class="posts-item">
    <router-link :to="{name: 'Article', params: {post: this.post, title: this.post.title}}">
      <p>
        <span> 标题：</span> {{this.post.title}}
        <span> 文章简述：</span> {{this.post.abstract}}
        <span> 喜欢数：</span> {{this.post.like}}
        <span> 阅读数：</span> {{this.post.read}}
      </p>
      <ul>
        <li v-for="item in this.post.tags" :key="item.id">{{item.attributes.tag}}</li>
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
      }
    };
  },
  created() {
    for (let key in this.propPost.attributes) {
      this.post[key] = this.propPost.attributes[key]
    }
    this.post.id = this.propPost.id
    this.post.createdAt = this.propPost.createdAt
  }
};
</script>

<style lang="less">
</style>
