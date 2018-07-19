<template>
  <div class="tag-wrap">
    <button @click="getPostByTag">{{this.tag.attributes.tag}}</button>
  </div>
</template>

<script>
export default {
  props: ['propTag'],
  data(){
    return {
      tag: {}
    }
  },
  created() {
    this.tag = this.propTag
  },
  methods: {
    getPostByTag(){
      this.$emit('getPostByTag',this.tag.id)
    }
  }
}
</script>

<style lang="less">

</style>
