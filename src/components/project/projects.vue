<template>
    <div id="blog">
        <breadcrumb-view :breadcrumb="page"></breadcrumb-view>
        <selectForm-view :user="user" :addUrl="'/project/projectdesc'" v-on:onSelectForm="getSelectItem"></selectForm-view>
        <el-row class="projectLists">
            <el-card v-for="(p, index) in project" :key='p.id'>
                <router-link :to="{ path: '/project/projectdesc', query: { id: p.id } }" :user="user">
                    <img :src="p.thumbnail" class="image">
                    <div class="desc">
                        <span>{{p.title}}</span>
                        <div class="bottom clearfix">
                            <time class="time"><i class="fa fa-fw fa-clock-o"></i>{{ p.UpdateTime }}</time>
                            <span class="f-right ellipsis"><i class="fa fa-fw fa-eye"></i>{{p.eye}}</span>
                            <span class="f-right ellipsis"><i class="fa fa-fw fa-heart"></i>{{p.zan}}</span>
                        </div>
                    </div>
                </router-link>
                <div class="prompt" v-if="project.length==0">暂无数据</div>
            </el-card>
        </el-row>
        <pagination-view ref="ap" v-on:cbData="getItem" :dataUrl="baseUrl + 'project'" :searchForm="searchForm" :user="user"></pagination-view>
    </div>
</template>
<script>
import breadcrumb from '@/components/tool/breadcrumb' // 面包屑
import selectForm from '@/components/form/selectArticleForm' // 表单/文章搜索
import pagination from '@/components/tool/pagination' // 分页控件
export default {
    name: 'project',
    data() {
        return {
            page: [{
                path: '/',
                text: '首页'
            }, {
                path: '',
                text: this.$route.name
            }],
            project: [],
            searchForm: null
        }
    },
    props: {
        user: Object
    },
    mounted() {
        // this.getItem(); // 获取博文列表
    },
    methods: {
        /* 获取搜素子控件,传回来的表单,再查询文章数据 */
        getSelectItem(_form) {
            this.searchForm = _form;

            var that = this;
            this.$nextTick(() => {
                that.$refs.ap.getData(this.searchForm);
            });
            // this.getItem();
        },
        /* 获取文章列表数据 */
        getItem(_data) {
            this.project = _data;
        }
    },
    components: {
        "breadcrumb-view": breadcrumb,
        "selectForm-view": selectForm,
        "pagination-view": pagination
    }
}

</script>
