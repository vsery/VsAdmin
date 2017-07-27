<template>
  <div id="app">
    <template v-if="user.token == ''">
      <transition enter-active-class="animated rotateIn" leave-active-class="animated zoomOut" mode="out-in" v-if="!signup">
        <div class="form-box signin">
          <el-form ref="signinForm" :model="form" label-width="70px">
            <div class="el-form-item">
              <label class="el-form-item__label " style="width:100%;text-align: center;">欢迎光临</label>
            </div>
            <el-form-item label="类型">
              <el-select v-model="form.type" placeholder="用户类型">
                <el-option label="管理员" value="administrator"></el-option>
                <el-option label="商家" value="business"></el-option>
                <el-option label="主播" value="anchor"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="form.name" prop="name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <i class="el-input__icon fa fa-fw fa-eye" prop="password"></i>
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="user.remember">记住密码</el-checkbox>
              <el-checkbox v-model="user.atuo">自动登录</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button @click="signIn" class="el-button-default right">登录</el-button>
              <el-button @click="resetSignIn" class="el-button-default">重置</el-button>
              <el-button @click="signup=true" class="el-button-default right">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition>
      <transition enter-active-class="animated rotateIn" leave-active-class="animated zoomOut" mode="out-in" v-if="signup">
        <div class="form-box signup">
          <el-form ref="form" :model="singupForm" label-width="70px">
            <div class="el-form-item" v-if="step == 1">
              <label class="el-form-item__label " style="width:100%;text-align: center;">注册用户</label>
            </div>
            <el-form-item label="类型" v-if="step == 1">
              <el-select v-model="singupForm.type" placeholder="用户类型">
                <el-option label="管理员" value="administrator"></el-option>
                <el-option label="商家" value="business"></el-option>
                <el-option label="主播" value="anchor"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名" v-if="step == 1">
              <el-input v-model="singupForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" v-if="step == 1">
              <i class="el-input__icon fa fa-fw fa-eye"></i>
              <el-input type="password" v-model="singupForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" v-if="step == 1">
              <i class="el-input__icon fa fa-fw fa-eye"></i>
              <el-input type="password" v-model="singupForm.passwordconfirm"></el-input>
            </el-form-item>
            <el-form-item v-if="step == 1">
              <el-button @click="step = 2" class="el-button-default right">继续</el-button>
              <el-button @click="signup=false" class="el-button-default">取消</el-button>
            </el-form-item>
            <el-form-item label="头像" v-if="step == 2">
              <upFile-view v-on:onImageUrl="getImgUrl" :imgParam="imgParam" :dialogImageUrl="singupForm.avatar"></upFile-view>
              <!-- <el-upload name="image" enctype="multipart/form-data" class="el-upload el-upload--picture-card" action="api/upImage" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                <img v-if="singupForm.avatar" :src="singupForm.avatar" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload> -->
            </el-form-item>
            <el-form-item label="昵称" v-if="step == 2">
              <el-input v-model="singupForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" v-if="step == 2">
              <el-input v-model.mobile="singupForm.mobile"></el-input>
            </el-form-item>
            <el-form-item v-if="step == 2">
              <el-button @click="signUp" class="el-button-default right">提交</el-button>
              <el-button @click="step = 1" class="el-button-default ">返回</el-button>
              <el-button @click="signup=false" class="el-button-default right">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition>
    </template>
    <template v-else>
      <transition enter-active-class="animated zoomIn" leave-active-class="animated rotateOut" mode="out-in">
        <layout-view :user="user" v-on:UserLeave="userLeave"></layout-view>
      </transition>
    </template>
    <div class="bg-box">
      <iframe :src="bg"></iframe>
    </div>
  </div>
</template>
<script>
import layout from '@/components/layout'
import upFile from '@/components/tool/upFile' // 上传图片组件
export default {
  name: 'app',
  data() {
    return {
      bg: '/static/pages/background/backgroundPage_' + parseInt(Math.random() * 5) + '.html',
      loginUrl: this.baseUrl + 'signIn',
      registerUrl: this.baseUrl + 'signUp',
      form: {
        type: 'administrator',
        name: '',
        password: ''
      },
      user: {
        token: '',
        type: '',
        name: '',
        password: '123456',
        mobile: '',
        avatar: '',
        avatarID: 0,
        nickname: '',
        remember: true,
        atuo: false
      },
      signup: false,
      step: 1,
      singupForm: {
        token: "",
        type: "administrator",
        name: "",
        password: "",
        passwordconfirm: "",
        mobile: "",
        avatar: "",
        avatarID: "",
        nickname: ""
      },
      dialogVisible: false,

      imgParam: {
        header: true
      }
    }
  },
  components: {
    'layout-view': layout,
    "upFile-view": upFile
  },
  mounted() {
    this.setHeader();
    if (!this.user.atuo) {
      this.user.token = '';
    } // 自动登录
    if (localStorage.getItem("vs_User") != null) {
      this.user = JSON.parse(localStorage.getItem("vs_User"));
    } // 读取token
    // if (this.user.remember) { this.form.password = decodeURIComponent(localStorage.getItem("vs_passWord")); } // 读取密码
  },
  methods: {
    /* 获取头像 */
    getImgUrl(_img) {
      console.log(_img);
      this.singupForm.avatar = _img;
    },
    /* 设置页面头 */
    setHeader() {
      var link = document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "icon";
      link.href = 'static/favicon/favicon' + parseInt(Math.random() * 4) + '.ico';
      document.getElementsByTagName("head")[0].appendChild(link);
      this.bg = '/static/pages/background/backgroundPage_3.html';
    },
    /* 退出账号 */
    userLeave(_userleave) {
      this.user = _userleave;
      this.form.type = this.user.type;
      this.form.name = this.user.name;
      if (this.user.remember) {
        this.form.password = decodeURIComponent(localStorage.getItem("vs_passWord"));
      } else {
        this.form.password = this.user.password;
      }
      if (!this.user.atuo) {
        this.user.token = '';
      }
    },
    /* 登录账户,获取表单内容 */
    signIn() {
      if (this.form.name == '' || this.form.name == null) return this.$message.error('请输入用户名');
      if (this.form.password == '' || this.form.password == null) return this.$message.error('请输入密码');
      var params = {
        'type': this.form.type,
        'name': this.form.name,
        'password': this.form.password
      }
      this.$http.post(this.loginUrl, {
        params: params
      }).then(res => {
        var resData = res.data;
        if (resData.state == 'SUCCESS') {
          this.user.token = resData.data.token;
          this.user.type = resData.data.type;
          this.user.name = resData.data.name;
          this.user.password = encodeURIComponent(resData.data.password);
          this.user.mobile = resData.data.mobile;
          this.user.avatar = resData.data.avatar;
          this.user.avatarID = resData.data.avatarID;
          this.user.nickname = resData.data.nickname;
          localStorage.setItem("vs_User", JSON.stringify(this.user));
          this.$notify({ title: '登录成功', message: '欢迎亲爱的回家!', type: 'success', duration: 3000 });
        } else {
          return this.$message.error(resData.info);
        }
      });
    },
    /* 重置登录表单 */
    resetSignIn() {
      this.form.name = '';
      this.form.password = '';
    },

    /* 注册账户,获取表单内容 */
    signUp() {
      if (this.singupForm.name == '' || this.singupForm.name == null) return this.$message.error('请输入用户名');
      if (this.singupForm.password == '' || this.singupForm.password == null) return this.$message.error('请输入密码');
      if (this.singupForm.passwordconfirm == '' || this.singupForm.passwordconfirm == null || this.singupForm.passwordconfirm != this.singupForm.password) return this.$message.error('请输入正确的密码');
      if (this.singupForm.avatar == '' || this.singupForm.avatar == null) return this.$message.error('请输入上传头像');
      if (this.singupForm.nickname == '' || this.singupForm.nickname == null) return this.$message.error('请输入昵称');
      if (this.singupForm.mobile == '' || this.singupForm.mobile == null) return this.$message.error('请输入手机号');
      this.$http.post(this.registerUrl, {
        params: this.singupForm
      }).then(res => {
        var resData = res.data;
        if (resData.state == 'SUCCESS') {
          this.signup = false;
          this.step = 1;
          this.$message.error(resData.info);
          this.user = resData.data;
          localStorage.setItem("vs_User", JSON.stringify(this.user));
        } else {
          return this.$message.error(resData.info);
        }
      });
    },
    /* 获取图片路径 */
    handleAvatarSuccess(res, file) {
      console.log(file);
      this.singupForm.avatar = file.response.data;
    },
    /* 上传校验 */
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  watch: {}
}

</script>
<style>


</style>
