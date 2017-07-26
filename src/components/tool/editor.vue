<template>
  <div ref="editor"></div>
</template>
<script>
export default {
  name: "ueditor",
  data() {
    return {
      id: 'ueditorID_' + Math.random().toString(6).substring(2),
    };
  },
  props: {
    value: {
      type: String,
      default: null,
    }
  },
  watch: {
    value: function value(val, oldVal) {
      console.log(val,oldVal);
      if (val == '') {
        this.editor.setContent(val);
        this.editor.focus(true);
      }
    }
  },
  mounted() {
    console.log(this.value);
    this.editorBox();
  },
  methods: {
    /* 编辑器实例 */
    editorBox() {
      /* 设置编辑器ID */
      this.$refs.editor.id = this.id;
      /* 构建编辑器实例 */
      this.editor = UE.getEditor(this.id);
      /* ready后,设置编辑器默认内容,返回编辑器实例对象 */
      this.editor.addListener('ready', function() {
        console.log(decodeURIComponent(this.value));
        this.editor.setContent(decodeURIComponent(this.value));
        this.$emit('ready', this.editor);
      }.bind(this));
      /* 编辑器改变, 返回编辑器内容 */
      this.editor.addListener('contentChange', function() {
        const wordCount = this.editor.getContentLength(true);
        const content = this.editor.getContent();
        const plainTxt = this.editor.getPlainTxt();
        this.$emit('input', {
          wordCount: wordCount,
          content: content,
          plainTxt: plainTxt
        });
      }.bind(this));
    }
  }
};

</script>
<style scoped>


</style>
