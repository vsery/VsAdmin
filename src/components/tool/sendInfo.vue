<template>
    <div id="sendInfo">
        <el-form ref="form" :model="form" label-width="70px">
            <el-form-item label="标题">
                <el-input v-model="form.title" name="sendTitle" placeholder="请输入反馈标题"></el-input>
            </el-form-item>
            <el-form-item label="内容" class="EditorBox">
                <editorBox-view :value="form.content" v-on:input="getEditor" v-on:ready="newEditor"></editorBox-view>
            </el-form-item>
            <el-form-item class="text-center" label-width="0px">
                <el-button @click="onSubmit" class="el-button-default right">发送</el-button>
                <el-button @click="onClear" class="el-button-default">清空</el-button>
                <el-button @click="onClose" class="el-button-default right">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import editorBox from '@/components/tool/editor' // editor组件
export default {
    name: 'blog',
    data() {
        return {
            form: {
                title: '',
                content: '<p>请输入反馈内容</p>'
            },
            editorBox: null,
            editor: null
        }
    },
    props: {
        user: Object
    },
    components: {
        'editorBox-view': editorBox
    },
    mounted() {
        document.getElementsByName("sendTitle")[0].focus();
    },
    methods: {
        /* 新建编辑器,返回实例 */
        newEditor(_editor) {
            console.log(_editor);
            this.editorBox = _editor;
        },
        /* 获取编辑器内容值 */
        getEditor(_editor) {
            this.editor = _editor;
            this.form.content = this.editor.content;
            console.log(this.editor);
        },
        /**
         * 提交表单 ()
         * 关闭弹框
         * 消息提示
         * 销毁编辑器实例
         */
        onSubmit() {
            this.editorBox.destroy();
            this.$message.success('提交成功');
            this.$emit('subimtSendInfo', false);
            console.log(this.form);
        },
        /* 清空表单 */
        onClear() {
            this.form = {
                title: '',
                content: ''
            }
        },
        /* 取消表单 */
        onClose() {
            this.editorBox.destroy();
            this.$emit('subimtSendInfo', false);
        }
    }
}
</script>
<style scoped>
</style>
