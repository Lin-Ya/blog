<template>
  <div class="tag-wrapper">
    <button @click="getPostByTag" :class="{active:this.tag.id === this.getCurrentTag.id}">{{this.tag.attributes.tag}}</button>
  </div>
</template>

<script>
export default {
  props: ["propTag"],
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
      if(this.$route.name !== "Tags"){
        this.$router.push({name:"Tags"})
      }
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
}
@media (max-width: 768px) {
  .tag-wrapper {
    button {
      font-size: 14px;
      line-height: 24px;
      padding: 4px 8px;
      background-color: #fff;
      border: 1px solid #5a5a5a;
      border-radius: 4px;
      &.active {
        color: #fff;
        background-color: #5a5a5a;
        transition: all .3s;
      }
    }
  }
}
@media (min-width: 769px) {
  .tag-wrapper {
    button {
      cursor: pointer;
      font-size: 16px;
      line-height: 24px;
      padding: 4px 16px;
      color: #5e6c80;
      border: 1px solid #79b6f0;
      background-color: #fff;
      border-radius: 16px;
      transition: all .3s;
      &:hover {
        border-color: #79b6f0;
        background-color: #79b6f0;
        color: #fff;
      }
      &.active {
        border-color: #79b6f0;
        background-color: #79b6f0;
        color: #fff;
      }
    }
  }
}
</style>
