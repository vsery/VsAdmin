<template>
    <div id="links">
        <breadcrumb-view :breadcrumb="page"></breadcrumb-view>
        <el-form ref="form" class="selectBox text-left">
            <el-col :span="24">
                <el-form-item>
                    <el-checkbox label="全选" v-model="ruleForm.choose" name="choose"></el-checkbox>
                    <el-button class="el-button-default" @click="dialogVisible = true">添加</el-button>
                    <el-button class="el-button-default right" @click="">删除</el-button>
                </el-form-item>
            </el-col>
        </el-form>
        <el-row class="linkLists text-left">
            <el-col v-for="(l, index) in links" :span="6">
                <!-- <el-button class="el-button-default" :href="l.src">{{l.title}}</el-button> -->
                <a :href="l.src" class="el-button-default" target="_blank">{{l.title}}</a>
            </el-col>
        </el-row>
        <pagination-view ref="ap" v-on:cbData="getItem" :dataUrl="baseUrl + 'link'" :user="user" :action="'link'"></pagination-view>
        <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
            <div class="">
                <!-- <el-upload class="upload-demo" action="api/upFile?action=uploadmusic" multiple :on-change="handleChange" :file-list="upFileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload> -->
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
import pagination from '@/components/tool/pagination' // 分页控件
export default {
    name: 'links',
    data() {
        return {
            page: [{
                path: '/',
                text: '首页'
            }, {
                path: '',
                text: this.$route.name
            }],
            links: [],
            searchForm: null,
            dialogVisible: false,
            upFileList: [],
            ruleForm: {
                choose: false
            }
        }
    },
    props: {
        user: Object
    },
    methods: {
        /* 获取文章列表数据 */
        getItem(_data) {
            console.log(_data);
            this.links = _data;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        }
    },
    components: {
        "breadcrumb-view": breadcrumb,
        "pagination-view": pagination
    }
}

</script>
<style>
.linkLists {
    margin: 0 auto 1em;
}

.cover.music {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    overflow: hidden;
    vertical-align: bottom;
}

.cover.music img {
    width: 100%;
    height: 100%;
}
.el-checkbox {
    margin-right: 10px;
}
.cover.music,
.music.title {
    display: inline-block;
    margin-right: 1em;
}

</style>
