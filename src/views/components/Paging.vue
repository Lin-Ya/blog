<template>
  <div class="paging">
    <button @click="pre">Pre</button>
    <button @click="next">Next</button>
    <p>
      <span>{{this.pageNow}}</span> of
      <span>{{this.pageAll}}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["now", "total", "each"],
  data() {
    return {
      
    };
  },
  computed: {
    pageAll() {
      return Math.ceil(this.total / this.each);
    },
    pageNow(){
      return this.now
    }
  },
  methods: {
    changePage: function(page) {
      if (this.pageNow != page) {
        this.$store.dispatch("setPostsListPage", page);
      }
    },
    pre: function() {
      if (this.now > 1) {
        this.changePage(this.now - 1);
      }
    },
    next: function() {
      if (this.now < this.pageAll) {
        this.changePage(this.now + 1);
      }
    }
  }
};
</script>

<style lang="less">
</style>
