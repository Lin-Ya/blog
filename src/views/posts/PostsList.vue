<template>
  <div class="postsList-wrapper">
    <transition>
      <Loading v-show="this.isLoading" class="loading-wrapper" />
      <div class="postsList" v-show="!this.isLoading">
        <!-- <transition-group name="list" class="posts-list"> -->
        <PostsItem v-for="post in this.postsList" :key="post.id" :propPost="post" />
        <!-- </transition-group> -->
        <Paging v-show="this.postsList.length" class="paging-wrapper" ref="Paging" :now="this.$store.getters.nowPost" :total="this.$store.getters.totalPost" :each="3" />
      </div>
    </transition>
  </div>
</template>

<script>
import PostsItem from "./PostsItem";
import Paging from "views/components/Paging";
import Loading from "views/components/Loading";

export default {
  components: {
    PostsItem,
    Paging,
    Loading
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    postsList() {
      return this.$store.getters.getCurrentPostsList;
    },
    isLoading() {
      return this.$store.getters.getIsLoading;
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
@media (max-width: 768px) {
  .postsList-wrapper {
    padding: 12px;
  }
}
</style>
