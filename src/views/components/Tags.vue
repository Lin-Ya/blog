<template>
  <div class="tags">
    这是tags列表组件
    <div class="tags-list">
      <ul>
        <li v-for="tagItem in this.tagsList" :key="tagItem.id" class="tags-item">
          <TagsButton :propTag="tagItem" @getPostByTag="getTargetPost($event)" />
        </li>
      </ul>
    </div>
    <div>
      <PostsList/>
    </div>
  </div>
</template>

<script>
import PostsItem from "views/posts/PostsItem";
import TagsButton from "views/components/TagsButton";
import PostsList from 'views/posts/PostsList'

export default {
  components: {
    PostsItem,
    TagsButton,
    PostsList
  },
  data() {
    return {};
  },
  computed: {
    tagsList() {
      return this.$store.getters.tagsList;
    }
  },
  methods: {
    getTargetPost($event) {
      this.$store.dispatch("getPostsList", $event);
    }
  }
};
</script>

<style lang="less">
</style>
