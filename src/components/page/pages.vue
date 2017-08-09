<template>
    <div class="page">
        <breadcrumb-view :breadcrumb="page"></breadcrumb-view>
        <!-- <selectForm-view></selectForm-view> -->
        <!-- <pagination-view></pagination-view> -->
    </div>
</template>
<script>
import breadcrumb from '@/components/tool/breadcrumb' // 面包屑
import selectForm from '@/components/form/selectArticleForm' // 表单/文章搜索
import pagination from '@/components/tool/pagination' // 分页控件
export default {
    name: 'page',
    data() {
        return {
            page: [{
                path: '/',
                text: '首页'
            }, {
                path: '',
                text: this.$route.name
            }],
            blog: [],
            searchForm: null
        }
    },
    props: {
        user: Object
    },
    mounted() {
        console.log(this.$route.name);
    },
    methods: {},
    components: {
        'breadcrumb-view': breadcrumb,
        'selectForm-view': selectForm,
        'pagination-view': pagination
    }
}

</script>
<style>


</style>
