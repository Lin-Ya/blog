<template>
  <div class="markdown-editor">
    <textarea></textarea>
  </div>
</template>

<script>
import simplemde from 'simplemde';
import marked from 'marked'
export default {
  name: 'markdown-editor',
  props: {
    
  },
  data () {
    return {

    }
  },
  mounted(){
    console.log('进入了md编辑器')
    let editor = new simplemde({
      element: this.$el.firstElementChild
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.markdown-editor .markdown-body {
  padding: 0.5em
}
.markdown-editor .editor-preview-active, .markdown-editor .editor-preview-active-side {
  display: block;
}
</style>
