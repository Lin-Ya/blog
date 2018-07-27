<template>
  <div class="tag-wrapper">
    <button @click="getPostByTag" :class="{active:this.tag === this.getCurrentTag}">{{this.tag.attributes.tag}}</button>
  </div>
</template>

<script>
export default {
  props: ["propTag", "index"],
  data() {
    return {
      tag: {}
    };
  },
  created() {
    this.tag = this.propTag;
  },
  methods: {
    getPostByTag() {
      this.$store.dispatch("setTargetTag", this.tag).then(() => {
        this.$store.dispatch("getPostsList", this.getCurrentTag.id);
      });
    }
  },
  computed: {
    getCurrentTag(){
      return this.$store.getters.getCurrentTag
    }
  }
};
</script>

<style lang="less">
.tag-wrapper {
  padding: 4px;
  button {
    border: none;
    padding: 4px;
    &.active{
      color: red;
    }
  }
}
</style>
