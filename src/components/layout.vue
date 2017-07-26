<template>
    <div class="container-fluid">
        <div :class="['menu-box ']+[minMenuBox?'min':'']">
            <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight" mode="out-in">
                <MenuBox-view :user="user" v-on:setLayout="setLayout"></MenuBox-view>
            </transition>
        </div>
        <div :class="['mini-box ']+[sys.showEyeUser?'':'min']">
            <transition enter-active-class="animated zoomInRight" leave-active-class="animated zoomOutRight" mode="out-in">
                <UserHeader-view :user="user" v-if="sys.showEyeUser"></UserHeader-view>
            </transition>
            <transition enter-active-class="animated bounce" leave-active-class="animated bounce" mode="out-in">
                <SystemMenu-view :user="user" v-on:setSystem="setSys" v-on:UserLeave="UserLeave"></SystemMenu-view>
            </transition>
        </div>
        <div :class="['container-box ']+[minMenuBox?'left ':'']+[sys.showEyeUser?'':'right ']+[sys.showContainer?'opacity ':'']+[sys.showBottom?'':'max']">
            <transition enter-active-class="animated zoomInDown" leave-active-class="animated zoomOutUp" mode="out-in">
                <router-view :user="user"></router-view>
            </transition>
        </div>
        <div class="footer-box" v-if="sys.showBottom">
            <transition enter-active-class="animated zoomInUp" leave-active-class="animated zoomOutDown" mode="out-in">
                <CanvasIndex-view :user="user"></CanvasIndex-view>
            </transition>
        </div>
        <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" mode="out-in">
            <QQPanel-view v-if="sys.showQQ"></QQPanel-view>
        </transition>
        <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" mode="out-in">
            <WeChatPanel-view v-if="sys.showWechat"></WeChatPanel-view>
        </transition>
        <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" mode="out-in">
            <SendPanel-view :user="user" v-on:subimtSendInfo="closeSendForm" v-if="sys.showSendInfo"></SendPanel-view>
        </transition>
        <transition enter-active-class="animated slideInLeft" leave-active-class="animated zoomOutLeft" mode="out-in">
            <TimePanel-view :showTime="sys.showTime" v-if="sys.showTime" v-drag></TimePanel-view>
        </transition>
        <transition enter-active-class="animated slideInRight" leave-active-class="animated zoomOutRight" mode="out-in">
            <MusicPanel-view :user="user" v-if="sys.showMusic" v-drag></MusicPanel-view>
        </transition>
    </div>
</template>
<script>
import MenuBox from '@/components/system/menubox' // 菜单部分
import UserHeader from '@/components/system/userheader' // 用户信息
import SystemMenu from '@/components/system/systemmenu' // 用户信息
import CanvasIndex from '@/components/echarts/CanvasIndex' // 报表eChart
import MusicPanel from '@/components/tool/music' // 音乐面板
import TimePanel from '@/components/tool/time' // 音乐面板
import QQPanel from '@/components/tool/qq' // QQ面板
import WeChatPanel from '@/components/tool/wechat' // 微信面板
import SendPanel from '@/components/tool/sendinfo' // 微信面板
export default {
    name: 'layout',
    data() {
        return {
            page: [{
                path: '',
                text: '首页'
            }],
            minMenuBox: true,
            sys: {}
        }
    },
    props: {
        user: Object
    },
    mounted() {},
    methods: {
        /* 系统菜单传过来的设置,调用 */
        setSys(_sys) {
            this.sys = _sys;
            console.log(JSON.stringify(_sys));
        },
        /* 导航菜单传过来, 缩小菜单 */
        setLayout(_layoutMb) {
            this.minMenuBox = _layoutMb;
        },
        /* 表单提交后 */
        closeSendForm(_form) {
            this.sys.showSendInfo = false;
            this.sys.showContainer = false;
        },
        /* 退出账号, 反馈参数 => 父组件[主组件] */
        UserLeave(_userleave) {
            this.user = _userleave;
            this.$emit('UserLeave', this.user);
        }
    },
    components: {
        'MenuBox-view': MenuBox,
        'UserHeader-view': UserHeader,
        'SystemMenu-view': SystemMenu,
        'CanvasIndex-view': CanvasIndex,
        'MusicPanel-view': MusicPanel,
        'TimePanel-view': TimePanel,
        'QQPanel-view': QQPanel,
        'WeChatPanel-view': WeChatPanel,
        'SendPanel-view': SendPanel
    },
    directives: {
        /* 自定义指令拖拽 v-drag */
        drag(el) {
            el.onmousedown = function(ev) {
                var maxX = document.documentElement.clientWidth - el.clientWidth - 15;
                var maxY = document.documentElement.clientHeight - el.clientHeight - 15;
                var disX = ev.clientX - el.offsetLeft;
                var disY = ev.clientY - el.offsetTop;
                document.onmousemove = function(ev) {
                    var l = Math.min(Math.max((ev.clientX - disX), 15), maxX);
                    var t = Math.min(Math.max((ev.clientY - disY), 15), maxY);
                    el.style.left = l + 'px';
                    el.style.top = t + 'px';
                };
                document.onmouseup = function() {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };
        }
    }
}
</script>
<style scoped>
</style>
