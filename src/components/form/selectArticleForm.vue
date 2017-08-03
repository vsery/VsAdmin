<template>
    <el-form ref="form" :model="selectForm" label-width="80px" class="selectBox">
        <el-col :span="2" class="text-left">
            <el-button @click="addPage()" class="el-button-default right">
                <i class="fa fa-fw fa-plus-circle"></i>添加
            </el-button>
        </el-col>
        <el-col :span="4">
            <el-form-item label="文章标题">
                <el-autocomplete class="inline-input" v-model="selectForm.title" :fetch-suggestions="queryTitleSearch" placeholder="请输入内容" :trigger-on-focus="true" style="width:100%"></el-autocomplete>
            </el-form-item>
        </el-col>
        <template v-if="selectForm.senior">
            <el-col :span="4">
                <el-form-item label="关键字">
                    <el-autocomplete class="inline-input" v-model="selectForm.key" :fetch-suggestions="queryKeySearch" placeholder="请输入内容" :trigger-on-focus="true" style="width:100%"></el-autocomplete>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="更新时间">
                    <el-col :span="24">
                        <timepicker-view v-on:getDateCounter="getDate" v-model="selectForm.date"></timepicker-view>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="其他设置">
                    <el-checkbox-group v-model="selectForm.type">
                        <el-checkbox label="顶置" name="type"></el-checkbox>
                        <el-checkbox label="热评" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-col>
        </template>
        <el-col :span="8" class="text-left">
            <el-button @click="onSelect()" class="el-button-default">
                <i class="fa fa-fw fa-search"></i>搜索
            </el-button>
            <el-button @click="clearSelect()" class="el-button-default right">
                <i class="fa fa-fw fa-trash"></i>清空
            </el-button>
            <el-button @click="handSenior()" class="el-button-default">
                <i :class="['fa fa-fw fa-']+[!selectForm.senior?'gears':'gear']"></i>{{!selectForm.senior?'高级':'简洁'}}
            </el-button>
        </el-col>
    </el-form>
</template>
<script>
import timepicker from '@/components/tool/timepicker' // 时间面板
export default {
    name: 'selectForm',
    data() {
        return {
            selectForm: {
                senior: false,
                title: '',
                key: '',
                date: '',
                type: []
            },
            restTitleItems: [],
            restKeyItems: [],
        }
    },
    props: {
        user: Object,
        addUrl: String
    },
    mounted() {
        this.getArticleTitle(); // 获取文章搜索建议
        this.getKeyWord(); // 获取关键字搜索建议
    },
    methods: {
        /* 添加子页面 */
        addPage() {
            this.$router.push({
                path: this.addUrl,
                query: { id: -1 }
            });
        },
        /* 获取时间选择器子控件,传回来的数组 */
        getDate(timeAxis) {
            this.selectForm.date = timeAxis;
        },
        /* 获取建议文章标题列表数据 */
        getArticleTitle() {
            this.menuUrl = this.baseUrl + 'articleTitle';
            var params = {
                'token': this.user.token
            }
            this.$http.get(this.menuUrl, {
                params: params
            }).then(res => {
                var resData = res.data;
                this.restTitleItems = resData;
            });
        },
        /* 获取数据关键字列表数据 */
        getKeyWord() {
            this.menuUrl = this.baseUrl + 'keyWord';
            var params = {
                'token': this.user.token
            }
            this.$http.get(this.menuUrl, {
                params: params
            }).then(res => {
                var resData = res.data;
                this.restKeyItems = resData;
            });
        },
        /* 打开高级搜素 */
        handSenior(e) {
            if (!this.selectForm.senior) {
                this.selectForm.senior = true;
            } else {
                this.selectForm.senior = false;
            }
        },
        /* 搜素文章标题建议 */
        queryTitleSearch(queryString, cb) {
            var restTitleItems = this.restTitleItems;
            var results = queryString ? restTitleItems.filter(this.createFilter(queryString)) : restTitleItems;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        /* 搜素关键字建议 */
        queryKeySearch(queryString, cb) {
            var restKeyItems = this.restKeyItems;
            var results = queryString ? restKeyItems.filter(this.createFilter(queryString)) : restKeyItems;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        /* 返回搜素建议 */
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        /* 提交搜素 */
        onSelect() {
            /* 自定义事件, 传递当前表单 */
            if (this.selectForm.senior == false && this.selectForm.title == '') {
                this.$emit('onSelectForm', null);
            } else {
                this.$emit('onSelectForm', this.selectForm);
            }
        },
        /* 清空表单 */
        clearSelect() {
            this.selectForm = {
                senior: false,
                title: '',
                key: '',
                date: '',
                type: []
            }
            this.onSelect();
        }
    },
    components: {
        "timepicker-view": timepicker
    }
}
</script>
<style scoped>
</style>