<template>
  <div id="bold">
    <breadcrumb-view :breadcrumb="page"></breadcrumb-view>
    <upImage-view :imgParam="imgParam"></upImage-view>
  </div>
</template>
<script>
import breadcrumb from '@/components/tool/breadcrumb' // 面包屑
import upImage from '@/components/tool/upImage' // 上传图片组件
export default {
  name: 'project',
  data() {
    return {
      page: [{
        path: '/',
        text: '首页'
      }, {
        path: '/project/projects',
        text: '项目列表'
      }, {
        path: '',
        text: this.$route.name
      }],
      imgParam: {
        header: true
      }
    }
  },
  props: {
    user: Object
  },
  mounted() {},
  methods: {},
  components: {
    "breadcrumb-view": breadcrumb,
    "upImage-view": upImage
  }
}

</script>
<style scoped>


</style>
