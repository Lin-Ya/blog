<template>
  <div class="tags">
    这是tags列表组件
    <ul>
      <li v-for="tagItem in this.tagsList" :key="tagItem.id">
        <TagsButton :tag="tagItem"/>
      </li>
    </ul>
  </div>
</template>

<script>
import PostsItem from "views/posts/PostsItem";
import TagsButton from "views/components/TagsButton";
export default {
  components: {
    PostsItem,
    TagsButton
  },
  data() {
    return {
    };
  },
  computed: {
    tagsList(){
      return this.$store.getters.tagsList
    }
  }
  
};
</script>

<style lang="less">
</style>
