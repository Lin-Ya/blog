<template>
  <div class="paging">
    <i @click="pre" id="paging_btn_pre" v-show="this.pageNow !== 1">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-previous"></use>
      </svg>
    </i>
    <i @click="next" id="paging_btn_next" v-show="this.pageNow !== this.pageAll">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-next"></use>
      </svg>
    </i>
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
    return {};
  },
  computed: {
    pageAll() {
      return Math.ceil(this.total / this.each);
    },
    pageNow() {
      return this.now;
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
.paging {
  width: 200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  i {
    padding: 8px;
    &:hover {
      cursor: pointer;
    }
    .icon {
      font-size: 24px;
      fill: #5a5a5a;
    }
  }
  #paging_btn_pre {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  #paging_btn_next {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
  p {
    font-size: 24px;
    line-height: 24px;
    font-weight: bold;
  }
}
</style>
