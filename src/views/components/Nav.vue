<template>
  <div>
    <ul class="nav">
      <li>
        <router-link to="/">HOME</router-link>
      </li>
      <li>
        <router-link :to="{name:'Tags'}">TAGS</router-link>
      </li>
      <li>
        <router-link :to="{name:'Mdeditor'}">EDITOR</router-link>
      </li>
      <li>
        <a href="http://me.fengxiaoyong.work/dist/index.html" target="blank">ABOUTME</a>
      </li>
      <li>
        <router-link :to="{name:'Account'}">LOGIN</router-link>
      </li>
    </ul>
    <ul class="nav-mobile clearfix">
      <li class="nav-menu">
        <i @click="showMenu">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-ego-menu"></use>
          </svg>
        </i>
        <ul class="clearfix" v-if="this.menuStatus">
          <li>
            <router-link :to="{name:'Tags'}">TAGS</router-link>
          </li>
          <li>
            <router-link :to="{name:'Mdeditor'}">EDITOR</router-link>
          </li>
          <li>
            <router-link :to="{name:'Account'}">LOGIN</router-link>
          </li>
        </ul>
      </li>
      <li class="nav-home">
        <router-link to="/">HOME</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuStatus: false
    };
  },
  methods: {
    showMenu() {
      this.menuStatus = !this.menuStatus;
    }
  }
};
</script>

<style lang="less">

@media (min-width: 769px) {
  .nav {
    padding: 24px;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 24px;
    line-height: 24px;
    li {
      margin: 0 8px;
    }
  }
  .nav-mobile {
    display: none;
  }
}
@media (max-width: 768px) {
  .nav {
    display: none;
  }
  .nav-mobile {
    position: relative;
    text-align: center;
    padding: 0.1481rem;
    & > li {
      font-size: 0.5926rem;
      line-height: 0.5926rem;
      padding: 0.1481rem;
      width: auto;
    }
    .nav-menu {
      float: left;
      width: 2.7778rem;
      ul {
        display: flex;
        flex-direction: column;
        li {
          padding: 0.1481rem;
          width: 100%;
  
        }
      }
    }
    .nav-home {
      font-weight: 600;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
