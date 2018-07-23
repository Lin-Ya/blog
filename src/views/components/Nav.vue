<template>
  <div>
    <ul class="nav">
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link :to="{name:'Tags'}">Tags</router-link>
      </li>
      <li>
        <router-link :to="{name:'Mdeditor'}">Editor</router-link>
      </li>
      <li>
        <router-link :to="{name:'Account'}">Account</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.nav {
  padding: 24px;
  display: flex;
  align-items: center;
  li {
    font-size: .44rem;
    padding: 8px 10px;
  }
}
</style>
