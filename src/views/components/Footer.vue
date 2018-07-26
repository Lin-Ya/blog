<template>
  <div class="footer-wrapper">
    <p> © 2018 Fneg Xiaoyong. All rights reserved.</p>
    <div class="links">
      <a href="https://juejin.im/user/5a141a97518825592c07bc1e/posts" target="_blank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-juejin"></use>
        </svg>
      </a>
      <a href="https://github.com/Lin-Ya/blog" target="_blank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-github"></use>
        </svg>
      </a>
      <a href="mailto:fenghuiwing@outlook.com">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-email"></use>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.footer-wrapper {
  text-align: center;
  padding: 12px 0;
  p {
    font-size: 12px;
    line-height: 12px;
    margin-bottom: 8px;
  }
  .links {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      font-size: 24px;
      line-height: 24px;
      margin: 0 16px;
      .icon {
        fill: #bfbfbf;
      }
    }
  }
}
</style>
