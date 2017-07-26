<template>
  <div id="systemmenu" :class="systemMenuOpen?'open':''">
    <a class="el-button-default icon" v-for="s in systemMenu" @click="funs(s.fun)" :title="s.title" key="title">
      <i :class="'fa fa-fw fa-'+s.icon"></i>
    </a>
  </div>
</template>
<script>
export default {
  name: 'userview',
  data() {
    return {
      systemMenuOpen: false, // 菜单面板切换
      fullScreen: false, // 全屏切换
      sys: {
        showBottom: null, // 底部展示
        showContainer: null, // 主体边框
        showEyeUser: null, // 个人信息切换
        showTime: null, // 时间面板切换
        showMusic: null, // 音频面切换
        showQQ: null, // QQ面板切换
        showWechat: null, // 微信面板切换
        showSendInfo: null // 反馈信息
      },
      systemMenu: [{
        title: '打开系统菜单',
        fun: 'barsOpen',
        icon: 'bars'
      }, {
        title: '全屏显示',
        fun: 'arrows',
        icon: 'arrows'
      }, {
        title: '个人信息',
        fun: 'eyeUser',
        icon: 'eye'
      }, {
        title: '性能检测',
        fun: 'eyeBottom',
        icon: 'desktop'
      }, {
        title: '欣赏音乐',
        fun: 'music',
        icon: 'music'
      }, {
        title: '时间日期',
        fun: 'timePanel',
        icon: 'clock-o'
      }, {
        title: 'WebQQ',
        fun: 'webQQ',
        icon: 'qq'
      }, {
        title: '微信登录',
        fun: 'webWechat',
        icon: 'qrcode'
      }, {
        title: '反馈意见',
        fun: 'sendInfo',
        icon: 'paper-plane-o'
      }, {
        title: '退出系统',
        fun: 'leave',
        icon: 'power-off'
      }, {
        title: '',
        fun: '',
        icon: 'flag'
      }, {
        title: '',
        fun: '',
        icon: 'camera'
      }, {
        title: '',
        fun: '',
        icon: 'wechat'
      }, {
        title: '',
        fun: '',
        icon: 'heartbeat'
      }, {
        title: '',
        fun: '',
        icon: 'cloud'
      }, {
        title: '',
        fun: '',
        icon: 'address-book'
      }, {
        title: '',
        fun: '',
        icon: 'rebel'
      }, {
        title: '',
        fun: '',
        icon: 'wordpress'
      }, {
        title: '',
        fun: '',
        icon: 'home'
      }]
    }
  },
  props: {
    user: Object
  },
  components: {},
  mounted() {
    if (localStorage.getItem('vs_systemMenuOpen') != null) {
      this.systemMenuOpen = JSON.parse(localStorage.getItem("vs_systemMenuOpen"));
    }
  },
  methods: {
    /* 切换面板共用方法 */
    switchPanel(_attr) {
      if (this.sys[_attr] == null) {
        this.sys[_attr] = false;
      }
      switch (_attr) {
        case 'showQQ':
          this.sys.showWechat = false;
          this.sys.showSendInfo = false;
          this.sys.showContainer = true;
          break;
        case 'showWechat':
          this.sys.showQQ = false;
          this.sys.showSendInfo = false;
          this.sys.showContainer = true;
          break;
        case 'showSendInfo':
          this.sys.showQQ = false;
          this.sys.showWechat = false;
          this.sys.showContainer = true;
          break;
        default:
          this.sys.showContainer = false;
      }
      if (this.sys[_attr]) {
        this.sys[_attr] = false;
        this.sys.showContainer = false;
      } else {
        this.sys[_attr] = true;
      }
      this.$emit('setSystem', this.sys);
    },
    /* 轮训调用方法 */
    funs(temp) {
      switch (temp) {
        /* 打开关闭菜单面板 */
        case 'barsOpen':
          this.barsOpen();
          break;
          /* 全屏显示 */
        case 'arrows':
          this.arrows();
          break;
        case 'eyeBottom':
          this.switchPanel('showBottom');
          break;
          /* 查看账户信息 */
        case 'eyeUser':
          this.switchPanel('showEyeUser');
          break;
          /* 显示音乐面板 */
        case 'music':
          this.switchPanel('showMusic');
          break;
          /* 显示时间面板 */
        case 'timePanel':
          this.switchPanel('showTime');
          break;
          /* webQQ面板 */
        case 'webQQ':
          this.switchPanel('showQQ');
          break;
          /* 微信面板 */
        case 'webWechat':
          this.switchPanel('showWechat');
          break;
          /* 反馈意见 */
        case 'sendInfo':
          this.switchPanel('showSendInfo');
          break;
          /* 退出账号 */
        case 'leave':
          this.leave();
          break;
      }
    },
    barsOpen() {
      if (this.systemMenuOpen) {
        this.systemMenuOpen = false;
        this.systemMenu[0].title = '打开系统菜单';
      } else {
        this.systemMenuOpen = true;
        this.systemMenu[0].title = '关闭系统菜单';
      }
      localStorage.setItem("vs_systemMenuOpen", this.systemMenuOpen);
    },
    arrows() {
      if (this.fullScreen) {
        this.fullScreen = false;
        this.systemMenu[1].title = '全屏显示';
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        this.fullScreen = true;
        this.systemMenu[1].title = '关闭全屏';
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
      }
    },
    leave() {
      this.user.token = '';
      localStorage.setItem("vs_passWord", encodeURIComponent(this.user.password));
      this.user.password = '';
      localStorage.removeItem('vs_User');
      localStorage.setItem("vs_User", JSON.stringify(this.user));
      this.sys.user = this.user;
      this.$emit('UserLeave', this.user);
    }
  }
}

</script>
<style scoped>


</style>
