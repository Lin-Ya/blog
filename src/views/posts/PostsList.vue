<template>
  <div class="posts-list">
    这是博文列表组件
    <PostsItem v-for="post in this.postsList" :key="post.id" :propPost="post"/>
    <Paging ref="Paging" :now="this.$store.getters.now" :total="this.$store.getters.totalPost" :each="3"/>
  </div>
</template>

<script>
import PostsItem from './PostsItem'
import Paging from 'views/components/Paging'
export default {
  components: {
    PostsItem,
    Paging
  },
  data(){
    return {
      
    }
  },
  created() {
    this.$store.dispatch("getPostsList")
  },
  computed: {
    postsList(){
      return this.$store.getters.currentPostsList
    }
  },
  methods: {
    ternNext(){
      this.$refs.Paging.next()
    },
    ternPre(){
      this.$refs.Paging.pre()
    }
  }
}
</script>

<style lang="less">

</style>
