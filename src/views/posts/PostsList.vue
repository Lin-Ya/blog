<template>
  <div class="postsList-wrapper">
    <Loading v-if="this.isLoading" class="loading-wrapper" />
    <transition  name="slide-fade">
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
@media (min-width: 769px) {
  .postsList-wrapper {
    padding: 16px 24px;
  }
}
@media (max-width: 768px) {
  .postsList-wrapper {
    padding: 12px;
  }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
