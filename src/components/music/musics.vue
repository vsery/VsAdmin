<template>
    <div id="musics">
        <breadcrumb-view :breadcrumb="page"></breadcrumb-view>
        <!-- <selectForm-view :user="user" :addUrl="'/music/musics'" v-on:onSelectForm="getSelectItem"></selectForm-view> -->
        <el-button type="text" @click="dialogVisible = true">上传音乐</el-button>
        <el-row class="musciLists">
            <el-card v-for="(m, index) in musics" :key='m.id'>
                {{m.title}}
                <div class="prompt" v-if="musics.length==0">暂无数据</div>
            </el-card>
        </el-row>
        <pagination-view ref="ap" v-on:cbData="getItem" :dataUrl="baseUrl + 'music'" :searchForm="searchForm" :user="user" :action="'music'"></pagination-view>

        <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
            <div class="">
                <el-upload class="upload-demo" action="api/upFile?action=uploadmusic" multiple :on-change="handleChange" :file-list="upFileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import breadcrumb from '@/components/tool/breadcrumb' // 面包屑
import selectForm from '@/components/form/selectArticleForm' // 表单/文章搜索
import pagination from '@/components/tool/pagination' // 分页控件
export default {
    name: 'musics',
    data() {
        return {
            page: [{
                path: '/',
                text: '首页'
            }, {
                path: '',
                text: this.$route.name
            }],
            musics: [],
            searchForm: null,
            dialogVisible: false,
            upFileList: []
        }
    },
    props: {
        user: Object
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
            console.log(_data);
            this.musics = _data;
        },

        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },

        handleChange(file, fileList) {
            console.log(this.file);
            this.upFileList = fileList.slice(-3);
            console.log(this.upFileList);
        }
    },
    components: {
        "breadcrumb-view": breadcrumb,
        "selectForm-view": selectForm,
        "pagination-view": pagination
    }
}

</script>
