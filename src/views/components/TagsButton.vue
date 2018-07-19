<template>
  <div class="tag-wrap">
    <button :id="this.tag.id">{{this.tag.attributes.tag}}</button>
  </div>
</template>

<script>
export default {
  props: ['tag'],
  data(){
    return {

    }
  },
  created() {
    
  },
}
</script>

<style lang="less">

</style>
