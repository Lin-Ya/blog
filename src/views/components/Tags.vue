<template>
  <div class="tags">
    <ul class="tags-list">
      <li v-for="tagItem in this.tagsList" :key="tagItem.id" class="tags-item">
        <TagsButton :propTag="tagItem"/>
      </li>
    </ul>
    <PostsList/>
  </div>
</template>

<script>
import PostsItem from "views/posts/PostsItem";
import TagsButton from "views/components/TagsButton";
import PostsList from "views/posts/PostsList";

export default {
  components: {
    PostsItem,
    TagsButton,
    PostsList
  },
  data() {
    return {
      currentTagID: {}
    };
  },
  created() {
  },
  computed: {
    tagsList() {
      return this.$store.getters.tagsList;
    }
  },
  methods: {
  }
};
</script>

<style lang="less">
  .tags-list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 14px;
  }
</style>
