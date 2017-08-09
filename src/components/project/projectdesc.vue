<template>
    <div id="blog">
        <breadcrumb-view :breadcrumb="page"></breadcrumb-view>
        <upFile-view :imgParam="imgParam"></upFile-view>
    </div>
</template>
<script>
import breadcrumb from '@/components/tool/breadcrumb' // 面包屑
import upFile from '@/components/tool/upFile' // 上传图片组件
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
        "upFile-view": upFile
    }
}
</script>
<style scoped>
</style>