<template>
  <div class="postsList-wrapper">
    <div>
      <!-- <transition-group name="list" class="posts-list"> -->
      <PostsItem v-for="post in this.postsList" :key="post.id" :propPost="post" />
      <!-- </transition-group> -->
    </div>
    <Paging v-show="this.postsList" class="paging-wrapper" ref="Paging" :now="this.$store.getters.nowPost" :total="this.$store.getters.totalPost" :each="3" />
  </div>
</template>

<script>
import PostsItem from "./PostsItem";
import Paging from "views/components/Paging";
export default {
  components: {
    PostsItem,
    Paging
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    postsList() {
      return this.$store.getters.getCurrentPostsList;
    }
  },
  methods: {
    ternNext() {
      this.$refs.Paging.next();
    },
    ternPre() {
      this.$refs.Paging.pre();
    }
  }
};
</script>

<style lang="less">
.list-item {
  display: inline-block;
  margin-right: 10px;
}

@media only screen and (min-width: 769px) {
  .postsList-wrapper {
    padding: 0 24px;
  }
}
</style>
