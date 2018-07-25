<template>
  <div class="tags">
    <div class="tags-list">
      <ul>
        <li v-for="tagItem in this.tagsList" :key="tagItem.id" class="tags-item">
          <TagsButton :propTag="tagItem" @getPostByTag="getTargetPost($event)" />
        </li>
      </ul>
    </div>
    <PostsList class="posts-list"/>
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
  props: ["targetTagID"],
  data() {
    return {};
  },
  created() {
    // this.targetTagID
    //   ? this.getTargetPost(this.tagsList)
    //   : this.getTargetPost(this.tagsList[4].id);
    if(this.targetTagID){
      this.getTargetPost(this.targetTagID)
    }else {
      while (this.tagsList.length>0) {
        this.getTargetPost(this.tagsList[4].id);
        break
      }
    }
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
