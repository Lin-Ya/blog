<template>
  <div>
    <router-link :to="{name: 'Article', params: {post: this.post,postID: this.post.id}}" @click.native="setTargetPost">
      <!-- <div class="post-item">
        <div class="post-img">
          <img :src="this.post.attributes.cover" alt="cover">
          <p>{{this.post.attributes.abstract}}</p>
        </div>
        <div class="post-detail">
          <h2>{{this.post.attributes.title}}</h2>
          <p>Written by
            <span>Feng HuiWing {{this.post.createdAt}}</span>
          </p>
        </div>
      </div> -->
      <div class="post-item">
        <div class="post-item-tag">
          <span v-for="item in this.post.attributes.tags" :key="item.id">{{item.attributes.tag}}</span>
        </div>
        <div class="post-item-title">
          <h2>{{this.post.attributes.title}}</h2>
        </div>
        <div class="post-item-abstract">
          <p>{{this.post.attributes.abstract}}</p>
        </div>
        <img class="post-item-cover" :src="this.post.attributes.cover">
        <div class="post-item-createdAt">
          <span>{{this.post.createdAt}}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["propPost"],
  data() {
    return {
      post: {}
    };
  },
  created() {
    this.post = this.propPost;
  },
  methods: {
    setTargetPost() {
      this.$store.dispatch("setCurrentPost", this.post);
    }
  }
};
</script>

<style lang="less">
.post-item {
  margin: 16px auto;
}

@media only screen and (min-width: 481px) and (max-width: 768px) {
  .post-item {
    font-size: 16px;
    line-height: 16px;
    padding: 8px;
    color: #fff;
    text-shadow: 1px 1px 2px #000000b2;
    width: 576px;
    height: 288px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    .post-item-cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: brightness(0.85);
    }
    .post-item-tag {
      padding: 8px;
      span {
        margin-right: 8px;
        padding: 4px 8px;
        border-radius: 8px;
        background-color: #8d8d8d62;
      }
    }
    .post-item-title {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 100%;
      h2 {
        font-size: 32px;
        line-height: 32px;
        text-align: center;
      }
    }
    .post-item-abstract {
      display: none;
    }
  }
}

@media only screen and (max-width: 480px) {
  .post-item {
    font-size: 0.3333rem;
    line-height: 0.3333rem;
    padding: 0.1905rem;
    color: #fff;
    text-shadow: 0.0238rem 0.0238rem 0.0476rem #000000b2;
    width: 8.5714rem;
    height: 4.7619rem;
    position: relative;
    border-radius: 0.1905rem;
    overflow: hidden;
    .post-item-cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: brightness(0.85);
    }
    .post-item-tag {
      padding: 0.1905rem 0;
      span {
        margin-right: 0.1905rem;
        padding: 0.0952rem 0.1905rem;
        border-radius: 0.1905rem;
        background-color: #8d8d8d62;
      }
    }
    .post-item-title {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 100%;
      h2 {
        font-size: 0.6667rem;
        line-height: 0.6667rem;
        text-align: center;
      }
    }
    .post-item-abstract {
      display: none;
    }
  }
}
</style>
