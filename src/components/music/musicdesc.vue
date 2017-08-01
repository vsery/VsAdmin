<template>
	<div id="musicdesc">
		<breadcrumb-view :breadcrumb="page"></breadcrumb-view>
		<el-upload class="upload-demo" action="api/upFile?action=uploadmusic" multiple :on-change="handleChange" :file-list="fileList3">
			<el-button size="small" type="primary">点击上传</el-button>
			<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
	</div>
</template>
<script>
import breadcrumb from '@/components/tool/breadcrumb' // 面包屑
export default {
	name: 'muscidesc',
	data() {
		return {
			page: [{
				path: '/',
				text: '首页'
			}, {
				path: '/music/musics',
				text: '音乐列表'
			}, {
				path: '',
				text: this.$route.name
			}],
			music: null,
			fileList3: [{
				name: 'food.jpeg',
				url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
				status: 'finished'
			}, {
				name: 'food2.jpeg',
				url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
				status: 'finished'
			}]
		}
	},
	methods: {
		handleChange(file, fileList) {
			this.fileList3 = fileList.slice(-3);
		}
	},
	components: {
		"breadcrumb-view": breadcrumb
	}
}

</script>
