<template>
  <div class="posts-item">
    <router-link :to="{name: 'Article', params: {post: this.post,postID: this.post.id}}" @click.native="setTargetPost">
      <p>
        <span> 标题：</span> {{this.post.attributes.title}}
        <span> 文章简述：</span> {{this.post.attributes.abstract}}
        <span> 喜欢数：</span> {{this.post.attributes.like}}
        <span> 阅读数：</span> {{this.post.attributes.read}}
      </p>
      <ul>
        <li v-for="item in this.post.attributes.tags" :key="item.id">{{item.attributes.tag}}</li>
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
    this.post = this.propPost
  },
  methods: {
    setTargetPost(){
      this.$store.dispatch('setCurrentPost',this.post)
    }
  }
};
</script>

<style lang="less">
</style>
