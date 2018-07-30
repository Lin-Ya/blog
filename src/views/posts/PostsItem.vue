<template>
  <div>
    <div class="post-item" @click="setTargetPost">
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
        <span>{{this.getHandledDate}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("en");

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
      console.log(1);
      this.$store.dispatch("setCurrentPost", this.post);
      this.$router.push({
        name: "Article",
        params: { post: this.post, postID: this.post.id }
      });
    }
  },
  computed: {
    getHandledDate() {
      return moment(this.post.createdAt).format("MMMM Do YYYY, h:mm:ss a");
    }
  }
};
</script>

<style lang="less">
.post-item {
  margin: 0 auto 24px auto;
  color: #fff;
}
@media only screen and (min-width: 769px) {
  .post-item {
    color: #cacacade;
    position: relative;
    height: 240px;
    width: 70%;
    border-radius: 8px;
    overflow: hidden;
    &:hover {
      color: #fff;
      text-shadow: 2px 2px 1px #000000;
      cursor: pointer;
      transition: all 0.1s;
      -webkit-box-shadow: 1px 7px 20px 3px #474747;
      box-shadow: 1px 7px 20px 3px #474747;
      .post-item-title {
        top: 45%;
      }
      .post-item-abstract {
        opacity: 1;
        transition: all 0.3s;
      }
      .post-item-cover {
        filter: brightness(0.6) blur(2px);
      }
    }
    .post-item-cover {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      transform: translate(0%, -50%);
      z-index: -1;
      filter: brightness(0.5);
      width: 100%;
    }
    .post-item-title {
      font-size: 40px;
      line-height: 40px;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s;
    }
    .post-item-tag {
      padding: 16px;
      span {
        margin-right: 8px;
        padding: 4px 8px;
        border-radius: 8px;
        background-color: #8d8d8d62;
      }
    }
    .post-item-createdAt {
      position: absolute;
      right: 0;
      top: 0;
      padding: 16px;
    }
    .post-item-abstract {
      opacity: 0;
      position: absolute;
      width: 80%;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      p {
        font-size: 20px;
        line-height: 28px;
        padding: 4px;
        letter-spacing: 1px;
        color: #c0c0c0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}

@media only screen and (min-width: 481px) and (max-width: 768px) {
  .post-item {
    font-size: 16px;
    line-height: 16px;
    padding: 8px;
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
      img {
        width: 100%;
      }
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
