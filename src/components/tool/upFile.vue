<template>
  <div class="uploadImg">
    <el-upload name="file" enctype="multipart/form-data" action="api/upFile?action=uploadimage" list-type="picture-card" :multiple="imgParam.multiple?'multiple':null" :on-success="handleAvatarSuccess" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" v-if="!imgParam.header">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-upload name="file" enctype="multipart/form-data" class="el-upload el-upload--picture-card" action="api/upFile?action=uploadimage" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" v-else>
      <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'uploadImg',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  props: {
    imgParam: Object
  },
  mounted() {
    this.dialogImageUrl = this.imgParam.imgUrl;
  },
  methods: {
    /* 弹框显示图片 */
    handlePictureCardPreview(file) {
      // console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /* 移除图片 */
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    /* 上传图片 */
    handleAvatarSuccess(res, file) {
      // console.log(res, file);
      // this.dialogImageUrl = URL.createObjectURL(file.raw); //使用Blob获取二进制图片
      this.dialogImageUrl = res.data;
      // console.log(this.dialogImageUrl);
      this.$emit('onImageUrl', this.dialogImageUrl);
    },
    /* 显示上传 */
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      var isLt2M;
      if (this.imgParam.imgSize > 0) {
        isLt2M = file.size / 1024 / 1024 < this.imgParam.imgSize;
      } else {
        isLt2M = file.size / 1024 / 1024 < 2;
      }
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 ' + (this.imgParam.imgSize > 0 ? '2' : this.imgParam.imgSize) + 'MB!');
      }
      return isJPG && isLt2M;
    }
  }
}

</script>
