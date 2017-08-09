<template>
    <div id="blog" :class="edit?'edit':''">
        <breadcrumb-view :breadcrumb="page"></breadcrumb-view>
        <el-form ref="form" class="blog-box" :model="blog" label-width="80px" v-if="edit">
            <el-form-item label="缩略图">
                <upFile-view v-on:onImageUrl="getImgUrl" :imgParam="imgParam" :dialogImageUrl="blog.thumbnail"></upFile-view>
            </el-form-item>
            <el-form-item label="活动名称">
                <el-input v-model="blog.title" autofocus></el-input>
            </el-form-item>
            <el-form-item label="关键字">
                <el-input type="textarea" v-model="keys" class="key"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input type="textarea" v-model="blog.desc"></el-input>
            </el-form-item>
            <el-form-item label="内容" class="EditorBox">
                <editorBox-view :value="blog.content" v-on:input="getEditor" v-on:ready="newEditor"></editorBox-view>
            </el-form-item>
            <el-form-item label-width="0" class="EditorBox text-center">
                <el-button class="el-button-default right" @click="onSubmit()">保持</el-button>
                <el-button class="el-button-default" @click="onCancel()">取消</el-button>
            </el-form-item>
        </el-form>
        <div class="blog-box" v-else>
            <div class="title h3">
                <i class="fa fa-fw fa-fire" v-if="blog.fire" title="热门"></i>
                <i class="fa fa-fw fa-filter" v-if="blog.top" title="顶置"></i> {{blog.title}}
                <div class="f-right">
                    <el-button class="el-button-default right" @click="edit=true">编辑</el-button>
                    <el-button class="el-button-default" @click="delectblog()">删除</el-button>
                </div>
            </div>
            <div class="second">
                <span class="time"><i class="fa fa-fw fa-clock-o"></i>{{blog.UpdateTime}}</span>
                <i class="fa fa-fw fa-key"></i><span class="key" v-for="k in blog.key" title="关键字">{{k}}</span>
            </div>
            <hr/>
            <div class="desc-box">
                <div class="thumbnail"><img :src="blog.thumbnail" alt=""></div>
                <div class="desc" v-html="blog.desc"></div>
            </div>
            <div class="content" v-html="blog.content"></div>
            <div class="foot">
                <ul class="fun">
                    <li>阅读: {{blog.eye}}</li>
                    <li>点赞: {{blog.zan}}</li>
                </ul>
                <div class="f-right">
                    <el-button class="el-button-default right" @click="onLoading('prev')" :disabled="blog.prevID ==-1?'disabled':null">上一篇</el-button>
                    <el-button class="el-button-default" @click="onLoading('next')" :disabled="blog.nextID ==-1?'disabled':null">下一篇</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import breadcrumb from '@/components/tool/breadcrumb' // 面包屑
import upFile from '@/components/tool/upFile' // 上传图片组件
import editorBox from '@/components/tool/editor' // editor组件
export default {
    name: 'blog',
    data() {
        return {
            page: [{
                path: '/',
                text: '首页'
            }, {
                path: '/blog/blogs',
                text: '博文列表'
            }, {
                path: '',
                text: this.$route.name
            }],
            // blogID: 0,
            edit: false,
            blog: {},
            keys: '',
            imgParam: {
                header: true
            },
            editorBox: null,
            editor: null
        }
    },
    props: {
        user: Object
    },
    watch: {

    },
    mounted() {
        this.onLoading();
    },
    methods: {
        /**
         * [加载页面]
         * @param  {[String]} _type [ prev, next, null ]
         * @return {[load]}       [ > ready page ... ]
         */
        onLoading(_type) {
            switch (_type) {
                case 'prev':
                    this.$router.push({ path: '/blog/blogdesc', query: { id: this.blog.prevID } });
                    break;
                case 'next':
                    this.$router.push({ path: '/blog/blogdesc', query: { id: this.blog.nextID } });
                    break;
            }
            this.blog.id = this.$route.query.id; // -1/0 新建状态
            if (this.blog.id < 1) {
                this.edit = true;
                this.blog.content = "";
            } else {
                this.getDate();
            }
        },
        /**
         * [获取数据]
         * @return {[type]} [Object]
         */
        getDate() {
            this.dataUrl = this.baseUrl + 'blogID';
            var params = { token: this.user.token, blogID: this.blog.id }
            this.$http.get(this.dataUrl, {
                params: params
            }).then(res => {
                var resData = res.data;
                console.log(resData);
                this.blog = resData.data;
                this.blog.content = decodeURIComponent(this.blog.content);
                this.keys = JSON.stringify(this.blog.key); // 关键字组 字符串化
                console.log(this.keys);
                this.imgParam.imgUrl = this.blog.thumbnail; // 初始化 缩略图
                localStorage.setItem("oldblog", JSON.stringify({
                    blog: this.blog,
                    keys: this.keys,
                    imgUrl: this.imgParam.imgUrl
                }));
            });
        },
        /* 获取缩略图 */
        getImgUrl(_img) {
            // console.log(_img);
            this.blog.thumbnail = _img;
        },
        /* 新建编辑器,返回实例 */
        newEditor(_editor) {
            // console.log(_editor);
            this.editorBox = _editor;
        },
        /* 获取编辑器内容值 */
        getEditor(_editor) {
            this.editor = _editor;
            this.blog.content = this.editor.content;
            // console.log(this.editor);
        },
        /* 删除博文 */
        delectblog() {
            // alert('> delect this ...');
            this.$confirm('您是否确定删除所选内容?', '确认操作', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                this.$notify({
                    title: '提示',
                    message: '您删除成功!',
                    type: 'success',
                    // duration: 3000
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '您已经取消操作',
                    // duration: 0
                });
            });
        },
        /* 提交编辑 */
        onSubmit() {
            var _d = new Date();
            this.blog.UpdateTime = _d.getFullYear() + '-' + _d.getMonth() + 1 + '-' + _d.getDate() + ' ' + _d.getHours() + ':' + _d.getMinutes() + ':' + _d.getSeconds();
            this.blog.key = JSON.parse(this.keys);
            this.blog.content = encodeURIComponent(this.blog.content);
            console.log(this.blog);
            this.$http.post(this.baseUrl + 'blogID', {
                params: {
                    token: this.user.token,
                    blog: this.blog
                }
            }).then(res => {
                var resData = res.data;
                this.$router.push({ path: '/blog/blogdesc', query: { id: resData.data.id } });
                this.edit = false;
                this.onLoading();
                this.$notify({
                    title: '提示',
                    message: '编辑成功!',
                    type: 'success',
                    // duration: 3000
                });
            });
        },
        /* 取消编辑 */
        onCancel() {
            if (this.blog.id < 1) {
                this.$router.push('blogs')
            } else {
                this.$confirm('您是否确定放弃编辑此内容?', '确认操作', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    this.edit = false;
                    var temp = JSON.parse(localStorage.getItem('oldblog'));
                    this.blog = temp.blog;
                    this.keys = temp.keys;
                    this.imgParam.imgUrl = temp.imgUrl;
                    this.$notify({
                        title: '提示',
                        message: '您放弃了此次编辑!',
                        type: 'info',
                        // duration: 3000
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '您已经取消操作',
                        // duration: 0
                    });
                });
            }
        }
    },

    components: {
        "breadcrumb-view": breadcrumb,
        "upFile-view": upFile,
        'editorBox-view': editorBox
    }
}
</script>